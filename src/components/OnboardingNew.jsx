import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { useStore } from '../hooks/useStore';

function OnboardingNew({ onComplete }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Health Issues
    hasShoulderPain: false,
    hasNeckPain: false,
    hasBackPain: false,
    hasCarpalTunnel: false,
    hasEyeStrain: false,
    hasHeadaches: false,
    hasWristPain: false,
    hasPoorCirculation: false,
    hasOther: '',
    
    // Work Environment
    deskType: '',
    chairType: '',
    hoursPerDay: '',
    breaksFrequency: '',
    monitorSetup: '',
    
    // Current Habits
    currentExercise: '',
    waterIntake: '',
    screenBreaks: '',
    
    // Preferences
    breakInterval: 30,
    reminderStyle: 'gentle',
    enableCamera: true,
  });
  const { setStore } = useStore();

  const healthIssues = [
    { id: 'hasShoulderPain', label: 'Shoulder Pain', desc: 'Tension or pain in shoulders' },
    { id: 'hasNeckPain', label: 'Neck Pain', desc: 'Stiffness or soreness in neck' },
    { id: 'hasBackPain', label: 'Back Pain', desc: 'Lower or upper back discomfort' },
    { id: 'hasCarpalTunnel', label: 'Carpal Tunnel / Wrist Pain', desc: 'Numbness, tingling in hands' },
    { id: 'hasEyeStrain', label: 'Eye Strain', desc: 'Tired, dry, or irritated eyes' },
    { id: 'hasHeadaches', label: 'Tension Headaches', desc: 'Frequent headaches from posture' },
    { id: 'hasWristPain', label: 'Wrist Pain', desc: 'Pain from typing or mouse use' },
    { id: 'hasPoorCirculation', label: 'Poor Circulation', desc: 'Numbness in legs or feet' },
  ];

  const steps = [
    {
      title: 'Welcome to ErgoWellness',
      description: 'Let\'s understand your desk work health',
      content: (
        <div className="space-y-4">
          <div className="bg-reddit-background rounded p-4 border border-reddit-border">
            <h4 className="font-semibold text-dark mb-3">What we help with:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div>• Posture correction</div>
              <div>• Carpal tunnel prevention</div>
              <div>• Eye strain relief</div>
              <div>• Back pain management</div>
              <div>• Circulation improvement</div>
              <div>• Tension headaches</div>
            </div>
          </div>
          <div className="bg-orange-50 rounded p-3 border border-orange-200 text-sm">
            <div className="flex items-start">
              <AlertCircle className="text-orange-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
              <p className="text-gray-700">
                This is not medical advice. For serious or persistent symptoms, consult a healthcare professional.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'What issues do you experience?',
      description: 'Select all that apply (be honest)',
      content: (
        <div className="space-y-3">
          {healthIssues.map((issue) => (
            <button
              key={issue.id}
              type="button"
              onClick={() => setFormData({ ...formData, [issue.id]: !formData[issue.id] })}
              className={`w-full text-left px-4 py-3 rounded border-2 transition-all ${
                formData[issue.id]
                  ? 'border-reddit-orange bg-orange-50'
                  : 'border-reddit-border bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{issue.label}</div>
                  <div className="text-sm text-gray-600">{issue.desc}</div>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  formData[issue.id]
                    ? 'border-reddit-orange bg-reddit-orange'
                    : 'border-gray-300'
                }`}>
                  {formData[issue.id] && <span className="text-white text-xs">✓</span>}
                </div>
              </div>
            </button>
          ))}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other issues? (optional)
            </label>
            <input
              type="text"
              value={formData.hasOther}
              onChange={(e) => setFormData({ ...formData, hasOther: e.target.value })}
              className="w-full px-3 py-2 border border-reddit-border rounded focus:outline-none focus:border-reddit-blue"
              placeholder="e.g., hip pain, knee pain..."
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Your Work Environment',
      description: 'Help us understand your setup',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hours at desk per day
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['<2', '2-4', '4-6', '6-8', '8-10', '10+'].map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() => setFormData({ ...formData, hoursPerDay: hours })}
                  className={`py-2 px-4 rounded border-2 transition-all ${
                    formData.hoursPerDay === hours
                      ? 'border-reddit-orange bg-orange-50 text-reddit-orange font-semibold'
                      : 'border-reddit-border hover:border-gray-300'
                  }`}
                >
                  {hours}h
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current break frequency
            </label>
            <div className="space-y-2">
              {[
                { value: 'rare', label: 'Rarely (< once per hour)' },
                { value: 'hourly', label: 'Once per hour' },
                { value: 'halfhour', label: 'Every 30 minutes' },
                { value: 'frequent', label: 'Very frequent (every 15-20 min)' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, breaksFrequency: option.value })}
                  className={`w-full text-left py-2 px-4 rounded border-2 transition-all ${
                    formData.breaksFrequency === option.value
                      ? 'border-reddit-orange bg-orange-50'
                      : 'border-reddit-border hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monitor position
            </label>
            <select
              value={formData.monitorSetup}
              onChange={(e) => setFormData({ ...formData, monitorSetup: e.target.value })}
              className="w-full px-3 py-2 border border-reddit-border rounded focus:outline-none focus:border-reddit-blue"
            >
              <option value="">Select position</option>
              <option value="eye-level">At eye level (good!)</option>
              <option value="too-low">Below eye level</option>
              <option value="too-high">Above eye level</option>
              <option value="laptop">Using laptop screen</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: 'Setup Your Reminders',
      description: 'Customize how we help you',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Break reminder every: <span className="text-reddit-orange font-bold">{formData.breakInterval} minutes</span>
            </label>
            <input
              type="range"
              min="15"
              max="90"
              step="15"
              value={formData.breakInterval}
              onChange={(e) => setFormData({ ...formData, breakInterval: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>15 min</span>
              <span>45 min</span>
              <span>90 min</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reminder style
            </label>
            <div className="space-y-2">
              {[
                { value: 'gentle', label: 'Gentle', desc: 'Subtle notifications' },
                { value: 'normal', label: 'Normal', desc: 'Standard notifications' },
                { value: 'strict', label: 'Strict', desc: 'Enforced breaks (locks screen)' },
              ].map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, reminderStyle: style.value })}
                  className={`w-full text-left py-3 px-4 rounded border-2 transition-all ${
                    formData.reminderStyle === style.value
                      ? 'border-reddit-orange bg-orange-50'
                      : 'border-reddit-border hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{style.label}</div>
                  <div className="text-sm text-gray-600">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="border-2 border-reddit-border rounded p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900">Enable Camera Posture Monitoring</div>
                <div className="text-sm text-gray-600 mt-1">
                  Use AI to analyze your posture in real-time (privacy-first, all local)
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, enableCamera: !formData.enableCamera })}
                className={`ml-4 relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                  formData.enableCamera ? 'bg-reddit-orange' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    formData.enableCamera ? 'transform translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = async () => {
    if (step === steps.length - 1) {
      // Save all data
      await setStore('userData', formData);
      await setStore('settings', {
        breakInterval: formData.breakInterval,
        hydrationInterval: 120,
        notifications: true,
        strictMode: formData.reminderStyle === 'strict',
        cameraEnabled: formData.enableCamera,
      });
      await setStore('lastBreakTime', Date.now());
      await setStore('lastHydrationTime', Date.now());
      
      // Update reminder schedule
      if (window.electronAPI) {
        window.electronAPI.updateReminderSchedule();
      }
      
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) {
      // Must select at least one health issue
      return Object.keys(formData).some(key => 
        key.startsWith('has') && formData[key] === true
      ) || formData.hasOther;
    }
    if (step === 2) {
      return formData.hoursPerDay && formData.breaksFrequency && formData.monitorSetup;
    }
    return true;
  };

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-reddit-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-reddit-orange transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="p-8">
          {/* Step Indicator */}
          <div className="text-sm text-gray-500 mb-2">
            Step {step + 1} of {steps.length}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-dark mb-2">{currentStep.title}</h2>
          <p className="text-gray-600 mb-6">{currentStep.description}</p>

          {/* Content */}
          <div className="mb-8">{currentStep.content}</div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className={`flex items-center space-x-2 px-6 py-2 rounded font-medium transition-all ${
                step === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'border-2 border-reddit-border text-gray-700 hover:border-gray-400'
              }`}
            >
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center space-x-2 px-8 py-3 rounded font-medium transition-all ${
                canProceed()
                  ? 'bg-reddit-orange text-white hover:bg-orange-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>{step === steps.length - 1 ? 'Start Using ErgoWellness' : 'Continue'}</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingNew;
