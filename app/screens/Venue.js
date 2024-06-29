import {
  FlatList,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Carousel from '../components/Carousel';
import colors from '../config/colors';
import DetailItem from '../components/DetailItem';
import EventBanner from '../components/EventBanner';
import FavouriteButton from '../components/FavouriteButton';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import routes from '../navigation/routes';
import SearchItemCard from '../components/SearchItemCard';
import useService from '../../context/ServiceContext';
import {getFileUrl} from '../utils/misc';
import TextButton from '../components/TextButton';
import fonts from '../config/fonts';
import ShareButton from '../components/ShareButton';

const Venue = ({route, navigation}) => {
  const {request} = useService();
  const {navigate} = navigation;

  const [venue, setVenue] = useState();

  const init = async () => {
    let venueId = route.params._id ? route.params._id : route.params.id;
    const res = await request('get', '/api/app/venue', {venueId});
    setVenue(res);
  };

  const handleViewMap = () => {
    const {lat, lng} = venue?.location;
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lng}`;
    const label = venue?.abbreviation;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Checkout this amazing Venue at Scene App. \n\n\n https://www.sceneweb.app/projectw/venue/${venue._id}`,
      });
    } catch (error) {
      // TODO: error handling
      showToast('Something went wrong.');
    }
  };

  useEffect(() => {
    init();
  }, []);

  const [state, setState] = useState(false);
  return (
    <>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <FavouriteButton
            onPress={() => setState(!state)}
            state={state}
            style={styles.favouriteButton}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ShareButton
            onPress={handleShare}
            state={state}
            style={styles.shareButton}
          />
        </View>
      </View>

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <EventBanner
          imageUrl={getFileUrl(venue?.bannerImage)}
          style={styles.eventBanner}
        />
        <Heading heading={venue?.name} />

        <View style={styles.detailsContainer}>
          <DetailItem
            iconName="categories"
            style={{marginBottom: 6}}
            value={venue?.type}
          />

          <DetailItem
            iconName="location"
            style={{marginBottom: 6}}
            value={venue?.address}
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
        </View>
        <Subheading subheading="Gallery" />
        <Carousel slides={venue?.gallery} style={styles.carousel} />
        <Subheading subheading="Events" />

        <FlatList
          data={venue?.events}
          keyExtractor={item => item._id.toString()}
          nestedScrollEnabled
          renderItem={({item}) => (
            <SearchItemCard
              event={item}
              onPress={() => navigate(routes.EVENT, item)}
              style={{alignSelf: 'center', marginTop: 25, marginBottom: 10}}
            />
          )}
          scrollEnabled={false}
          style={{marginBottom: 60}}
        />
      </ScrollView>
    </>
  );
};

export default Venue;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    bottom: 80,
    alignSelf: 'center',
    height: 48,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
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
    width: '85%',
  },
  eventBanner: {
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: colors.glass,
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: 'center',
  },
});
