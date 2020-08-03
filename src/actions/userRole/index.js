import { apolloQuery, apolloMutation } from '../../utils/ApiWrapper';
import userRoleQueries from './userRoleQueries';
import userRoleMutations from './userRoleMutations';
import { sortArray } from '../../utils/functions';
import { translate } from '../../utils/translate/translator';

export const formatUserRole = (element) =>
  element ?
    {
        ...element,
        translation: translate(`userRole.roles.${element.name}`) || element.name,
      } :
    null;

const formatArray = (array) => (array?.length ? array.map(formatUserRole) : null);

export const getUserRoles = () =>
  new Promise((resolve, reject) => {
    apolloQuery(userRoleQueries.userRoles)
      .then((response) => {
        const formatted = sortArray(formatArray(response.data.userRoles), 'translation');
        resolve(formatted);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const disableUserRole = (userRoleId) =>
  new Promise((resolve, reject) => {
    apolloMutation(userRoleMutations.disableUserRole, { userRoleId })
      .then((response) => {
        resolve(response.data.disableUserRole);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const activateUserRole = (userRoleId) =>
  new Promise((resolve, reject) => {
    apolloMutation(userRoleMutations.activateUserRole, { userRoleId })
      .then((response) => {
        resolve(response.data.activateUserRole);
      })
      .catch((err) => {
        reject(err);
      });
  });
