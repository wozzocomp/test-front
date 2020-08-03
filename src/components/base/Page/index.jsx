import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_TYPES } from '@wozzocomp/base-comps';

import './index.scss';

const Page = ({ backoffice, children, className, color, image, title, ...rest }) => (
  <div {...rest} className={`page-container${backoffice ? ' backoffice-page' : ''}${className ? ` ${className}` : ''}`}>
    {(title || image) && (
      <div className={`page-header ${color}-bg`} style={image ? { backgroundImage: `url(${image})` } : null}>
        {title && (
          <div>
            <h2>{title}</h2>
          </div>
        )}
      </div>
    )}
    <div className="page-body">{children}</div>
  </div>
);

Page.defaultProps = {
  backoffice: false,
  children: null,
  className: null,
  color: BUTTON_TYPES.primaryLighter,
  image: null,
  title: null,
};

Page.propTypes = {
  backoffice: PropTypes.bool,
  children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.node), PropTypes.node ]),
  className: PropTypes.string,
  color: PropTypes.string, // One of defined in constants
  image: PropTypes.string,
  title: PropTypes.string,
};

export default Page;
