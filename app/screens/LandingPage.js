import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Logo from '../components/Logo';
import fonts from '../config/fonts';
import {getItem} from '../utils/storage';
import routes from '../navigation/routes';
import {STORAGE_KEY} from '../config/constants';
import useAuth from '../context/AuthContext';
import useAppConfig from '../context/AppConfigContext';

const LandingPage = ({navigation}) => {
  const {getCities, getEventTags, getTypes, getVenueTags, getGenders, setCity} =
    useAppConfig();
  const {setAuth} = useAuth();

  const initApp = async () => {
    await getCities();
    await getEventTags();
    await getTypes();
    await getVenueTags();
    await getGenders();
    await setAuth();

    const city = await getItem(STORAGE_KEY.CITY);

    if (city) {
      setCity(city);
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
