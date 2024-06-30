import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchItemCard from '../components/SearchItemCard';
import fonts from '../config/fonts';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import {checkInstalledApp} from '../utils/misc';
import {SECURE_STORAGE_KEY, TICKET_FLOWS} from '../config/constants';
import useService from '../../context/ServiceContext';
import {showToast} from '../components/widgets/toast';
import {getSecureItem} from '../utils/storage';
import routes from '../navigation/routes';
import useAd from '../hooks/useAd';

const TITLE_FOR_FLOW = {
  [TICKET_FLOWS.FREE]: 'Register for ',
  [TICKET_FLOWS.INSTALL_APPS]: 'Install these apps and register for ',
  [TICKET_FLOWS.PAID]: 'Amount to pay: ',
  [TICKET_FLOWS.SHOW_ADS]: 'Watch an ad and register for ',
};

const Checkout = ({route, navigation}) => {
  const {requestWithAccessToken} = useService();
  const {isLoading, play} = useAd();
  const {navigate} = navigation;

  const event = route.params;
  const [apps, setApps] = useState([]);
  const [flow, setFlow] = useState();

  const init = async () => {
    setFlow(
      event.price
        ? TICKET_FLOWS.PAID
        : event.showAds
        ? TICKET_FLOWS.SHOW_ADS
        : event.installApps && event.installApps.length
        ? TICKET_FLOWS.INSTALL_APPS
        : TICKET_FLOWS.FREE,
    );

    if (!event.installApps) return;
    const temp = [];
    for (const app of event.installApps)
      temp.push({
        ...app,
        installed: await checkInstalledApp(app.android),
      });
    setApps(temp);
  };

  const register = async () => {
    try {
      await requestWithAccessToken('post', '/api/app/event/register', {
        eventId: event._id,
      });
      showToast('Registered Successfully');
    } catch (e) {
      // TODO: error handling
      showToast('Something Went Wrong');
      console.log(e);
    }
  };

  const handleRegister = async () => {
    const accessToken = await getSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    if (!accessToken) {
      showToast('Please login first.');
      navigate(routes.LOGIN);
      return;
    }
    if (flow === TICKET_FLOWS.FREE) {
      register();
    } else if (flow === TICKET_FLOWS.SHOW_ADS) {
      if (isLoading) {
        showToast('Something went wrong try again.');
        return;
      }
      play(register);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Registering 1 ticket for:</Text>
      </View>
      <SearchItemCard event={event} />
      <View style={styles.header}>
        <Text style={styles.text}>
          {TITLE_FOR_FLOW[flow]}
          <Text style={{fontFamily: fonts[600], color: colors.secondary}}>
            {event.price ? `₹${event.price}` : 'FREE'}
          </Text>
        </Text>
      </View>

      {flow === TICKET_FLOWS.INSTALL_APPS &&
        apps.map((app, index) => (
          <View style={styles.appContainer} key={`app-${index}`}>
            <Image />
            <Text>{app.name}</Text>
            <AppButton
              solid={app.installed}
              title={app.installed ? 'Installed' : 'Install'}
            />
          </View>
        ))}
      <AppButton
        fontStyle={{fontSize: 16}}
        onPress={handleRegister}
        style={[styles.button, {opacity: isLoading ? 0.5 : 1}]}
        solid
        title={event.price ? 'Pay Now' : 'Register Now'}
      />
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  button: {
    height: 30,
    marginBottom: 30,
    marginTop: 'auto',
    width: 155,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '90%',
    height: 24,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  text: {
    color: colors.placeholder,
    fontFamily: fonts[400],
    fontSize: 12,
    paddingLeft: 16,
  },
});
