import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {getMessageFormattedDateTime} from '../utils/misc';

const Message = ({messageObj}) => {
  const {message, createdAt, isUser} = messageObj;
  return (
    <View style={[styles.container, !isUser ? styles.support : null]}>
      {!isUser && <Text style={styles.sender}>{'Support'}</Text>}
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.time}>{getMessageFormattedDateTime(createdAt)}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    width: '70%',
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginLeft: 'auto',
    marginRight: 0,
  },
  message: {
    color: colors.secondary,
    fontFamily: fonts[400],
    fontSize: 10,
  },
  sender: {
    color: colors.secondary,
    fontFamily: fonts[700],
    fontSize: 12,
    marginBottom: 8,
  },
  support: {
    backgroundColor: colors.medium,
    marginLeft: 0,
    marginRight: 'auto',
  },
  time: {
    color: colors.placeholder,
    fontFamily: fonts[600],
    fontSize: 10,
    marginLeft: 'auto',
    marginRight: 0,
  },
});
