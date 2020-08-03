import { WRONG_PARAMS, LOCAL_STORAGE_CONST } from '../../utils/constants';
import { apolloQuery, apolloMutation } from '../../utils/ApiWrapper';
import { setSession, logout } from '../../utils/tokenAuth';
import userQueries from './userQueries';
import { USER } from '../../utils/dispatchTypes';
import userMutations from './userMutations';
import { formatUserRole } from '../userRole';

const LOADING = { type: USER.LOADING };
const LOADING_END = { type: USER.LOADING_END };

const setUser = (user) => (dispatch) => {
  dispatch({ type: USER.SET_USER, user });
};

export const autologin = () => (dispatch) => {
  dispatch(LOADING);
  const _id = localStorage.getItem(LOCAL_STORAGE_CONST.USER_ID);

  return new Promise((resolve, reject) => {
    if (!_id) {
      resolve();
      dispatch(LOADING_END);
    } else {
      apolloQuery(userQueries.autologin, { _id })
        .then((response) => {
          const { me: user } = response.data;
          resolve({ user });
          dispatch(setUser(user));
          dispatch(LOADING_END);
        })
        .catch((error) => {
          reject(error);

          if ('UNAUTHENTICATED' === error?.extensions?.code) {
            logout();
            dispatch(LOADING_END);
          }
        });
    }
  });
};

export const login = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    if (!email || !password) {
      reject(WRONG_PARAMS);
    } else {
      apolloQuery(userQueries.login, { email, password })
        .then((response) => {
          const { login: responseData } = response.data;
          const { user } = responseData;

          setSession(responseData);
          dispatch(setUser(user));
          resolve({ user });
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

const format = (element) =>
  element ?
    {
        ...element,
        userRole: formatUserRole(element.userRole),
      } :
    null;

const formatArray = (array) => (array?.length ? array.map(format) : null);

export const getUsers = (filters) =>
  new Promise((resolve, reject) => {
    apolloQuery(userQueries.users, filters)
      .then((response) => {
        const _id = localStorage.getItem(LOCAL_STORAGE_CONST.USER_ID);

        const users = formatArray(response?.data?.users?.filter((usr) => usr._id !== _id));

        resolve(users);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const disableUser = (_id) =>
  new Promise((resolve, reject) => {
    if (!_id) {
      reject(WRONG_PARAMS);
    } else {
      apolloMutation(userMutations.disableUser, { _id })
        .then((response) => {
          resolve(format(response.data.disableUser));
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const activateUser = (_id) =>
  new Promise((resolve, reject) => {
    if (!_id) {
      reject(WRONG_PARAMS);
    } else {
      apolloMutation(userMutations.activateUser, { _id })
        .then((response) => {
          resolve(format(response.data.activateUser));
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

const formatForSave = (user) => ({
  _id: user._id,
  name: user.name,
  lastName: user.lastName,
  fullName: `${user.name}${user.lastName ? ` ${user.lastName}` : ''}`,
  password: user.password,
  email: user.email,
  userRoleId: user.userRole._id,
});

export const createUser = (user) =>
  new Promise((resolve, reject) => {
    if (!user || !user.name || !user.password || !user.email || !user.userRole || !user.userRole._id) {
      reject(WRONG_PARAMS);
    } else {
      apolloMutation(userMutations.createUser, { user: formatForSave(user) })
        .then((response) => {
          resolve(format(response.data.createUser));
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const updateUser = (user) =>
  new Promise((resolve, reject) => {
    if (!user || !user.name || !user.email || !user.userRole || !user.userRole._id) {
      reject(WRONG_PARAMS);
    } else {
      apolloMutation(userMutations.updateUser, { user: formatForSave(user) })
        .then((response) => {
          resolve(format(response.data.updateUser));
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const updateCurrentUser = (user) => (dispatch) => {
  dispatch({ type: USER.LOADING });
  return new Promise((resolve, reject) => {
    updateUser(user)
      .then((response) => {
        dispatch(setUser(response));
        resolve(response);
        dispatch({ type: USER.LOADING_END });
      })
      .catch((error) => {
        reject(error);
        dispatch({ type: USER.LOADING_END });
      });
  });
};

export const updatePassword = (userId, password) =>
  new Promise((resolve, reject) => {
    if (!userId || !password) {
      reject(WRONG_PARAMS);
    } else {
      apolloMutation(userMutations.generatePassword, { userId, password })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const deleteUser = (_id) =>
  new Promise((resolve, reject) => {
    if (!_id) {
      reject(WRONG_PARAMS);
    } else {
      apolloMutation(userMutations.deleteUser, { _id })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const restoreUser = (_id) =>
  new Promise((resolve, reject) => {
    if (!_id) {
      reject(WRONG_PARAMS);
    } else {
      apolloMutation(userMutations.restoreUser, { _id })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const changePassword = (params) =>
  new Promise((resolve, reject) => {
    if (!params || !params.oldPassword || !params.newPassword) {
      reject(WRONG_PARAMS);
    } else {
      apolloMutation(userMutations.changePassword, params)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
