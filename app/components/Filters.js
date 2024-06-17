import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useConfig from '../../context/ConfigContext';
import AppButton from './AppButton';
import fonts from '../config/fonts';

const Filters = ({category, setCategory, setTags}) => {
  const {getAllEventTags, venueTags} = useConfig();

  const [filters, setFilters] = useState([]);

  const [filtersArray, setFilterArray] = useState(
    new Array(filters.length).fill(false),
  );

  const filterClickHandler = index => {
    const temp = [...filtersArray];
    temp[index] = !temp[index];
    const tags = [];
    for (let i = 0; i < temp.length; i++)
      if (temp[i]) tags.push(filters[i].code);
    setTags(tags);
    setFilterArray(temp);
  };

  useEffect(() => {
    if (category) setFilters(Object.values(getAllEventTags()));
    else setFilters(Object.values(venueTags));
  }, [category]);

  return (
    <>
      <View style={styles.container}>
        <AppButton
          fontStyle={styles.filterCategoryFont}
          onPress={() => setCategory(true)}
          solid={category}
          style={styles.filterCategory}
          title={'Event'}
        />
        <AppButton
          fontStyle={styles.filterCategoryFont}
          onPress={() => setCategory(false)}
          solid={!category}
          style={styles.filterCategory}
          title={'Venue'}
        />
      </View>
      <View style={styles.filtersContainer}>
        <FlatList
          data={filters}
          key={filters}
          keyExtractor={item => item.code}
          nestedScrollEnabled
          numColumns={Math.ceil(filters.length / 2)}
          renderItem={({item, index}) => (
            <AppButton
              key={`tag-${index}`}
              fontStyle={{
                fontSize: 10,
                fontFamily: filtersArray[index] ? fonts[600] : fonts[300],
              }}
              onPress={() => filterClickHandler(index)}
              solid={filtersArray[index]}
              style={{margin: 8, width: 90, height: 24}}
              title={item.title.substring(0, 16)}
            />
          )}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{marginVertical: 10}}
        />
      </View>
    </>
  );
};

export default Filters;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 96,
    marginLeft: 30,
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
  filtersContainer: {
    width: '90%',
  },
  filterCategory: {
    width: 42,
    height: 16,
  },
  filterCategoryFont: {
    fontFamily: fonts[500],
    fontSize: 10,
  },
});
