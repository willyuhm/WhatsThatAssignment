import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from "./Styles/Styles.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Contacts extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      contacts: []
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

  viewContact = (user_id) => {
    this.props.navigation.navigate('ViewContact', { user_id });
  }
  
  render() {
    const { isLoading, contacts } = this.state;
    console.log('Contacts:', contacts);

    if (isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading contacts...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>This is the Contacts page</Text>
        <Text>If you're seeing this you logged in!</Text>


        {contacts.map(contact => (
          <View key={contact.user_id}>
            <Text>{contact.first_name} {contact.last_name}</Text>
            <Button title="View Contact" onPress={() => this.viewContact(contact.user_id)} />
          </View>
        ))}

      </View>
    );
  }

  async contacts(){
    return fetch("http://localhost:3333/api/1.0.0/contacts", {
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