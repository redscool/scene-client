import {createContext, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  request,
  requestFileServer,
  requestWithAccessToken,
} from '../api/client';

export const ServiceContext = createContext();

export default function useService() {
  return useContext(ServiceContext);
}

export const ServiceContextProvider = ({children}) => {
  const navigation = useNavigation();
  return (
    <ServiceContext.Provider
      value={{
        request: request(navigation),
        requestWithAccessToken: requestWithAccessToken(navigation),
        requestFileServer: requestFileServer(navigation),
      }}>
      {children}
    </ServiceContext.Provider>
  );
};
