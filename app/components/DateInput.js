import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import colors from '../config/colors';
import fonts from '../config/fonts';
import {convert_date_to_ddmmyyyy_format} from '../utils/misc';

const DateInput = ({date, label, mode = 'date', setDate, style}) => {
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.input} onPress={() => setShow(true)}>
        <Text style={styles.inputText}>
          {convert_date_to_ddmmyyyy_format(date)}
        </Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            onChange={onChange}
          />
        )}
      </Pressable>
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 50,
    width: '80%',
  },
  input: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
    height: 28,
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 'auto',
    paddingHorizontal: 10,
  },
  inputText: {
    color: colors.medium,
    fontFamily: fonts[500],
    fontSize: 14,
    marginVertical: 'auto',
  },
  label: {
    color: colors.white,
    fontFamily: fonts[600],
    fontSize: 12,
    marginLeft: 10,
  },
});
