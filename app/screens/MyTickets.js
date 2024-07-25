import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import SearchItemCard from '../components/SearchItemCard';
import routes from '../navigation/routes';
import Paragraph from '../components/Paragraph';
import useAuth from '../context/AuthContext';

const MyTickets = ({navigation}) => {
  const {tickets} = useAuth();
  const {navigate} = navigation;
  return (
    <View style={styles.container}>
      {Object.values(tickets).length ? (
        <FlatList
          data={Object.values(tickets)}
          keyExtractor={item => item._id}
          renderItem={({index, item}) => (
            <SearchItemCard
              event={item.event}
              key={`ticket-${index}`}
              onPress={() => navigate(routes.EVENT, item.event)}
              style={{marginTop: 16}}
            />
          )}
        />
      ) : (
        <Paragraph
          paragraph={'Nothing to show here.'}
          style={{marginTop: 196, width: 'auto'}}
        />
      )}
    </View>
  );
};

export default MyTickets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
