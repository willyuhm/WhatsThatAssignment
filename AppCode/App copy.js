import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
    <NavigationContainer>
      <View style={styles.container}>
      <Text>Welcome to WhatsThat, please signup!</Text>
      <Text>If you already have an account then just login</Text>
      <StatusBar style="auto" />
      </View>
    </NavigationContainer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App
