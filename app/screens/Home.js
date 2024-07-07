import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import LocationBar from '../components/LocationBar';
import React, {useEffect, useState} from 'react';

import AppButton from '../components/AppButton';
import CollegeCard from '../components/CollegeCard';
import colors from '../config/colors';
import EventCard from '../components/EventCard';
import SectionHeading from '../components/SectionHeading';
import TopEvent from '../components/TopEventContainer';
import routes from '../navigation/routes';
import useAppConfig from '../context/AppConfigContext';
import Loader from '../components/Loader';

export default Home = ({navigation}) => {
  const {events, venues, getAppConfig} = useAppConfig();
  const [loading, setLoading] = useState();

  const init = async () => {
    setLoading(true);
    await getAppConfig();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {loading ? (
        <Loader style={styles.loader} />
      ) : (
        <ScrollView
          alwaysBounceVertical={false}
          scrollsToTop={false}
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <LocationBar />
          {events ? (
            <TopEvent
              event={events[0]}
              onPress={() => navigation.navigate(routes.EVENT, events[0])}
            />
          ) : null}
          <SectionHeading style={{marginTop: 15}} title={'Around You'} />
          {events && (
            <FlatList
              data={events}
              horizontal
              ItemSeparatorComponent={<View style={{width: 10}} />}
              keyExtractor={item => item._id.toString()}
              renderItem={({item, id}) => (
                <EventCard
                  event={item}
                  onPress={() => navigation.navigate(routes.EVENT, item)}
                />
              )}
              showsHorizontalScrollIndicator={false}
              style={styles.eventsContainer}
            />
          )}
          <AppButton
            icon="search"
            iconSize={18}
            onPress={() => navigation.navigate(routes.SEARCH)}
            solid
            style={{alignSelf: 'center'}}
            title="Explore"
          />
          <SectionHeading style={{marginTop: 15}} title={'Colleges'} />
          {venues && (
            <ScrollView
              alwaysBounceVertical={false}
              directionalLockEnabled={true}
              bounces={false}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.collegesContainer}>
              <FlatList
                contentContainerStyle={{alignSelf: 'flex-start'}}
                data={venues}
                key={`${venues.length}`}
                keyExtractor={item => item._id}
                numColumns={Math.ceil(venues.length / 2)}
                renderItem={({item, index}) => (
                  <CollegeCard
                    key={item._id.toString()}
                    college={item}
                    onPress={() => navigation.navigate(routes.VENUE, item)}
                    style={{margin: 8}}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          )}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  collegesContainer: {
    alignSelf: 'center',
    marginBottom: 70,
    width: '90%',
  },
  container: {
    backgroundColor: colors.dark,
    flex: 1,
  },
  eventsContainer: {
    alignSelf: 'center',
    flexGrow: 0,
    height: 148,
    marginTop: 15,
    width: '90%',
  },
  loader: {
    flex: 1,
    alignSelf: 'center',
    height: 180,
    width: 180,
  },
});
