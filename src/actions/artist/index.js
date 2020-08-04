import { apolloQuery } from '../../utils/ApiWrapper';
import artistQueries from './artistQueries';

const getArtists = ({ name, active, deleted }) =>
  new Promise((resolve, reject) => {
    apolloQuery(artistQueries.artists, { name, active, deleted })
      .then((response) => {
        resolve(response.data.artists);
      })
      .catch((error) => {
        reject(error);
      });
  });
export default getArtists;
