import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import styles from "./Styles/Styles.js";

export default function Homescreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to WhatsThat, please sign up!</Text>
      <Text>If you already have an account then just login</Text>
      <Button
        title="Sign up"
        onPress={() => navigation.navigate('Signup')}
      />
      <Button
        title="Log in"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}
