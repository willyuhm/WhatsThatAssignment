import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles/Styles';

export default class AddContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  render() {
    return (
      <View style={styles.button}>
        <Button title="Add Contact" onPress={this.addContact} />
      </View>
    );
  }

addContact = async () => {
  const { user_id } = this.props;

  try {
    this.setState({ isLoading: true });

    const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
      }
    });

    if (response.status === 200) {
      console.log('Success!');
    } else if (response.status === 400) {
      console.log("You can't add yourself");
    } else if (response.status === 401) {
      console.log('Unauthorized');
    } else if (response.status === 404) {
      console.log('User not found');
    } else if (response.status === 500) {
      console.log('Server Error');
    }

    this.setState({ isLoading: false });
  } catch (error) {
    console.log(error);
    this.setState({ isLoading: false });
  }
}
}
