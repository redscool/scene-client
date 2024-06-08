import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import AppButton from '../components/AppButton';
import DateInput from '../components/DateInput';
import Dropdown from '../components/DropDown';
import Input from '../components/Input';
import VerifyImage from '../components/VerifyImage';

const CompleteProfile = () => {
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState(undefined);
  const data = [
    {label: 'Male', value: '1'},
    {label: 'Female', value: '2'},
  ];
  return (
    <View style={styles.container}>
      <VerifyImage style={styles.verifyImage} />
      <Input label="Name" placeholder="Name" style={styles.name} />
      <DateInput
        date={date}
        label="DOB"
        placeholder="DD/MM/YYYY"
        setDate={setDate}
        style={styles.name}
      />
      <Dropdown
        data={data}
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
