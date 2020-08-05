import gql from 'graphql-tag';
import artist from '../../utils/types/artist';

const artists = gql`
  query artists($_id: ID, $name: String, $active: Boolean, $deleted: Boolean) {
    artists(_id: $_id, name: $name, active: $active, deleted: $deleted) {
      ${artist}
    }
  }
`;

export default {
  artists,
};
