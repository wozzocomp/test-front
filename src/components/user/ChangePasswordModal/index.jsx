import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, BUTTON_TYPES, Input, INPUT_TYPES } from '@wozzocomp/base-comps';

import './index.scss';

import { translate } from '../../../utils/translate/translator';
import forms from '../../../utils/forms';
import { validatePassword } from '../../../utils/validator';

const ChangePasswordModal = ({ loading, onHide, onSave, show, ...rest }) => {
  const [ errors, setErrors ] = useState({});
  const [ previous, setPrevious ] = useState(null);
  const [ password, setPassword ] = useState(null);
  const [ repeat, setRepeat ] = useState(null);

  const validateAndSave = () => {
    const errs = { hasErrors: false };

    if (!previous) {
      errs.hasErrors = true;
      errs.previous = true;
    }
    if (!password || !validatePassword(password)) {
      errs.hasErrors = true;
      errs.password = true;
    }
    if (!repeat || repeat !== password) {
      errs.hasErrors = true;
      errs.repeat = true;
    }

    if (errs.hasErrors) {
      setErrors(errs);
    } else {
      onSave({ oldPassword: previous, newPassword: password });
    }
  };

  useEffect(() => {
    setErrors({});
    setPrevious(null);
    setPassword(null);
    setRepeat(null);
  }, [ show ]);

  return (
    <Modal
      className="change-password"
      footer={
        <>
          <Button {...forms.buttons.save} disabled={loading} onClick={validateAndSave} />
          <Button {...forms.buttons.cancel} disabled={loading} onClick={onHide} type={BUTTON_TYPES.gray} inverted />
        </>
      }
      header={translate('user.changePassword')}
      show={show}
      {...rest}>
      <form>
        <Input
          autocomplete={false}
          icon="fas fa-lock"
          type={INPUT_TYPES.password}
          disabled={loading}
          error={errors?.previous}
          placeholder={translate('user.previousPassword')}
          value={previous}
          onChange={(val) => {
            setPrevious(val);
            setErrors({ ...errors, previous: false });
          }}
        />
        <Input
          autocomplete={false}
          icon="fas fa-lock"
          infoText={translate('user.passwordDesc')}
          placeholder={translate('user.password')}
          type={INPUT_TYPES.password}
          disabled={loading}
          error={errors?.password}
          value={password}
          onChange={(val) => {
            setPassword(val);
            setErrors({ ...errors, password: false });
          }}
        />
        <Input
          autocomplete={false}
          icon="fas fa-lock"
          placeholder={translate('user.password')}
          type={INPUT_TYPES.password}
          disabled={loading}
          error={errors?.repeat}
          errorText={translate('user.rePasswordError')}
          value={repeat}
          onChange={(val) => {
            setRepeat(val);
            setErrors({ ...errors, repeat: false });
          }}
        />
      </form>
    </Modal>
  );
};

ChangePasswordModal.defaultProps = {
  loading: false,
  show: false,
};

ChangePasswordModal.propTypes = {
  loading: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default ChangePasswordModal;
