// ------------------------------------
// COMMON
// ------------------------------------
export const WRONG_PARAMS = new Error('Wrong parameters');
export const IMAGES_ACCEPTED_TYPES = '.png,.jpg,.jpeg';

// ------------------------------------
// DATES
// ------------------------------------
export const DATE_FORMAT = 'YYYY/MM/DD';
export const DATE_FORMAT_TO_SHOW = 'DD/MM/YYYY';
export const HOUR_FORMAT = 'HH:mm';
export const DATE_FORMAT_FULL = `${DATE_FORMAT} ${HOUR_FORMAT}`;
export const DATE_FORMAT_FULL_TO_SHOW = `${DATE_FORMAT_TO_SHOW} ${HOUR_FORMAT}`;

// ------------------------------------
// LOCAL_STORAGE
// ------------------------------------
export const LANGUAGES = {
  ES: 'es',
  EN: 'en',
};

export const DEFAULT_LANG = LANGUAGES.ES;

// ------------------------------------
// LOCAL_STORAGE
// ------------------------------------
export const LOCAL_STORAGE_CONST = {
  LANGUAGE: 'currentLang',
  REFRESH_TOKEN: 'refreshToken',
  TOKEN: 'token',
  USER_ID: 'userId',
  EXPIRY_DATE: 'expiryDate',
};

// ------------------------------------
// ROLES
// ------------------------------------
export const ROLES = {
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
};

// ------------------------------------
// SCREEN SIZES
// ------------------------------------
export const SCREEN_SIZE_SM = 576;
export const SCREEN_SIZE_MD = 768;
export const SCREEN_SIZE_LG = 992;
export const SCREEN_SIZE_XL = 1200;
