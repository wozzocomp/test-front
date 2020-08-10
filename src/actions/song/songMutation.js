import gql from 'graphql-tag';
import song from '../../utils/types/song';

const createSong = gql`
mutation createSong($song: SongInput!, $imgUrl: Upload, $songUrl: Upload){
  createSong(song: $song, imgUrl: $imgUrl, songUrl: $songUrl) {
    ${song}
  }
}
`;

export default {
  createSong,
};
