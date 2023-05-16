import React from 'react';
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
import ViewBlocked from './Components/ViewBlocked';
import ChatList from './Components/ChatList';
import Chat from './Components/Chat';
import ChatDetails from './Components/ChatDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Chats' component={ChatList} />
      <Tab.Screen name='Contacts' component={Contacts} options={{ title: 'Contacts' }} />
      <Tab.Screen name='Search' component={Search} />
      <Tab.Screen name='Your Profile' component={UserProfile} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name='ViewContact'
          component={ViewContact}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name='Blocked Contacts'
          component={ViewBlocked}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name='Chat'
          component={Chat}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name='Chat Details'
          component={ChatDetails}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
};

export default App;
