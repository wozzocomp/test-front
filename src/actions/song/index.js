import moment from 'moment';
import { apolloQuery } from '../../utils/ApiWrapper';
import { isObject } from '../../utils/functions';
import { WRONG_PARAMS, DATE_FORMAT } from '../../utils/constants';
import songMutation from './songMutation';
import songQueries from './songQueries';

const formatForSave = ({ _id, name, artist, genre, releaseDate, album, songUrl, imgUrl, active, deleted }) => ({
  _id,
  name,
  artistId: artist?._id,
  genreId: genre?._id,
  releaseDate: moment(releaseDate).format(DATE_FORMAT),
  album,
  songUrl: isObject(songUrl) ? null : songUrl,
  imgUrl: isObject(imgUrl) ? null : imgUrl,
  active,
  deleted,
});

export const createSong = (song, imgUrl, songUrl) =>
  new Promise((resolve, reject) => {
    if (!song || !song.name || !song.artist || !song.genre) {
      reject(WRONG_PARAMS);
    } else {
      apolloQuery(songMutation.createSong, { song: formatForSave(song), imgUrl, songUrl })
        .then((response) => {
          resolve(response.data.createSong);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const deleteSong = (songId) =>
  new Promise((resolve, reject) => {
    if (!songId) {
      reject(WRONG_PARAMS);
    } else {
      apolloQuery(songMutation.deleteSong, { songId })
        .then((response) => {
          resolve(response.data.deleteSong);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const disableSong = (songId) =>
  new Promise((resolve, reject) => {
    if (!songId) {
      reject(WRONG_PARAMS);
    } else {
      apolloQuery(songMutation.disableSong, { songId })
        .then((response) => {
          resolve(response.data.disableSong);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const enableSong = (songId) =>
  new Promise((resolve, reject) => {
    if (!songId) {
      reject(WRONG_PARAMS);
    } else {
      apolloQuery(songMutation.enableSong, { songId })
        .then((response) => {
          resolve(response.data.enableSong);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const restoreSong = (songId) =>
  new Promise((resolve, reject) => {
    if (!songId) {
      reject(WRONG_PARAMS);
    } else {
      apolloQuery(songMutation.restoreSong, { songId })
        .then((response) => {
          resolve(response.data.restoreSong);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export const searchSongByFilter = ({ _id, name, artist, genre, album, active, deleted }) =>
  new Promise((resolve, reject) => {
    apolloQuery(songQueries.songs, {
      _id,
      name,
      artistId: artist?._id || null,
      genreId: genre?._id || null,
      album,
      active,
      deleted,
    })
      .then((response) => {
        resolve(response.data.songs);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const updateSong = (song, imgUrl, songUrl) =>
  new Promise((resolve, reject) => {
    if (!song || !song._id) {
      reject(WRONG_PARAMS);
    } else {
      imgUrl = isObject(imgUrl) ? imgUrl : null;
      songUrl = isObject(songUrl) ? songUrl : null;

      apolloQuery(songMutation.updateSong, { song: formatForSave(song), imgUrl, songUrl })
        .then((response) => {
          resolve(response.data.updateSong);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
