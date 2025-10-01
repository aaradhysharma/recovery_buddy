import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity, Droplet, Award, AlertCircle, Clock, Target, BarChart3 } from 'lucide-react';
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

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = "accent" }) => (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-md bg-${color}-100 dark:bg-${color}-900/20`}>
            <Icon className={`text-${color}-600 dark:text-${color}-400`} size={20} />
          </div>
          <div>
            <h3 className="metric-label">{title}</h3>
            <p className="metric-value">{value}</p>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend > 0 ? 'text-success' : trend < 0 ? 'text-danger' : 'text-neutral-500'
          }`}>
            <TrendingUp size={16} className={trend < 0 ? 'rotate-180' : ''} />
            <span className="ml-1">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      {subtitle && <p className="text-xs text-neutral-500 dark:text-neutral-400">{subtitle}</p>}
    </div>
  );

  const QuickAction = ({ icon: Icon, title, description, onClick, color = "accent" }) => (
    <button
      onClick={onClick}
      className="card p-4 text-left hover:shadow-card transition-shadow duration-200 group"
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-md bg-${color}-100 dark:bg-${color}-900/20 group-hover:bg-${color}-200 dark:group-hover:bg-${color}-900/30 transition-colors`}>
          <Icon className={`text-${color}-600 dark:text-${color}-400`} size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">{title}</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          ErgoWellness Dashboard
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Monitor your workspace health and productivity metrics
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Target}
          title="Current Streak"
          value={`${stats.streakDays} days`}
          subtitle="Days of consistent breaks"
          trend={stats.streakDays > 0 ? 12 : 0}
          color="success"
        />
        <StatCard
          icon={Clock}
          title="Today's Breaks"
          value={stats.todayBreaks}
          subtitle="Breaks taken today"
          trend={stats.todayBreaks > 3 ? 8 : -5}
          color="accent"
        />
        <StatCard
          icon={Droplet}
          title="Hydration"
          value={`${stats.hydrationToday} glasses`}
          subtitle="Water intake today"
          trend={stats.hydrationToday > 6 ? 15 : -10}
          color="accent"
        />
        <StatCard
          icon={Activity}
          title="Pain Level"
          value={`${stats.currentPainLevel}/10`}
          subtitle="Current discomfort"
          trend={stats.currentPainLevel < 3 ? -20 : 5}
          color={stats.currentPainLevel > 5 ? "danger" : "success"}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Weekly Overview */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Weekly Performance
              </h2>
              <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <BarChart3 size={16} />
                <span>Last 7 days</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-700">
                <span className="text-neutral-600 dark:text-neutral-400">Break Frequency</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div 
                      className="bg-accent-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((stats.weeklyBreaks / 35) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.weeklyBreaks}/35</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-700">
                <span className="text-neutral-600 dark:text-neutral-400">Hydration Goal</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full" 
                      style={{ width: `${Math.min((stats.hydrationToday / 8) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.hydrationToday}/8</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <span className="text-neutral-600 dark:text-neutral-400">Posture Score</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div 
                      className="bg-warning h-2 rounded-full" 
                      style={{ width: `${Math.max(100 - (stats.currentPainLevel * 10), 0)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{Math.max(100 - (stats.currentPainLevel * 10), 0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <QuickAction
                icon={Activity}
                title="Start Break"
                description="Take a 5-minute break"
                color="accent"
              />
              <QuickAction
                icon={Droplet}
                title="Log Hydration"
                description="Record water intake"
                color="accent"
              />
              <QuickAction
                icon={Target}
                title="Posture Check"
                description="Assess current posture"
                color="success"
              />
              <QuickAction
                icon={AlertCircle}
                title="Pain Assessment"
                description="Update pain level"
                color="danger"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      {badges.length > 0 && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Recent Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.slice(0, 6).map((badge, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md">
                <Award className="text-warning" size={20} />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">{badge.name}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;