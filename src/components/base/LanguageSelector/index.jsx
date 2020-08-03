import React from 'react';
import { Selector } from '@wozzocomp/base-comps';
import { LANGUAGES, setLocale, translate, getLocale } from '../../../utils/translate/translator';

const LanguageSelector = ({ ...rest }) => {
  const value = getLocale();
  return (
    <Selector
      {...rest}
      className="language-selector"
      labelKey="name"
      options={LANGUAGES}
      onChange={({ value: val }) => {
        if (value !== val) {
          setLocale(val);
          window.location.reload();
        }
      }}
      placeholder={translate('language.language')}
      searchable={false}
      value={{ name: translate(`language.${value}`), value }}
    />
  );
};

export default LanguageSelector;
