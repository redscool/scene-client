import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import navigationTheme from './app/navigation/navigationTheme';
import NavigationWrapper from './app/navigation/NavigationWrapper';
// import SharedGroupPreferences from 'react-native-shared-group-preferences';

const saveTokenToStorage = token => {
  console.log(token);
};

// const check = async () => {
//   const facebookPackageName = 'com.android.providers.calendar';
//   try {
//     const installed = await SharedGroupPreferences.isAppInstalledAndroid(
//       facebookPackageName,
//     );
//     console.log(installed, 'Facebook is installed on this device');
//   } catch (err) {
//     console.log('Facebook is not installed');
//   }
// };

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
