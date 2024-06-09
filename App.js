import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import navigationTheme from './app/navigation/navigationTheme';
import NavigationWrapper from './app/navigation/NavigationWrapper';

const saveTokenToStorage = token => {
  console.log(token);
};


export default function App() {
  // useEffect(() => {
  //   messaging()
  //     .getToken()
  //     .then(token => {
  //       return saveTokenToStorage(token);
  //     });

  //   return messaging().onTokenRefresh(token => {
  //     saveTokenToStorage(token);
  //   });
  // }, []);
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
  // useEffect(() => {
  //   check();
  // }, []);
  return (
    <NavigationContainer theme={navigationTheme}>
      <NavigationWrapper />
    </NavigationContainer>
  );
}
