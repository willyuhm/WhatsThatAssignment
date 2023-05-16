import React, { Component } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import styles from "./Styles/Styles.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RefreshableScreen from './RefreshableScreen.js';

export default class ViewBlocked extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      isLoading: true,
      blocked: []
    }
  }

  ViewBlockedUser = (user_id) => {
    this.props.navigation.navigate('ViewContact', { user_id });
  }

  componentDidMount() {
    this.blocked();
  }

  refreshBlocked = () => {
    this.setState({ isLoading: true }, () => {
      this.blocked();
    });
  }

  render() {
    const { isLoading, blocked } = this.state
    if (isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading Users...</Text>
        </View>
      );
    }

    return(
      <RefreshableScreen onRefresh={this.refreshBlocked}>
        <View style={styles.container}>
          {blocked.map(blocked => (
            <View key={blocked.user_id}>
              <Text>{blocked.first_name} {blocked.last_name}</Text>
              <Button title="View Contact" onPress={() => this.ViewBlockedUser(blocked.user_id)} />
            </View>
          ))}
        </View>
      </RefreshableScreen>
    )
  }

async blocked(){
    return fetch("http://localhost:3333/api/1.0.0/blocked", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem("whatsthat_session_token")
        },
      })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        blocked: responseJson
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }
}