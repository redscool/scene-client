import {StyleSheet, Pressable, View} from 'react-native';
import React from 'react';

import Icon from '../Icons';

const FavouriteButton = ({onPress, state, style}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.favouriteButton, style]}>
        <Icon
          color="#F96C90"
          name={state ? 'favouriteSolid' : 'favourite'}
          size={28}
        />
      </View>
    </Pressable>
  );
};

export default FavouriteButton;

const styles = StyleSheet.create({
  favouriteButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
