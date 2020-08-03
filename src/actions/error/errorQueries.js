import gql from 'graphql-tag';

const getErrors = gql`
  query getErrors {
    errors {
      _id
      info
      createdAt
    }
  }
`;

export default {
  getErrors,
};
