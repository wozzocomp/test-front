import React from 'react';
import { Input, Button, BUTTON_TYPES } from '@wozzocomp/base-comps';
import PropTypes from 'prop-types';
import './index.scss';
import { translate } from '../../../utils/translate/translator';

const Searcher = ({ value, placeholder, onChange, onClick, icon, buttonType }) => (
  <div className="searcher">
    <Input value={value} placeholder={placeholder} onChange={onChange} />
    <Button onClick={onClick} type={buttonType}>
      <i className={icon} />
    </Button>
  </div>
);

Searcher.defaultProps = {
  value: '',
  placeholder: translate('searcher.placeholder'),
  onChange: '',
  onClick: '',
  icon: 'fas fa-search',
  buttonType: BUTTON_TYPES.secondary,
};

Searcher.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  buttonType: PropTypes.string,
};

export default Searcher;
