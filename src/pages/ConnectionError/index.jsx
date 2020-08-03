import React from 'react';
import { Button } from '@wozzocomp/base-comps';
import './index.scss';

import logo from '../../assets/images/wozzoFacebook.png';
import { translate } from '../../utils/translate/translator';

const ConnectionErrorPage = () => (
  <div id="connection-error-container">
    <div className="connection-error shadow">
      <img src={logo} alt={translate('common.brandName')} />
      <div>
        <h1>{translate('common.sorry')}</h1>
        <p>{translate('common.connectionError')}</p>
        <div>
          <Button iconLeft="fas fa-repeat" text={translate('common.reload')} onClick={() => window.location.reload()} />
        </div>
      </div>
    </div>
  </div>
);

export default ConnectionErrorPage;
