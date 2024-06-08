import React from 'react';
import { useNavigation} from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import { ServiceContext } from '../../context/ServiceContext';
import { request, requestFileServer, requestWithAccessToken } from '../api/client';

const getServiceObject = navigation => {
  return {
    request: request(navigation),
    requestWithAccessToken: requestWithAccessToken(navigation),
    requestFileServer: requestFileServer(navigation),
  };
};

function NavigationWrapper() {
  const navigation = useNavigation();
  return (
    <ServiceContext.Provider value={getServiceObject(navigation)}>
      <AppNavigator />
    </ServiceContext.Provider>
  );
}

export default NavigationWrapper;
