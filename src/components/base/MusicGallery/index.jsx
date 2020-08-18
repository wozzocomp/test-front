import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import MusicCard from '../MusicCard';

const MusicGallery = ({ songs }) => {
  const [ songPlaying, setSongPlaying ] = useState({});

  const onChangeSong = (s) => {
    if (songPlaying?._id) {
      const oldElem = document.getElementById(`${songPlaying.name}--${songPlaying.artist.name}`);
      oldElem.closest('audio').pause();
      oldElem.classList.remove('songPlaying');
    }

    setSongPlaying(s);
  };

  const songsArray = songs.map((song) => <MusicCard key={song?._id} song={song} onChangeSong={onChangeSong} />);

  return <div className="music-gallery">{songsArray}</div>;
};

MusicGallery.defaultProps = {
  songs: [],
};

MusicGallery.propTypes = {
  songs: PropTypes.array,
};

export default MusicGallery;
