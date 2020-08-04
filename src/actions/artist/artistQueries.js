import gql from 'graphql-tag';

const artists = gql`
  query artists($name: String, $active: Boolean, $deleted: Boolean) {
    artists(name: $name, active: $active, deleted: $deleted) {
      _id
      name
      description
      active
      deleted
    }
  }
`;

export default {
  artists,
};
