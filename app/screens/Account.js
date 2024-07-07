import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';

import AppButton from '../components/AppButton';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import routes from '../navigation/routes';
import useAuth from '../context/AuthContext';

export default Account = ({navigation}) => {
  const {navigate} = navigation;
  const {handleLogout, accessToken} = useAuth();

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
    {
      id: 5,
      value: 'Need Help?',
      gradient: false,
      icon: 'powerOff',
      onPress: () => navigate(routes.HELP),
    },
  ];

  return (
    <View style={styles.container}>
      {
        <AppButton
          fontStyle={{fontSize: 16}}
          {...(!accessToken && {onPress: () => navigate(routes.LOGIN)})}
          solid
          style={{height: 30, marginLeft: 20, marginTop: 30, width: 155}}
          title={
            // accessToken ? (name ? name : 'User') :
            'Login'
          }
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
