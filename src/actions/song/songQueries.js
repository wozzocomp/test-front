import gql from 'graphql-tag';
import song from '../../utils/types/song';

const songs = gql`
query songs($_id: ID, $name: String, $artistId: ID, $genreId: ID, $album: String $active: Boolean, $deleted: Boolean) {
  songs (_id: $_id, name: $name, artistId: $artistId, genreId: $genreId, album: $album, active: $active, deleted: $deleted) {
    ${song}
  }
}`;

export default {
  songs,
};
