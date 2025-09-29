import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './src/screens/Home';
import LiveAlerts from './src/screens/LiveAlerts';
import RecentViolation from './src/screens/RecentViolation';

const Tab = createBottomTabNavigator();

const darkTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#00D9FF',
    background: '#0A0A0F',
    card: '#14141E',
    text: '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.1)',
    notification: '#FF3B5C',
  },
  fonts: MD3DarkTheme.fonts,
};

export default function App() {
  return (
    <PaperProvider theme={darkTheme}>
      <NavigationContainer theme={darkTheme}>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#14141E',
              borderTopWidth: 1,
              borderTopColor: 'rgba(0, 217, 255, 0.2)',
              height: 70,
              paddingBottom: 10,
              paddingTop: 10,
              elevation: 0,
              shadowOpacity: 0,
            },
            tabBarActiveTintColor: '#00D9FF',
            tabBarInactiveTintColor: '#666',
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
              letterSpacing: 0.5,
              marginTop: 4,
            },
            tabBarIconStyle: {
              marginBottom: -4,
            },
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons 
                  name={focused ? "home" : "home"} 
                  size={28} 
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen 
            name="Live Alerts" 
            component={LiveAlerts} 
            options={{
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons 
                  name={focused ? "bell-alert" : "bell-alert-outline"} 
                  size={28} 
                  color={color}
                />
              ),
              tabBarBadge: 3,
              tabBarBadgeStyle: {
                backgroundColor: '#FF3B5C',
                color: '#FFF',
                fontSize: 10,
                fontWeight: 'bold',
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                top: 8,
              },
            }}
          />
          <Tab.Screen 
            name="Violations" 
            component={RecentViolation} 
            options={{
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons 
                  name={focused ? "alert-octagon" : "alert-octagon-outline"} 
                  size={28} 
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
