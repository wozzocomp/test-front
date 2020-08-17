import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../MusicCard';
import './index.scss';

const MusicGallery = ({ songs }) => {
  const songsArray = songs.map((song) => (
    <MusicCard
      key={song?._id}
      img={song?.imgUrl}
      audio={song?.songUrl}
      alt={`${song?.name}/${song?.artist?.name}`}
      song={song?.name}
      artist={song?.artist?.name}
      genre={song?.genre?.name}
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
