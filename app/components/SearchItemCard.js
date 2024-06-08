import {FlatList, Image, StyleSheet, Text, Pressable, View} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import fonts from '../config/fonts';
import Icon from '../Icons';
import TagCard from './TagCard';
import {getAddress, getEventCardDateFormat, getFileUrl} from '../utils/misc';

const SearchItemCard = ({event, onPress, style}) => {
  const date = getEventCardDateFormat(event.startTime);
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Image
        source={{uri: getFileUrl(event.bannerImage)}}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{event.name}</Text>
        {event.startTime && <Text style={styles.date}>{date}</Text>}
        <FlatList
          data={event.tags}
          keyExtractor={item => item}
          nestedScrollEnabled
          numColumns={2}
          renderItem={({item, index}) => (
            <TagCard
              key={index}
              style={{margin: 2, marginLeft: 0, marginRight: 6}}
              tag={item}
            />
          )}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{marginVertical: 10}}
        />
        <View style={styles.abbreviationContainer}>
          <Text style={styles.abbreviation}>{event.abbreviation}</Text>
        </View>
        {event.address && (
          <View style={styles.venueContainer}>
            <Icon color={colors.secondary} name="location" size={8} />
            <Text style={styles.venue}>{getAddress(event.address)}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default SearchItemCard;

const styles = StyleSheet.create({
  abbreviation: {
    color: colors.secondary,
    fontFamily: fonts[600],
    fontSize: 10,
  },
  abbreviationContainer: {
    height: 12,
    width: '100%',
  },
  container: {
    backgroundColor: colors.medium,
    borderRadius: 8,
    flexDirection: 'row',
    height: 130,
    width: 320,
  },
  date: {
    color: colors.primary,
    fontFamily: fonts[600],
    fontSize: 10,
    marginTop: 10,
  },
  detailsContainer: {
    height: '100%',
    padding: 10,
    width: '50%',
  },
  image: {
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    height: 130,
    width: '50%',
  },
  name: {
    color: colors.text,
    fontFamily: fonts[600],
    fontSize: 16,
  },
  venue: {
    color: colors.secondary,
    fontFamily: fonts[300],
    fontSize: 10,
    marginLeft: 4,
  },
  venueContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 12,
    marginTop: 'auto',
    marginBottom: 1,
  },
});
