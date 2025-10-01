import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';

function PostureMonitor() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [detector, setDetector] = useState(null);
  const [postureStatus, setPostureStatus] = useState('good');
  const [postureScore, setPostureScore] = useState(100);
  const [warningCount, setWarningCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const animationFrameId = useRef(null);

  // Initialize TensorFlow and load pose detection model
  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const detectorConfig = {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        };
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          detectorConfig
        );
        setDetector(detector);
      } catch (error) {
        console.error('Error loading pose detection model:', error);
      }
    };
    loadModel();
  }, []);

  const startCamera = async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsActive(true);
        setTimeout(() => setIsLoading(false), 1000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied. Please allow camera permissions in browser settings.');
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    setIsActive(false);
    setPostureStatus('good');
    setPostureScore(100);
  };

  // Analyze posture from detected keypoints
  const analyzePosture = (keypoints) => {
    if (!keypoints || keypoints.length === 0) return;

    // Find key body parts
    const nose = keypoints.find(k => k.name === 'nose');
    const leftShoulder = keypoints.find(k => k.name === 'left_shoulder');
    const rightShoulder = keypoints.find(k => k.name === 'right_shoulder');
    const leftEar = keypoints.find(k => k.name === 'left_ear');
    const rightEar = keypoints.find(k => k.name === 'right_ear');

    if (!nose || !leftShoulder || !rightShoulder) return;

    // Calculate shoulder midpoint
    const shoulderMidX = (leftShoulder.x + rightShoulder.x) / 2;
    const shoulderMidY = (leftShoulder.y + rightShoulder.y) / 2;

    // Calculate forward head posture (nose too far forward from shoulders)
    const headForwardDistance = Math.abs(nose.y - shoulderMidY);
    const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x);
    
    // Check if head is too far forward (forward head posture)
    const forwardHeadRatio = headForwardDistance / shoulderWidth;
    
    // Check shoulder alignment (slouching)
    const shoulderAngle = Math.abs(leftShoulder.y - rightShoulder.y);
    const isShoulderUneven = shoulderAngle > 30;

    // Calculate ear-shoulder alignment for neck posture
    let neckAlignment = 0;
    if (leftEar && rightEar) {
      const earMidY = (leftEar.y + rightEar.y) / 2;
      neckAlignment = Math.abs(earMidY - shoulderMidY);
    }

    // Scoring system (0-100)
    let score = 100;
    let status = 'good';

    // Deduct points for bad posture
    if (forwardHeadRatio > 0.8) {
      score -= 30;
      status = 'warning';
    }
    if (forwardHeadRatio > 1.2) {
      score -= 20;
      status = 'bad';
    }
    if (isShoulderUneven) {
      score -= 20;
    }
    if (neckAlignment > 50) {
      score -= 15;
    }

    score = Math.max(0, score);

    setPostureScore(score);
    
    if (score < 50) {
      setPostureStatus('bad');
      setWarningCount(prev => prev + 1);
      
      // Trigger notification for bad posture
      if (warningCount > 5 && window.electronAPI) {
        window.electronAPI.showPostureWarning?.();
      }
    } else if (score < 70) {
      setPostureStatus('warning');
    } else {
      setPostureStatus('good');
      setWarningCount(0);
    }
  };

  // Main detection loop
  const detectPose = async () => {
    if (!detector || !videoRef.current || !isActive) return;

    try {
      const poses = await detector.estimatePoses(videoRef.current);
      if (poses && poses.length > 0) {
        const keypoints = poses[0].keypoints;
        
        // Draw pose on canvas
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          
          // Draw keypoints
          keypoints.forEach(keypoint => {
            if (keypoint.score > 0.3) {
              ctx.beginPath();
              ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
              ctx.fillStyle = postureStatus === 'good' ? '#10b981' : 
                              postureStatus === 'warning' ? '#f59e0b' : '#ef4444';
              ctx.fill();
            }
          });
        }

        analyzePosture(keypoints);
      }
    } catch (error) {
      console.error('Pose detection error:', error);
    }

    animationFrameId.current = requestAnimationFrame(detectPose);
  };

  useEffect(() => {
    if (isActive && detector) {
      detectPose();
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isActive, detector]);

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <Camera className="mr-3 text-blue-500" size={36} />
            Live Posture Monitor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered real-time posture analysis using your webcam
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Posture Score */}
          <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 ${
            postureStatus === 'good' ? 'border-green-500' :
            postureStatus === 'warning' ? 'border-yellow-500' : 'border-red-500'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Posture Score</p>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {Math.round(postureScore)}
                </h3>
              </div>
              {postureStatus === 'good' ? (
                <CheckCircle className="text-green-500" size={48} />
              ) : postureStatus === 'warning' ? (
                <AlertTriangle className="text-yellow-500" size={48} />
              ) : (
                <AlertTriangle className="text-red-500" size={48} />
              )}
            </div>
            <div className="mt-4">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    postureStatus === 'good' ? 'bg-green-500' :
                    postureStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${postureScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                <h3 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
                  {postureStatus === 'good' ? '✅ Excellent' :
                   postureStatus === 'warning' ? '⚠️ Needs Work' : '❌ Poor'}
                </h3>
              </div>
              <Activity className="text-blue-500" size={40} />
            </div>
          </div>

          {/* Warnings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Warnings Today</p>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {warningCount}
                </h3>
              </div>
              <AlertTriangle className="text-orange-500" size={40} />
            </div>
          </div>
        </div>

        {/* Camera View */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Camera Feed
            </h3>
            <button
              onClick={isActive ? stopCamera : startCamera}
              disabled={isLoading}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isActive ? <CameraOff size={20} /> : <Camera size={20} />}
              <span>{isLoading ? 'Loading...' : isActive ? 'Stop Monitoring' : 'Start Monitoring'}</span>
            </button>
          </div>

          <div className="relative bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="absolute top-0 left-0 w-full h-full"
            />
            {!isActive && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <CameraOff className="mx-auto text-gray-600 mb-4" size={64} />
                  <p className="text-gray-400">Click "Start Monitoring" to begin</p>
                </div>
              </div>
            )}
          </div>

          {/* Posture Tips */}
          {isActive && postureStatus !== 'good' && (
            <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <h4 className="font-semibold text-orange-900 dark:text-orange-300 mb-2 flex items-center">
                <AlertTriangle size={20} className="mr-2" />
                Posture Correction Tips
              </h4>
              <ul className="text-sm text-orange-800 dark:text-orange-400 space-y-1">
                {postureScore < 50 && (
                  <>
                    <li>• Sit back in your chair with back support</li>
                    <li>• Keep your head aligned over your shoulders</li>
                    <li>• Pull your shoulders back and down</li>
                    <li>• Raise your monitor to eye level</li>
                  </>
                )}
                {postureScore >= 50 && postureScore < 70 && (
                  <>
                    <li>• Check your head position - avoid leaning forward</li>
                    <li>• Keep shoulders relaxed and level</li>
                    <li>• Take a stretch break</li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Privacy Note */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">🔒 Privacy First</h4>
          <p className="text-sm text-blue-800 dark:text-blue-400">
            All processing happens locally on your device. No video or images are sent to the cloud or stored anywhere. 
            Your camera feed is only used for real-time posture analysis.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostureMonitor;
