import { translate } from './translate/translator';
import { BACKOFFICE_USERS_URL, BACKOFFICE_ERRORS_URL, BACKOFFICE_USER_ROLES_URL } from './urls';

export const ELEMENTS = [
  {
    icon: 'fas fa-users',
    text: translate('navbar.users'),
    url: BACKOFFICE_USERS_URL,
  },
];

export const SUPERADMIN_ELEMS = [
  {
    icon: 'fas fa-exclamation-triangle',
    text: translate('navbar.errors'),
    url: BACKOFFICE_ERRORS_URL,
  },
  {
    icon: 'fas fa-user-tag',
    text: translate('navbar.userRoles'),
    url: BACKOFFICE_USER_ROLES_URL,
  },
];
