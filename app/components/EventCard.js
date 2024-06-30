import React from 'react';
import {Image, StyleSheet, Text, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../config/colors';
import fonts from '../config/fonts';
import Icon from '../Icons';
import {getAddress, getEventCardDateFormat, getFileUrl} from '../utils/misc';

export default EventCard = ({event, onPress, style}) => {
  if (!event) return;
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <LinearGradient
        colors={[colors.dark, colors.medium]}
        style={[styles.container, style]}>
        <Image source={{uri: getFileUrl(event.logo)}} style={styles.image} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{event.name}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {getEventCardDateFormat(event.startTime)}
          </Text>
        </View>
        <View style={styles.venueContainer}>
          <Icon name="location" color={colors.secondary} size={8} />
          <Text style={styles.venue}>{`${
            event.venueId.abbreviation
          }, ${getAddress(event.venueId.address)}`}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: 130,
    width: 100,
  },
  date: {
    color: colors.primary,
    fontFamily: fonts[600],
    fontSize: 10,
  },
  dateContainer: {
    height: 16,
    marginLeft: 8,
    width: '100%',
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 75,
    width: 100,
  },
  name: {
    color: colors.secondary,
    fontFamily: fonts[600],
    fontSize: 10,
  },
  nameContainer: {
    height: 14,
    marginLeft: 8,
    marginTop: 6,
    width: '100%',
  },
  venue: {
    color: colors.secondary,
    fontSize: 8,
    fontFamily: fonts[300],
    marginLeft: 4,
  },
  venueContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 10,
    marginLeft: 8,
  },
});
