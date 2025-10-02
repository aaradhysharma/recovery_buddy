import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useStore } from '../hooks/useStore';

interface Stats {
  streakDays: number;
  todayBreaks: number;
  weeklyBreaks: number;
  hydrationToday: number;
  currentPainLevel: number;
}

const DashboardScreen: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    streakDays: 0,
    todayBreaks: 0,
    weeklyBreaks: 0,
    hydrationToday: 0,
    currentPainLevel: 0,
  });
  const [badges, setBadges] = useState<any[]>([]);
  const { getStore } = useStore();

  useEffect(() => {
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

    loadDashboardData();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>ErgoWellness Dashboard</Text>
        <Text style={styles.subtitle}>Monitor your workspace health and productivity metrics</Text>
      </View>

      <View style={styles.statGrid}>
        <StatCard
          title="Current Streak"
          value={`${stats.streakDays} days`}
          subtitle="Days of consistent breaks"
        />
        <StatCard
          title="Today's Breaks"
          value={`${stats.todayBreaks}`}
          subtitle="Breaks taken today"
        />
        <StatCard
          title="Hydration"
          value={`${stats.hydrationToday} glasses`}
          subtitle="Water intake today"
        />
        <StatCard
          title="Pain Level"
          value={`${stats.currentPainLevel}/10`
          }
          subtitle="Current discomfort"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Performance</Text>
        <ProgressRow label="Break Frequency" value={stats.weeklyBreaks} max={35} />
        <ProgressRow label="Hydration Goal" value={stats.hydrationToday} max={8} />
        <ProgressRow label="Posture Score" value={Math.max(100 - stats.currentPainLevel * 10, 0)} max={100} />
      </View>

      {badges.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Achievements</Text>
          {badges.slice(0, 6).map((badge, index) => (
            <View key={index} style={styles.badgeItem}>
              <Text style={styles.badgeTitle}>{badge.name}</Text>
              <Text style={styles.badgeDescription}>{badge.description}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle }) => (
  <View style={styles.statCard}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
    {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
  </View>
);

interface ProgressRowProps {
  label: string;
  value: number;
  max: number;
}

const ProgressRow: React.FC<ProgressRowProps> = ({ label, value, max }) => {
  const progress = Math.min((value / max) * 100, 100);

  return (
    <View style={styles.progressRow}>
      <Text style={styles.progressLabel}>{label}</Text>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressValue}>{`${value}/${max}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statTitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },
  statSubtitle: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  progressRow: {
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 9999,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#6366F1',
    borderRadius: 9999,
  },
  progressValue: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
  },
  badgeItem: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  badgeDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default DashboardScreen;
