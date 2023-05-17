import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./Styles/Styles";
import AddContact from '/Components/AddContact.js';
import DeleteContact from '/Components/DeleteContact';
import BlockContact from '/Components/BlockContact';
import UnblockContact from '/Components/UnblockContact';


export default class ViewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null,
    };
  }

  componentDidMount() {
    const { user_id } = this.props.route.params;
    this.viewContact(user_id);
  }

  render() {
    const { contact } = this.state;

    if (!contact) {
      return (
        <View>
          <Text>Loading contact...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Contact Details:</Text>
        <Text>First Name: {contact.first_name}</Text>
        <Text>Last Name: {contact.last_name}</Text>
        <AddContact user_id={contact.user_id} key={`add-contact-${contact.user_id}`} />
        <DeleteContact user_id={contact.user_id} key={`delere-contact-${contact.user_id}`} />
        <BlockContact user_id={contact.user_id} key={`block-contact-${contact.user_id}`} />
        <UnblockContact user_id={contact.user_id} key={`unblock-contact-${contact.user_id}`} />
      </View>
    );
  }

  viewContact = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
        }
      });

      if (response.status === 200) {
        const contact = await response.json();
        this.setState({ contact });
      } else if (response.status === 401) {
        console.log('Unauthorized');
      } else if (response.status === 404) {
        console.log('User not found');
      } else if (response.status === 500) {
        console.log('Server Error');
      }
    } catch (error) {
      console.log(error);
    }
  }
}