import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, BUTTON_TYPES } from '@wozzocomp/base-comps';

import './index.scss';

import Page from '../../components/base/Page';
import { translate } from '../../utils/translate/translator';
import { showSuccessToast, showErrorToast } from '../../utils/toasts';
import UserForm from '../../components/user/Form';
import ChangePasswordModal from '../../components/user/ChangePasswordModal';
import { changePassword } from '../../actions/user';

const UserPage = ({ loading, selectedUser, updateCurrentUser }) => {
  const [ editing, setEditing ] = useState(false);
  const [ loadingUpdate, setLoadingUpdate ] = useState(false);
  const [ showChangePassword, setShowChangePassword ] = useState(false);

  const update = (usr, image) => {
    updateCurrentUser(usr, image)
      .then(() => {
        showSuccessToast(translate('user.updateOk'));
        setEditing(false);
      })
      .catch(() => {
        showErrorToast(translate('user.updateKo'));
      });
  };

  const passwordChange = (props) => {
    setLoadingUpdate(true);
    changePassword(props)
      .then(() => {
        showSuccessToast(translate('user.changePasswordOk'));
        setShowChangePassword(false);
        setLoadingUpdate(false);
      })
      .catch(() => {
        showErrorToast(translate('user.changePasswordKo'));
        setLoadingUpdate(false);
      });
  };

  return (
    <Page id="user-container" backoffice title={translate('user.profile')}>
      <div className="shadow">
        <div className="user-info-container">
          <UserForm
            editing={editing}
            loading={loading}
            onCancel={() => setEditing(false)}
            onSave={update}
            showRole={false}
            user={selectedUser}
          />
        </div>
        <ChangePasswordModal
          loading={loadingUpdate}
          onHide={() => setShowChangePassword(false)}
          onSave={passwordChange}
          show={showChangePassword}
        />
        {!editing && (
          <div className="user-edit-btns">
            <Button iconLeft="fas fa-edit" onClick={() => setEditing(true)} text={translate('common.edit')} />
            <Button
              iconLeft="fas fa-lock"
              onClick={() => setShowChangePassword(true)}
              text={translate('user.changePassword')}
              type={BUTTON_TYPES.secondaryDarker}
            />
          </div>
        )}
      </div>
    </Page>
  );
};

UserPage.defaultProps = {
  loading: false,
  selectedUser: null,
};

UserPage.propTypes = {
  loading: PropTypes.bool,
  selectedUser: PropTypes.object,
  updateCurrentUser: PropTypes.func.isRequired,
};

export default UserPage;
