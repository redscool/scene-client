import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import fonts from '../config/fonts';

const TextButton = ({title, style, onPress, fontStyle}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Text style={[styles.text, fontStyle]}>{title}</Text>
    </Pressable>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  text: {
    color: colors.primary,
    fontFamily: fonts[600],
    fontSize: 16,
  },
});
