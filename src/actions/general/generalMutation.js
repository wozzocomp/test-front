import gql from 'graphql-tag';

const uploadImage = gql`
  mutation uploadImage($image: Upload!) {
    uploadImage(image: $image)
  }
`;

export default {
  uploadImage,
};
