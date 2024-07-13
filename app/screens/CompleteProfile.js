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
import useAppConfig from '../context/AppConfigContext';

const CompleteProfile = ({navigation}) => {
  const {requestWithAccessToken} = useService();
  const {navigate} = navigation;
  const {genders} = useAppConfig();

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState();

  const handleContinue = async () => {
    if (!name || !selected) {
      navigate(routes.TABS);
      return;
    }
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

      navigation.reset({
        index: 0,
        routes: [{name: routes.TABS}],
      });
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
        title="Confirm"
        onPress={handleContinue}
      />
    </View>
  );
};

export default CompleteProfile;

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
