import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from "./Styles/Styles.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Chats extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      chats: []
    }
  }
  componentDidMount() {
    this.checkLoggedIn();
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
    this.contacts();
    console.log(this.contacts());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('whatsthat_session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  }
  
  render() {
    const { isLoading, chats } = this.state;
    console.log('Contacts:', contacts);

    if (isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading chats...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>

        {chats.map(chat => (
          <View key={chat.user_id}>
            <Text>{chat.name} {chat.last_name}</Text>
            <Button title="View Chat" onPress={() => this.viewContact(chat.user_id)} />
          </View>
        ))}

      </View>
    );
  }

  async chats(){
    return fetch("http://localhost:3333/api/1.0.0/chats", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem("whatsthat_session_token")
        }
      })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        contacts: responseJson
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }
}