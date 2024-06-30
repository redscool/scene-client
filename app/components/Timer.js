import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import fonts from '../config/fonts';

const Timer = ({fontStyle, style, time}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, fontStyle]}>{time}</Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.medium,
    borderRadius: 11.5,
    height: 25,
    justifyContent: 'center',
    width: 70,
  },
  text: {
    color: '#4386FA',
    fontFamily: fonts[600],
    fontSize: 14,
  },
});
