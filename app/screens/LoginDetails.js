import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

import AppButton from '../components/AppButton';
import colors from '../config/colors';
import fonts from '../config/fonts';
import Icon from '../Icons';
import routes from '../navigation/routes';
import useService from '../context/ServiceContext';
import {showToast} from '../components/widgets/toast';

const LoginDetails = ({navigation}) => {
  const {navigate} = navigation;
  const {request} = useService();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState();

  const handleContinue = async () => {
    setLoading(true);
    try {
      await request('post', '/api/auth/user/login', {email});
      navigate(routes.OTP, email);
    } catch (e) {
      // TODO: error handling
      showToast('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please enter your email id</Text>
      <View style={styles.inputContainer}>
        <Icon name="email" size={26} color={colors.text} style={styles.icon} />
        <TextInput
          placeholder="email@example.com"
          placeholderTextColor={colors.placeholder}
          keyboardType="email-address"
          autoComplete="email"
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <AppButton
        active={!loading}
        fontStyle={styles.buttonFont}
        solid
        title="Continue"
        style={styles.button}
        onPress={handleContinue}
      />
    </View>
  );
};

export default LoginDetails;

const styles = StyleSheet.create({
  button: {
    height: 29,
    width: 155,
    alignSelf: 'center',
    marginBottom: 80,
    marginTop: 'auto',
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
  input: {
    backgroundColor: colors.secondary,
    flex: 1,
    marginLeft: 10,
    marginRight: 30,
    height: 28,
    borderRadius: 4,
    color: colors.medium,
    fontSize: 16,
    fontFamily: fonts[500],
    padding: 0,
    paddingHorizontal: 5,
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    height: 30,
    width: '100%',
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontFamily: fonts[400],
    marginLeft: 30,
    marginTop: 40,
  },
});
