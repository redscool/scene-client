import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import navigationTheme from './app/navigation/navigationTheme';
import NavigationWrapper from './app/navigation/NavigationWrapper';
import { SafeAreaView, StatusBar, View } from 'react-native';
import colors from './app/config/colors';
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

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export default function App() {
  const getToken = async () => {
    await requestUserPermission();
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToStorage(token);
      }).catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getToken();
    return messaging().onTokenRefresh(token => {
      saveTokenToStorage(token);
    });
  }, []);
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
    <>
      <StatusBar backgroundColor={colors.dark} barStyle={'light-content'} />
      <View style={{ backgroundColor: colors.dark, flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer theme={navigationTheme}>
            <NavigationWrapper />
          </NavigationContainer>
        </SafeAreaView>
      </View>
    </>
  );
}
