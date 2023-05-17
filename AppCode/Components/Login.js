import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from "./Styles/Styles.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: null,
      password: null,
      showPassword: false,
      errorMessage: null, 
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.errorMessage ? (
          <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        ) : null} 
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
          secureTextEntry={!this.state.showPassword}
        />
        <View style={styles.button}>
          <Button title="Log in" onPress={() => this.login()}/>
        </View>
        <Text style={styles.links} onPress={() => this.signup()}>Sign up here!</Text>
      </View>
      
    );
  }

  login = () => {
    const { navigation } = this.props;
    let to_send = {
      email: this.state.email,
      password: this.state.password
    };

    fetch('http://localhost:3333/api/1.0.0/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(to_send)
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('Success!');
        return response.json();
      } else if (response.status === 400) {
        throw new Error('Incorrect Email or Password');
      } else if (response.status === 500) {
        throw new Error('Server error');
      }
    })
    .then(async (rJson) => {
      console.log(rJson);
      try {
        await AsyncStorage.setItem("whatsthat_user_id", rJson.id)
        await AsyncStorage.setItem("whatsthat_session_token", rJson.token)
        this.props.navigation.navigate("MainScreen")
      } catch (error) {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      this.setState({ errorMessage: error.message });
      console.log(error);
    });
  }

  signup(){
    const { navigation } = this.props;
    this.props.navigation.navigate("Signup")
  }
}
