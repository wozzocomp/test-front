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
  }
`;

const updateSong = gql`
mutation updateSong($song: SongInput!, $imgUrl: Upload, $songUrl: Upload){
  updateSong(song: $song, imgUrl: $imgUrl, songUrl: $songUrl) {
    ${song}
  }
}`;

export default {
  createSong,
  deleteSong,
  updateSong,
};
