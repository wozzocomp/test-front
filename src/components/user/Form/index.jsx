import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '@wozzocomp/base-comps';

import './index.scss';

import { validateEmail } from '../../../utils/validator';
import { isFunction } from '../../../utils/functions';
import { translate } from '../../../utils/translate/translator';
import forms from '../../../utils/forms';

const UserForm = ({ className, editing, linkBack, loading, onCancel, onSave, user }) => {
  const [ disabled, setDisabled ] = useState(!editing);
  const [ editingUser, setEditingUser ] = useState({});
  const [ errors, setErrors ] = useState({});

  const validateAndSave = () => {
    const errs = { hasErrors: false };

    if (!editingUser.name) {
      errs.hasErrors = true;
      errs.name = true;
    }

    if (!editingUser.email || !validateEmail(editingUser.email)) {
      errs.hasErrors = true;
      errs.email = true;
    }

    if (!editingUser.userRole || !editingUser.userRole._id) {
      errs.hasErrors = true;
      errs.userRole = true;
    }

    setErrors(errs);

    if (!errs.hasErrors) {
      onSave({
        ...editingUser,
        fullName: `${editingUser.name}${editingUser.lastName ? ` ${editingUser.lastName}` : ''}`,
      });
    }
  };

  useEffect(() => {
    if (user && user !== editingUser) {
      setEditingUser(user);
    }
  }, [ user ]);

  useEffect(() => {
    if ((editing && disabled) || (!editing && !disabled)) {
      setEditingUser(user);
      setDisabled(!editing);
    }
  }, [ editing ]);

  return (
    <>
      <form className={className}>
        <div className="user">
          <div>
            <div className="user-form">
              <div className="user-info">
                <Input
                  autocomplete={false}
                  icon="fas fa-signature"
                  placeholder={translate('user.name')}
                  disabled={disabled}
                  error={errors?.name}
                  value={editingUser.name}
                  onChange={(val) => setEditingUser({ ...editingUser, name: val })}
                />
                <Input
                  autocomplete={false}
                  icon="fas fa-signature"
                  placeholder={translate('user.lastName')}
                  disabled={disabled}
                  error={errors?.lastName}
                  value={editingUser.lastName}
                  onChange={(val) => setEditingUser({ ...editingUser, lastName: val })}
                />
                <Input
                  autocomplete={false}
                  icon="fas fa-at"
                  placeholder={translate('user.email')}
                  disabled={disabled}
                  error={errors?.email}
                  value={editingUser.email}
                  onChange={(val) => setEditingUser({ ...editingUser, email: val })}
                />
              </div>
            </div>
          </div>
          {!disabled && (
            <div className="user-buttons">
              <Button {...forms.buttons.save} disabled={loading} onClick={validateAndSave} />
              {!linkBack && (
                <Button
                  {...forms.buttons.cancel}
                  disabled={loading}
                  onClick={() => {
                    setDisabled(true);
                    setEditingUser(user);
                    if (isFunction(onCancel)) {
                      onCancel();
                    }
                  }}
                />
              )}
              {linkBack && !disabled && <Button {...forms.buttons.cancel} disabled={loading} to={linkBack} />}
            </div>
          )}
        </div>
      </form>
    </>
  );
};

UserForm.defaultProps = {
  className: null,
  editing: false,
  linkBack: null,
  loading: false,
  onCancel: null,
  onSaveQuestionnaire: null,
  showImage: true,
  showRole: true,
  spas: [],
  user: null,
  userRoles: [],
};

UserForm.propTypes = {
  className: PropTypes.string,
  editing: PropTypes.bool,
  linkBack: PropTypes.string,
  loading: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  onSaveQuestionnaire: PropTypes.func,
  showImage: PropTypes.bool,
  showRole: PropTypes.bool,
  spas: PropTypes.array,
  user: PropTypes.object,
  userRoles: PropTypes.array,
};

export default UserForm;
