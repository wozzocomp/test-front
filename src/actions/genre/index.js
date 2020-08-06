import { apolloQuery } from '../../utils/ApiWrapper';
import { WRONG_PARAMS } from '../../utils/constants';
import genreMutation from './genreMutation';
import genreQueries from './genreQueries';

const formatForSave = ({ _id, name, active, deleted }) => ({
  _id,
  name,
  active,
  deleted,
});

export const createGenre = (genre) =>
  new Promise((resolve, reject) => {
    if (!genre || !genre.name) {
      reject(WRONG_PARAMS);
    } else {
      apolloQuery(genreMutation.createGenre, { genre: formatForSave(genre) })
        .then((response) => {
          resolve(response.data.createGenre);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const deleteGenre = (genreId) =>
  new Promise((resolve, reject) => {
    if (!genreId) {
      reject();
    } else {
      apolloQuery(genreMutation.deleteGenre, { genreId })
        .then((response) => {
          resolve(response.data.deleteGenre);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const disableGenre = (genreId) =>
  new Promise((resolve, reject) => {
    if (!genreId) {
      reject();
    } else {
      apolloQuery(genreMutation.disableGenre, { genreId })
        .then((response) => {
          resolve(response.data.disableGenre);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const enableGenre = (genreId) =>
  new Promise((resolve, reject) => {
    if (!genreId) {
      reject();
    } else {
      apolloQuery(genreMutation.enableGenre, { genreId })
        .then((response) => {
          resolve(response.data.enableGenre);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const restoreGenre = (genreId) =>
  new Promise((resolve, reject) => {
    if (!genreId) {
      reject();
    } else {
      apolloQuery(genreMutation.restoreGenre, { genreId })
        .then((response) => {
          resolve(response.data.restoreGenre);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const searchGenreByFilter = (filter = {}) =>
  new Promise((resolve, reject) => {
    apolloQuery(genreQueries.genres, {
      _id: filter._id,
      name: filter.name,
      active: filter.active,
      deleted: filter.deleted,
    })
      .then((response) => {
        resolve(response.data.genres);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const updateGenre = (genre) =>
  new Promise((resolve, reject) => {
    if (!genre || !genre._id || !genre.name) {
      reject(WRONG_PARAMS);
    } else {
      apolloQuery(genreMutation.updateGenre, { genre: formatForSave(genre) })
        .then((response) => {
          resolve(response.data.updateGenre);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
