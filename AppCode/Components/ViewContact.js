import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class ViewContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactInfo: null,
    };
  }

  componentDidMount() {
    this.viewContact();
  }

  viewContact = async () => {
    const { user_id } = this.props;
    try {
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
        }
      });

      if (response.status === 200) {
        const contactInfo = await response.json();
        this.setState({
          contactInfo
        });
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
  };

  render() {
    const { contactInfo } = this.state;

    if (!contactInfo) {
      return (
        <View>
          <Text>Loading contact information...</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>Contact Information:</Text>
        <Text>Name: {contactInfo.first_name} {contactInfo.last_name}</Text>
        <Text>Email: {contactInfo.email}</Text>
        {/* Render other contact details here */}
      </View>
    );
  }
}