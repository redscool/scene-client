import {createContext, useContext, useState} from 'react';
import useService from './ServiceContext';
import { getSecureItem, setSecureItem } from '../app/utils/storage';
import { SECURE_STORAGE_KEY, STORAGE_KEY } from '../app/config/constants';

export const AuthContext = createContext();

export default function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
  const {request} = useService();

  const [email, setEmail] = useState();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [userId, setUserId] = useState();

  const setAuth = async () => {
    const accessToken = await getSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    setAccessToken(accessToken);

    const refreshToken = await getSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN);
    setRefreshToken(refreshToken);

    const userId = await getSecureItem(STORAGE_KEY.USER_ID);
    setUserId(userId);

    const email = await getSecureItem(STORAGE_KEY.EMAIL);
    setEmail(email);
  };

  const login = async (email, password) => {
    const data = await request('post', '/api/auth/organiser/login', {
      email,
      password,
    });

    if (data?.error) return false;

    const {accessToken, refreshToken, userId} = data;

    await setSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN, accessToken);
    setAccessToken(accessToken);

    await setSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
    setRefreshToken(refreshToken);

    await setSecureItem(STORAGE_KEY.USER_ID, userId);
    setUserId(userId);

    await setSecureItem(STORAGE_KEY.EMAIL, email);
    setEmail(email);

    return true;
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        email,
        setEmail,
        userId,
        setUserId,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        setAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
