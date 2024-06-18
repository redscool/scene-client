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
import {getItem} from '../utils/storage';
import {STORAGE_KEY} from '../config/constants';
import {UserContext} from '../../context/UserContext';

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

const getUserObject = (name, setName, dob, setDob, gender, setGender) => {
  return {
    name,
    setName,
    dob,
    setDob,
    gender,
    setGender,
  };
};

export default AppNavigator = () => {
  const {request} = useService();

  const [venueTags, setVenueTags] = useState({});
  const [eventTags, setEventTags] = useState({});
  const [timeTags, setTimeTags] = useState({});
  const [specialEventTags, setSpecialEventTags] = useState({});

  const [name, setName] = useState();
  const [dob, setDob] = useState();
  const [gender, setGender] = useState();

  const [cities, setCities] = useState({});
  const [city, setCity] = useState();
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

    const tName = await getItem(STORAGE_KEY.NAME);
    setName(tName);
    const tDob = await getItem(STORAGE_KEY.DOB);
    setDob(tDob);
    const tGender = await getItem(STORAGE_KEY.GENDER);
    setGender(tGender);
  };

  const getCity = async () => {
    const tCity = await getItem(STORAGE_KEY.CITY);
    console.log(tCity);
    setCity(tCity);
    return tCity;
  };
  useEffect(() => {
    init();
    getCity();
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
      <UserContext.Provider
        value={getUserObject(name, setName, dob, setDob, gender, setGender)}>
        <Stack.Navigator
          {...{initialRouteName: city ? routes.TABS : routes.CITIES}}>
          <Stack.Screen
            name={routes.CITIES}
            component={Cities}
            options={{title: 'Select your City'}}
          />
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
      </UserContext.Provider>
    </ConfigContext.Provider>
  );
};
