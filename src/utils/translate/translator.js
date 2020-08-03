import es from './es';
import en from './en';

const translations = { es, en };

export const LANG_IDS = {
  english: 'en',
  spanish: 'es',
};

export const setLocale = (lang) => {
  localStorage.setItem('language', lang);
};

// Remove this comment for enabling multiples languages
export const getLocale = () => {
  if (!localStorage.language) {
    return LANG_IDS.spanish;
  }
  return localStorage.language;
};

export const isSpanish = () => LANG_IDS.spanish === getLocale();

/**
 * Resolves a string 'index' for the JavaScript Object
 */
const resolveIndex = (str) => {
  str = str.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  str = str.replace(/^\./, ''); // strip a leading dot
  const array = str.split('.');

  let translationsLang = translations[getLocale()];

  for (let i = 0, { length } = array; i < length; ++i) {
    const elem = array[i];
    if ('object' === typeof translationsLang && elem in translationsLang) {
      translationsLang = translationsLang[elem];
    } else {
      return null;
    }
  }
  return translationsLang;
};

export const translate = (key) => resolveIndex(key);

export const LANGUAGES = [
  { name: translate('language.es'), value: 'es' },
  { name: translate('language.en'), value: 'en' },
];
