import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Contacts from './Components/Contacts';

const Tab = createBottomTabNavigator();

class TabNav extends Component {
    constructor(props){
        super(props);
      }

      render() {
        return (
        <Tab.Navigator>
            <Tab.Screen name="Contacts" component={Contacts} />
        </Tab.Navigator>
        );
      }
}