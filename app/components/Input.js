import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import fonts from '../config/fonts';

const Input = ({
  label,
  placeholder,
  secureTextEntry,
  setState,
  state,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        onChangeText={text => setState(text)}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        value={state}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderColor: colors.secondary,
    height: 50,
    width: '80%',
  },
  label: {
    color: colors.text,
    fontFamily: fonts[600],
    fontSize: 12,
    marginLeft: 10,
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
});
