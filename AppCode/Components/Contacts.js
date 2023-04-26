import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from "./Styles/Styles.js";

export default class Contacts extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Contacts page</Text>
        <Text>If you're seeing this you logged in!</Text>
      </View>
    );
  }

}


