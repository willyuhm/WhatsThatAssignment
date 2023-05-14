import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert, Picker } from 'react-native';
import styles from "./Styles/Styles.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddContact from '/Components/AddContact.js';

export default class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchQuery: '',
      searchIn: 'all',
      limit: 20,
      offset: 0,
      searchResults: [],
      isLoading: false,
    }

    this.addContactComponent = React.createRef();
  }

  viewContact = (user_id) => {
    this.props.navigation.navigate('ViewContact', { user_id });
  }

  render() {
    const { searchQuery, searchIn, limit, offset, searchResults, isLoading } = this.state;
  
    return (
      <View style={styles.container}>
        <Text>Search Page</Text>
        <Text style={styles.inputLabel}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ searchQuery: text })}
          value={searchQuery}
          placeholder='Search query...'
        />
  
        <Text style={styles.inputLabel}>Search for all users or your Contacts:</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={searchIn}
            onValueChange={(itemValue) => this.setState({ searchIn: itemValue })}
          >
            <Picker.Item label="All" value="all" />
            <Picker.Item label="Contacts" value="contacts" />
          </Picker>
        </View>
  
        <Text style={styles.inputLabel}>How many users you want to search:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ limit: text })}
          value={limit}
          placeholder='Limit...'
        />
  
        <Text style={styles.inputLabel}>Skip how many users:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ offset: text })}
          value={offset}
          placeholder='Offset...'
        />
  
        <Button
          title='Search'
          onPress={this.search}
        />
  
        {isLoading && <Text>Loading results...</Text>}
        {searchResults.map(result => (
          <View key={result.user_id}>
            <Text>{result.given_name} {result.family_name}</Text>
            <Button title="View Contact" onPress={() => this.viewContact(result.user_id)} />
          </View>
        ))}
      </View>
    );
  }

  search = async () => {
    const { searchQuery, searchIn, limit, offset } = this.state;
    this.setState({ isLoading: true });

    const queryParams = `q=${searchQuery}&search_in=${searchIn}&limit=${limit}&offset=${offset}`;
    const url = `http://localhost:3333/api/1.0.0/search?${queryParams}`;

    try {
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem("whatsthat_session_token")
        }
      });
      
      const responseJson = await response.json();
      
      this.setState({
        searchResults: responseJson,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
    }
  }
}
