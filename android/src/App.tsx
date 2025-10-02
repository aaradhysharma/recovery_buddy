import React, { useEffect, useMemo, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, StatusBar as RNStatusBar, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './AppNavigator';
import OnboardingScreen from './screens/OnboardingScreen';

const VERSION = '0.0.1';

const App: React.FC = () => {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const onboarded = await AsyncStorage.getItem('@ErgoWellness:onboarded');
      const theme = await AsyncStorage.getItem('@ErgoWellness:theme');

      setIsOnboarded(onboarded === 'true');
      setDarkMode(theme === 'dark');
    };

    initialize();
  }, []);

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem('@ErgoWellness:onboarded', 'true');
    setIsOnboarded(true);
  };

  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await AsyncStorage.setItem('@ErgoWellness:theme', newMode ? 'dark' : 'light');
  };

  if (isOnboarded === null) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNStatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      {isOnboarded ? (
        <AppNavigator darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      ) : (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      <View style={styles.versionBadge}>
        <Text style={styles.versionText}>v{VERSION}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  versionBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  versionText: {
    color: '#E5E7EB',
    fontSize: 12,
  },
});

export default App;
