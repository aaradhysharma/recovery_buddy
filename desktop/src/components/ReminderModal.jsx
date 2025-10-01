import React, { useState } from 'react';
import { X, Clock, Coffee, Droplet } from 'lucide-react';
import { stretchesData } from '../data/stretches';

function ReminderModal({ data, onClose }) {
  const [selectedStretch, setSelectedStretch] = useState(stretchesData[0]);

  const handleSnooze = (minutes) => {
    if (window.electronAPI) {
      window.electronAPI.snoozeReminder(minutes);
    }
    onClose();
  };

  const handleDismiss = () => {
    if (window.electronAPI) {
      window.electronAPI.dismissReminder();
    }
    onClose();
  };

  const isBreakReminder = data.type === 'break';
  const isStretchReminder = data.type === 'stretch';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full shadow-2xl animate-slide-up">
        {/* Header */}
        <div className={`p-6 rounded-t-2xl ${
          isBreakReminder ? 'bg-gradient-to-r from-blue-500 to-purple-600' :
          'bg-gradient-to-r from-green-500 to-teal-600'
        }`}>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              {isBreakReminder ? <Clock size={28} /> : <Coffee size={28} />}
              <div>
                <h3 className="text-xl font-bold">
                  {isBreakReminder ? '⏰ Time for a Break!' : '🧘 Quick Stretch Time!'}
                </h3>
                <p className="text-sm opacity-90">
                  {isBreakReminder ? 'Rest your eyes and shoulders' : 'Let\'s do a quick exercise'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isBreakReminder && (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Suggested Activities:
                </h4>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                  <li>• Stand up and walk around for 2-3 minutes</li>
                  <li>• Look at something 20 feet away for 20 seconds</li>
                  <li>• Roll your shoulders back 10 times</li>
                  <li>• Drink some water 💧</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Or try a quick stretch:
                </h4>
                <select
                  value={selectedStretch.id}
                  onChange={(e) => setSelectedStretch(stretchesData.find(s => s.id === e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-3"
                >
                  {stretchesData.slice(0, 3).map((stretch) => (
                    <option key={stretch.id} value={stretch.id}>
                      {stretch.icon} {stretch.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedStretch.description}
                </p>
              </div>
            </div>
          )}

          {isStretchReminder && (
            <div className="space-y-4">
              <div className={`h-32 bg-gradient-to-br ${selectedStretch.color} rounded-lg flex items-center justify-center`}>
                <span className="text-6xl">{selectedStretch.icon}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedStretch.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {selectedStretch.description}
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <ol className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    {selectedStretch.instructions.slice(0, 3).map((instruction, index) => (
                      <li key={index} className="flex">
                        <span className="font-medium mr-2">{index + 1}.</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-b-2xl space-y-3">
          <button
            onClick={handleDismiss}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Done! Resume Work
          </button>
          
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSnooze(5)}
              className="py-2 px-3 bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              5 min
            </button>
            <button
              onClick={() => handleSnooze(10)}
              className="py-2 px-3 bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              10 min
            </button>
            <button
              onClick={() => handleSnooze(15)}
              className="py-2 px-3 bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              15 min
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">Snooze reminder</p>
        </div>
      </div>
    </div>
  );
}

export default ReminderModal;
