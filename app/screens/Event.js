import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppButton from '../components/AppButton';
import Carousel from '../components/Carousel';
import colors from '../config/colors';
import DetailItem from '../components/DetailItem';
import EventBanner from '../components/EventBanner';
import FavouriteButton from '../components/FavouriteButton';
import {
  convertTimeToHHMMFormat,
  getAddress,
  getFileUrl,
  getTopEventFormattedDateTime,
} from '../utils/misc';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import Subheading from '../components/Subheading';
import routes from '../navigation/routes';
import useService from '../../context/ServiceContext';
import TextButton from '../components/TextButton';
import fonts from '../config/fonts';

const Event = ({route, navigation}) => {
  const {request} = useService();
  const {navigate} = navigation;

  const [event, setEvent] = useState();

  const init = async () => {
    const tEvent = route.params;
    if (!tEvent._id) {
      const res = await request('get', '/api/app/event', {eventId: tEvent.id});
      console.log(res);
      setEvent(res);
    } else setEvent(tEvent);
  };

  const handleViewMap = () => {
    const {lat, lng} = event?.venueId?.location;
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lng}`;
    const label = event.venueId?.abbreviation;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  useEffect(() => {
    init();
  }, []);

  const [state, setState] = useState(false);

  return (
    <>
      <View style={styles.bottomContainer}>
        <AppButton
          onPress={() => navigate(routes.CHECKOUT)}
          solid
          style={styles.registerButton}
          fontStyle={styles.registerButtonFontStyle}
          title="Register"
        />
        <FavouriteButton
          onPress={() => setState(!state)}
          state={state}
          style={styles.favouriteButton}
        />
      </View>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {event && (
          <EventBanner
            imageUrl={getFileUrl(event?.bannerImage)}
            style={styles.eventBanner}
          />
        )}
        <Heading heading={event?.name} />
        <View style={styles.detailsContainer}>
          <DetailItem
            iconName="calendar"
            style={{marginBottom: 6}}
            value={getTopEventFormattedDateTime(event?.startTime, false)}
          />
          <DetailItem
            iconName="timer"
            value={`${convertTimeToHHMMFormat(
              new Date(event?.startTime),
            )} - ${convertTimeToHHMMFormat(new Date(event?.endTime))}`}
            style={{marginBottom: 6}}
          />
          <DetailItem
            iconName="location"
            value={`${event?.venueId?.abbreviation}, ${getAddress(
              event?.venueId?.address,
            )}`}
            style={{marginBottom: 6}}
          />
          <TextButton
            fontStyle={{
              fontSize: 12,
              fontFamily: fonts[600],
              textDecorationLine: 'underline',
            }}
            onPress={handleViewMap}
            style={{marginBottom: 10, marginLeft: 20}}
            title="View in Maps"
          />

          <DetailItem
            iconName="rupee"
            value={event?.price === 0 ? 'FREE' : event?.price}
            style={{marginBottom: 6}}
          />
        </View>
        <Subheading subheading="Gallery" />
        <Carousel slides={event?.gallery} style={styles.carousel} />
        <Subheading subheading="About" />
        <Paragraph paragraph={event?.about} />
        <Subheading subheading="Note" />
        <Paragraph paragraph={event?.note} />
        <Subheading subheading="More at DTU" />
        <TextButton
          fontStyle={{
            fontSize: 12,
            fontFamily: fonts[600],
            textDecorationLine: 'underline',
          }}
          onPress={() => navigate(routes.VENUE, event?.venueId)}
          style={{marginBottom: 80, marginLeft: 20}}
          title="Show Venue"
        />
      </ScrollView>
    </>
  );
};

export default Event;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    backgroundColor: colors.glass,
    bottom: 0,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  carousel: {
    marginVertical: 12,
  },
  container: {
    flex: 1,
  },
  detailsContainer: {
    height: 115,
    marginLeft: 30,
    width: '40%',
  },
  eventBanner: {
    alignSelf: 'center',
    marginTop: 10,
  },
  favouriteButton: {
    height: 35,
    marginLeft: 'auto',
    marginRight: 28,
  },
  registerButton: {
    height: 35,
    marginLeft: 28,
    marginRight: 'auto',
    width: '70%',
  },
  registerButtonFontStyle: {
    fontSize: 16,
  },
});
