import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity, Droplet, Award, AlertCircle } from 'lucide-react';
import { useStore } from '../hooks/useStore';

function Dashboard() {
  const [stats, setStats] = useState({
    streakDays: 0,
    todayBreaks: 0,
    weeklyBreaks: 0,
    hydrationToday: 0,
    currentPainLevel: 0,
  });
  const [badges, setBadges] = useState([]);
  const { getStore } = useStore();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const streakDays = await getStore('streakDays', 0);
    const todayBreaks = await getStore('todayBreaks', 0);
    const weeklyBreaks = await getStore('weeklyBreaks', 0);
    const hydrationToday = await getStore('hydrationToday', 0);
    const currentPainLevel = await getStore('currentPainLevel', 0);
    const userBadges = await getStore('badges', []);

    setStats({ streakDays, todayBreaks, weeklyBreaks, hydrationToday, currentPainLevel });
    setBadges(userBadges);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back! 👋</h1>
        <p className="text-gray-600 dark:text-gray-400">Here's your wellness summary for today</p>
      </div>

      {stats.currentPainLevel > 7 && (
        <div className="mb-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="text-orange-500 mt-0.5" size={20} />
          <div>
            <h4 className="font-semibold text-orange-900 dark:text-orange-300">High Pain Level Detected</h4>
            <p className="text-sm text-orange-800 dark:text-orange-400 mt-1">
              Your pain level is elevated. Consider taking a break and doing some stretches. If pain persists, consult a healthcare professional.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={TrendingUp}
          title="Current Streak"
          value={`${stats.streakDays} days`}
          subtitle="Keep it going!"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          icon={Activity}
          title="Today's Breaks"
          value={stats.todayBreaks}
          subtitle={`${stats.weeklyBreaks} this week`}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          icon={Droplet}
          title="Hydration"
          value={`${stats.hydrationToday} cups`}
          subtitle="Today"
          color="bg-gradient-to-br from-cyan-500 to-cyan-600"
        />
        <StatCard
          icon={Award}
          title="Badges Earned"
          value={badges.length}
          subtitle="Total achievements"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <div className="font-medium text-blue-900 dark:text-blue-300">Take a Stretch Break</div>
              <div className="text-sm text-blue-700 dark:text-blue-400">3-minute shoulder exercises</div>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <div className="font-medium text-green-900 dark:text-green-300">Log Hydration</div>
              <div className="text-sm text-green-700 dark:text-green-400">Track your water intake</div>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
              <div className="font-medium text-purple-900 dark:text-purple-300">Health Check-In</div>
              <div className="text-sm text-purple-700 dark:text-purple-400">Update your pain level</div>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
          {badges.length === 0 ? (
            <div className="text-center py-8">
              <Award className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-500 dark:text-gray-400">Start your wellness journey to earn badges!</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {badges.slice(0, 6).map((badge, index) => (
                <div key={index} className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{badge.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">💡 Today's Wellness Tip</h3>
        <p className="text-blue-50">
          Every 20 minutes, take a 20-second break to look at something 20 feet away. This 20-20-20 rule helps reduce eye strain and reminds you to move your shoulders and neck.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
