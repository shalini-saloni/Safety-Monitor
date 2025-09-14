import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from  '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import LiveAlerts from './src/screens/LiveAlerts';
import RecentViolation from './src/screens/RecentViolation';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon:() => {
            return <Image source={{uri:"https://static.vecteezy.com/system/resources/previews/011/934/381/non_2x/gold-home-icon-free-png.png"}}
            style={{width:30,height:30}}/>
          }
        }}/>
        <Tab.Screen name="Live Alerts" component={LiveAlerts} options={{
          tabBarIcon:() => {
            return <Image source={{uri:"https://www.freeiconspng.com/thumbs/alert-icon/alert-icon--free-icons-24.png"}}
            style={{width:30,height:30}}/>
          }
        }}/>
        <Tab.Screen name="Recent Violation" component={RecentViolation} options={{
          tabBarIcon:() => {
            return <Image source={{uri:"https://www.vhv.rs/dpng/d/244-2449712_flagging-an-inappropriate-google-review-report-violation-icon.png"}}
            style={{width:30,height:30}}/>
          }
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
