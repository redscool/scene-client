import React, {useRef, useState, useEffect} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import colors from '../config/colors';
import fonts from '../config/fonts';

const Box = ({value}) => {
  return (
    <View style={styles.box}>
      <Text style={styles.boxText}>{value}</Text>
    </View>
  );
};
const OTPInput = ({code, setCode, length}) => {
  const [array, setArray] = useState(['-', '-', '-', '-']);
  const boxes = [];
  for (let i = 0; i < length; i++) boxes.push(0);

  const ref = useRef(null);

  const set_code = async () => {
    const array = ['-', '-', '-', '-'];
    for (let i = 0; i < code.length; i++) array[i] = code[i];
    setArray(array);
  };
  useEffect(() => {
    set_code();
  }, [code]);

  const handleClick = () => {
    ref.current.blur();
    setTimeout(() => {
      ref.current.focus();
    }, 0);
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus={false}
        keyboardType="number-pad"
        maxLength={4}
        onChangeText={text => setCode(text)}
        ref={ref}
        style={styles.input}
        value={code}
      />
      <Pressable onPress={handleClick}>
        <FlatList
          data={boxes}
          horizontal
          ItemSeparatorComponent={() => <View style={{width: 28 / 3}} />}
          renderItem={({item, index}) => <Box value={array[index]} />}
          scrollEnabled={false}
          style={styles.boxContainer}
        />
      </Pressable>
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    backgroundColor: 'green',
    opacity: 0,
    position: 'absolute',
  },
  boxContainer: {
    height: 28,
    width: 140,
  },
  box: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 4,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },

  boxText: {
    color: colors.medium,
    fontFamily: fonts[700],
    fontSize: 17,
  },

  focused: {
    backgroundColor: 'grey',
  },
});
