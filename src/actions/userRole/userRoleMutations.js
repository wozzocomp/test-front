import gql from 'graphql-tag';

const activateUserRole = gql`
  mutation activateUserRole($userRoleId: ID!) {
    activateUserRole(userRoleId: $userRoleId) {
      _id
    }
  }
`;

const disableUserRole = gql`
  mutation disableUserRole($userRoleId: ID!) {
    disableUserRole(userRoleId: $userRoleId) {
      _id
    }
  }
`;

export default {
  activateUserRole,
  disableUserRole,
};
