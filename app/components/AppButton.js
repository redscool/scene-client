import React from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';

import colors from '../config/colors';
import fonts from '../config/fonts';
import Icon from '../Icons';
import Loader from './Loader';

const AppButton = ({
  active = true,
  fontStyle,
  icon,
  iconColor,
  iconSize,
  onPress,
  solid,
  style,
  title,
}) => {
  return (
    <Pressable
      onPress={active ? onPress : () => {}}
      style={[
        styles.container,
        solid ? styles.solidButton : null,
        style,
        active ? null : styles.inactive,
      ]}>
      {!active ? <Loader style={styles.loader} /> : null}
      {icon && (
        <Icon
          color={iconColor ? iconColor : solid ? colors.medium : colors.primary}
          name={icon}
          size={iconSize}
          style={{marginRight: title ? 8 : 0}}
        />
      )}
      {title && (
        <Text
          style={[styles.text, fontStyle, solid ? null : styles.borderButton]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  borderButton: {
    color: colors.primary,
    fontFamily: fonts[300],
  },
  container: {
    alignItems: 'center',
    borderColor: colors.primary,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    width: 140,
  },
  inactive: {
    opacity: 0.5,
  },
  loader: {
    width: 80,
    height: 80,
    zIndex: 2,
    position: 'absolute',
  },
  solidButton: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.medium,
    fontSize: 20,
    fontFamily: fonts[700],
  },
});
