import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import fonts from '../config/fonts';
import Message from '../components/Message';
import Input from '../components/Input';
import Icon from '../Icons';
import colors from '../config/colors';
import {showToast} from '../components/widgets/toast';
import useService from '../context/ServiceContext';
import useChat from '../context/ChatContext';

const ChatSupport = () => {
  const {requestWithAccessToken} = useService();

  const {
    supportMessages: messages,
    getSupportMessages: getMessages,
    addSupportMessage: addMessage,
  } = useChat();

  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      const dateObj = new Date();
      const createdAt = dateObj.getTime();
      await requestWithAccessToken('post', '/api/app/help/sendMessage', {
        message,
      });
      await addMessage({
        isUser: true,
        message,
        _id: Math.random().toString(),
        createdAt,
      });
    } catch (e) {
      // TODO: error handling
      showToast('Something went wrong.');
    }
    setMessage('');
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <View style={styles.container}>
      {messages.length == 0 ? (
        <Text style={styles.title}>
          Please raise your concerns and queries here.
        </Text>
      ) : (
        <FlatList
          data={messages}
          inverted
          contentContainerStyle={{flexDirection: 'column-reverse'}}
          renderItem={({item}) => <Message messageObj={item} />}
        />
      )}
      <View style={styles.bottomContainer}>
        <Input
          setState={setMessage}
          state={message}
          placeholder={'Say something good...'}
        />
        <Pressable style={styles.button} onPress={handleSendMessage}>
          <Icon name={'send'} color={colors.primary} size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatSupport;

const styles = StyleSheet.create({
  bottomContainer: {
    marginBottom: 24,
    flexDirection: 'row',
    borderWidth: 1,
  },
  button: {
    width: 32,
    height: 32,
    backgroundColor: colors.glass,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 0,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontFamily: fonts[400],
    fontSize: 12,
  },
});
