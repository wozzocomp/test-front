import { translate } from './translate/translator';

/**
 *
 * @param {*} error
 */
const errorHandler = (error) => {
  if (!error || !error.code) {
    return console.error(error);
  }
  const { code } = error;

  switch (code) {
    case 401.1: {
      console.error(translate('error.message.loginFailed'));
      return error;
    }
    default:
      console.error('UNHANDLED ERROR');
      return error;
  }
};

export default errorHandler;
