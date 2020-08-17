import React from 'react';
import { Audio } from '@wozzocomp/base-comps';
import PropTypes from 'prop-types';
import './index.scss';

const MusicCard = ({ img, alt, audio, song, artist, genre }) => (
  <div className="music-card">
    <div className="music-card-front">
      <div className="music-card-front-content">
        <h1>Song: {song}</h1>
        <p> Artist: {artist}</p>
        <p>Genre: {genre}</p>
      </div>
    </div>
    <div className="music-card-back">
      <div className="music-card-back-content">
        <div className="music-card-img">
          <img src={img} alt={alt} />
        </div>
        <div className="music-card-audio">
          <Audio file={audio} />
        </div>
      </div>
    </div>
  </div>
);

MusicCard.defaultProps = {
  img: '',
  alt: '',
  audio: '',
  song: '',
  artist: '',
  genre: '',
};

MusicCard.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  audio: PropTypes.string,
  song: PropTypes.string,
  artist: PropTypes.string,
  genre: PropTypes.string,
};

export default MusicCard;
