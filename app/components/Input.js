import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import fonts from '../config/fonts';

const Input = ({label, placeholder, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        style={styles.input}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 50,
    width: '80%',
  },
  input: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
    color: colors.medium,
    fontFamily: fonts[500],
    fontSize: 14,
    height: 28,
    marginBottom: 0,
    marginTop: 'auto',
    padding: 0,
    paddingHorizontal: 10,
  },
  label: {
    color: colors.white,
    fontFamily: fonts[600],
    fontSize: 12,
    marginLeft: 10,
  },
});
