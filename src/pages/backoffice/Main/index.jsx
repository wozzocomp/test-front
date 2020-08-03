import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import Page from '../../../components/base/Page';
import { translate } from '../../../utils/translate/translator';
import { userIsSuperadmin } from '../../../utils/functions';
import BackofficeCard from '../../../components/backoffice/Card';
import { ELEMENTS, SUPERADMIN_ELEMS } from '../../../utils/backofficeElements';

const MainBackofficePage = ({ userRole }) => {
  const elements = userIsSuperadmin(userRole) ? [ ...ELEMENTS, ...SUPERADMIN_ELEMS ] : ELEMENTS;
  return (
    <Page id="backoffice-main-page" backoffice title={translate('common.brandName')}>
      {elements.map((elem) => (
        <BackofficeCard {...elem} />
      ))}
    </Page>
  );
};

MainBackofficePage.defaultProps = {
  userRole: null,
};

MainBackofficePage.propTypes = {
  userRole: PropTypes.string,
};

export default MainBackofficePage;
