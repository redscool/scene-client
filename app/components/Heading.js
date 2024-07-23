import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import fonts from '../config/fonts';

const Heading = ({fontStyle, heading, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, fontStyle]}>{heading}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  text: {
    color: colors.text,
    fontFamily: fonts[600],
    fontSize: 16,
  },
});
