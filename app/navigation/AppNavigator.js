import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
import useService, {ServiceContext} from '../../context/ServiceContext';
import {request, requestWithAccessToken} from '../api/client';
import Cities from '../screens/Cities';
import Ad from '../screens/Ad';
import {ConfigContext} from '../../context/ConfigContext';
import Ticket from '../screens/Ticket';

const Stack = createNativeStackNavigator();

const getConfigObject = (
  venueTags,
  eventTags,
  timeTags,
  specialEventTags,
  cities,
  types,
) => {
  return {
    venueTags,
    eventTags,
    timeTags,
    specialEventTags,
    cities,
    getAllEventTags: () => {
      return {...eventTags, ...timeTags, ...specialEventTags};
    },
    types,
  };
};

export default AppNavigator = () => {
  const {request} = useService();

  const [venueTags, setVenueTags] = useState({});
  const [eventTags, setEventTags] = useState({});
  const [timeTags, setTimeTags] = useState({});
  const [specialEventTags, setSpecialEventTags] = useState({});

  const [cities, setCities] = useState({});
  const [types, setTypes] = useState({});

  const setMap = (data, setData) => {
    let temp = {};
    const array = [...data];
    array.forEach(x => (temp[x['code']] = x));
    setData(temp);
  };

  const init = async () => {
    const tVenueTags = await request('get', '/api/app/venueTags', {});
    setMap(tVenueTags, setVenueTags);

    const tEventTags = await request('get', '/api/app/eventTags', {});
    setMap(tEventTags, setEventTags);

    const tTimeTags = await request('get', '/api/app/timeTags', {});
    setMap(tTimeTags, setTimeTags);

    const tSpecialEventTags = await request(
      'get',
      '/api/app/specialeventTags',
      {},
    );
    setMap(tSpecialEventTags, setSpecialEventTags);

    const tCities = await request('get', '/api/app/cities', {});
    setMap(tCities, setCities);

    const tTypes = await request('get', '/api/app/types', {});
    setMap(tTypes, setTypes);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <ConfigContext.Provider
      value={getConfigObject(
        venueTags,
        eventTags,
        timeTags,
        specialEventTags,
        cities,
        types,
      )}>
      <Stack.Navigator>
        {/* <Stack.Screen
          options={{headerShown: false}}
          name={'ad'}
          component={Ad}
        /> */}
        <Stack.Screen
          options={{headerShown: false}}
          name={routes.TABS}
          component={HomeNavigator}
        />
        <Stack.Screen
          name={routes.CITIES}
          component={Cities}
          options={{title: 'Select your City'}}
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
      </Stack.Navigator>
    </ConfigContext.Provider>
  );
};
