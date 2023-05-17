import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from "./Styles/Styles.js";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      errorMessage: null
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.errorMessage ? (
          <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        ) : null}
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
        <Text style={styles.inputLabel}>
          (Must be 8 characters long, contain 1 uppercase, 1 number, and 1 special character)
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
        />
        <View style={styles.button}>
          <Button title="Sign up" onPress={this.signup} />
        </View>
      </View>
    );
  }

  signup = async () => {
    const { navigation } = this.props;
    const { first_name, last_name, email, password } = this.state;
    const toSend = {
      first_name: first_name,
      last_name: last_name,
      email,
      password
    };

    const PASSWORD_REGX = new RegExp(
      '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$'
    );

    if (!PASSWORD_REGX.test(password)) {
      this.setState({
        errorMessage:
          'Password must be 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 special character (!@#$&*)'
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/api/1.0.0/user", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toSend)
      });

      if (response.status === 200) {
        this.props.navigation.navigate('Login');
      } else if (response.status === 400) {
        throw new Error('Bad Request');
      } else if (response.status === 500) {
        throw new Error('Server Error');
      }
    } catch (error) {
      this.setState({ errorMessage: error.message });
      console.log(error);
    }
  };
}