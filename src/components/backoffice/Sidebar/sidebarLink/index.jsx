import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, TOOLTIP_POSITION, Button } from '@wozzocomp/base-comps';

const SidebarLink = ({ icon, onClick, text, url }) => (
  <Tooltip message={text} position={TOOLTIP_POSITION.right}>
    <Button to={url} className="link" onClick={onClick} iconLeft={icon} text={text} />
  </Tooltip>
);

SidebarLink.defaultProps = {
  icon: '',
  onClick: () => true,
  text: '',
  url: '',
};

SidebarLink.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  url: PropTypes.string,
};

export default SidebarLink;
