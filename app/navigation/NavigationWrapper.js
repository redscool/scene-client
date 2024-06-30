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
    <ServiceContext.Provider value={getServiceObject(navigation)}>
      <AppNavigator />
    </ServiceContext.Provider>
  );
}

export default NavigationWrapper;
