import { SCREEN_SIZE_LG, SCREEN_SIZE_XL, SCREEN_SIZE_MD, SCREEN_SIZE_SM, ROLES } from './constants';

/**
 * Make a deep copy of an element
 * @param {*} elem
 */
export const deepCopy = (elem) => JSON.parse(JSON.stringify(elem));

/**
 * Return if is of type function
 * @param {*} elem
 */
export const isFunction = (elem) => 'function' === typeof elem;

/**
 * Return true if is of type object
 * @param {*} elem
 */
export const isObject = (elem) => 'object' === typeof elem;

/**
 * Return if the screen is bigger than 1200px
 */
export const screenLowerThanXl = () => SCREEN_SIZE_XL >= window.innerWidth;

/**
 * Return if the screen is bigger than 992px
 */
export const screenLowerThanLg = () => SCREEN_SIZE_LG >= window.innerWidth;

/**
 * Return if the screen is bigger than 768px
 */
export const screenLowerThanMd = () => SCREEN_SIZE_MD >= window.innerWidth;

/**
 * Return if the screen is bigger than 576px
 */
export const screenLowerThanSm = () => SCREEN_SIZE_SM >= window.innerWidth;

export const userIsSuperadmin = (userRole) => userRole === ROLES.SUPERADMIN;
export const userIsAdmin = (userRole) => userRole === ROLES.ADMIN;
export const userIsAdminOrMore = (userRole) => userIsAdmin(userRole) || userIsSuperadmin(userRole);

/**
 * Gets the element to compare
 * @param {*} element
 * @param {*} parameter
 */
const getComparator = (element, param) => {
  if (!param) {
    return element;
  }

  const parameter = param && -1 < param.indexOf('.') ? param.split('.') : param;

  if (Array.isArray(parameter)) {
    for (let i = 0, { length } = parameter; i < length; ++i) {
      const elem = parameter[i];
      if ('object' === typeof element && elem in element) {
        element = element[elem];
      } else {
        return null;
      }
    }
    return element;
  }
  if (element && parameter) {
    return element[parameter];
  }
  return null;
};

/**
 * Sorts an array of elements by a param
 * @param {Array} elements
 * @param {String} param
 * @param {Boolean} descending
 */
export const sortArray = (elements, param, descending) => {
  let sortedElems = [];
  if (elements && elements.length) {
    sortedElems = [ ...elements ];
    let elemA = null;
    let elemB = null;
    sortedElems.sort((a, b) => {
      elemA = getComparator(a, param);
      elemB = getComparator(b, param);

      if (elemA === elemB) {
        return 0;
      }

      const val = (descending && elemA < elemB) || (!descending && elemA > elemB) ? 1 : -1;
      return val;
    });
  }
  return sortedElems;
};

export const cleanUrl = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/à|á|â/g, 'a')
    .replace(/è|é|ê/g, 'e')
    .replace(/ì|í|î/g, 'i')
    .replace(/ò|ó|ô/g, 'o')
    .replace(/ù|ú|û/g, 'u')
    .replace(/ä/g, 'ae')
    .replace(/ë/g, 'e')
    .replace(/ï/g, 'i')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/ñ/g, 'n')
    .replace(/\//g, '-')
    .replace(/\s{2,}/g, ' ') // double space to single space
    .replace(/\s/g, '-') // single space to _
    .replace(/[^a-z0-9-]+/g, '');

export const createSearchUrl = (search) => `?search=${search}`;
