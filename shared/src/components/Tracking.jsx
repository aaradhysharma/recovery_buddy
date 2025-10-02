import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Calendar, TrendingDown, TrendingUp } from 'lucide-react';
import { useStore } from '../hooks/useStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Tracking() {
  const [painLevel, setPainLevel] = useState(5);
  const [stiffness, setStiffness] = useState(5);
  const [trackingData, setTrackingData] = useState([]);
  const { getStore, setStore } = useStore();

  useEffect(() => {
    loadTrackingData();
  }, []);

  const loadTrackingData = async () => {
    const data = await getStore('trackingData', []);
    setTrackingData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const entry = {
      date: new Date().toISOString(),
      painLevel,
      stiffness,
      timestamp: Date.now(),
    };

    const newData = [...trackingData, entry];
    await setStore('trackingData', newData);
    await setStore('currentPainLevel', painLevel);
    setTrackingData(newData);

    // Show success message
    alert('Health check-in saved!');
  };

  const chartData = {
    labels: trackingData.slice(-7).map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Pain Level',
        data: trackingData.slice(-7).map(d => d.painLevel),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Stiffness',
        data: trackingData.slice(-7).map(d => d.stiffness),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const getTrend = () => {
    if (trackingData.length < 2) return null;
    
    const recent = trackingData.slice(-3);
    const older = trackingData.slice(-6, -3);
    
    const recentAvg = recent.reduce((sum, d) => sum + d.painLevel, 0) / recent.length;
    const olderAvg = older.reduce((sum, d) => sum + d.painLevel, 0) / older.length;
    
    if (recentAvg < olderAvg) return 'improving';
    if (recentAvg > olderAvg) return 'worsening';
    return 'stable';
  };

  const trend = getTrend();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Health Tracking
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor your pain levels and track your progress over time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {trend && (
          <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 ${
            trend === 'improving' ? 'border-green-500' :
            trend === 'worsening' ? 'border-red-500' :
            'border-gray-300 dark:border-gray-600'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Trend</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                  {trend}
                </h3>
              </div>
              {trend === 'improving' ? (
                <TrendingDown className="text-green-500" size={40} />
              ) : trend === 'worsening' ? (
                <TrendingUp className="text-red-500" size={40} />
              ) : (
                <div className="text-gray-400 text-3xl">→</div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Check-ins</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {trackingData.length}
              </h3>
            </div>
            <Calendar className="text-blue-500" size={40} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Pain (7 days)</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {trackingData.length > 0
                  ? (trackingData.slice(-7).reduce((sum, d) => sum + d.painLevel, 0) / Math.min(trackingData.length, 7)).toFixed(1)
                  : '0.0'}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Check-in Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Daily Check-In
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Pain Level: <span className="text-blue-600 dark:text-blue-400 text-lg font-semibold">{painLevel}/10</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>No Pain</span>
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Stiffness: <span className="text-blue-600 dark:text-blue-400 text-lg font-semibold">{stiffness}/10</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={stiffness}
                onChange={(e) => setStiffness(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>None</span>
                <span>Mild</span>
                <span>Moderate</span>
                <span>Very Stiff</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Save Check-In
            </button>
          </form>
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            7-Day Trend
          </h3>
          
          {trackingData.length > 0 ? (
            <div style={{ height: '300px' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400 dark:text-gray-600">
              <div className="text-center">
                <Calendar size={48} className="mx-auto mb-2 opacity-50" />
                <p>No tracking data yet</p>
                <p className="text-sm">Complete your first check-in to see trends</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {trackingData.length > 0 && (
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Tracking Tips</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
            <li>• Check in at the same time each day for consistency</li>
            <li>• Track for at least 2 weeks to identify patterns</li>
            <li>• If pain worsens, consult a healthcare professional</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Tracking;
