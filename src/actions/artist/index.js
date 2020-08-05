import { apolloQuery } from '../../utils/ApiWrapper';
import artistMutation from './artistMutation';
import artistQueries from './artistQueries';
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

export const saveArtist = (artist) =>
  new Promise((resolve, reject) => {
    if (!artist || !artist.name) {
      reject(WRONG_PARAMS);
    } else {
      apolloQuery(artistMutation.createArtist, { artist: formatForSave(artist) })
        .then((response) => {
          resolve(response.data.artists);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const updateArtist = (id, artist) =>
  new Promise((resolve, reject) => {
    if (!artist || !id) {
      reject(WRONG_PARAMS);
    } else {
      apolloQuery(artistMutation.updateArtist, { artistId: id, artist: formatForSave(artist) })
        .then((response) => {
          resolve(response.data.artists);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
