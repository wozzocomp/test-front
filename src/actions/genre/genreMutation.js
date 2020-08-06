import gql from 'graphql-tag';
import genre from '../../utils/types/genre';

const createGenre = gql`
  mutation createGenre($genre: GenreInput!){
    createGenre(genre: $genre) {
      ${genre}
    }
  }
`;

const deleteGenre = gql`
  mutation deleteGenre($genreId: ID!) {
    deleteGenre(genreId: $genreId) {
      ${genre}
    }
  }
`;

const restoreGenre = gql`
  mutation restoreGenre($genreId: ID!) {
    restoreGenre(genreId: $genreId) {
      ${genre}
    }
  }
`;

const updateGenre = gql`
  mutation updateGenre($genre: GenreInput!){
    updateGenre(genre: $genre) {
      ${genre}
    }
  }
`;

export default {
  createGenre,
  deleteGenre,
  restoreGenre,
  updateGenre,
};
