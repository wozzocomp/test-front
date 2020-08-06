import { apolloQuery } from '../../utils/ApiWrapper';
import genreQueries from './genreQueries';
import genreMutation from './genreMutation';
import { WRONG_PARAMS } from '../../utils/constants';

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