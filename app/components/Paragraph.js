import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import fonts from '../config/fonts';

const Paragraph = ({fontStyle, paragraph, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, fontStyle]}>{paragraph}</Text>
    </View>
  );
};

export default Paragraph;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
  },
  text: {
    color: colors.placeholder,
    fontSize: 12,
    fontFamily: fonts[400],
  },
});
