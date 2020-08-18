import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, INPUT_TYPES, Button, BUTTON_TYPES, ErrorBox } from '@wozzocomp/base-comps';

import './index.scss';
import { translate } from '../../utils/translate/translator';
import logo from '../../assets/images/wozzoFacebook.png';
import { SEARCH_URL } from '../../utils/urls';
import { validateEmail, validatePassword } from '../../utils/validator';
import Loading from '../../components/base/Loading';
import { showErrorToast } from '../../utils/toasts';

const LoginPage = ({ login }) => {
  const [ email, setEmail ] = useState(null);
  const [ errors, setErrors ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ password, setPassword ] = useState(null);

  const onLogin = () => {
    const err = { login: false, inactive: false };

    if (!validateEmail(email)) {
      err.email = true;
      err.hasErrors = true;
    }
    if (!validatePassword(password)) {
      err.password = true;
      err.hasErrors = true;
    }

    setErrors(err);

    if (!err.hasErrors) {
      setLoading(true);
      login(email, password)
        .then(() => {
          setLoading(false);
        })
        .catch((loginError) => {
          setLoading(false);
          if (-1 < loginError?.message?.indexOf('inactive')) {
            showErrorToast(translate('user.loginInactive'));
            setErrors({ ...errors, inactive: true });
          } else {
            showErrorToast(translate('user.loginError'));
            setErrors({ ...errors, login: true });
          }
        });
    }
  };

  return (
    <div id="login-page">
      <Button to={SEARCH_URL} type={BUTTON_TYPES.transparent}>
        <img src={logo} alt={translate('common.brandName')} />
      </Button>
      <form className="login-form shadow">
        <h2>{translate('common.brandName')}</h2>
        <Input
          disabled={loading}
          error={errors?.email}
          icon="fas fa-at"
          onChange={(val) => {
            setEmail(val);
            setErrors({ ...errors, email: false });
          }}
          onEnter={onLogin}
          placeholder={translate('user.email')}
          type={INPUT_TYPES.email}
          value={email}
        />
        <Input
          disabled={loading}
          error={errors?.password}
          icon="fas fa-lock"
          onChange={(val) => {
            setPassword(val);
            setErrors({ ...errors, password: false });
          }}
          onEnter={onLogin}
          placeholder={translate('user.password')}
          type={INPUT_TYPES.password}
          value={password}
        />
        {(errors?.login || errors?.inactive) && (
          <ErrorBox text={translate(`user.login${errors?.login ? 'Error' : 'Inactive'}`)} />
        )}
        <Button disabled={loading} onClick={onLogin} text={translate('common.login')} type={BUTTON_TYPES.secondary}>
          {loading && <Loading />}
        </Button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginPage;
