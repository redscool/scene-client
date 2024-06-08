import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import Icon from '../Icons';

import colors from '../config/colors';
import fonts from '../config/fonts';
import AppButton from './AppButton';

const SearchBar = ({query, setQuery, handleSearch, handleFilter}) => {
  return (
    <View style={styles.searchBox}>
      <View style={styles.searchInput}>
        <Icon
          color={colors.placeholder}
          name="search"
          size={16}
          style={{marginLeft: 8}}
        />
        <TextInput
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          keyboardType="web-search"
          onChangeText={setQuery}
          placeholder="Search"
          placeholderTextColor={colors.placeholder}
          style={styles.input}
          value={query}
        />
      </View>
      <AppButton
        icon={'filter'}
        iconColor={colors.secondary}
        iconSize={20}
        iconStyle={{alignSelf: 'center'}}
        fontStyle={styles.buttonText}
        onPress={handleFilter}
        solid
        style={styles.button}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  button: {
    width: 31,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#5F41FF',
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 12,
  },
  searchBox: {
    height: 50,
    width: '90%',
    flexDirection: 'row',
    backgroundColor: colors.medium,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  searchInput: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 4,
    flexDirection: 'row',
    height: 30,
    width: '80%',
  },
  input: {
    color: colors.placeholder,
    fontSize: 14,
    fontFamily: fonts[500],
    height: 30,
    marginLeft: 8,
    padding: 0,
    width: '80%',
  },
});
