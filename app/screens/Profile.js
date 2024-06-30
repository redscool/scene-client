import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppButton from '../components/AppButton';
import DateInput from '../components/DateInput';
import Dropdown from '../components/DropDown';
import Input from '../components/Input';
import VerifyImage from '../components/VerifyImage';
import useService from '../../context/ServiceContext';
import {showToast} from '../components/widgets/toast';
import routes from '../navigation/routes';
import {setItem} from '../utils/storage';
import {STORAGE_KEY} from '../config/constants';
import useUser from '../../context/UserContext';

const Profile = ({navigation}) => {
  const {request, requestWithAccessToken} = useService();
  const {navigate} = navigation;
  const user = useUser();

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState();
  const [genders, setGenders] = useState([]);

  const init = async () => {
    try {
      const res = await request('get', '/api/app/genders', {});
      const temp = [];
      for (const gender of res)
        temp.push({
          label: gender,
        });
      setGenders(temp);
    } catch (e) {
      // TODO: error handling
      console.log(e);
    }
    setName(user.name);
    setSelected({label: user.gender});
    // setName(user.dob);
  };

  const handleContinue = async () => {
    if (!name || !selected) return;
    // TODO: error handling
    try {
      // TODO: no value entered
      const res = await requestWithAccessToken(
        'post',
        '/api/auth/user/updateprofile',
        {name, gender: selected.label, dob: date},
      );
      await setItem(STORAGE_KEY.NAME, name);
      await setItem(STORAGE_KEY.DOB, date.toString());
      await setItem(STORAGE_KEY.GENDER, selected.label);
      user.setName(name);
      user.setDob(date.toString());
      user.setGender(selected.label);
      navigate(routes.TABS);
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
