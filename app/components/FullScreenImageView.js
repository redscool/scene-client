import {Image, Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../config/colors';

const FullScreenImageView = ({setVisible, url, visible}) => {
  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => setVisible(false)}>
      <View style={styles.container}>
        <Image resizeMode="contain" source={{uri: url}} style={styles.image} />
      </View>
    </Modal>
  );
};

export default FullScreenImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: 300,
  },
});
