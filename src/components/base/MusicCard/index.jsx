import React from 'react';
import { Audio } from '@wozzocomp/base-comps';
import PropTypes from 'prop-types';
import './index.scss';
import { translate } from '../../../utils/translate/translator';

const MusicCard = ({ song, changeSong }) => (
  <div className="music-card">
    <div className="music-card-front">
      {song ? (
        <div className="music-card-front-content">
          <h1>{`${translate('song.song')}: ${song.name}`}</h1>
          <p>{`${translate('song.artist')}: ${song.artist?.name}`}</p>
          <p>{`${translate('song.genre')}: ${song.genre?.name}`}</p>
        </div>
      ) : (
        <h1> {translate('song.informationNotFound')}</h1>
      )}
    </div>
    <div className="music-card-back">
      <div className="music-card-back-content">
        <div className="music-card-img">
          {song.imgUrl ? (
            <img src={song.imgUrl} alt={`${song.name}--${song.artist.name}`} />
          ) : (
            <h1> {translate('song.imageNotFound')} </h1>
          )}
        </div>
        <div className="music-card-audio">
          {song.songUrl ? (
            <Audio id={`${song.name}--${song.artist.name}`} onPlay={() => changeSong(song)} file={song.songUrl} />
          ) : (
            <h1> {translate('song.audioNotFound')} </h1>
          )}
        </div>
      </div>
    </div>
  </div>
);

MusicCard.defaultProps = {
  song: {},
  changeSong: null,
};

MusicCard.propTypes = {
  song: PropTypes.object,
  changeSong: PropTypes.func,
};

export default MusicCard;
