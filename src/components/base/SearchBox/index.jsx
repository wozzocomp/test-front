import React from 'react';
import { Input, Button, BUTTON_TYPES } from '@wozzocomp/base-comps';
import PropTypes from 'prop-types';
import './index.scss';
import { translate } from '../../../utils/translate/translator';

const SearchBox = ({ value, placeholder, onChange, onClick, onEnter, icon, buttonType, disabled }) => (
  <div className="searcher">
    <Input value={value} placeholder={placeholder} onChange={onChange} onEnter={onEnter} />
    <Button onClick={onClick} type={buttonType} disabled={disabled} iconLeft={icon} />
  </div>
);

SearchBox.defaultProps = {
  buttonType: BUTTON_TYPES.secondary,
  disabled: false,
  icon: 'fas fa-search',
  onChange: null,
  onClick: null,
  onEnter: null,
  placeholder: translate('searcher.placeholder'),
  value: '',
};

SearchBox.propTypes = {
  buttonType: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchBox;
