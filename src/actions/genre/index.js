import { apolloQuery } from '../../utils/ApiWrapper';
import genreQueries from './genreQueries';

export default (filter = {}) =>
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
