import React, { useState, useEffect } from 'react';
import { GenericBackoffice, GenericBackofficeElement, GENERIC_TYPES, SureModal } from '@wozzocomp/base-comps';

import './index.scss';
import { getUserRoles, activateUserRole, disableUserRole } from '../../../actions/userRole';
import { translate } from '../../../utils/translate/translator';
import { showSuccessToast, showErrorToast } from '../../../utils/toasts';
import forms from '../../../utils/forms';
import Page from '../../../components/base/Page';
import ActiveInactiveIcon from '../../../components/base/ActiveInactiveIcon';

const BackofficeUserRolesPage = () => {
  const [ loading, setLoading ] = useState(false);
  const [ loadingUpdate, setLoadingUpdate ] = useState(false);
  const [ userRoles, setUserRoles ] = useState([]);
  const [ selectedRole, setSelectedUserRole ] = useState(null);

  const loadUserRoles = () => {
    setLoading(true);
    getUserRoles()
      .then((roles) => {
        setUserRoles(roles);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const getExtraActions = (userRole) => {
    const isActive = userRole.active;

    return [
      {
        text: translate(isActive ? 'common.disable' : 'common.activate'),
        icon: isActive ? 'fas fa-ban' : 'fas fa-trash-restore-alt',
        onClick: () => {
          setSelectedUserRole(userRole);
        },
      },
    ];
  };

  const onAcceptSure = () => {
    setLoadingUpdate(true);
    const func = selectedRole.active ? disableUserRole : activateUserRole;

    func(selectedRole._id)
      .then(() => {
        setSelectedUserRole(null);
        showSuccessToast(translate('userRole.updateOk'));
        loadUserRoles();
        setLoadingUpdate(false);
      })
      .catch(() => {
        showErrorToast(translate('userRole.updateKo'));
        setLoadingUpdate(false);
      });
  };

  useEffect(() => {
    loadUserRoles();
  }, []);

  return (
    <Page id="backoffice-user-roles-page" backoffice title={translate('navbar.userRoles')}>
      <GenericBackoffice
        {...forms.backoffice.table}
        tableProps={{
          ...forms.backoffice.table.tableProps,
          csvFileName: translate('userRole.userRoles'),
        }}
        translations={{ ...forms.backoffice.table.translations, noItems: translate('userRole.noRolesFound') }}
        entity={translate('userRole.userRole')}
        extraActions={getExtraActions}
        loading={loading}
        objects={userRoles}
        previousLoad
        showAdd={false}
        showDelete={false}
        showEdit={false}
        showFilters={false}
        title={translate('userRole.userRoles')}>
        <GenericBackofficeElement field="_id" hideOnFilter hideOnModal isKey label={translate('common.id')} />
        <GenericBackofficeElement
          field="name"
          icon="fas fa-signature"
          label={translate('userRole.name')}
          modalType={GENERIC_TYPES.input}
          tableProps={{ sort: true }}
        />
        <GenericBackofficeElement field="translation" hideOnModal label={translate('userRole.translation')} />
        <GenericBackofficeElement
          field="active"
          filterProps={{ enableHalfChecked: true }}
          filterType={GENERIC_TYPES.checkbox}
          hideOnModal
          label={translate('userRole.active')}
          tableProps={{ formatter: (cell) => <ActiveInactiveIcon active={cell} />, sort: true }}
        />
      </GenericBackoffice>
      {selectedRole?._id && (
        <SureModal
          {...forms.modals.sure}
          header={translate(`userRole.${selectedRole.active ? 'disable' : 'activate'}`)}
          loading={loading || loadingUpdate}
          onAccept={onAcceptSure}
          onHide={() => setSelectedUserRole(null)}
          show>
          <p>
            {translate(`userRole.${selectedRole.active ? 'disable' : 'activate'}Sure`)}:{' '}
            <strong>{selectedRole.translation}</strong>
          </p>
        </SureModal>
      )}
    </Page>
  );
};

export default BackofficeUserRolesPage;
