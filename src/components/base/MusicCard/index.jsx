import React from 'react';
import { Audio } from '@wozzocomp/base-comps';
import PropTypes from 'prop-types';
import './index.scss';

const MusicCard = ({ img, alt, audio }) => (
  <div className="music-card">
    <div className="music-card-img">
      <img src={img} alt={alt} />
    </div>
    <div className="music-card-audio">
      <Audio file={audio} />
    </div>
  </div>
);

MusicCard.defaultProps = {
  img: '',
  alt: '',
  audio: '',
};

MusicCard.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  audio: PropTypes.string,
};

export default MusicCard;
