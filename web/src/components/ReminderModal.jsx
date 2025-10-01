import React, { useEffect, useState } from 'react';
import { X, Clock, Activity } from 'lucide-react';

function ReminderModal({ data, onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    // Request notification permission on mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('ErgoWellness Reminder', {
        body: data?.message || 'Time for a break!',
        icon: '/vite.svg',
        badge: '/vite.svg',
      });
    }

    // Auto-close timer
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 animate-slide-up">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-reddit-orange rounded-full flex items-center justify-center">
              <Activity className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Break Time!
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Take care of yourself
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
            {data.message || 'Time to take a break and stretch!'}
          </p>
          <div className="bg-reddit-background dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Clock size={20} />
              <span className="text-sm">Auto-closing in {secondsLeft}s</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Dismiss
          </button>
          <button
            onClick={() => {
              window.location.href = '/stretches';
              onClose();
            }}
            className="flex-1 px-4 py-3 bg-reddit-orange text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            View Stretches
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReminderModal;
