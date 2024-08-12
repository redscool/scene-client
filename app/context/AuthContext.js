import {createContext, useContext, useState} from 'react';
import useService from './ServiceContext';
import {
  getItem,
  getSecureItem,
  removeItem,
  removeSecureItem,
  setItem,
  setSecureItem,
} from '../utils/storage';
import {SECURE_STORAGE_KEY, STORAGE_KEY} from '../config/constants';
import {showToast} from '../components/widgets/toast';

export const AuthContext = createContext();

export default function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
  const {requestWithAccessToken} = useService();

  const [email, setEmail] = useState();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [userId, setUserId] = useState();

  const [name, setName] = useState();
  const [dob, setDob] = useState();
  const [gender, setGender] = useState();
  const [favourites, setFavourites] = useState({});

  const [tickets, setTickets] = useState({});

  const setAuth = async () => {
    const accessToken = await getSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    setAccessToken(accessToken);

    const refreshToken = await getSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN);
    setRefreshToken(refreshToken);

    const userId = await getItem(STORAGE_KEY.USER_ID);
    setUserId(userId);

    const email = await getItem(STORAGE_KEY.EMAIL);
    setEmail(email);

    const name = await getItem(STORAGE_KEY.NAME);
    setName(name);

    const gender = await getItem(STORAGE_KEY.GENDER);
    setGender(gender);

    const dob = await getItem(STORAGE_KEY.DOB);
    setDob(JSON.parse(dob));

    const favourites = await getItem(STORAGE_KEY.FAVOURITES);
    setFavourites(JSON.parse(favourites));

    await initTickets();
  };

  const handleFavourites = async item => {
    const temp = {...favourites};
    if (!temp[item._id]) temp[item._id] = item;
    else temp[item._id] = undefined;
    setFavourites(temp);
    await setItem(STORAGE_KEY.FAVOURITES, JSON.stringify(temp));
  };

  const handleLogin = async ({
    accessToken,
    refreshToken,
    userId,
    email,
    name,
    dob,
    gender,
  }) => {
    await setSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN, accessToken);
    setAccessToken(accessToken);

    await setSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
    setRefreshToken(refreshToken);

    await setItem(STORAGE_KEY.USER_ID, userId);
    setUserId(userId);

    await setItem(STORAGE_KEY.EMAIL, email);
    setEmail(email);

    await setItem(STORAGE_KEY.NAME, name);
    setName(name);

    await setItem(STORAGE_KEY.DOB, JSON.stringify(dob));
    setDob(dob);

    await setItem(STORAGE_KEY.GENDER, gender);
    setGender(gender);

    await initTickets();
  };

  const handleLogout = async () => {
    await removeSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    setAccessToken('');

    await removeSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN);
    setRefreshToken('');

    await removeItem(STORAGE_KEY.USER_ID);
    setUserId('');

    await removeItem(STORAGE_KEY.EMAIL);
    setEmail('');

    await removeItem(STORAGE_KEY.NAME);
    setName('');

    await removeItem(STORAGE_KEY.DOB);
    setDob({});

    await removeItem(STORAGE_KEY.GENDER);
    setGender('');
  };

  const initTickets = async () => {
    if (!accessToken) return;
    try {
      const res = await requestWithAccessToken(
        'get',
        '/api/app/event/tickets',
        {},
      );
      const tickets = {};
      for (const ticket of res) tickets[ticket?.event?._id] = ticket;
      setTickets(tickets);
      console.log(tickets);
    } catch (e) {
      // TODO: error handling
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        email,
        setEmail,
        userId,
        setUserId,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        setAuth,
        name,
        setName,
        dob,
        setDob,
        gender,
        setGender,
        favourites,
        handleFavourites,
        tickets,
        setTickets,
        initTickets,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
