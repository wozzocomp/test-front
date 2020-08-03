import React from 'react';
import { Button } from '@wozzocomp/base-comps';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/images/wozzoFacebook.png';
import { translate } from '../../utils/translate/translator';
import './index.scss';
import Page from '../../components/base/Page';

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <Page id="not-found-container">
      <div className="not-found shadow">
        <img src={logo} alt={translate('common.brandName')} />
        <div>
          <h1>{translate('common.sorry')}</h1>
          <p>{translate('common.pageNotFound')}</p>
          <div>
            <Button text={translate('common.landing')} onClick={history.goBack} />
            <Button iconLeft="fas fa-home" to="/" text={translate('common.landing')} />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default NotFoundPage;
