import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../MusicCard';
import './index.scss';

const MusicGallery = ({ songs }) => {
  const songsArray = songs.map((element) => (
    <MusicCard
      key={element._id}
      img={element.imgUrl}
      audio={element.songUrl}
      alt={`${element.name}/${element.artist.name}`}
    />
  ));

  return <div className="music-gallery">{songsArray}</div>;
};

MusicGallery.defaultProps = {
  songs: [],
};

MusicGallery.propTypes = {
  songs: PropTypes.array,
};

export default MusicGallery;
