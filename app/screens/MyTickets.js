import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useService from '../context/ServiceContext';
import SearchItemCard from '../components/SearchItemCard';
import routes from '../navigation/routes';
import {showToast} from '../components/widgets/toast';

const MyTickets = ({navigation}) => {
  const {requestWithAccessToken} = useService();

  const {navigate} = navigation;

  const [tickets, setTickets] = useState();

  const init = async () => {
    try {
      const res = await requestWithAccessToken(
        'get',
        '/api/app/event/tickets',
        {},
      );
      setTickets(res);
    } catch (e) {
      // TODO: error handling
      showToast('Something went wrong.');
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      {tickets?.map((ticket, index) => (
        <SearchItemCard
          event={ticket.event}
          key={`ticket-${index}`}
          onPress={() => navigate(routes.TICKET, ticket._id)}
          style={{marginTop: 16}}
        />
      ))}
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
