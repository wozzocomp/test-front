import gql from 'graphql-tag';
import genre from '../../utils/types/genre';

const genres = gql`
  query genres($_id: ID, $name: String, $active: Boolean, $deleted: Boolean) {
    genres(_id: $_id, name: $name, active: $active, deleted: $deleted) {
      ${genre}
    }
  }
`;

export default {
  genres,
};
