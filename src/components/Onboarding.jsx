import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useStore } from '../hooks/useStore';

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    primaryIssue: 'shoulder',
    monitorHeight: '',
    chairSupport: '',
    sittingHours: '',
    breakInterval: 20,
    hydrationInterval: 120,
    notifications: true,
  });
  const { setStore } = useStore();

  const steps = [
    {
      title: 'Welcome to ErgoWellness! 🎉',
      description: 'Your personal digital health coach for better posture and pain relief',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">What we'll help you with:</h4>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
              <li>✓ Regular break reminders</li>
              <li>✓ Guided shoulder stretches</li>
              <li>✓ Ergonomic workspace tips</li>
              <li>✓ Pain tracking & analytics</li>
              <li>✓ Hydration reminders</li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Privacy First:</strong> All your data stays on your device. No cloud, no tracking.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Tell Us About Yourself',
      description: 'Help us personalize your experience',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name (optional)</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age Range</label>
            <select
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select age range</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-45">36-45</option>
              <option value="46-55">46-55</option>
              <option value="56+">56+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Issue</label>
            <select
              value={formData.primaryIssue}
              onChange={(e) => setFormData({ ...formData, primaryIssue: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="shoulder">Shoulder Pain</option>
              <option value="neck">Neck Pain</option>
              <option value="back">Back Pain</option>
              <option value="general">General Posture</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: 'Ergonomic Assessment',
      description: 'Let's evaluate your workspace setup',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Monitor Height (relative to eye level)
            </label>
            <select
              value={formData.monitorHeight}
              onChange={(e) => setFormData({ ...formData, monitorHeight: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select position</option>
              <option value="too-low">Too Low</option>
              <option value="at-level">At Eye Level</option>
              <option value="too-high">Too High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Does your chair have good lumbar support?
            </label>
            <div className="flex space-x-4">
              {['Yes', 'No', 'Unsure'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, chairSupport: option.toLowerCase() })}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                    formData.chairSupport === option.toLowerCase()
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily sitting hours
            </label>
            <select
              value={formData.sittingHours}
              onChange={(e) => setFormData({ ...formData, sittingHours: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select hours</option>
              <option value="0-2">Less than 2 hours</option>
              <option value="2-4">2-4 hours</option>
              <option value="4-6">4-6 hours</option>
              <option value="6-8">6-8 hours</option>
              <option value="8+">More than 8 hours</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: 'Customize Reminders',
      description: 'Set your preferred reminder intervals',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Break Reminder Interval: <span className="text-blue-600 dark:text-blue-400">{formData.breakInterval} minutes</span>
            </label>
            <input
              type="range"
              min="15"
              max="60"
              step="5"
              value={formData.breakInterval}
              onChange={(e) => setFormData({ ...formData, breakInterval: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>15 min</span>
              <span>60 min</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hydration Reminder: <span className="text-blue-600 dark:text-blue-400">{formData.hydrationInterval} minutes</span>
            </label>
            <input
              type="range"
              min="30"
              max="180"
              step="30"
              value={formData.hydrationInterval}
              onChange={(e) => setFormData({ ...formData, hydrationInterval: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>30 min</span>
              <span>3 hours</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Enable Notifications</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Receive desktop notifications</div>
            </div>
            <button
              onClick={() => setFormData({ ...formData, notifications: !formData.notifications })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                formData.notifications ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  formData.notifications ? 'transform translate-x-6' : ''
                }`}
              />
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = async () => {
    if (step === steps.length - 1) {
      // Save all settings
      await setStore('userData', formData);
      await setStore('settings', {
        breakInterval: formData.breakInterval,
        hydrationInterval: formData.hydrationInterval,
        notifications: formData.notifications,
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

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-12">
          {/* Step Indicator */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Step {step + 1} of {steps.length}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{currentStep.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{currentStep.description}</p>

          {/* Content */}
          <div className="mb-8">{currentStep.content}</div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                step === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <span>{step === steps.length - 1 ? 'Get Started' : 'Continue'}</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
