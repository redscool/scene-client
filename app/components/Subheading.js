import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import fonts from '../config/fonts';

const Subheading = ({fontStyle, style, subheading}) => {
  return (
    <View style={[style, styles.container]}>
      <Text style={[styles.text, fontStyle]}>{subheading}</Text>
    </View>
  );
};

export default Subheading;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 20,
    justifyContent: 'center',
    marginTop: 12,
    width: '90%',
  },
  text: {
    color: colors.text,
    fontFamily: fonts[500],
    fontSize: 14,
  },
});
