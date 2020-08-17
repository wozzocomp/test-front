import React from 'react';
import { Audio } from '@wozzocomp/base-comps';
import PropTypes from 'prop-types';
import { translate } from '../../../utils/translate/translator';
import './index.scss';

const MusicCard = ({ img, alt, audio, song, artist, genre }) => (
  <div className="music-card">
    <div className="music-card-front">
      {song ? (
        <div className="music-card-front-content">
          <h1>{`${translate('song.song')}: ${song}`}</h1>
          <p>{`${translate('song.artist')}: ${artist}`}</p>
          <p>{`${translate('song.genre')}: ${genre}`}</p>
        </div>
      ) : (
        <h1> {translate('song.informationNotFound')}</h1>
      )}
    </div>
    <div className="music-card-back">
      <div className="music-card-back-content">
        <div className="music-card-img">
          {img ? <img src={img} alt={alt} /> : <h1> {translate('song.imageNotFound')} </h1>}
        </div>
        <div className="music-card-audio">
          {audio ? <Audio file={audio} /> : <h1> {translate('song.audioNotFound')} </h1>}
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
