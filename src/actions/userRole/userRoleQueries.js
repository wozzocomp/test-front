import gql from 'graphql-tag';

const userRoles = gql`
  query userRoles {
    userRoles {
      _id
      name
      active
    }
  }
`;

export default {
  userRoles,
};
