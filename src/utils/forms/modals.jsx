import React from 'react';
import { translate } from '../translate/translator';
import Loading from '../../components/base/Loading';

const sure = {
  sureText: translate('common.sureText'),
  yesText: translate('common.yes'),
  noText: translate('common.no'),
  loadingFormatter: () => <Loading />,
};

export default {
  sure,
};
