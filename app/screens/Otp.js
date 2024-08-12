import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppButton from '../components/AppButton';
import colors from '../config/colors';
import fonts from '../config/fonts';
import OTPInput from '../components/OtpInput';
import routes from '../navigation/routes';
import TextButton from '../components/TextButton';
import Timer from '../components/Timer';
import {showToast} from '../components/widgets/toast';
import useService from '../context/ServiceContext';
import useAuth from '../context/AuthContext';
import SafeKeyboardView from '../components/SafeKeyboardView';

const OtpResetPassword = ({navigation, route}) => {
  const {request} = useService();
  const {handleLogin} = useAuth();

  const email = route.params;

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState();
  const [otpLoading, setOtpLoading] = useState();
  const [timer, setTimer] = useState(120);

  const handleContinue = async () => {
    setLoading(true);
    try {
      if (!otp) return;
      const res = await request('post', '/api/auth/user/verifyOtp', {
        otp,
        email,
      });

      if (res?.error) {
        showToast('Incorrect OTP.');
        setLoading(false);
        return;
      }

      const {accessToken, refreshToken, profileComplete, userId, profile} = res;

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
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setOtpLoading(true);

    try {
      await request('post', '/api/auth/user/login', {email});
      showToast('Otp sent successfully.');
    } catch (e) {
      // TODO: error handling
      showToast('Something went wrong.');
    }
    setTimer(120);
    setOtpLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <SafeKeyboardView style={styles.container}>
      <Text style={styles.text}>
        Please enter OTP sent to email id: e@mail.com
      </Text>
      <View style={styles.inputContainer}>
        <OTPInput code={otp} length={4} setCode={setOtp} />
      </View>
      <Timer
        style={styles.timer}
        time={`0${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${
          timer % 60
        }`}
      />
      <TextButton
        active={!otpLoading && timer === 0}
        fontStyle={styles.resendText}
        style={styles.resend}
        title="Resend OTP"
        onPress={handleResendOtp}
      />
      <AppButton
        active={!loading}
        fontStyle={styles.buttonFont}
        onPress={handleContinue}
        solid
        style={styles.button}
        title="Continue"
      />
    </SafeKeyboardView>
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
