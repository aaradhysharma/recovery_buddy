import React from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Switch, Text, StyleSheet } from 'react-native';

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({ darkMode, toggleDarkMode, ...props }) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[styles.container, darkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, darkMode && styles.titleDark]}>ErgoWellness</Text>
        <Text style={[styles.subtitle, darkMode && styles.subtitleDark]}>Healthy posture companion</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.themeToggle}>
        <Text style={[styles.themeLabel, darkMode && styles.themeLabelDark]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>
      <Text style={[styles.version, darkMode && styles.versionDark]}>v0.0.1</Text>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  titleDark: {
    color: '#F9FAFB',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  subtitleDark: {
    color: '#D1D5DB',
  },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  themeLabel: {
    fontSize: 16,
    color: '#111827',
  },
  themeLabelDark: {
    color: '#F9FAFB',
  },
  version: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
  },
  versionDark: {
    color: '#6B7280',
  },
});

export default CustomDrawerContent;
