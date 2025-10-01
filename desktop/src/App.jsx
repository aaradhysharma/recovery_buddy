import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import OnboardingNew from './components/OnboardingNew';
import PostureMonitor from './components/PostureMonitor';
import Stretches from './components/Stretches';
import Assessment from './components/Assessment';
import Tracking from './components/Tracking';
import Settings from './components/Settings';
import Content from './components/Content';
import ReminderModal from './components/ReminderModal';
import { useStore } from './hooks/useStore';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [reminderData, setReminderData] = useState(null);
  const { getStore, setStore } = useStore();

  useEffect(() => {
    const initializeApp = async () => {
      const onboarded = await getStore('onboarded', false);
      const theme = await getStore('theme', 'light');
      
      setIsOnboarded(onboarded);
      setDarkMode(theme === 'dark');
      setLoading(false);
    };

    initializeApp();

    // Listen for reminders from Electron
    if (window.electronAPI) {
      window.electronAPI.onShowReminder((data) => {
        setReminderData(data);
      });
    }

    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeListener('show-reminder');
      }
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleOnboardingComplete = async () => {
    await setStore('onboarded', true);
    setIsOnboarded(true);
  };

  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await setStore('theme', newMode ? 'dark' : 'light');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading ErgoWellness...</p>
        </div>
      </div>
    );
  }

  if (!isOnboarded) {
    return <OnboardingNew onComplete={handleOnboardingComplete} />;
  }

  return (
    <Router>
      <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/posture" element={<PostureMonitor />} />
            <Route path="/stretches" element={<Stretches />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/content" element={<Content />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {reminderData && (
          <ReminderModal
            data={reminderData}
            onClose={() => setReminderData(null)}
          />
        )}

        {/* Version number */}
        <div className="fixed bottom-2 right-2 text-xs text-gray-400 dark:text-gray-600 pointer-events-none">
          v0.0.5
        </div>
      </div>
    </Router>
  );
}

export default App;
