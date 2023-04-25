import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from "./Styles/Styles.js";

export default class Signup extends Component {
  constructor(props){
    super(props);

    this.state = {
      first_name: null,
      last_name: null,
      email: null,
      password: null
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.promptText}>Sign up here!</Text>
        <Text style={styles.inputLabel}>First Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          onChangeText={first_name => this.setState({ first_name })}
          defaultValue={this.state.first_name}
        />

        <Text style={styles.inputLabel}>Last Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          onChangeText={last_name => this.setState({ last_name })}
          defaultValue={this.state.last_name}
        />

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


