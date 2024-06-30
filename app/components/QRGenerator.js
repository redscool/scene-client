import React from 'react';
import {StyleSheet, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

function QRgenerator({QRvalue}) {
  return (
    <View style={styles.container}>
      <QRCode value={QRvalue} size={200} />
    </View>
  );
}

export default QRgenerator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
