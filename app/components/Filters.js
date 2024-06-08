import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useConfig from '../../context/ConfigContext';
import AppButton from './AppButton';
import fonts from '../config/fonts';

const Filters = ({tags}) => {
  const {getAllEventTags, venueTags} = useConfig();

  const [filters, setFilters] = useState([]);

  const [filtersArray, setFilterArray] = useState(
    new Array(filters.length).fill(false),
  );

  const filterClickHandler = index => {
    const temp = [...filtersArray];
    temp[index] = !temp[index];
    setFilterArray(temp);
  };

  useEffect(() => {
    setFilters(Object.values(getAllEventTags()));
    for (let i = 0; i < filters.length; i++) {
      if (filters[i] in tags) filtersArray[i] = true;
    }
  }, []);

  return (
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
            style={{margin: 8, width: 94}}
            title={item.title}
          />
        )}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{marginVertical: 10}}
      />
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  filtersContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
