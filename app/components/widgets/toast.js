import {ToastAndroid} from 'react-native';

export const showToast = text => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};
