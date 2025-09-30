import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, ClipboardCheck, Activity, BookOpen, Settings as SettingsIcon, Sun, Moon, Camera } from 'lucide-react';

function Sidebar({ darkMode, toggleDarkMode }) {
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/posture', icon: Camera, label: 'Posture Monitor', highlight: true },
    { path: '/stretches', icon: Dumbbell, label: 'Stretches' },
    { path: '/assessment', icon: ClipboardCheck, label: 'Assessment' },
    { path: '/tracking', icon: Activity, label: 'Tracking' },
    { path: '/content', icon: BookOpen, label: 'Content' },
    { path: '/settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">E</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">ErgoWellness</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Health Coach</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-3 rounded-lg mb-1 transition-colors relative ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              } ${item.highlight ? 'animate-pulse-slow' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'text-blue-600 dark:text-blue-400' : ''} />
                <span className="font-medium">{item.label}</span>
                {item.highlight && (
                  <span className="absolute right-2 top-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {darkMode ? 'Light' : 'Dark'} Mode
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
