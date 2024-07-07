import {createContext, useContext, useState} from 'react';
import messaging from '@react-native-firebase/messaging';

import useService from './ServiceContext';
import {setItem} from '../utils/storage';
import {HEADERS} from '../config/constants';
import {showToast} from '../components/widgets/toast';

const setMap = (data, setData) => {
  let temp = {};
  const array = [...data];
  array.forEach(x => (temp[x['code']] = x));
  setData(temp);
};

export const AppConfigContext = createContext();

export default function useAppConfig() {
  return useContext(AppConfigContext);
}

export const AppConfigProvider = ({children}) => {
  const {request} = useService();

  const [venueTags, setVenueTags] = useState({});

  const [eventTags, setEventTags] = useState({});
  const [timeTags, setTimeTags] = useState({});
  const [specialEventTags, setSpecialEventTags] = useState({});
  const [allEventTags, setAllEventTags] = useState({});

  const [cities, setCities] = useState({});

  const [types, setTypes] = useState({});

  const [fcmToken, setFcmToken] = useState();
  const [city, setCity] = useState();

  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);

  const getVenueTags = async () => {
    const tVenueTags = await request('get', '/api/app/venueTags', {});
    setMap(tVenueTags, setVenueTags);
  };

  const getEventTags = async () => {
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

    setAllEventTags({...eventTags, ...timeTags, ...specialEventTags});
  };

  const getCities = async () => {
    const tCities = await request('get', '/api/app/cities', {});
    setMap(tCities, setCities);
  };

  const getTypes = async () => {
    const tTypes = await request('get', '/api/app/types', {});
    setMap(tTypes, setTypes);
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    await requestUserPermission();
    messaging()
      .getToken()
      .then(token => {
        return setFcmToken(token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getAppConfig = async () => {
    try {
      const res = await request('post', '/api/app/appConfig', {
        fcmToken,
        city,
      });
      const {events, venues, currentDeviceId} = res;
      setEvents(events);
      setVenues(venues);
      await setItem(HEADERS.DEVICE_ID, currentDeviceId);
    } catch (e) {
      // TODO: error handling
      showToast('Something went wrong.');
    }
  };

  return (
    <AppConfigContext.Provider
      value={{
        cities,
        eventTags,
        allEventTags,
        specialEventTags,
        timeTags,
        types,
        venueTags,
        getVenueTags,
        getEventTags,
        getCities,
        getTypes,
        getToken,
        fcmToken,
        setFcmToken,
        getAppConfig,
        events,
        venues,
        city,
        setCity,
      }}>
      {children}
    </AppConfigContext.Provider>
  );
};
