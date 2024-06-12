import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import QRgenerator from '../components/QRGenerator';
import NormalText from '../components/NormalText';
import TextButton from '../components/TextButton';
import fonts from '../config/fonts';
import {getItem} from '../utils/storage';
import {STORAGE_KEY} from '../config/constants';

function Ticket({route}) {
  const ticketId = route.params;
  const [QRvalue, setQRvalue] = useState();

  const init = async () => {
    const userId = await getItem(STORAGE_KEY.USER_ID);
    const temp = userId + ticketId;
    setQRvalue(temp);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.note}>
        <NormalText fontStyle={styles.fontStyle} text={'Scan the QR Code. '} />
        <TextButton fontStyle={styles.fontStyle} title={'Need Help?'} />
      </View>
      <View style={styles.QRContainer}>
        <QRgenerator QRvalue={QRvalue} />
      </View>
    </View>
  );
}

export default Ticket;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  fontStyle: {
    fontFamily: fonts[400],
    fontSize: 12,
  },
  note: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '80%',
    marginTop: 50,
    justifyContent: 'center',
  },
  QRContainer: {
    marginTop: 50,
  },
});
