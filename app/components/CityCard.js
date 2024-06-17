import {Image, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import fonts from '../config/fonts';

const CityCard = ({code, fontStyle, image, onPress, style, title}) => {
  return (
    <Pressable onPress={() => onPress(code)} style={[styles.container, style]}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={[styles.text, fontStyle]}>{title}</Text>
    </Pressable>
  );
};

export default CityCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.medium,
    borderRadius: 4,
    height: 128,
    justifyContent: 'space-around',
    width: 248,
  },
  image: {
    height: 64,
    width: 150,
  },
  text: {
    color: colors.text,
    fontFamily: fonts[500],
    fontSize: 20,
  },
});
