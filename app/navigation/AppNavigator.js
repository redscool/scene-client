import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import Checkout from '../screens/Checkout';
import CompleteProfile from '../screens/CompleteProfile';
import Event from '../screens/Event';
import Favourites from '../screens/Favourites';
import HomeNavigator from './HomeNavigator';
import Login from '../screens/Login';
import LoginDetails from '../screens/LoginDetails';
import MyTickets from '../screens/MyTickets';
import Otp from '../screens/Otp';
import Profile from '../screens/Profile';
import routes from './routes';
import Venue from '../screens/Venue';
import Cities from '../screens/Cities';
import Ticket from '../screens/Ticket';
import LandingPage from '../screens/LandingPage';
import useAppConfig from '../context/AppConfigContext';
import ChatSupport from '../screens/ChatSupport';
import useChat from '../context/ChatContext';

const Stack = createNativeStackNavigator();

export default AppNavigator = () => {
  const navigation = useNavigation();
  const {getToken, setFcmToken} = useAppConfig();
  const {addSupportMessage} = useChat();

  useEffect(() => {
    getToken();
    return messaging().onTokenRefresh(token => {
      setFcmToken(token);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await addSupportMessage({
        _id: remoteMessage.messageId,
        message: remoteMessage.data.message,
        createdAt: remoteMessage.sentTime,
        isUser: false,
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleDeepLink = ({url}) => {
      const link = url.replace(/.*?:\/\//g, '');
      const routeName = link.split('/')[0];
      const route = routeName.split('?')[0];
      if (route === routes.EVENT) {
        navigation.navigate(routes.EVENT, {id: routeName.split('=')[1]});
      }
      if (route === routes.VENUE) {
        navigation.navigate(routes.VENUE, {id: routeName.split('=')[1]});
      }
    };

    const subscribe = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscribe.remove();
    };
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={LandingPage}
        name={routes.LANDING_PAGE}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes.CITIES}
        component={Cities}
        options={{title: 'Select your City'}}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={routes.TABS}
        component={HomeNavigator}
      />

      <Stack.Screen name={routes.LOGIN} component={Login} />
      <Stack.Screen name={routes.LOGIN_DETAILS} component={LoginDetails} />
      <Stack.Screen name={routes.OTP} component={Otp} />
      <Stack.Screen
        name={routes.COMPLETE_PROFILE}
        component={CompleteProfile}
      />
      <Stack.Screen
        component={Venue}
        name={routes.VENUE}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Event}
        name={routes.EVENT}
        options={{headerShown: false}}
      />
      <Stack.Screen name={routes.CHECKOUT} component={Checkout} />
      <Stack.Screen name={routes.MY_TICKETS} component={MyTickets} />
      <Stack.Screen name={routes.PROFILE} component={Profile} />
      <Stack.Screen name={routes.FAVOURITES} component={Favourites} />
      <Stack.Screen name={routes.TICKET} component={Ticket} />
      <Stack.Screen
        name={routes.HELP}
        component={ChatSupport}
        options={{title: 'Help Chat'}}
      />
    </Stack.Navigator>
  );
};
