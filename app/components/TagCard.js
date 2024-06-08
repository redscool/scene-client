import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import fonts from '../config/fonts';
import useConfig from '../../context/ConfigContext';

const TagCard = ({fontStyle, style, tag}) => {
  const {getAllEventTags} = useConfig();
  const tagsMap = getAllEventTags();
  return (
    <View
      style={[{backgroundColor: tagsMap[tag]?.color}, styles.container, style]}>
      <Text style={[styles.text, fontStyle]}>{tagsMap[tag].title}</Text>
    </View>
  );
};

export default TagCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10.5,
    justifyContent: 'center',
    height: 12,
    width: 62,
  },
  text: {
    color: '#1E1E1E',
    fontFamily: fonts[600],
    fontSize: 8,
  },
});
