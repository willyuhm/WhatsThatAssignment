import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./Styles/Styles";

export default class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null,
      isEditing: false,
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    try {
      const user_id = await AsyncStorage.getItem('whatsthat_user_id');
      this.viewUser(user_id);
    } catch (error) {
      console.log(error);
    }
  }

  viewBlockedList = (user_id) => {
    this.props.navigation.navigate('Blocked Contacts', { user_id });
  }

  toggleEditing = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  };
  
  handleInputChange = (field, value) => {
    this.setState((prevState) => ({
      contact: {
        ...prevState.contact,
        [field]: value,
      },
    }));
  };

  render() {
    const { contact, isEditing } = this.state;

    if (!contact) {
      return (
        <View>
          <Text>Loading profile...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Your Details:</Text>
        {isEditing ? (
          <>
            <TextInput
              value={contact.first_name}
              onChangeText={(text) => this.handleInputChange('first_name', text)}
            />
            <TextInput
              value={contact.last_name}
              onChangeText={(text) => this.handleInputChange('last_name', text)}
            />
            <TextInput
              value={contact.email}
              onChangeText={(text) => this.handleInputChange('email', text)}
            />
          </>
        ) : (
          <>
            <Text>Your Name: {contact.first_name} {contact.last_name}</Text>
            <Text>Email: {contact.email}</Text>
          </>
        )}
        {isEditing ? (
          <View style={styles.button}>
            <Button title='Update Profile' onPress={this.updateUser} />
          </View>
        ) : (
          <View style={styles.button}>
            <Button title='Edit Profile' onPress={this.toggleEditing} />
          </View>
        )}
        <View style={styles.button}>
          <Button title='Log out' onPress={() => this.logout()} />
        </View>
        <View style={styles.button}>
          <Button title='Blocked Users' onPress={() => this.viewBlockedList(contact.user_id)} />
        </View>
      </View>
    );
  }

  viewUser = async (user_id) => {
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

  updateUser = async () => {
    const { contact } = this.state;
    const { user_id } = contact;
    try {
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}`, {
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
        }
      });

      if (response.status === 200) {
        contact = await response.json();
        this.setState({ contact });
        this.toggleEditing();
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

  async logout() {
    const { navigation } = this.props;
    console.log('Logout')
    return fetch('http://localhost:3333/api/1.0.0/logout', {
      method: 'post',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
      }
    })
      .then(async (response) => {
        if (response.status === 200) {
          await AsyncStorage.removeItem('whatsthat_session_token')
          await AsyncStorage.removeItem('whatsthat_user_id')
          this.props.navigation.navigate('Login')
        } else if (response.status === 401) {
          console.log('Unauthorised');
          await AsyncStorage.removeItem('whatsthat_session_token')
          await AsyncStorage.removeItem('whatsthat_user_id')
          this.props.navigation.navigate('Login')
        } else if (response.status === 500) {
          console.log('Server error');
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
}