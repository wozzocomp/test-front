import gql from 'graphql-tag';

const user = `
_id
userRole {
  _id
  name
}
email
password
name
lastName
fullName
`;

const login = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        ${user}
      }
      token
      refreshToken
      expiryDate
    }
  }
`;

const autologin = gql`
  query me($_id: ID!) {
    me(_id: $_id) {
      ${user}
    }
  }
`;

const users = gql`
  query users(
    $_id: String
    $fullName: String
    $email: String
    $active: Boolean
    $deleted: Boolean
  ) {
    users(
      _id: $_id
      fullName: $fullName
      email: $email
      active: $active
      deleted: $deleted
    ) {
      ${user}
      active
      deleted
    }
  }
`;

export default {
  autologin,
  login,
  users,
};
