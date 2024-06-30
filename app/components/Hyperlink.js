import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

import fonts from '../config/fonts';

const Hyperlink = ({fontStyle, label, onPress, style}) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.text, fontStyle]}>{label}</Text>
    </Pressable>
  );
};

export default Hyperlink;

const styles = StyleSheet.create({
  text: {
    color: colors.primary,
    fontFamily: fonts[600],
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  container: {
    height: 18,
    justifyContent: 'center',
    width: '100%',
  },
});
