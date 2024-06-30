import {StyleSheet} from 'react-native';
import React from 'react';

import ImageComponent from './ImageComponent';

export default EventBanner = ({imageUrl, style}) => {
  return <ImageComponent imageUrl={imageUrl} style={[style, styles.image]} />;
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
    height: 130,
    width: 340,
  },
});
