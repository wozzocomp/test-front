import gql from 'graphql-tag';
import artist from '../../utils/types/artist';

const createArtist = gql`
  mutation createArtist($artist: ArtistInput!) {
    createArtist(artist: $artist) {
      ${artist}
    }
  }
`;

const updateArtist = gql`
  mutation updateArtist($artistId: ID! ,$artist: ArtistInput!) {
    updateArtist(artistId: $artistId, artist: $artist) {
      ${artist}
    }
  }
`;

export default {
  createArtist,
  updateArtist,
};
