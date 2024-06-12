import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import navigationTheme from './app/navigation/navigationTheme';
import NavigationWrapper from './app/navigation/NavigationWrapper';
import { SafeAreaView, StatusBar, View } from 'react-native';
import colors from './app/config/colors';

const saveTokenToStorage = token => {
  console.log(token);
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
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
    });

    return unsubscribe;
  }, []);

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
