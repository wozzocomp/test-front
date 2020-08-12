import gql from 'graphql-tag';
import song from '../../utils/types/song';

const createSong = gql`
mutation createSong($song: SongInput!, $imgUrl: Upload, $songUrl: Upload){
  createSong(song: $song, imgUrl: $imgUrl, songUrl: $songUrl) {
    ${song}
  }
}`;

const deleteSong = gql`
  mutation deleteSong($songId: ID!) {
    deleteSong(songId: $songId){
      ${song}
    }
  }`;

const disableSong = gql`
  mutation disableSong($songId: ID!) {
    disableSong(songId: $songId){
      ${song}
    }
  }`;

const enableSong = gql`
    mutation enableSong($songId: ID!) {
      enableSong(songId: $songId){
        ${song}
      }
  }`;

const restoreSong = gql`
  mutation restoreSong($songId: ID!) {
    restoreSong(songId: $songId){
      ${song}
    }
}`;

const updateSong = gql`
mutation updateSong($song: SongInput!, $imgUrl: Upload, $songUrl: Upload){
  updateSong(song: $song, imgUrl: $imgUrl, songUrl: $songUrl) {
    ${song}
  }
}`;

export default {
  createSong,
  deleteSong,
  enableSong,
  disableSong,
  restoreSong,
  updateSong,
};
