import { apolloQuery } from '../../utils/ApiWrapper';
import artistQueries from './artistQueries';
import artistMutation from './artistMutation';
import { WRONG_PARAMS } from '../../utils/constants';

const formatForSave = (artist) => ({
  _id: artist._id,
  name: artist.name,
  description: artist.description,
  active: artist.active,
  deleted: artist.deleted,
});

export const getArtists = ({ _id, name, active, deleted }) =>
  new Promise((resolve, reject) => {
    apolloQuery(artistQueries.artists, { _id, name, active, deleted })
      .then((response) => {
        resolve(response.data.artists);
      })
      .catch((error) => {
        reject(error);
      });
  });
export default getArtists;
