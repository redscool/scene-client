import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import colors from '../config/colors';
import fonts from '../config/fonts';
import ListItem from '../components/ListItem';
import routes from '../navigation/routes';

GoogleSignin.configure({
  webClientId:
    '986368488233-f3bpk3fh3264m0kpdkh191g7odr6fft8.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  console.log('log1');
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  console.log('log2');

  try {
    const res = await GoogleSignin.signIn();
    console.log(res);
    const {idToken} = res;
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (e) {
    console.log(e);
  }
  return null;
}

const Login = ({navigation}) => {
  const {navigate} = navigation;
  const options = [
    {
      icon: 'google',
      title: 'Login with Google',
      onPress: onGoogleButtonPress,
    },
    {
      icon: 'indianFlag',
      title: 'Mobile Number',
      onPress: () => console.log('Mobile Number'),
    },
    {
      icon: 'email',
      title: 'Login with Email',
      onPress: () => navigate(routes.LOGIN_DETAILS),
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        renderItem={({item, index}) => (
          <ListItem
            fontStyle={{fontSize: 16, textAlign: 'center'}}
            gradient
            icon={item.icon}
            onPress={item.onPress}
            value={item.title}
            style={{alignSelf: 'center', marginTop: 20}}
          />
        )}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.text}>
          By continuing, you agree to our{' '}
          <Text style={[styles.text, {color: colors.primary}]}>
            Terms & Conditions
          </Text>{' '}
          and{' '}
          <Text style={[styles.text, {color: colors.primary}]}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  container: {
    flex: 1,
  },
  text: {
    color: colors.text,
    fontFamily: fonts[400],
    fontSize: 10,
  },
});
