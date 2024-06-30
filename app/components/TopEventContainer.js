import React from 'react';
import {StyleSheet, View} from 'react-native';

import colors from '../config/colors';
import SkyImage from './SkyImage';
import TopEventCard from './TopEventCard';

export default TopEventContainer = ({event, onPress}) => {
  return (
    <View style={styles.container}>
      <SkyImage />
      <TopEventCard event={event} onPress={onPress} style={styles.banner} />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 10,
  },
  container: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.medium,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    height: 160,
    width: '100%',
  },
});
