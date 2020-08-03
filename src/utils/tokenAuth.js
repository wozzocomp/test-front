import gql from 'graphql-tag';
import moment from 'moment';

import { LOCAL_STORAGE_CONST, DATE_FORMAT_FULL } from './constants';
import apolloClient from './apollo';
import { USER, COMMON } from './dispatchTypes';
import store from '../store';

const GET_NEW_TOKEN = gql`
  query newToken($refreshToken: String!) {
    newToken(refreshToken: $refreshToken) {
      user {
        _id
        name
        lastName
        fullName
        userRole {
          _id
          name
        }
      }
      token
      refreshToken
      expiryDate
    }
  }
`;

export const clearSession = () => {
  localStorage.removeItem(LOCAL_STORAGE_CONST.USER_ID);
  localStorage.removeItem(LOCAL_STORAGE_CONST.EXPIRY_DATE);
  localStorage.removeItem(LOCAL_STORAGE_CONST.REFRESH_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_CONST.TOKEN);
};

export const requestNewToken = (refreshToken) =>
  apolloClient
    .query({
      query: GET_NEW_TOKEN,
      variables: { refreshToken },
    })
    .then((response) => {
      const { token, expiryDate } = response.data.newToken;
      localStorage.setItem(LOCAL_STORAGE_CONST.TOKEN, token);
      localStorage.setItem(LOCAL_STORAGE_CONST.EXPIRY_DATE, expiryDate);
      return token;
    })
    .catch(() => {
      clearSession();
    });

export const checkToken = async () => {
  const now = moment(new Date()).format(DATE_FORMAT_FULL);
  const refreshToken = localStorage.getItem(LOCAL_STORAGE_CONST.REFRESH_TOKEN);
  const expiryDate = localStorage.getItem(LOCAL_STORAGE_CONST.EXPIRY_DATE);

  let token = null;
  if (expiryDate && now >= expiryDate) {
    token = await requestNewToken(refreshToken);
  } else {
    token = localStorage.getItem(LOCAL_STORAGE_CONST.TOKEN);
  }

  return token;
};

/**
 * Set local storage values
 * @param {*} user
 */
const setLocalStorage = ({ user, expiryDate, refreshToken, token }) =>
  new Promise((resolve) => {
    localStorage.setItem(LOCAL_STORAGE_CONST.USER_ID, user._id);
    if (expiryDate) {
      localStorage.setItem(LOCAL_STORAGE_CONST.EXPIRY_DATE, expiryDate);
    }
    if (refreshToken) {
      localStorage.setItem(LOCAL_STORAGE_CONST.REFRESH_TOKEN, refreshToken);
    }
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_CONST.TOKEN, token);
    }
    resolve();
  });

export const setSession = (params) =>
  new Promise((resolve) => {
    if (params && params.user && params.user._id) {
      // has user and wanted to be remembered
      setLocalStorage(params).then(() => resolve());
    } else {
      resolve();
    }
  });

export const logout = () => {
  store.dispatch({ type: USER.SET_USER });
  clearSession();
  store.dispatch({ type: COMMON.LOGOUT });
};
