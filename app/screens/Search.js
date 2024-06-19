import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import LocationBar from '../components/LocationBar';
import React, {useEffect, useState} from 'react';

import colors from '../config/colors';
import SearchItemCard from '../components/SearchItemCard';
import {STORAGE_KEY, filters, search_result_type} from '../config/constants';
import SearchBar from '../components/SearchBar';
import routes from '../navigation/routes';
import Filters from '../components/Filters';
import useService from '../../context/ServiceContext';
import useConfig from '../../context/ConfigContext';
import {getItem} from '../utils/storage';

const Search = ({navigation}) => {
  const {navigate} = navigation;
  const {request} = useService();
  const {timeTags} = useConfig();

  const handleSearch = async () => {
    const tags = [],
      time = [];
    const timeTagsArray = [];
    for (const tag of Object.values(timeTags)) timeTagsArray.push(tag.code);
    for (const tag of allTags) {
      if (tag in timeTags) time.push(tag);
      else tags.push(tag);
    }
    const cityKey = await getItem(STORAGE_KEY.CITY);
    try {
      const labels = {};
      if (tags.length || time.length) {
        console.log(tags, time);
        labels['index'] = category ? 'event' : 'venue';
        labels['tags'] = tags;
        labels['time'] = time;
      }
      const temp = await request('post', '/api/app/search/', {
        cityKey,
        query,
        labels,
      });
      console.log(temp);
      setSearchResults(temp);
    } catch (e) {
      // TODO: error handling
      console.log(e);
    }
  };

  const [allTags, setAllTags] = useState([]);
  const [category, setCategory] = useState(true);

  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    handleSearch();
    console.log(allTags);
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

  searchContainer: {
    alignItems: 'center',
    backgroundColor: colors.medium,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    width: '100%',
  },
});
