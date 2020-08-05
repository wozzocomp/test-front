import { apolloQuery } from '../../utils/ApiWrapper';
import artistMutation from './artistMutation';
import artistQueries from './artistQueries';
import { WRONG_PARAMS } from '../../utils/constants';

const formatForSave = (artist) => ({
  _id: artist?._id ? artist._id : null,
  name: artist.name,
  description: artist.description,
  active: artist.active,
  deleted: artist.deleted,
});

export const createArtist = (artist) =>
  new Promise((resolve, reject) => {
    if (!artist || !artist.name) {
      reject(WRONG_PARAMS);
    } else {
      apolloQuery(artistMutation.createArtist, { artist: formatForSave(artist) })
        .then((response) => {
          resolve(response.data.createArtist);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const disableArtist = (artistId) =>
  new Promise((resolve, reject) => {
    if (!artistId) {
      reject();
    } else {
      apolloQuery(artistMutation.disableArtist, { artistId })
        .then((response) => {
          resolve(response.data.disableArtist);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const deleteArtist = (artistId) =>
  new Promise((resolve, reject) => {
    if (!artistId) {
      reject();
    } else {
      apolloQuery(artistMutation.deleteArtist, { artistId })
        .then((response) => {
          resolve(response.data.deleteArtist);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const enableArtist = (artistId) =>
  new Promise((resolve, reject) => {
    if (!artistId) {
      reject();
    } else {
      apolloQuery(artistMutation.enableArtist, { artistId })
        .then((response) => {
          resolve(response.data.enableArtist);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const restoreArtist = (artistId) =>
  new Promise((resolve, reject) => {
    if (!artistId) {
      reject();
    } else {
      apolloQuery(artistMutation.restoreArtist, { artistId })
        .then((response) => {
          resolve(response.data.restoreArtist);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const searchArtistsByFilter = (filter = {}) =>
  new Promise((resolve, reject) => {
    apolloQuery(artistQueries.artists, {
      _id: filter._id,
      name: filter.name,
      active: filter.active,
      deleted: filter.deleted,
    })
      .then((response) => {
        resolve(response.data.artists);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const updateArtist = (artist) =>
  new Promise((resolve, reject) => {
    if (!artist || !artist?._id || !artist?.name) {
      reject(WRONG_PARAMS);
    } else {
      apolloQuery(artistMutation.updateArtist, { artist: formatForSave(artist) })
        .then((response) => {
          resolve(response.data.updateArtist);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
