import {Image, StyleSheet, Text, Pressable, View} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import fonts from '../config/fonts';
import {getFileUrl} from '../utils/misc';

export default CollegeCard = ({college, onPress, style}) => {
  if (!college) return;
  return (
    <Pressable
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, style]}>
      <Image
        resizeMode="contain"
        source={{uri: getFileUrl(college.logo)}}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{college.abbreviation}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 130,
  },
  image: {
    alignSelf: 'center',
    height: 90,
    width: 100,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontFamily: fonts[600],
  },
  titleContainer: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: '100%',
  },
});
