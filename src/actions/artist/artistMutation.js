import gql from 'graphql-tag';
import artist from '../../utils/types/artist';

const createArtist = gql`
  mutation createArtist($artist: ArtistInput!) {
    createArtist(artist: $artist) {
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

const disableArtist = gql`
  mutation disableArtist($artistId: ID!) {
    disableArtist(artistId: $artistId) {
      ${artist}
    }
  }
`;

const enableArtist = gql`
  mutation enableArtist($artistId: ID!) {
    enableArtist(artistId: $artistId) {
      ${artist}
    }
  }
`;

const restoreArtist = gql`
  mutation restoreArtist($artistId: ID!) {
    restoreArtist(artistId: $artistId) {
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
  disableArtist,
  deleteArtist,
  enableArtist,
  restoreArtist,
  updateArtist,
};
