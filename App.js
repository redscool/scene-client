import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, View} from 'react-native';

import colors from './app/config/colors';
import navigationTheme from './app/navigation/navigationTheme';
import ServiceContextProviderWrapper from './app/navigation/ServiceContextProviderWrapper';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={colors.dark} barStyle={'light-content'} />
      <View style={{backgroundColor: colors.dark, flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer theme={navigationTheme}>
            <ServiceContextProviderWrapper />
          </NavigationContainer>
        </SafeAreaView>
      </View>
    </>
  );
}
