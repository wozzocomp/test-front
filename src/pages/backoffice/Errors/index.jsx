import React, { useState, useEffect } from 'react';
import {
  GenericBackoffice,
  GenericBackofficeElement,
  GENERIC_TYPES,
  Button,
  SureModal,
  BUTTON_TYPES,
} from '@wozzocomp/base-comps';
import moment from 'moment';

import './index.scss';
import Page from '../../../components/base/Page';
import { translate } from '../../../utils/translate/translator';
import { showSuccessToast, showErrorToast } from '../../../utils/toasts';
import forms from '../../../utils/forms';
import { DATE_FORMAT_FULL_TO_SHOW } from '../../../utils/constants';
import { getErrors, deleteError, deleteErrors } from '../../../actions/error';

const BackofficeErrorsPage = () => {
  const [ errors, setErrors ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ loadingUpdate, setLoadingUpdate ] = useState(false);
  const [ mounted, setMounted ] = useState(false);
  const [ selected, setSelected ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);

  const onSearch = () => {
    setLoading(true);

    getErrors()
      .then((errs) => {
        setErrors(errs);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onDelete = (error, cb) => {
    setLoadingUpdate(true);

    deleteError(error._id)
      .then(() => {
        showSuccessToast(translate('error.deleteOk'));
        const remainingErrs = errors.filter((e) => e._id !== error._id);
        setErrors(remainingErrs);
        setLoadingUpdate(false);
        cb();
      })
      .catch(() => {
        showErrorToast(translate('error.deleteKo'));
        setLoadingUpdate(false);
      });
  };

  const deleteMany = () => {
    setLoadingUpdate(true);

    deleteErrors(selected)
      .then(() => {
        showSuccessToast(translate('error.deleteOk'));
        const remainingErrs = errors.filter((e) => !selected.find((s) => s._id === e._id));
        setErrors(remainingErrs);
        setLoadingUpdate(false);
        setShowModal(false);
      })
      .catch(() => {
        showErrorToast(translate('error.deleteKo'));
        setLoadingUpdate(false);
      });
  };

  useEffect(() => {
    if (!mounted) {
      onSearch();
      setMounted(true);
    }
  }, []);

  return (
    <Page id="backoffice-errors-page" backoffice title={translate('navbar.errors')}>
      <GenericBackoffice
        {...forms.backoffice.table}
        tableProps={{
          ...forms.backoffice.table.tableProps,
          csvFileName: translate('error.errors'),
          selectableRows: true,
          headerExtra: () =>
            selected?.length ? (
              <Button
                text={translate('error.deleteMany')}
                onClick={() => setShowModal(true)}
                type={BUTTON_TYPES.secondary}
              />
            ) : null,
          onSelectRow: setSelected,
        }}
        translations={{ ...forms.backoffice.table.translations, noItems: translate('error.noErrorsFound') }}
        entity={translate('error.error')}
        loading={loading}
        loadingModal={loadingUpdate}
        objects={errors}
        onDelete={onDelete}
        previousLoad
        onSave={(e, cb) => cb()}
        showAdd={false}
        showDelete
        showEdit
        showFilters={false}
        title={translate('error.errors')}>
        <GenericBackofficeElement
          field="_id"
          isKey
          hideOnModal
          label={translate('common.id')}
          tableProps={{ width: 15 }}
        />
        <GenericBackofficeElement
          field="createdAt"
          label={translate('error.createdAt')}
          hideOnModal
          tableProps={{
            formatter: (date) => moment(date).format(DATE_FORMAT_FULL_TO_SHOW),
            filterFormatted: true,
            width: 15,
          }}
        />
        <GenericBackofficeElement
          field="info"
          icon="fas fa-signature"
          label={translate('error.info')}
          modalType={GENERIC_TYPES.json}
          tableProps={{
            formatter: (info) => JSON.stringify(info),
            filterFormatted: true,
            width: 50,
            cellClassName: 'error-text',
          }}
        />
      </GenericBackoffice>
      <SureModal
        {...forms.modals.sure}
        show={showModal}
        loading={loadingUpdate}
        onAccept={deleteMany}
        onHide={() => setShowModal(false)}>
        <p>{`${translate('error.deleteManySure')} ${selected?.length} ${translate('error.errors')}?`}</p>
      </SureModal>
    </Page>
  );
};

export default BackofficeErrorsPage;
