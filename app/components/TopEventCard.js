import React from 'react';
import {Image, StyleSheet, Text, Pressable, View} from 'react-native';

import colors from '../config/colors';
import Icon from '../Icons';
import fonts from '../config/fonts';
import {
  getFileUrl,
  getStateFromAddress,
  getTopEventFormattedDateTime,
} from '../utils/misc';

export default TopEventCard = ({event, onPress, style}) => {
  if (!event) return;
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Image
        source={{uri: getFileUrl(event?.bannerImage)}}
        style={styles.banner}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.venueContainer}>
          <Text style={styles.name}>{event?.name}</Text>
          <Text style={styles.venue}>{`${
            event.venueId?.abbreviation
          }, ${getStateFromAddress(event.venueId?.address)}`}</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <Icon color={colors.text} name="calendar" size={16} />
          <Text style={styles.date}>
            {getTopEventFormattedDateTime(event.startTime)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 100,
    width: '100%',
  },
  blurView: {
    height: 30,
    width: '100%',
  },
  container: {
    borderRadius: 12,
    height: 130,
    overflow: 'hidden',
    width: '70%',
  },
  date: {
    color: colors.text,
    fontSize: 11,
    fontFamily: fonts[500],
    marginLeft: 10,
  },
  dateTimeContainer: {
    alignItems: 'center',
    flex: 1.4,
    flexDirection: 'row',
  },
  detailsContainer: {
    backgroundColor: colors.glass,
    flexDirection: 'row',
    height: 30,
    width: '100%',
  },
  name: {
    color: colors.text,
    fontSize: 12,
    fontFamily: fonts[700],
  },
  venue: {
    color: colors.text,
    fontSize: 10,
    fontFamily: fonts[300],
  },
  venueContainer: {
    flex: 1,
    paddingLeft: 25,
  },
});
