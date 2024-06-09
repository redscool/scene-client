import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import fonts from '../config/fonts';

const NormalText = ({fontStyle, style, text}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, fontStyle]}>{text}</Text>
    </View>
  );
};

export default NormalText;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  text: {
    color: colors.placeholder,
    fontFamily: fonts[600],
    fontSize: 12,
  },
});
