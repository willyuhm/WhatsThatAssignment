import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from "./Styles/Styles.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Contacts extends Component {
  constructor(props){
    super(props);

    this.state = {
      is_loading: true,
    }
  }

  // componentDidMount(){
  //   this.unsubscribe = this.props.addListener('focus', () => {
  //     this.checkLoggedIn();
  //   });
  // }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  // checkLoggedIn = async () => {
  //   const value = await AsyncStorage.getItem('whatsthat_session_token');
  //   if (value == null) {
  //     this.props.navigation.navigate('Login');
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Contacts page</Text>
        <Text>If you're seeing this you logged in!</Text>
        <Button
            title='Log out'
            onPress={() => this.logout()}
         />
      </View>
    );
  }

  async logout(){
    const { navigation } = this.props;
    console.log('Logout')
    return fetch("http://localhost:3333/api/1.0.0/logout", {
        method: 'post',
        headers: {
          'X-Authorization': await AsyncStorage.getItem("whatsthat_session_token")
        }
      })
    .then(async(response) => {
        if (response.status === 200) {
          await AsyncStorage.removeItem("whatsthat_session_token")
          await AsyncStorage.removeItem("whatsthat_user_id")
          this.props.navigation.navigate("Login")
        } else if (response.status === 401) {
            console.log("Unauthorised");
            await AsyncStorage.removeItem("whatsthat_session_token")
            await AsyncStorage.removeItem("whatsthat_user_id")
            this.props.navigation.navigate("Login")
        } else if (response.status === 500) {
            console.log("Server error");
        }
    })
    .catch((error) => { 
        console.log(error);
      })
}

    
}


