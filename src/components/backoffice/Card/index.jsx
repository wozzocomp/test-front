import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@wozzocomp/base-comps';

import './index.scss';

const BackofficeCard = ({ icon, onClick, text, url }) => (
  <div className="backoffice-card">
    <Button to={url} onClick={onClick} iconLeft={icon} text={text} />
  </div>
);

BackofficeCard.defaultProps = {
  icon: '',
  onClick: () => true,
  text: '',
  url: '',
};

BackofficeCard.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  url: PropTypes.string,
};

export default BackofficeCard;
