import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, TextInput } from 'react-native';
import { useStore } from '../hooks/useStore';

const SettingsScreen: React.FC = () => {
  const { getStore, setStore, clearStore } = useStore();
  const [settings, setSettings] = useState({
    breakInterval: 30,
    hydrationInterval: 120,
    notifications: true,
    strictMode: false,
    cameraEnabled: false,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedSettings = await getStore('settings', settings);
    setSettings(savedSettings);
  };

  const updateSetting = async (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await setStore('settings', newSettings);
  };

  const handleReset = async () => {
    await clearStore();
    setSettings({
      breakInterval: 30,
      hydrationInterval: 120,
      notifications: true,
      strictMode: false,
      cameraEnabled: false,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your ErgoWellness experience</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏰ Reminders</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Break Interval</Text>
              <Text style={styles.settingDesc}>Minutes between break reminders</Text>
            </View>
            <TextInput
              style={styles.numberInput}
              keyboardType="number-pad"
              value={String(settings.breakInterval)}
              onChangeText={(text) => updateSetting('breakInterval', parseInt(text) || 30)}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Hydration Interval</Text>
              <Text style={styles.settingDesc}>Minutes between hydration reminders</Text>
            </View>
            <TextInput
              style={styles.numberInput}
              keyboardType="number-pad"
              value={String(settings.hydrationInterval)}
              onChangeText={(text) => updateSetting('hydrationInterval', parseInt(text) || 120)}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingDesc}>Enable reminder notifications</Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={(value) => updateSetting('notifications', value)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Behavior</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Strict Mode</Text>
              <Text style={styles.settingDesc}>Enforce breaks (locks screen)</Text>
            </View>
            <Switch
              value={settings.strictMode}
              onValueChange={(value) => updateSetting('strictMode', value)}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Camera Monitoring</Text>
              <Text style={styles.settingDesc}>Enable posture detection</Text>
            </View>
            <Switch
              value={settings.cameraEnabled}
              onValueChange={(value) => updateSetting('cameraEnabled', value)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Advanced</Text>
          
          <TouchableOpacity style={styles.dangerButton} onPress={handleReset}>
            <Text style={styles.dangerButtonText}>Reset All Data</Text>
          </TouchableOpacity>
          <Text style={styles.warningText}>
            This will clear all your settings and data. This action cannot be undone.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>ErgoWellness v0.0.1</Text>
          <Text style={styles.footerText}>Made with ❤️ for your health</Text>
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
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  settingDesc: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  numberInput: {
    width: 80,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  dangerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  warningText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
});

export default SettingsScreen;

