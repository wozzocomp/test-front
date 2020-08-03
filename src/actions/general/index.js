import { autologin } from '../user';
import { WRONG_PARAMS } from '../../utils/constants';
import { apolloMutation } from '../../utils/ApiWrapper';
import generalMutation from './generalMutation';

export const initialize = () => (dispatch) => {
  dispatch(autologin());
};

export const uploadImage = (image) =>
  new Promise((resolve, reject) => {
    if (!image) {
      reject(WRONG_PARAMS);
    } else {
      apolloMutation(generalMutation.uploadImage, { image })
        .then((response) => {
          resolve(response.data.uploadImage);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
