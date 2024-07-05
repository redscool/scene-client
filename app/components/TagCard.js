import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import fonts from '../config/fonts';
import useAppConfig from '../../context/AppConfig';

const TagCard = ({fontStyle, style, tag}) => {
  const {allEventTags} = useAppConfig();
  return (
    <View
      style={[
        {backgroundColor: allEventTags[tag]?.color},
        styles.container,
        style,
      ]}>
      <Text style={[styles.text, fontStyle]}>{allEventTags[tag]?.title}</Text>
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
