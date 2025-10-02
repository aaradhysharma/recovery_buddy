import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PostureMonitorScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>📷 Live Posture Monitor</Text>
          <Text style={styles.subtitle}>AI-powered real-time posture analysis</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Camera Feature Not Available</Text>
          <Text style={styles.infoText}>
            The posture monitoring feature requires camera access and AI processing that is currently only available in the desktop version of ErgoWellness.
          </Text>
          <Text style={styles.infoText}>
            Mobile camera-based posture detection will be available in a future update.
          </Text>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Quick Posture Tips</Text>
          <Text style={styles.tipItem}>• Sit back in your chair with proper lumbar support</Text>
          <Text style={styles.tipItem}>• Keep your head aligned over your shoulders</Text>
          <Text style={styles.tipItem}>• Shoulders should be relaxed and level</Text>
          <Text style={styles.tipItem}>• Monitor should be at eye level</Text>
          <Text style={styles.tipItem}>• Feet flat on floor, knees at 90 degrees</Text>
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
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 8,
  },
  tipCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  tipItem: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 8,
  },
});

export default PostureMonitorScreen;

