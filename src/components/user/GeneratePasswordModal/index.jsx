import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, BUTTON_TYPES } from '@wozzocomp/base-comps';

import './index.scss';
import { translate } from '../../../utils/translate/translator';
import forms from '../../../utils/forms';
import { showSuccessToast } from '../../../utils/toasts';

const copyToClipboard = (content) => {
  const el = document.createElement('textarea');
  el.value = content;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const generatePassword = () => {
  const upperCases = Math.random().toString(36).substr(2, 2).toUpperCase();
  const randomChars = Math.random().toString(36).substr(2, 3);
  const upperCasesSecond = Math.random().toString(36).substr(2, 2).toUpperCase();
  const randomCharsSecond = Math.random().toString(36).substr(2, 3);
  const password = `${upperCases}${randomChars}${upperCasesSecond}${randomCharsSecond}`;

  return password;
};

const GeneratePasswordModal = ({ onHide, onSave, ...rest }) => {
  const [ password, setPassword ] = useState(null);

  useEffect(() => {
    if (!password) {
      setPassword(generatePassword());
    }
  }, []);
  return (
    <Modal
      className="generate-password"
      footer={
        <>
          <Button {...forms.buttons.save} onClick={() => onSave(password)} />
          <Button {...forms.buttons.cancel} onClick={onHide} type={BUTTON_TYPES.gray} inverted />
        </>
      }
      header={translate('user.generatePassword')}
      onHide={onHide}
      {...rest}>
      <p>{translate('user.newPassword')}:</p>
      <p className="secondary-bg white-color password">{password}</p>
      <Button
        iconLeft="fas fa-copy"
        text={translate('common.copyToClipboard')}
        onClick={() => {
          copyToClipboard(password);
          showSuccessToast(translate('user.passwordCopied'));
        }}
      />
    </Modal>
  );
};

GeneratePasswordModal.defaultProps = {
  loading: false,
};

GeneratePasswordModal.propTypes = {
  loading: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default GeneratePasswordModal;
