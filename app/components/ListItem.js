import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../config/colors';
import fonts from '../config/fonts';
import Icon from '../Icons';

const ListItem = ({fontStyle, gradient, icon, onPress, value, style}) => {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={[colors.medium, gradient ? colors.grey : colors.medium]}
        end={{x: 1, y: 0}}
        start={{x: 0, y: 0}}
        style={[styles.container, style]}>
        <Icon
          color={colors.text}
          name={icon}
          size={22}
          style={{marginHorizontal: 10}}
        />
        <Text style={[styles.text, fontStyle]}>{value}</Text>
        <Icon
          color={colors.text}
          name="chevronRight"
          size={12}
          style={{marginRight: 20, marginLeft: 'auto'}}
        />
      </LinearGradient>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    height: 48,
    width: '90%',
  },
  text: {
    color: colors.text,
    fontFamily: fonts[400],
    fontSize: 20,
    marginLeft: 10,
    width: '60%',
  },
});
