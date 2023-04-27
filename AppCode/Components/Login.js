import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from "./Styles/Styles.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      is_loading: true,
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

        <Button
          title="Log in"
          onPress={() => this.login()}
        />
      </View>
      
    );
  }

  login = () => {
    const { navigation } = this.props;
    let to_send = {
      email: this.state.email,
      password: this.state.password
    };

    return fetch("http://localhost:3333/api/1.0.0/login", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(to_send)
    })
    .then((response) => {
      if (response.status === 200) {
        // Alert.alert("Successfully logged in");
        console.log("Success!");
        // navigation.navigate('Contacts');
        return response.json();
      } else if (response.status === 400) {
        console.log("Incorrect Email or Password");
      } else if (response.status === 500) {
        console.log("Server error");
      }
    })
    .then(async (rJson) => {
      console.log(rJson);
      try{
        await AsyncStorage.setItem("whatsthat_user_id", rJson.id)
        await AsyncStorage.setItem("whatsthat_session_token", rJson.token)

        // this.setState({"submitted": false});

        this.props.navigation.navigate("Contacts")
      }catch{
        throw "Something went wrong"
      }
    })
    .catch((error) => { 
      console.log(error);
    })
  }

}


