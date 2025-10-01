import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, ClipboardCheck, Activity, BookOpen, Settings as SettingsIcon, Sun, Moon, Camera, BarChart3 } from 'lucide-react';

function Sidebar({ darkMode, toggleDarkMode }) {
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/posture', icon: Camera, label: 'Posture Monitor', highlight: true },
    { path: '/stretches', icon: Dumbbell, label: 'Stretches' },
    { path: '/assessment', icon: ClipboardCheck, label: 'Assessment' },
    { path: '/tracking', icon: BarChart3, label: 'Analytics' },
    { path: '/content', icon: BookOpen, label: 'Content' },
    { path: '/settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent-600 rounded-md flex items-center justify-center">
            <span className="text-white text-sm font-semibold">EW</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">ErgoWellness</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Workspace Health</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 border-l-2 border-accent-600'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {item.highlight && (
                <div className="ml-auto w-2 h-2 bg-success rounded-full"></div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span>{darkMode ? 'Light' : 'Dark'}</span>
          </button>
          
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            v0.0.7
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;