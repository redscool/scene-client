import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import fonts from '../config/fonts';
import Message from '../components/Message';
import Input from '../components/Input';
import Icon from '../Icons';
import colors from '../config/colors';

const ChatSupport = () => {
  const messages = [
    {
      id: '1',
      sender: 'user',
      message:
        'Pellentesque pharetra libero purus, vitae sodales felis malesuada vel. Suspendisse vitae faucibus purus. Suspendisse pretium, lectus pharetra dictum ornare, dolor velit efficitur lacusa malesuada mauris nulla vel est.',
      time: '7 Jul, 3:59 AM',
    },
    {
      id: '2',
      sender: 'Support',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo enim ante, quis tristique nunc rhoncus iaculis. Morbi enim mauris.',
      time: '7 Jul, 4:09 AM',
    },
    {
      id: '3',
      sender: 'user',
      message:
        'Pellentesque pharetra libero purus, vitae sodales felis malesuada vel.',
      time: '7 Jul, 4:10 AM',
    },
    {
      id: '4',
      sender: 'user',
      message: 'dolor velit efficitur lacusa malesuada mauris nulla vel est.',
      time: '7 Jul, 4:13 AM',
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Please raise your concerns and queries here.
      </Text>
      <FlatList
        data={messages}
        renderItem={({item}) => <Message messageObj={item} />}
      />
      <View style={styles.bottomContainer}>
        <Input placeholder={'Say something good...'} />
        <Pressable style={styles.button}>
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
