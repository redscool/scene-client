import {StyleSheet, Pressable, View} from 'react-native';
import React from 'react';

import Icon from '../Icons';

const ShareButton = ({onPress, state, style}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.favouriteButton, style]}>
        <Icon color="#F96C90" name={'share'} size={28} />
      </View>
    </Pressable>
  );
};

export default ShareButton;

const styles = StyleSheet.create({
  favouriteButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
