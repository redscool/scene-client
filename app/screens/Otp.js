import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import AppButton from '../components/AppButton';
import colors from '../config/colors';
import fonts from '../config/fonts';
import OTPInput from '../components/OtpInput';
import routes from '../navigation/routes';
import TextButton from '../components/TextButton';
import Timer from '../components/Timer';

const OtpResetPassword = ({navigation}) => {
  const {navigate} = navigation;
  const [otpCode, setOTPCode] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Please enter OTP sent to email id: e@mail.com
      </Text>
      <View style={styles.inputContainer}>
        <OTPInput code={otpCode} length={4} setCode={setOTPCode} />
      </View>
      <Timer style={styles.timer} time={"00:29"}/>
      <TextButton fontStyle={styles.resendText} style={styles.resend} title="Resend OTP"/>
      <AppButton
        fontStyle={styles.buttonFont}
        onPress={() => navigate(routes.RESET_PASSWORD)}
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
    alignSelf: "center",
    marginTop: 20
  }
  ,
  resendText: {
    fontFamily: fonts[600],
    fontSize: 16,
    textAlign: "center",
  },
  text: {
    color: colors.text,
    fontFamily: fonts[400],
    fontSize: 16,
    marginLeft: 30,
    marginTop: 40,
  },
  timer:{
    alignSelf: "center",
    marginTop: 20,
  },
});
