import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Logo from '../components/Logo';
import fonts from '../config/fonts';
import {getItem, getSecureItem} from '../utils/storage';
import routes from '../navigation/routes';
import {SECURE_STORAGE_KEY, STORAGE_KEY} from '../config/constants';
import useAuth from '../../context/AuthContext';
import useAppConfig from '../../context/AppConfig';

const LandingPage = ({navigation}) => {
  const {getCities, getEventTags, getTypes, getVenueTags} = useAppConfig();
  const {setAuth} = useAuth();

  const initApp = async () => {
    await getCities();
    await getEventTags();
    await getTypes();
    await getVenueTags();

    const city = await getItem(STORAGE_KEY.CITY);

    if (city) {
      navigation.reset({
        index: 0,
        routes: [{name: routes.TABS}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: routes.CITIES}],
      });
    }
  };

  useEffect(() => {
    initApp();
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.textContainer}>
        <Text style={styles.text}>from {'\n'}BaljeetKode</Text>
      </View>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts[600],
    fontSize: 14,
    textAlign: 'center',
  },
  textContainer: {
    marginBottom: 80,
    marginTop: 'auto',
  },
});
