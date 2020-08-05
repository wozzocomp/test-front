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

export default {
  createArtist,
  updateArtist,
};
