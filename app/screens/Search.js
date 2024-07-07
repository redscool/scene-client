import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import LocationBar from '../components/LocationBar';
import React, {useEffect, useState} from 'react';

import colors from '../config/colors';
import SearchItemCard from '../components/SearchItemCard';
import SearchBar from '../components/SearchBar';
import routes from '../navigation/routes';
import Filters from '../components/Filters';
import useService from '../context/ServiceContext';
import Loader from '../components/Loader';
import useAppConfig from '../context/AppConfigContext';

const Search = ({navigation}) => {
  const {navigate} = navigation;
  const {request} = useService();
  const {timeTags, city: cityKey} = useAppConfig();

  const handleSearch = async () => {
    setLoading(true);
    const tags = [],
      time = [];
    const timeTagsArray = [];
    for (const tag of Object.values(timeTags)) timeTagsArray.push(tag.code);
    for (const tag of allTags) {
      if (tag in timeTags) time.push(tag);
      else tags.push(tag);
    }
    try {
      const labels = {};
      if (tags.length || time.length) {
        labels['index'] = category ? 'event' : 'venue';
        labels['tags'] = tags;
        labels['time'] = time;
      }
      const temp = await request('post', '/api/app/search/', {
        cityKey,
        query,
        labels,
      });
      setSearchResults(temp);
    } catch (e) {
      // TODO: error handling
      console.log(e);
    }
    setLoading(false);
  };

  const [allTags, setAllTags] = useState([]);
  const [category, setCategory] = useState(true);

  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [searchResults, setSearchResults] = useState();

  const [loading, setLoading] = useState();

  useEffect(() => {
    handleSearch();
  }, [query, allTags, category]);
  return (
    <ScrollView
      alwaysBounceVertical={false}
      nestedScrollEnabled
      scrollsToTop={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <LocationBar />
      <View style={styles.searchContainer}>
        <SearchBar
          handleFilter={() => setShowFilters(!showFilters)}
          handleSearch={handleSearch}
          query={query}
          setQuery={setQuery}
        />
        {showFilters && (
          <Filters
            category={category}
            setCategory={setCategory}
            setTags={setAllTags}
          />
        )}
      </View>
      {loading ? (
        <Loader style={styles.loader} />
      ) : (
        <FlatList
          data={searchResults}
          nestedScrollEnabled
          keyExtractor={item => `${Math.random() * 1000} ${item.id.toString()}`}
          renderItem={({item}) => (
            <SearchItemCard
              event={item}
              key={`${Math.random() * 1000} ${item.id.toString()}`}
              onPress={() =>
                navigate(item.time ? routes.EVENT : routes.VENUE, item)
              }
              style={{alignSelf: 'center', marginTop: 25}}
            />
          )}
          scrollEnabled={false}
          style={{marginBottom: 60}}
        />
      )}
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    height: 1000,
    width: '100%',
  },
  eventsContainer: {
    alignSelf: 'center',
    flexGrow: 0,
    height: 148,
    marginTop: 15,
    width: '90%',
  },
  loader: {
    alignSelf: 'center',
    height: 180,
    width: 180,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: colors.medium,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    width: '100%',
  },
});
