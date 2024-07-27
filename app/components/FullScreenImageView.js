import { Image, Modal, StyleSheet, View, Platform } from 'react-native';
import React from 'react';
import colors from '../config/colors';
import AppButton from './AppButton';

const FullScreenImageView = ({ setVisible, url, visible }) => {
  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.container}>
        <Image resizeMode="contain" source={{ uri: url }} style={styles.image} />
        {
          Platform.OS === 'ios' &&
          <AppButton
            icon={'back'}
            onPress={() => setVisible(false)}
            iconColor={colors.light}
            iconSize={32}
            style={{
              marginTop: 4,
              borderColor: colors.light,
              borderRadius: 0,
              // borderWidth: 0,
            }}
          />
        }

      </View>
    </Modal>
  );
};

export default FullScreenImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.glassDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: 300,
  },
});
