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

const createUser = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      ${user}
    }
  }
`;

const updateUser = gql`
  mutation updateUser($user: UserInput!) {
    updateUser(user: $user) {
      ${user}
    }
  }
`;

const deleteUser = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`;

const restoreUser = gql`
  mutation restoreUser($_id: ID!) {
    restoreUser(_id: $_id) {
      _id
    }
  }
`;

const disableUser = gql`
  mutation disableUser($_id: ID!) {
    disableUser(_id: $_id) {
      _id
    }
  }
`;

const activateUser = gql`
  mutation activateUser($_id: ID!) {
    activateUser(_id: $_id) {
      _id
    }
  }
`;

const changePassword = gql`
  mutation changePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

const generatePassword = gql`
  mutation generatePassword($userId: ID!, $password: String!) {
    generatePassword(userId: $userId, password: $password)
  }
`;

export default {
  activateUser,
  changePassword,
  createUser,
  deleteUser,
  disableUser,
  generatePassword,
  restoreUser,
  updateUser,
};
