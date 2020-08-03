import gql from 'graphql-tag';

const deleteError = gql`
  mutation deleteError($errorId: ID!) {
    deleteError(errorId: $errorId)
  }
`;

const deleteErrors = gql`
  mutation deleteErrors($errorIds: [ID!]) {
    deleteErrors(errorIds: $errorIds)
  }
`;

export default {
  deleteError,
  deleteErrors,
};
