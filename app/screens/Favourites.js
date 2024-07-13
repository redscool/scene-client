import {StyleSheet, View} from 'react-native';
import React from 'react';
import SearchItemCard from '../components/SearchItemCard';
import routes from '../navigation/routes';
import useAuth from '../context/AuthContext';

const Favourites = ({navigation}) => {
  const {favourites} = useAuth();
  const {navigate} = navigation;
  return (
    <View style={styles.container}>
      {Object.values(favourites)?.map((item, index) => (
        <SearchItemCard
          event={item}
          key={`ticket-${index}`}
          onPress={() =>
            navigate(item.startTime ? routes.EVENT : routes.VENUE, item)
          }
          style={{marginTop: 16}}
        />
      ))}
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
