import React, { Component } from 'react';
import { Text, View, Button, Modal, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles/Styles';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: null,
            messageInput: '',
            isModalVisible: false,
            isEditing: false,
            newChatName: '',
        };
    }

    componentDidMount() {
        const { chat_id } = this.props.route.params;
        this.fetchChat(chat_id);
        this.getContactList().then((contacts) => {
            this.setState({ contactList: contacts });
        });
    }

    handleInputChange = (text) => {
        this.setState({ messageInput: text });
    };

    toggleModal = () => {
        this.setState((prevState) => ({
            isModalVisible: !prevState.isModalVisible,
        }));
    };
    
    toggleEditing = () => {
        const { isEditing, chat } = this.state;

        if (isEditing) {
            this.updateChat(chat.chat_id);
        } else {
            this.setState({ isEditing: true, newChatName: chat.name });
        }
    };

    handleChatNameChange = (text) => {
        this.setState({ newChatName: text });
    };

    renderChatDetails = () => {
        const { chat, contactList, isEditing, newChatName } = this.state;

        return (
            <ScrollView contentContainerStyle={styles.container}>
                {isEditing ? (
                    <TextInput
                        style={styles.chatHeaderInput}
                        value={newChatName}
                        onChangeText={this.handleChatNameChange}
                    />
                ) : (
                    <Text style={styles.chatHeader}>{chat.name}</Text>
                )}
                <View style={styles.button}>
                    <Button
                        title={isEditing ? 'Done' : 'Edit Name'}
                        onPress={this.toggleEditing}
                    />
                </View>
                <Text>Chat Author:</Text>
                <Text>
                    {chat.creator.first_name} {chat.creator.last_name}
                </Text>
                <Text>Members:</Text>
                {chat.members.map((member, index) => (
                    <Text key={index}>
                        {member.first_name} {member.last_name} <View style={styles.button}> <Button title='Kick' onPress={() => this.removeUserFromChat(member.user_id)}/> </View>
                    </Text> 
                ))}
                <View style={styles.button}>
                    <Button title='Close' onPress={this.toggleModal} />
                </View>
                <View>
                    <Text style={styles.chatHeader}>Want to add your Contacts?</Text>
                    {contactList.map((contact, index) => (
                        <View key={index}>
                            <Text>
                                {contact.first_name} {contact.last_name}
                            </Text>
                            <View style={styles.button}>
                                <Button title='Add' onPress={() => this.addUserToChat(contact.user_id)}/>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        );
    };

    render() {
        const { chat, messageInput, isModalVisible } = this.state;

        if (!chat) {
            return (
                <View>
                    <Text>Loading chat...</Text>
                </View>
            );
        }

        const reversedMessages = [...chat.messages].reverse();

        return (
            <View style={styles.chatContainer}>
                <Text style={styles.chatHeader}>{chat.name}</Text>
                <View style={styles.button}>
                    <Button title='Chat Details' onPress={this.toggleModal} />
                </View>
                {reversedMessages.map((message, index) => (
                    <View style={styles.message} key={index}>
                        <Text style={styles.author}>
                            {message.author.first_name} {message.author.last_name}
                        </Text>
                        <Text>{message.message}</Text>
                        <Text>Timestamp: {new Date(message.timestamp * 1000).toLocaleString()}</Text>
                        <View style={styles.button}>
                            <Button title='Delete' onPress={this.deleteChat(message.message_id)}/>
                        </View>
                    </View>
                ))}
                <TextInput
                    style={styles.sendMessage}
                    placeholder='Enter Message'
                    value={messageInput}
                    onChangeText={this.handleInputChange}
                />
                <View style={styles.button}>
                    <Button title='Send Message' onPress={this.sendChat} />
                </View>
                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={this.toggleModal}
                >
                    {this.renderChatDetails()}
                </Modal>
            </View>
        );
    }
    fetchChat = async (chat_id) => {
        try {
            const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
                }
            });

            if (response.status === 200) {
                const chat = await response.json();
                this.setState({ chat });
            } else if (response.status === 401) {
                console.log('Unauthorized');
            } else if (response.status === 403) {
                console.log('Forbidden')
            } else if (response.status === 404) {
                console.log('Chat not found');
            } else if (response.status === 500) {
                console.log('Server Error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    sendChat = async () => {
        const { chat, messageInput } = this.state;
        const { chat_id } = this.props.route.params;

        const to_send = {
            message: messageInput
        };

        try {
            const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}/message`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
                },
                body: JSON.stringify(to_send)
            });

            console.log('Response:', response);

            if (response.status === 200) {
                const updatedChat = await response.json();
                this.setState({ chat: updatedChat, messageInput: '' });
            } else if (response.status === 401) {
                console.log('Unauthorized');
            } else if (response.status === 403) {
                console.log('Forbidden')
            } else if (response.status === 404) {
                console.log('Chat not found');
            } else if (response.status === 500) {
                console.log('Server Error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    addUserToChat = async (user_id) => {
        const { chat_id } = this.props.route.params;

        try {
            const response = await fetch(
                `http://localhost:3333/api/1.0.0/chat/${chat_id}/user/${user_id}`,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
                    }
                }
            );

            if (response.status === 200) {
                const updatedChat = await response.json();
                this.setState({ chat: updatedChat });
            } else if (response.status === 401) {
                console.log('Unauthorized');
            } else if (response.status === 403) {
                console.log('Forbidden');
            } else if (response.status === 404) {
                console.log('Chat not found');
            } else if (response.status === 500) {
                console.log('Server Error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    removeUserFromChat = async (user_id) => {
        const { chat_id } = this.props.route.params;

        try {
            const response = await fetch(
                `http://localhost:3333/api/1.0.0/chat/${chat_id}/user/${user_id}`,
                {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
                    }
                }
            );

            if (response.status === 200) {
                const updatedChat = await response.json();
                this.setState({ chat: updatedChat });
            } else if (response.status === 401) {
                console.log('Unauthorized');
            } else if (response.status === 403) {
                console.log('Forbidden');
            } else if (response.status === 404) {
                console.log('Chat not found');
            } else if (response.status === 500) {
                console.log('Server Error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    getContactList = async () => {
        try {
            const response = await fetch('http://localhost:3333/api/1.0.0/contacts', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
                }
            });

            if (response.status === 200) {
                const contacts = await response.json();
                return contacts;
            } else if (response.status === 401) {
                console.log('Unauthorized');
            } else if (response.status === 500) {
                console.log('Server Error');
            }
        } catch (error) {
            console.log(error);
        }

        return [];
    };

    deleteChat = async (message_id) => {
        const { chat_id } = this.props.route.params;

        try {
            const response = await fetch(
                `http://localhost:3333/api/1.0.0/chat/${chat_id}/message/${message_id}`,
                {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
                    }
                }
            );

            if (response.status === 200) {
                const updatedChat = await response.json();
                this.setState({ chat: updatedChat });
            } else if (response.status === 401) {
                console.log('Unauthorized');
            } else if (response.status === 403) {
                console.log('Forbidden');
            } else if (response.status === 404) {
                console.log('Message not found');
            } else if (response.status === 500) {
                console.log('Server Error');
            }
        } catch (error) {
            console.log(error);
        }
    };   
    
    updateChat = async (chat_id) => {
        const { newChatName } = this.state;

        try {
            const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}`, {
                method: 'patch',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token')
                },
                body: JSON.stringify({ name: newChatName }) // Include the new chat name in the request body
            });

            if (response.status === 200) {
                const chat = await response.json();
                this.setState({ chat, isEditing: false }); // Update the chat and exit editing mode
            } else if (response.status === 401) {
                console.log('Unauthorized');
            } else if (response.status === 403) {
                console.log('Forbidden')
            } else if (response.status === 404) {
                console.log('Chat not found');
            } else if (response.status === 500) {
                console.log('Server Error');
            }
        } catch (error) {
            console.log(error);
        }
    }
}