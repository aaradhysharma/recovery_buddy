import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import DashboardScreen from './screens/DashboardScreen';
import PostureMonitorScreen from './screens/PostureMonitorScreen';
import StretchesScreen from './screens/StretchesScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import TrackingScreen from './screens/TrackingScreen';
import ContentScreen from './screens/ContentScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerContent from './components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

interface AppNavigatorProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        drawerContent={(props) => (
          <CustomDrawerContent {...props} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        )}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Posture" component={PostureMonitorScreen} />
        <Drawer.Screen name="Stretches" component={StretchesScreen} />
        <Drawer.Screen name="Assessment" component={AssessmentScreen} />
        <Drawer.Screen name="Tracking" component={TrackingScreen} />
        <Drawer.Screen name="Content" component={ContentScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
