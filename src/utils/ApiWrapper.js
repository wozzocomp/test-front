import { checkToken } from './tokenAuth';
import apolloClient from './apollo';
import errorHandler from './errorHandler';

export const apolloQuery = async (query, variables) => {
  await checkToken();

  return new Promise((resolve, reject) =>
    apolloClient
      .query({ query, variables })
      .then((data) => {
        if (data.errors && data.errors.length) {
          reject(data.errors[0]);
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        errorHandler(error);
        return reject(error);
      }),
  );
};

export const apolloMutation = async (mutation, variables) => {
  await checkToken();

  return new Promise((resolve, reject) =>
    apolloClient
      .mutate({ mutation, variables })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        errorHandler(error);
        return reject(error);
      }),
  );
};
