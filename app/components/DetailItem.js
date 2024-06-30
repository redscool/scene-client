import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import fonts from '../config/fonts';
import Icon from '../Icons';

const DetailItem = ({iconName, style, value}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.icon}>
        <Icon name={iconName} color={colors.text} size={10} />
      </View>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

export default DetailItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 16,
    width: '100%',
  },
  icon:{
    alignItems: "center",
    alignSelf: "flex-start",
    height: 16,
    justifyContent: "center"
  },
  text: {
    color: colors.placeholder,
    fontSize: 12,
    fontFamily: fonts[400],
    marginLeft: 10,
  },
});
