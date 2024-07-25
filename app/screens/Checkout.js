import {Image, StyleSheet, Text, View} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import React, {useEffect, useState} from 'react';
import SearchItemCard from '../components/SearchItemCard';
import fonts from '../config/fonts';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import {checkInstalledApp} from '../utils/misc';
import {DAYS, SECURE_STORAGE_KEY, TICKET_FLOWS} from '../config/constants';
import useService from '../context/ServiceContext';
import {showToast} from '../components/widgets/toast';
import {getSecureItem} from '../utils/storage';
import routes from '../navigation/routes';
import useAd from '../hooks/useAd';
import Loader from '../components/Loader';
import useAuth from '../context/AuthContext';

const TITLE_FOR_FLOW = {
  [TICKET_FLOWS.FREE]: 'Register for ',
  [TICKET_FLOWS.INSTALL_APPS]: 'Install these apps and register for ',
  [TICKET_FLOWS.PAID]: 'Amount to pay: ',
  [TICKET_FLOWS.SHOW_ADS]: 'Watch an ad and register for ',
};

const Checkout = ({route, navigation}) => {
  const {requestWithAccessToken} = useService();
  const {initTickets} = useAuth();
  const {isLoading, play} = useAd();
  const {navigate} = navigation;

  const event = route.params;
  const [apps, setApps] = useState([]);
  const [flow, setFlow] = useState();
  const [paymentInitiated, setPaymentInitiated] = useState();

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
      navigation.reset({
        index: 0,
        routes: [{name: routes.TABS}, {name: routes.MY_TICKETS}],
      });
      initTickets();
    } catch (e) {
      // TODO: error handling
      showToast('Something Went Wrong');
      console.log(e);
    }
  };

  const paymentFailed = () => {
    showToast('Payment Not Completed');
    setPaymentInitiated(false);
  };

  const paymentSuccess = () => {
    showToast('Ticket booked successfully.');
    setPaymentInitiated(false);
    navigation.reset({
      index: 0,
      routes: [{name: routes.MY_TICKETS}],
    });
  };

  const handlePayment = async () => {
    if (paymentInitiated) return;
    const options = {
      description: 'Ticket Purchase',
      image: 'https://www.sceneweb.app/logo.svg',
      currency: 'INR',
      amount: (event.price * 100).toString(),
      name: 'Scene',
      prefill: {
        email: '',
        contact: '',
        name: '',
      },
      theme: {color: colors.dark},
    };
    setPaymentInitiated(true);
    const res = await requestWithAccessToken(
      'post',
      '/api/app/monet/createOrder',
      {
        eventId: event._id,
        amount: event.price,
      },
    );
    RazorpayCheckout.open({
      ...options,
      order_id: res.pgOrderId,
      key: res.pgKey,
    })
      .then(async data => {
        const res = await requestWithAccessToken(
          'post',
          '/api/app/monet/confirmPayment',
          {
            pgPaymentId: data.razorpay_payment_id,
          },
        );
        if (res.payment) {
          paymentSuccess();
          initTickets();
        } else if (res.refunded) {
          refundPayment();
        } else {
          paymentFailed();
        }
      })
      .catch(() => {
        paymentFailed();
      });
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
    } else if (flow === TICKET_FLOWS.PAID) {
      handlePayment();
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {paymentInitiated ? (
        <Loader style={styles.loader} />
      ) : (
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
      )}
    </>
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
  loader: {
    flex: 1,
    alignSelf: 'center',
    height: 180,
    width: 180,
  },
  text: {
    color: colors.placeholder,
    fontFamily: fonts[400],
    fontSize: 12,
    paddingLeft: 16,
  },
});
