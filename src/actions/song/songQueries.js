import gql from 'graphql-tag';
import song from '../../utils/types/song';
import publicSong from '../../utils/types/publicSong';

const songs = gql`
query songs(
  $_id: ID,
  $name: String, 
  $artistId: ID,
  $genreId: ID,
  $album: String,
  $active: Boolean, 
  $deleted: Boolean) {
  songs (
    _id: $_id, 
    name: $name, 
    artistId: $artistId, 
    genreId: $genreId, 
    album: $album, 
    active: $active, 
    deleted: $deleted) {
    ${song}
  }
}`;

const findSongsBySearch = gql`
  query findSongsBySearch($search: String!) {
    findSongsBySearch(search: $search) {
      ${publicSong}
    }
  }
`;

export default {
  songs,
  findSongsBySearch,
};
