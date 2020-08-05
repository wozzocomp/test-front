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
  mutation updateArtist($artist: ArtistInput!) {
    updateArtist(artist: $artist) {
      ${artist}
    }
  }
`;

const deleteArtist = gql`
  mutation deleteArtist($artistId: ID!) {
    deleteArtist(artistId: $artistId) {
      ${artist}
    }
  }
`;

export default {
  createArtist,
  deleteArtist,
  updateArtist,
};
