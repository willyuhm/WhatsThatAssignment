import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Contacts from './Components/Contacts';
import Search from './Components/Search';
import ViewContact from './Components/ViewContact';
import UserProfile from './Components/UserProfile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="MainScreen" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator>
                <Tab.Screen name="Contacts" component={Contacts} options={{ title: 'Contacts' }} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Your Profile" component={UserProfile} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen
            name="ViewContact"
            component={ViewContact}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }
}

export default App;
