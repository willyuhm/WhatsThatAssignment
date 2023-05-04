import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Contacts from './Components/Contacts';
// import AddContacts from './AddContact';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="MainScreen" options={{headerShown: false}}>
            {() => (
              <Tab.Navigator>
                <Tab.Screen name="Contacts" component={Contacts} />
                {/* <Tab.Screen name="Add Contacts" component={AddContacts} /> */}
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }
}

export default App;