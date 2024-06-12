import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import LocationBar from '../components/LocationBar';
import React, {useState} from 'react';

import AppButton from '../components/AppButton';
import colors from '../config/colors';
import SearchItemCard from '../components/SearchItemCard';
import {filters, search_result_type, tags} from '../config/constants';
import SearchBar from '../components/SearchBar';
import routes from '../navigation/routes';
import fonts from '../config/fonts';
import Filters from '../components/Filters';

const Search = ({navigation}) => {
  const {navigate} = navigation;

  const handleSearch = async () => {
    try {
      const temp = await request('post', '/api/app/search/', {cityKey, query});
      setSearchResults(temp);
    } catch (e) {
      // TODO: error handling
      console.log(e);
    }
  };

  // const [tags, ]

  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [searchResults, setSearchResults] = useState();

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
        {showFilters && <Filters tags={[]} />}
      </View>
      <FlatList
        data={searchResults}
        nestedScrollEnabled
        renderItem={({item}) => (
          <SearchItemCard
            event={item}
            onPress={() =>
              navigate(
                item.type === search_result_type.EVENT
                  ? routes.EVENT
                  : routes.VENUE,
                item,
              )
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
