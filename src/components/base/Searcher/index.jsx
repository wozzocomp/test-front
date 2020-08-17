import React from 'react';
import { Input, Button, BUTTON_TYPES } from '@wozzocomp/base-comps';
import PropTypes from 'prop-types';
import './index.scss';
import { translate } from '../../../utils/translate/translator';

const Searcher = ({ value, placeholder, onChange, onClick, icon, buttonType, disabled }) => (
  <div className="searcher">
    <Input value={value} placeholder={placeholder} onChange={onChange} />
    <Button onClick={onClick} type={buttonType} disabled={disabled}>
      <i className={icon} />
    </Button>
  </div>
);

Searcher.defaultProps = {
  buttonType: BUTTON_TYPES.secondary,
  disabled: false,
  icon: 'fas fa-search',
  onChange: '',
  onClick: '',
  placeholder: translate('searcher.placeholder'),
  value: '',
};

Searcher.propTypes = {
  buttonType: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default Searcher;
