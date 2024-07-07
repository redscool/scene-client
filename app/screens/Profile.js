import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppButton from '../components/AppButton';
import DateInput from '../components/DateInput';
import Dropdown from '../components/DropDown';
import Input from '../components/Input';
import VerifyImage from '../components/VerifyImage';
import useService from '../context/ServiceContext';
import {showToast} from '../components/widgets/toast';
import routes from '../navigation/routes';
import {setItem} from '../utils/storage';
import {STORAGE_KEY} from '../config/constants';
import useAuth from '../context/AuthContext';
import useAppConfig from '../context/AppConfigContext';
import { StackActions } from '@react-navigation/native';

const Profile = ({navigation}) => {
  const {requestWithAccessToken} = useService();
  const {navigate} = navigation;
  const {genders} = useAppConfig();
  const {
    name: userName,
    dob: userDob,
    gender: userGender,
    accessToken,
    setDob: userSetDob,
    setName: userSetName,
    setGender: userSetGender,
  } = useAuth();

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState();

  const init = async () => {
    if (!accessToken) {
      showToast('Please login first.');
      navigation.dispatch(StackActions.replace(routes.LOGIN));
    }
    setName(userName);
    setSelected({label: userGender});
    if (userDob?.day) {
      const dateObj = new Date();
      dateObj.setFullYear(userDob.year, userDob.month - 1, userDob.day);
      setDate(dateObj);
    }
  };

  const handleContinue = async () => {
    if (!name || !selected) return;
    // TODO: error handling
    try {
      // TODO: no value entered
      await requestWithAccessToken('post', '/api/auth/user/updateprofile', {
        name,
        gender: selected.label,
        dob: date,
      });

      await setItem(STORAGE_KEY.NAME, name);
      await setItem(
        STORAGE_KEY.DOB,
        JSON.stringify({
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        }),
      );
      await setItem(STORAGE_KEY.GENDER, selected.label);

      userSetName(name);
      userSetDob({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
      userSetGender(selected.label);

      showToast('Profile updated successfully');
    } catch (e) {
      // TODO: error handling
      console.log(e);
      showToast('Something went wrong');
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <VerifyImage style={styles.verifyImage} />
      <Input
        label="Name"
        setState={setName}
        state={name}
        placeholder="Name"
        style={styles.name}
      />
      <DateInput
        state={date}
        label="DOB"
        placeholder="DD/MM/YYYY"
        setState={setDate}
        style={styles.name}
      />
      <Dropdown
        initialSelected={selected}
        data={genders}
        label={'Gender'}
        onSelect={setSelected}
        placeholder={'Select'}
        style={styles.name}
      />
      <AppButton
        fontStyle={styles.buttonFont}
        solid
        style={styles.button}
        title="Update"
        onPress={handleContinue}
      />
    </View>
  );
};

export default Profile;

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
  name: {
    marginTop: 20,
  },
  verifyImage: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});
