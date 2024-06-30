import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import AppButton from '../components/AppButton';
import colors from '../config/colors';
import fonts from '../config/fonts';
import OTPInput from '../components/OtpInput';
import routes from '../navigation/routes';
import TextButton from '../components/TextButton';
import Timer from '../components/Timer';
import {showToast} from '../components/widgets/toast';
import useService from '../../context/ServiceContext';
import {setItem, setSecureItem} from '../utils/storage';
import {SECURE_STORAGE_KEY, STORAGE_KEY} from '../config/constants';

const OtpResetPassword = ({navigation, route}) => {
  const {navigate} = navigation;
  const {request} = useService();

  const email = route.params;

  const [otp, setOtp] = useState('');

  const handleContinue = async () => {
    try {
      if (!otp) return;
      const res = await request('post', '/api/auth/user/verifyOtp', {
        otp,
        email,
      });
      await setSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN, res.accessToken);
      await setSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN, res.refreshToken);
      await setItem(STORAGE_KEY.USER_ID, res.userId);
      if (res.profile) {
        await setItem(STORAGE_KEY.NAME, res.profile.name);
        await setItem(STORAGE_KEY.DOB, res.profile.dob);
        await setItem(STORAGE_KEY.GENDER, res.profile.gender);
        navigate(routes.TABS);
      } else {
        navigate(routes.COMPLETE_PROFILE);
      }
    } catch (e) {
      // TODO: error handling
      console.log(e);
      showToast('Something went wrong.');
    }
  };

  const handleResendOtp = async () => {
    try {
      await request('post', '/api/auth/user/login', {email});
      showToast('Otp sent successfully.');
    } catch (e) {
      // TODO: error handling
      showToast('Something went wrong.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Please enter OTP sent to email id: e@mail.com
      </Text>
      <View style={styles.inputContainer}>
        <OTPInput code={otp} length={4} setCode={setOtp} />
      </View>
      <Timer style={styles.timer} time={'00:29'} />
      <TextButton
        fontStyle={styles.resendText}
        style={styles.resend}
        title="Resend OTP"
        onPress={handleResendOtp}
      />
      <AppButton
        fontStyle={styles.buttonFont}
        onPress={handleContinue}
        solid
        style={styles.button}
        title="Continue"
      />
    </View>
  );
};

export default OtpResetPassword;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    height: 29,
    marginBottom: 80,
    marginTop: 'auto',
    width: 155,
  },
  buttonFont: {
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  icon: {
    marginLeft: 30,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    marginTop: 55,
    width: '100%',
    borderWidth: 1,
  },
  resend: {
    alignSelf: 'center',
    marginTop: 20,
  },
  resendText: {
    fontFamily: fonts[600],
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    color: colors.text,
    fontFamily: fonts[400],
    fontSize: 16,
    marginLeft: 30,
    marginTop: 40,
  },
  timer: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
