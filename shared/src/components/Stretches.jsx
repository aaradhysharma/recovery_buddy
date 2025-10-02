import React, { useState } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { stretchesData } from '../data/stretches';

function Stretches() {
  const [selectedStretch, setSelectedStretch] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0);

  const startExercise = (stretch) => {
    setSelectedStretch(stretch);
    setIsPlaying(true);
    setCurrentStep(0);
    setTimer(stretch.duration || 30);
  };

  const togglePause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetExercise = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setTimer(selectedStretch?.duration || 30);
  };

  const closeExercise = () => {
    setSelectedStretch(null);
    setIsPlaying(false);
    setCurrentStep(0);
  };

  React.useEffect(() => {
    let interval;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Stretches & Exercises</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Shoulder-focused exercises to relieve tension and improve posture
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stretchesData.map((stretch) => (
          <div
            key={stretch.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className={`h-32 bg-gradient-to-br ${stretch.color} flex items-center justify-center`}>
              <span className="text-6xl">{stretch.icon}</span>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{stretch.name}</h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  {stretch.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{stretch.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {stretch.duration}s
                </span>
                <span>{stretch.repetitions}</span>
              </div>
              <button
                onClick={() => startExercise(stretch)}
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Play size={18} />
                <span>Start Exercise</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Exercise Modal */}
      {selectedStretch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full shadow-2xl animate-slide-up">
            <div className={`h-48 bg-gradient-to-br ${selectedStretch.color} flex items-center justify-center relative`}>
              <span className="text-8xl">{selectedStretch.icon}</span>
              <button
                onClick={closeExercise}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedStretch.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{selectedStretch.description}</p>

              {/* Timer */}
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">{timer}s</div>
                <div className="text-gray-600 dark:text-gray-400">Remaining</div>
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Instructions:</h4>
                <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {selectedStretch.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="font-medium mr-2">{index + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Controls */}
              <div className="flex space-x-3">
                <button
                  onClick={togglePause}
                  className="flex-1 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  <span>{isPlaying ? 'Pause' : 'Resume'}</span>
                </button>
                <button
                  onClick={resetExercise}
                  className="py-3 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stretches;
