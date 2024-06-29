import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import {ServiceContext} from '../../context/ServiceContext';
import {
  request,
  requestFileServer,
  requestWithAccessToken,
} from '../api/client';
import routes from './routes';
import {Linking} from 'react-native';

const getServiceObject = navigation => {
  return {
    request: request(navigation),
    requestWithAccessToken: requestWithAccessToken(navigation),
    requestFileServer: requestFileServer(navigation),
  };
};

function NavigationWrapper() {
  const navigation = useNavigation();

  useEffect(() => {
    const handleDeepLink = ({url}) => {
      console.log(url);
      const route = url.replace(/.*?:\/\//g, '');
      const routeName = route.split('/')[0];

      console.log(routeName);
      if (routeName === routes.EVENT) {
        navigation.navigate(routes.EVENT, {});
      }
    };

    const subscribe = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscribe.remove();
    };
  }, []);
  return (
    <ServiceContext.Provider value={getServiceObject(navigation)}>
      <AppNavigator />
    </ServiceContext.Provider>
  );
}

export default NavigationWrapper;
