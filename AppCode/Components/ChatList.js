import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from "./Styles/Styles.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ChatList extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      chats: [],
      showPopUp: false,
      newChatName: '',
    }
    this.startChat = this.startChat.bind(this);
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

  togglePopup = () => {
    this.setState((prevState) => ({
      showPopup: !prevState.showPopup,
    }));
  };
  
  render() {
    const { isLoading, chats, showPopup, newChatName } = this.state;

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
          <View key={chat.chat_id}>
            <Text>{chat.name}</Text>
            <Button title='View Chat' onPress={() => this.viewChat(chat.chat_id)} />
          </View>
        ))}
        {showPopup && (
        <View style={styles.popupContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter chat name"
            onChangeText={(text) => this.setState({ newChatName: text })}
            value={newChatName}
          />
          <Button title="Create" onPress={this.startChat} />
          <Button title="Cancel" onPress={this.togglePopup} />
        </View>
      )}

      <Button title="Start a new chat" onPress={this.togglePopup} />
      </View>
    );
  }

  async chats(){
    return fetch('http://localhost:3333/api/1.0.0/chat', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
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
    const { newChatName } = this.state;
    return fetch('http://localhost:3333/api/1.0.0/chat', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
        },
        body: JSON.stringify({ name: newChatName })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState((prevState) => ({
          chats: [...prevState.chats, responseJson],
          showPopup: false,
          newChatName: '',
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

}