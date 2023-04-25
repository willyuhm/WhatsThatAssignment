import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert, Stylesheet } from 'react-native';
import styles from "./Styles/Styles.js";

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: null,
      password: null
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.promptText}>Log in here!</Text>
        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={email => this.setState({ email })}
          defaultValue={this.state.email}
        />

        <Text style={styles.inputLabel}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={password => this.setState({ password })}
          defaultValue={this.state.password}
        />
      </View>
      
    );
  }

}


