import React from 'react';
import { Icon } from '@wozzocomp/base-comps';
import PropTypes from 'prop-types';

const ActiveInactiveIcon = ({ active }) => <Icon icon={`fas fa-${active ? 'check' : 'times'}`} />;

ActiveInactiveIcon.defaultProps = {
  active: false,
};

ActiveInactiveIcon.propTypes = {
  active: PropTypes.bool,
};

export default ActiveInactiveIcon;
