import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useStore } from '../hooks/useStore';

const TrackingScreen: React.FC = () => {
  const { getStore } = useStore();
  const [stats, setStats] = useState({
    streakDays: 0,
    totalBreaks: 0,
    totalHydration: 0,
    avgPainLevel: 0,
    lastAssessment: null as number | null,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const streakDays = await getStore('streakDays', 0);
    const todayBreaks = await getStore('todayBreaks', 0);
    const weeklyBreaks = await getStore('weeklyBreaks', 0);
    const hydrationToday = await getStore('hydrationToday', 0);
    const currentPainLevel = await getStore('currentPainLevel', 0);
    const lastAssessment = await getStore('lastAssessment', null);

    setStats({
      streakDays,
      totalBreaks: weeklyBreaks,
      totalHydration: hydrationToday,
      avgPainLevel: currentPainLevel,
      lastAssessment,
    });
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>📊 Progress Tracking</Text>
          <Text style={styles.subtitle}>Monitor your workspace health journey</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Current Streak</Text>
          <View style={styles.statRow}>
            <Text style={styles.statValue}>{stats.streakDays}</Text>
            <Text style={styles.statLabel}>days of consistent breaks</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${Math.min((stats.streakDays / 30) * 100, 100)}%` }]}
            />
          </View>
          <Text style={styles.progressLabel}>Goal: 30 days</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌊 This Week</Text>
          
          <View style={styles.weeklyStats}>
            <View style={styles.statBox}>
              <Text style={styles.statBoxValue}>{stats.totalBreaks}</Text>
              <Text style={styles.statBoxLabel}>Breaks Taken</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statBoxValue}>{stats.totalHydration}</Text>
              <Text style={styles.statBoxLabel}>Glasses of Water</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>💪 Pain Levels</Text>
          
          <View style={styles.painIndicator}>
            <View style={styles.painScale}>
              {[...Array(10)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.painDot,
                    i < stats.avgPainLevel && styles.painDotActive,
                    i < stats.avgPainLevel && i < 3 && styles.painDotLow,
                    i < stats.avgPainLevel && i >= 3 && i < 7 && styles.painDotMedium,
                    i < stats.avgPainLevel && i >= 7 && styles.painDotHigh,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.painValue}>
              Current: {stats.avgPainLevel}/10
            </Text>
          </View>

          <Text style={styles.lastUpdate}>
            Last assessment: {formatDate(stats.lastAssessment)}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏆 Achievements</Text>
          <Text style={styles.achievementText}>
            Keep logging your activities to unlock achievements and track your progress over time!
          </Text>
          
          <View style={styles.achievementPlaceholder}>
            <Text style={styles.achievementEmoji}>🎖️</Text>
            <Text style={styles.achievementLabel}>Complete more assessments to earn badges</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Tips for Better Tracking</Text>
          <Text style={styles.infoText}>
            • Log your breaks consistently{'\n'}
            • Update pain assessments daily{'\n'}
            • Track hydration throughout the day{'\n'}
            • Review progress weekly to spot trends
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  statRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#6366F1',
  },
  statLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 9999,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: 12,
    backgroundColor: '#6366F1',
    borderRadius: 9999,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right',
  },
  weeklyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statBoxValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  statBoxLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  painIndicator: {
    alignItems: 'center',
  },
  painScale: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  painDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  painDotActive: {
    backgroundColor: '#6366F1',
  },
  painDotLow: {
    backgroundColor: '#10B981',
  },
  painDotMedium: {
    backgroundColor: '#F59E0B',
  },
  painDotHigh: {
    backgroundColor: '#EF4444',
  },
  painValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  lastUpdate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
    textAlign: 'center',
  },
  achievementText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  achievementPlaceholder: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  achievementEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  achievementLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1E3A8A',
    lineHeight: 22,
  },
});

export default TrackingScreen;

