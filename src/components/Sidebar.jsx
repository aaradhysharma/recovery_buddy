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
    <aside className="w-64 bg-white dark:bg-gray-800 border-r-2 border-reddit-border dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b-2 border-reddit-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-reddit-orange rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">E</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-dark dark:text-white">ErgoWellness</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">Desk Health Monitor</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2.5 rounded mb-0.5 transition-colors relative ${
                isActive
                  ? 'bg-reddit-background text-reddit-orange font-semibold border-l-4 border-reddit-orange'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-l-4 border-transparent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'text-reddit-orange' : 'text-gray-600'} />
                <span className="text-sm">{item.label}</span>
                {item.highlight && (
                  <span className="ml-auto">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-reddit-orange text-white">
                      NEW
                    </span>
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
