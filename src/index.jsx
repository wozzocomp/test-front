import React from 'react';
import ReactDOM from 'react-dom';
import '@wozzocomp/base-comps/dist/index.css';
import 'react-quill/dist/quill.snow.css';

import App from './App';

import './styles/font.scss';
import './styles/animations.scss';
import './styles/index.scss';

// Disable reactDevTools in production
if ('production' === process.env.NODE_ENV) {
  // Ensure the React Developer Tools global hook exists
  if ('object' === typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    let prop = null;
    let propType = null;
    const keys = Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__);

    // Replace all global hook properties with a no-op function or a null value
    for (let i = 0; i < keys.length; i++) {
      prop = keys[i];
      if (prop) {
        propType = typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop];

        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = 'function' === propType ? () => {} : null;
      }
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
