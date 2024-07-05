import {StyleSheet, View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import CityCard from '../components/CityCard';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {getFileUrl} from '../utils/misc';
import {ServiceContext} from '../../context/ServiceContext';
import {setItem} from '../utils/storage';
import {STORAGE_KEY} from '../config/constants';
import routes from '../navigation/routes';

const Cities = ({navigation}) => {
  const serviceObject = useContext(ServiceContext);
  const [cities, setCities] = useState([]);
  const getCities = async () => {
    const res = await serviceObject.request('get', '/api/app/cities', {});
    setCities(res);
  };

  const handleSelectCity = async city => {
    await setItem(STORAGE_KEY.CITY, city);
    navigation.reset({
      index: 0,
      routes: [{name: routes.TABS}],
    });
  };

  useEffect(() => {
    getCities();
  }, []);
  return (
    <View style={styles.container}>
      {cities?.map((city, index) => (
        <CityCard
          code={city.code}
          image={getFileUrl(city.avatar)}
          key={`city-${index}`}
          onPress={handleSelectCity}
          style={{marginTop: 40}}
          title={city.title}
        />
      ))}
      <View style={styles.bottomContainer}>
        <Text style={styles.text}>
          Currently we are only live in few cities.{' '}
          <Text style={[styles.text, {color: colors.primary}]}>
            Invite to your city.
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Cities;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 'auto',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.dark,
    flex: 1,
  },
  text: {
    color: colors.text,
    fontFamily: fonts[400],
    fontSize: 10,
  },
});
