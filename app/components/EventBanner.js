import {Image, StyleSheet} from 'react-native';
import React from 'react';

export default EventBanner = ({imageUrl, style}) => {
  return (
    <Image
      resizeMode="contain"
      source={{uri: imageUrl}}
      style={[styles.image, style]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
    height: 130,
    width: 340,
  },
});
