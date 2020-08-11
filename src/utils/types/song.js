import artist from './artist';
import genre from './genre';

export default `
_id
name
imgUrl
songUrl
artist {
  ${artist}
}
genre {
  ${genre}
}
releaseDate
album
active
deleted
`;
