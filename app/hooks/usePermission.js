import {PermissionsAndroid} from 'react-native';
export function getPermission() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
}
