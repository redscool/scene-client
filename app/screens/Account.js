import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';

import AppButton from '../components/AppButton';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import routes from '../navigation/routes';

export default Account = ({navigation}) => {
  const {navigate} = navigation;
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
      onPress: () => console.log('clicked'),
    },
  ];

  return (
    <View style={styles.container}>
      <AppButton
        fontStyle={{fontSize: 16}}
        onPress={() => navigate(routes.LOGIN)}
        solid
        style={{height: 30, marginLeft: 20, marginTop: 30, width: 155}}
        title="Login"
      />
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
