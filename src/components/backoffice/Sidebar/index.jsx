import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, BUTTON_TYPES } from '@wozzocomp/base-comps';
import logo from '../../../assets/images/wozzoFacebook.png';

import './index.scss';

import { translate } from '../../../utils/translate/translator';
import SidebarLink from './sidebarLink';
import { BACKOFFICE_URL, INDEX_URL, BACKOFFICE_USER_URL } from '../../../utils/urls';
import { logout } from '../../../utils/tokenAuth';
import { userIsSuperadmin } from '../../../utils/functions';
import { ELEMENTS, SUPERADMIN_ELEMS } from '../../../utils/backofficeElements';

const Sidebar = ({ userRole }) => {
  const [ expanded, setExpanded ] = useState(false);
  const elements = userIsSuperadmin(userRole) ? [ ...ELEMENTS, ...SUPERADMIN_ELEMS ] : ELEMENTS;

  return (
    <div className={`main-sidebar ${expanded ? 'expanded' : ''}`}>
      <Button
        className="arrow-button"
        iconLeft="fas fa-arrow-right"
        onClick={() => setExpanded(!expanded)}
        type={BUTTON_TYPES.primary}
      />
      <div className="sidebar-header">
        <Button to={BACKOFFICE_URL} className="home">
          <img src={logo} alt={translate('common.brandName')} />
        </Button>
        <Button
          className="expand-button"
          iconLeft="fas fa-bars"
          onClick={() => setExpanded(!expanded)}
          type={BUTTON_TYPES.primary}
        />
      </div>
      <div className="sidebar-content">
        <div>
          {elements.map((elem) => (
            <SidebarLink key={elem.text} {...elem} onClick={() => setExpanded(false)} />
          ))}
        </div>
        <div>
          <SidebarLink icon="fas fa-user" text={translate('navbar.user')} url={BACKOFFICE_USER_URL} />
          <SidebarLink icon="fas fa-sign-out-alt" onClick={logout} text={translate('navbar.logout')} url={INDEX_URL} />
        </div>
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  userRole: null,
};

Sidebar.propTypes = {
  userRole: PropTypes.string,
};

export default Sidebar;
