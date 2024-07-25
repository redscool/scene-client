import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import colors from '../config/colors';
import fonts from '../config/fonts';

export default SectionHeading = ({style, title, fontStyle}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.line} />
      <View style={styles.titleContainer}>
        <Text style={[fontStyle]}>{title}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  line: {
    backgroundColor: colors.grey,
    height: 2,
    width: '20%',
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontFamily: fonts[300],
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
