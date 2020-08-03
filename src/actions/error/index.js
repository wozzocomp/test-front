import { apolloQuery, apolloMutation } from '../../utils/ApiWrapper';
import errorQueries from './errorQueries';
import errorMutations from './errorMutations';
import { WRONG_PARAMS } from '../../utils/constants';

export const getErrors = () =>
  new Promise((resolve, reject) => {
    apolloQuery(errorQueries.getErrors)
      .then((response) => {
        resolve(response.data.errors);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const deleteError = (errorId) =>
  new Promise((resolve, reject) => {
    if (errorId) {
      apolloMutation(errorMutations.deleteError, { errorId })
        .then((response) => {
          resolve(response.data.deleteError);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject(WRONG_PARAMS);
    }
  });

export const deleteErrors = (errors) =>
  new Promise((resolve, reject) => {
    if (errors?.length) {
      apolloMutation(errorMutations.deleteErrors, { errorIds: errors.map((e) => e._id) })
        .then((response) => {
          resolve(response.data.deleteErrors);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject(WRONG_PARAMS);
    }
  });
