import axios from 'axios';
import config from '../config/config.json';
import {getItem, getSecureItem, setSecureItem} from '../utils/storage';
import {HEADERS, SECURE_STORAGE_KEY, STORAGE_KEY} from '../config/constants';
import routes from '../navigation/routes';

const SERVER = config.SERVER;

const getUpdatedUrl = (url, body = {}) => {
  let newUrl = url;
  const keys = Object.keys(body);
  if (keys.length > 0) {
    newUrl = newUrl + '?';
    for (let i = 0; i < keys.length; i++) {
      newUrl =
        newUrl +
        encodeURIComponent(keys[i]) +
        '=' +
        encodeURIComponent(body[keys[i]]) +
        '&';
    }
    newUrl = newUrl.slice(0, -1);
  }
  return newUrl;
};

const httpRequest = async (method, url, body, config) => {
  try {
    if (method === 'get' || method === 'delete') {
      url = getUpdatedUrl(url, body);
      body = config;
    }
    const {data: response} = await axios[method](url, body, config);
    return response;
  } catch (err) {
    const errCode = err?.code;
    const request = {
      method: err?.config?.method,
      url: err?.config?.url,
      body: err?.config?.data,
      headers: err?.config?.headers?.toJSON?.(),
    };
    if (errCode === 'ERR_NETWORK' || errCode === 'ECONNREFUSED') {
      throw {
        message: 'Network Error',
        request,
      };
    } else if (errCode === 'ERR_CANCELED') {
      throw {
        message: 'Request Cancelled',
        request,
      };
    } else if (err?.response?.data) {
      throw {
        message: 'Bad Request',
        error: err?.response?.data,
        status: err?.response?.status,
        request,
      };
    }
    throw err;
  }
};

const refreshAccessToken = async navigation => {
  const refreshToken = await getSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN);
  const userId = await getItem(STORAGE_KEY.USER_ID);
  try {
    const data = await httpRequest(
      'post',
      `${SERVER}/api/auth/user/newAccessToken`,
      {
        userId,
        refreshToken,
      },
      {},
    );
    await setSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
    return true;
  } catch (_e) {
    navigation.navigate(routes.LOGIN);
    return false;
  }
};

export const requestWithAccessToken =
  navigation =>
  async (method, route, body, replayed = false) => {
    const token = await getSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    const appVersion = await getSecureItem(HEADERS.APP_VERSION);
    const bundleVersion = await getSecureItem(HEADERS.BUNDLE_VERSION);
    const device = await getSecureItem(HEADERS.DEVICE);
    const deviceId = await getSecureItem(HEADERS.DEVICE_ID);

    const config = {
      headers: {
        [HEADERS.AUTHORIZATION]: token,
        [HEADERS.APP_VERSION]: appVersion,
        [HEADERS.BUNDLE_VERSION]: bundleVersion,
        [HEADERS.DEVICE]: device,
        [HEADERS.DEVICE_ID]: deviceId,
      },
    };

    try {
      const data = await httpRequest(method, `${SERVER}${route}`, body, config);
      return data;
    } catch (err) {
      if (replayed) {
        navigation.navigate(routes.LOGIN);
        throw err;
      }
      await refreshAccessToken(navigation);
      const res = await requestWithAccessToken(navigation)(
        method,
        route,
        body,
        true,
      );
      return res;
    }
  };

export const request = navigation => async (method, route, body) => {
  try {
    const token = await getSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    const appVersion = await getItem(HEADERS.APP_VERSION);
    const bundleVersion = await getItem(HEADERS.BUNDLE_VERSION);
    const device = await getItem(HEADERS.DEVICE);
    const deviceId = await getItem(HEADERS.DEVICE_ID);

    const config = {
      headers: {
        [HEADERS.AUTHORIZATION]: token,
        [HEADERS.APP_VERSION]: appVersion,
        [HEADERS.BUNDLE_VERSION]: bundleVersion,
        [HEADERS.DEVICE]: device,
        [HEADERS.DEVICE_ID]: deviceId,
      },
    };
    const res = await httpRequest(method, `${SERVER}${route}`, body, config);
    return res;
  } catch (err) {
    return {error: true};
  }
};

export const requestFileServer =
  navigation =>
  async (method, url, body, formData = true, replayed = false) => {
    const token = await getSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    const config = {
      headers: {
        Authorization: token,
        ...(formData && {'content-type': 'multipart/form-data'}),
      },
    };
    try {
      const data = await httpRequest(method, url, body, config);
      return data;
    } catch (err) {
      if (err?.status !== 401) {
        throw err;
      }
      if (replayed) {
        navigation.navigate(routes.LOGIN);
        throw err;
      }
      await refreshAccessToken(navigation);
      const res = await requestFileServer(navigation)(
        method,
        url,
        body,
        formData,
        true,
      );
      return res;
    }
  };
