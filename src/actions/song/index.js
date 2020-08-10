import { apolloQuery } from '../../utils/ApiWrapper';
import { isObject } from '../../utils/functions';
import { WRONG_PARAMS } from '../../utils/constants';
import songMutation from './songMutation';
import songQuery from './songQueries';

const formatForSave = ({ _id, name, artistId, genreId, releaseDate, album, songUrl, imgUrl, active, deleted }) => ({
  _id,
  name,
  artistId,
  genreId,
  releaseDate,
  album,
  songUrl: isObject(songUrl) ? null : songUrl,
  imgUrl: isObject(songUrl) ? null : imgUrl,
  active,
  deleted,
});

export const createSong = (song, imgUrl, songUrl) =>
  new Promise((resolve, reject) => {
    if (!song || !song.name || !song.artistId || !song.genreId) {
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

export const searchSongByFilter = ({ _id, name, artistId, genreId, releaseDate, album, active, deleted }) =>
  new Promise((resolve, reject) => {
    apolloQuery(songQuery.songs, {
      _id,
      name,
      artistId,
      genreId,
      releaseDate,
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
