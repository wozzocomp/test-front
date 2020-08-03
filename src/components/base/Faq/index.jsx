import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@wozzocomp/base-comps';
import './index.scss';

const Faq = ({ faq }) => {
  const [ expanded, setExpanded ] = useState(false);
  return (
    <div className={`faq shadow${expanded ? ' expanded' : ''}`}>
      <div className="faq-header">
        <span>{faq.title}</span>
        <Button iconLeft="fas fa-chevron-down" onClick={() => setExpanded(!expanded)} inverted />
      </div>
      <div className="faq-body">
        <p>{faq.text}</p>
      </div>
    </div>
  );
};

Faq.propTypes = {
  faq: PropTypes.object.isRequired,
};

export default Faq;
