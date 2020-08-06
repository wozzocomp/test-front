import gql from 'graphql-tag';
import genre from '../../utils/types/genre';

const createGenre = gql`
  mutation createGenre($genre: GenreInput!){
    createGenre(genre: $genre) {
      ${genre}
    }
  }
`;

export default {
  createGenre,
};
