import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from "./Styles/Styles.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ChatList extends Component {
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
    this.chats();
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

  viewChat = async (chat_id) => {
    this.props.navigation.navigate('Chat', { chat_id: chat_id});
  }
  
  render() {
    const { isLoading, chats } = this.state;

    if (isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading chats...</Text>
          <Button
            title="New Chat"
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>

        {chats.map(chat => (
          <View key={chat.chat_id}>
            <Text>{chat.name}</Text>
            <Button title="View Chat" onPress={() => this.viewChat(chat.chat_id)} />
          </View>
        ))}

      </View>
    );
  }

  async chats(){
    return fetch("http://localhost:3333/api/1.0.0/chat", {
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
        chats: responseJson
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  async startChat(){
    return fetch("http://localhost:3333/api/1.0.0/chat", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem("whatsthat_session_token")
        }
      })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({

        chats: responseJson
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

}