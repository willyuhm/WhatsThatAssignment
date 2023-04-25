import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from "./Styles/Styles.js";

export default class Signup extends Component {
  constructor(props){
    super(props);

    this.state = {
      is_loading: true,
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
          value={this.state.first_name}
        />

        <Text style={styles.inputLabel}>Last Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          onChangeText={last_name => this.setState({ last_name })}
          value={this.state.last_name}
        />

        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        <Text style={styles.inputLabel}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        <Button
          title="Sign up"
          onPress={() => this.signup()}
        />
      </View>
      
    );
  }

  signup(){
    let to_send = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };

    return fetch("http://localhost:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(to_send)
    })
    .then((response) => {
      Alert.alert("Successfully signed up");
      // this.getData();
    })
    .catch((error) => { 
      console.log(error);
    })
  }

}


