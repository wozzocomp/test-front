import React from 'react';
import { BUTTON_TYPES } from '@wozzocomp/base-comps';
import { translate } from '../translate/translator';
import Loading from '../../components/base/Loading';

const table = {
  translations: {
    accept: translate('common.accept'),
    actions: translate('common.actions'),
    cancel: translate('common.cancel'),
    clear: translate('common.clean'),
    create: translate('common.create'),
    delete: translate('common.remove'),
    edit: translate('common.edit'),
    export: translate('common.export'),
    filter: translate('common.filter'),
    filters: translate('common.filters'),
    no: translate('common.no'),
    noItems: translate('common.noItem'),
    noSearch: translate('common.noSearch'),
    sureText: translate('common.sureText'),
    yes: translate('common.yes'),
  },
  tableProps: {
    showGlobalSearch: true,
    showExport: true,
  },
  showAdd: true,
  loadingFormatter: () => <Loading />,
  secondaryColor: BUTTON_TYPES.secondary,
};

export default {
  table,
};
