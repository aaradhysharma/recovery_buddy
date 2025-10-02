import React, { useState, useEffect } from 'react';
import { Bell, Clock, Monitor, Download, Trash2, RefreshCw } from 'lucide-react';
import { useStore } from '../hooks/useStore';

function Settings() {
  const [settings, setSettings] = useState({
    breakInterval: 20,
    hydrationInterval: 120,
    strictMode: false,
    notifications: true,
    soundEnabled: true,
    autoStart: true,
  });
  const [isSaved, setIsSaved] = useState(false);
  const { getStore, setStore, getAllStore } = useStore();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedSettings = await getStore('settings', {
      breakInterval: 20,
      hydrationInterval: 120,
      strictMode: false,
      notifications: true,
      soundEnabled: true,
      autoStart: true,
    });
    setSettings(savedSettings);
  };

  const handleSave = async () => {
    await setStore('settings', settings);
    
    // Update reminder schedule
    if (window.electronAPI) {
      window.electronAPI.updateReminderSchedule();
    }
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleExport = async () => {
    const allData = await getAllStore();
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ergowellness-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      // Reset to defaults
      const defaultSettings = {
        breakInterval: 20,
        hydrationInterval: 120,
        strictMode: false,
        notifications: true,
        soundEnabled: true,
        autoStart: true,
      };
      
      await setStore('settings', defaultSettings);
      await setStore('trackingData', []);
      await setStore('badges', []);
      await setStore('streakDays', 0);
      await setStore('todayBreaks', 0);
      await setStore('weeklyBreaks', 0);
      await setStore('hydrationToday', 0);
      
      setSettings(defaultSettings);
      alert('All data has been reset!');
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your ErgoWellness experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Reminders Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Clock className="text-blue-500 mr-2" size={24} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Reminder Settings
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Break Interval: <span className="text-blue-600 dark:text-blue-400">{settings.breakInterval} minutes</span>
                </label>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={settings.breakInterval}
                  onChange={(e) => setSettings({ ...settings, breakInterval: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>15 min</span>
                  <span>60 min</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hydration Reminder: <span className="text-blue-600 dark:text-blue-400">{settings.hydrationInterval} minutes</span>
                </label>
                <input
                  type="range"
                  min="30"
                  max="180"
                  step="30"
                  value={settings.hydrationInterval}
                  onChange={(e) => setSettings({ ...settings, hydrationInterval: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>30 min</span>
                  <span>3 hours</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Strict Mode</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Lock screen during break reminders
                  </div>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, strictMode: !settings.strictMode })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.strictMode ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.strictMode ? 'transform translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Bell className="text-blue-500 mr-2" size={24} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Desktop Notifications</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Show system notifications
                  </div>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.notifications ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.notifications ? 'transform translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Sound</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Play sound with notifications
                  </div>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.soundEnabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.soundEnabled ? 'transform translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* General Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Monitor className="text-blue-500 mr-2" size={24} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                General
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Auto-start on Login</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Launch ErgoWellness when you log in
                  </div>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, autoStart: !settings.autoStart })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.autoStart ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.autoStart ? 'transform translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Download className="text-blue-500 mr-2" size={24} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Data Management
              </h3>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleExport}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium transition-colors"
              >
                <Download size={18} />
                <span>Export All Data</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg font-medium transition-colors"
              >
                <Trash2 size={18} />
                <span>Reset All Data</span>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
              isSaved
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isSaved ? '✓ Settings Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
