import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppButton from '../components/AppButton';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import routes from '../navigation/routes';
import {getSecureItem, removeItem, removeSecureItem} from '../utils/storage';
import {SECURE_STORAGE_KEY, STORAGE_KEY} from '../config/constants';
import useUser from '../../context/UserContext';

export default Account = ({navigation}) => {
  const {navigate} = navigation;
  const {name, setName, setDob, setGender} = useUser();
  const [accessToken, setAccessToken] = useState();

  const accountOptions = [
    {
      id: 1,
      value: 'Profile',
      gradient: true,
      icon: 'account',
      onPress: () => navigate(routes.PROFILE),
    },
    {
      id: 2,
      value: 'My Tickets',
      gradient: false,
      icon: 'ticket',
      onPress: () => navigate(routes.MY_TICKETS),
    },
    {
      id: 3,
      value: 'Favourites',
      gradient: false,
      icon: 'favourite',
      onPress: () => navigate(routes.FAVOURITES),
    },
    {
      id: 4,
      value: 'Log out',
      gradient: false,
      icon: 'powerOff',
      onPress: () => handleLogout(),
    },
  ];

  const handleLogout = async () => {
    await removeSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    await removeSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN);
    await removeItem(STORAGE_KEY.DOB);
    await removeItem(STORAGE_KEY.NAME);
    await removeItem(STORAGE_KEY.GENDER);
    await removeItem(STORAGE_KEY.USER_ID);
    setName(undefined);
    setDob(undefined);
    setGender(undefined);
  };

  const init = async () => {
    const res = await getSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    setAccessToken(res);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      {
        <AppButton
          fontStyle={{fontSize: 16}}
          {...(!accessToken && {onPress: () => navigate(routes.LOGIN)})}
          solid
          style={{height: 30, marginLeft: 20, marginTop: 30, width: 155}}
          title={accessToken ? (name ? name : 'User') : 'Login'}
        />
      }
      <FlatList
        data={accountOptions}
        renderItem={({item, index}) => (
          <ListItem
            gradient={item.gradient}
            icon={item.icon}
            onPress={item.onPress}
            style={{alignSelf: 'center', marginTop: 20}}
            value={item.value}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1,
  },
});
