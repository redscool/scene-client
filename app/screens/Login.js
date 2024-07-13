import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import colors from '../config/colors';
import fonts from '../config/fonts';
import ListItem from '../components/ListItem';
import routes from '../navigation/routes';
import {showToast} from '../components/widgets/toast';
import useService from '../context/ServiceContext';
import useAuth from '../context/AuthContext';

GoogleSignin.configure({
  webClientId:
    '986368488233-f3bpk3fh3264m0kpdkh191g7odr6fft8.apps.googleusercontent.com',
  offlineAccess: true,
});

const Login = ({navigation}) => {
  const {request} = useService();
  const {handleLogin} = useAuth();

  const {navigate} = navigation;

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    try {
      await GoogleSignin.signOut();
      const res = await GoogleSignin.signIn();
      const {serverAuthCode} = res;
      const temp = await request('post', '/api/auth/user/googleLogin', {
        code: serverAuthCode,
      });

      const email = res.user.email;
      const {accessToken, refreshToken, profileComplete, userId, profile} =
        temp;

      const name = profile && profile.name ? profile.name : '';
      const dob = profile && profile.dob ? profile.dob : {};
      const gender = profile && profile.gender ? profile.gender : '';

      handleLogin({
        accessToken,
        refreshToken,
        userId,
        email,
        dob,
        name,
        gender,
      });

      navigation.reset({
        index: 0,
        routes: [
          {name: profileComplete ? routes.TABS : routes.COMPLETE_PROFILE},
        ],
      });
      showToast('Login Successfully.');
    } catch (e) {
      // TODO: error handling
      console.log(e);
      showToast('Something went wrong.');
    }
  };
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
