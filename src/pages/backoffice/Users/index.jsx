import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  GenericBackoffice,
  GenericBackofficeElement,
  GENERIC_TYPES,
  INPUT_TYPES,
  SureModal,
} from '@wozzocomp/base-comps';

import './index.scss';
import Page from '../../../components/base/Page';
import { translate } from '../../../utils/translate/translator';
import { userIsSuperadmin } from '../../../utils/functions';
import { getUserRoles } from '../../../actions/userRole';
import { validateEmail, validatePassword } from '../../../utils/validator';
import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  activateUser,
  disableUser,
  restoreUser,
  updatePassword,
} from '../../../actions/user';
import { showSuccessToast, showErrorToast } from '../../../utils/toasts';
import forms from '../../../utils/forms';
import GeneratePasswordModal from '../../../components/user/GeneratePasswordModal';
import ActiveInactiveIcon from '../../../components/base/ActiveInactiveIcon';
import { ROLES } from '../../../utils/constants';

const SURE_MODES = {
  DELETE: 'delete',
  DISABLE: 'disable',
  ENABLE: 'enable',
  RESTORE: 'restore',
};

const BackofficeUsersPage = ({ user, userRole }) => {
  const [ loading, setLoading ] = useState(false);
  const [ loadingRoles, setLoadingRoles ] = useState(false);
  const [ loadingUpdate, setLoadingUpdate ] = useState(false);
  const [ selectedUser, setSelectedUser ] = useState(null);
  const [ showGenerate, setShowGenerate ] = useState(false);
  const [ showSure, setShowSure ] = useState(false);
  const [ sureMode, setSureMode ] = useState(null);
  const [ users, setUsers ] = useState([]);
  const [ userRoles, setUserRoles ] = useState([]);
  const isSuperadmin = userIsSuperadmin(userRole);

  useEffect(() => {
    setLoadingRoles(true);
    getUserRoles()
      .then((roles) => {
        // filter roles so that the admin cannot create or edit users to be superadmins
        setUserRoles(isSuperadmin ? roles : roles.filter((uR) => uR?.name !== ROLES.SUPERADMIN));
        setLoadingRoles(false);
      })
      .catch(() => {
        setLoadingRoles(false);
      });
  }, []);

  const onSearch = (filters) => {
    setLoading(true);
    getUsers(filters)
      .then((newUsers) => {
        setUsers(newUsers);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!showSure && !showGenerate) {
      setSelectedUser(null);
    }
  }, [ showSure, showGenerate ]);

  const validateUser = ({ _id, name, password, email, userRole: role }) => {
    const errs = { hasErrors: false };

    if (!name) {
      errs.hasErrors = true;
      errs.name = true;
    }

    if (!email || !validateEmail(email)) {
      errs.hasErrors = true;
      errs.email = true;
    }

    if (!role || !role._id) {
      errs.hasErrors = true;
      errs.userRole = true;
    }

    if (!_id && (!password || !validatePassword(password))) {
      errs.hasErrors = true;
      errs.password = true;
    }

    return errs;
  };

  const onCreateUpdate = (usr, cb) => {
    setLoadingUpdate(true);
    let saveFunction = createUser;
    if (usr?._id) {
      saveFunction = updateUser;
    }

    saveFunction(usr)
      .then(() => {
        cb();
        onSearch();
        showSuccessToast(translate('user.createOk'));
        setLoadingUpdate(false);
      })
      .catch(() => {
        showErrorToast(translate('user.createKo'));
        setLoadingUpdate(false);
      });
  };

  const onAcceptSure = () => {
    setLoadingUpdate(true);
    let func = activateUser;
    if (SURE_MODES.DISABLE === sureMode) {
      func = disableUser;
    }
    if (SURE_MODES.DELETE === sureMode) {
      func = deleteUser;
    }
    if (SURE_MODES.RESTORE === sureMode) {
      func = restoreUser;
    }

    func(selectedUser._id)
      .then(() => {
        onSearch();
        setShowSure(false);
        showSuccessToast(translate('user.updateOk'));
        setLoadingUpdate(false);
      })
      .catch(() => {
        showErrorToast(translate('user.updateKo'));
        setLoadingUpdate(false);
      });
  };

  const getExtraActions = (usr) => {
    let res = [];
    if (usr && user && usr._id !== user._id) {
      res = [
        {
          text: translate('user.generatePassword'),
          icon: 'fas fa-lock',
          onClick: () => {
            setSelectedUser(usr);
            setShowGenerate(true);
          },
        },
        {
          text: usr.active ? translate('common.disable') : translate('common.enable'),
          icon: usr.active ? 'fas fa-user-times' : 'fas fa-user-check',
          onClick: () => {
            setSelectedUser(usr);
            setShowSure(true);
            setSureMode(usr.active ? SURE_MODES.DISABLE : SURE_MODES.ENABLE);
          },
        },
      ];
    }

    if (usr.deleted && isSuperadmin) {
      res.push({
        text: translate('common.restore'),
        icon: 'fas fa-trash-restore-alt',
        onClick: () => {
          setSelectedUser(usr);
          setShowSure(true);
          setSureMode(SURE_MODES.RESTORE);
        },
      });
    } else if (isSuperadmin) {
      res.push({
        text: translate('common.remove'),
        icon: 'fas fa-trash',
        onClick: () => {
          setSelectedUser(usr);
          setShowSure(true);
          setSureMode(SURE_MODES.DELETE);
        },
      });
    }

    return res;
  };

  return (
    <Page id="backoffice-users-page" backoffice title={translate('navbar.users')}>
      <GenericBackoffice
        {...forms.backoffice.table}
        tableProps={{ ...forms.backoffice.table.tableProps, csvFileName: translate('user.users') }}
        translations={{ ...forms.backoffice.table.translations, noItems: translate('user.noUsersFound') }}
        customValidator={validateUser}
        entity={translate('user.user')}
        extraActions={getExtraActions}
        loading={loading || loadingRoles}
        objects={users}
        onSave={onCreateUpdate}
        onSearch={onSearch}
        showDelete={false}
        title={translate('user.users')}>
        <GenericBackofficeElement
          field="_id"
          filterType={GENERIC_TYPES.input}
          hideOnFilter={!isSuperadmin}
          hideOnModal
          icon="fas fa-fingerprint"
          isKey
          tableProps={{ hidden: !isSuperadmin }}
          label={translate('common.id')}
        />
        <GenericBackofficeElement
          field="name"
          filterField="fullName"
          filterType={GENERIC_TYPES.input}
          icon="fas fa-signature"
          label={translate('user.name')}
          modalType={GENERIC_TYPES.input}
          required
          tableField="fullName"
          tableProps={{ sort: true }}
        />
        <GenericBackofficeElement
          field="lastName"
          hideOnFilter
          icon="fas fa-signature"
          label={translate('user.lastName')}
          modalType={GENERIC_TYPES.input}
          tableProps={{ hidden: true }}
        />
        <GenericBackofficeElement
          field="userRole"
          icon="fas fa-signature"
          hideOnTable
          hideOnFilter
          label={translate('user.userRole')}
          modalProps={{
            labelKey: 'translation',
            options: userRoles,
            valueKey: '_id',
          }}
          modalType={GENERIC_TYPES.selector}
          required
        />
        <GenericBackofficeElement
          field="email"
          filterType={GENERIC_TYPES.input}
          icon="fas fa-envelope"
          label={translate('user.email')}
          modalType={GENERIC_TYPES.input}
          required
          tableProps={{ sort: true }}
        />
        <GenericBackofficeElement
          showOnEdit={false}
          field="password"
          hideOnFilter
          icon="fas fa-lock"
          label={translate('user.password')}
          required
          modalType={GENERIC_TYPES.input}
          modalProps={{ infoText: translate('user.passwordDesc'), type: INPUT_TYPES.password }}
          tableProps={{ hidden: true }}
        />
        <GenericBackofficeElement
          field="active"
          filterProps={{ enableHalfChecked: true }}
          filterType={GENERIC_TYPES.checkbox}
          hideOnModal
          icon="fas fa-phone-alt"
          label={translate('user.active')}
          tableProps={{ formatter: (cell) => <ActiveInactiveIcon active={cell} />, sort: true }}
        />
        <GenericBackofficeElement
          field="deleted"
          filterProps={{ enableHalfChecked: true }}
          filterType={GENERIC_TYPES.checkbox}
          hideOnFilter={!isSuperadmin}
          hideOnModal
          icon="fas fa-phone-alt"
          label={translate('user.deleted')}
          tableProps={{ formatter: (cell) => <ActiveInactiveIcon active={cell} />, sort: true, hidden: !isSuperadmin }}
        />
      </GenericBackoffice>
      {selectedUser?._id && showGenerate && (
        <GeneratePasswordModal
          loading={loadingUpdate}
          onHide={() => setShowGenerate(false)}
          onSave={(password) => {
            updatePassword(selectedUser._id, password)
              .then(() => {
                showSuccessToast(translate('user.changePasswordOk'));
                setShowGenerate(false);
              })
              .catch(() => {
                showErrorToast(translate('user.changePasswordKo'));
              });
          }}
          show={showGenerate}
        />
      )}
      {selectedUser?._id && showSure && (
        <SureModal
          {...forms.modals.sure}
          header={translate(`user.${sureMode}`)}
          loading={loadingUpdate}
          onAccept={onAcceptSure}
          onHide={() => setShowSure(false)}
          show={showSure}>
          <p>
            {translate(`user.${sureMode}Sure`)}: <strong>{selectedUser.fullName}</strong>
          </p>
        </SureModal>
      )}
    </Page>
  );
};

BackofficeUsersPage.defaultProps = {
  user: null,
  userRole: null,
};

BackofficeUsersPage.propTypes = {
  user: PropTypes.object,
  userRole: PropTypes.string,
};

export default BackofficeUsersPage;
