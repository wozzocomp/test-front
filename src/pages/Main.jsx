import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { ScrollToTop, useToast } from '@wozzocomp/base-comps';
import { setToast } from '../utils/toasts';
import NotFoundPage from './NotFound';
import LoginPage from '../containers/login';
import Loading from '../components/base/Loading';
import {
  INDEX_URL,
  LOGIN_URL,
  BACKOFFICE_URL,
  BACKOFFICE_ARTISTS_URL,
  BACKOFFICE_USER_ROLES_URL,
  BACKOFFICE_USERS_URL,
  BACKOFFICE_ERRORS_URL,
  BACKOFFICE_USER_URL,
  BACKOFFICE_GENRES_URL,
  BACKOFFICE_SONGS_URL,
  SEARCH_URL,
  RESULTS_URL,
} from '../utils/urls';
import { userIsAdminOrMore, userIsSuperadmin } from '../utils/functions';
import MainBackofficePage from '../containers/backoffice';
import Sidebar from '../components/backoffice/Sidebar';
import UserPage from '../containers/user';
import BackofficeArtistsPage from './backoffice/Artist';
import BackofficeGenrePage from './backoffice/Genre';
import BackofficeUsersPage from '../containers/backoffice/users';
import BackofficeUserRolesPage from './backoffice/UserRoles';
import BackofficeErrorsPage from './backoffice/Errors';
import BackofficeSongsPage from './backoffice/Song';
import ConnectionErrorPage from './ConnectionError';
import Search from './public/search';
import Result from './public/results';

const redirectBackofficeSuperadmin = (userRole, component) => {
  if (!userIsSuperadmin(userRole)) {
    return <Redirect to={LOGIN_URL} />;
  }
  return <Route component={component} />;
};

const redirectBackoffice = (userRole, component) => {
  if (!userIsAdminOrMore(userRole)) {
    return <Redirect to={LOGIN_URL} />;
  }
  return <Route component={component} />;
};

const redirectPublic = (userRole, component) => {
  if (userIsAdminOrMore(userRole)) {
    return <Redirect to={BACKOFFICE_URL} />;
  }
  return <Route component={component} />;
};

const Main = ({ initialize, loading, noConnection, userRole, user }) => {
  const toast = useToast();
  setToast(toast);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <main>
      {!noConnection && user && <Sidebar userRole={userRole} />}
      {!noConnection && loading ? (
        <div id="main-loading">
          <Loading />
        </div>
      ) : (
        <>
          {noConnection ? (
            <ConnectionErrorPage />
          ) : (
            <div id="main-container">
              <ScrollToTop>
                <Switch>
                  <Route exact path={SEARCH_URL}>
                    <Search />
                  </Route>
                  <Route path={RESULTS_URL}>
                    <Result />
                  </Route>
                  <Route exact path={INDEX_URL} render={() => redirectPublic(userRole, LoginPage)} />
                  <Route exact path={BACKOFFICE_URL} render={() => redirectBackoffice(userRole, MainBackofficePage)} />
                  <Route
                    exact
                    path={BACKOFFICE_ARTISTS_URL}
                    render={() => redirectBackoffice(userRole, BackofficeArtistsPage)}
                  />
                  <Route
                    exact
                    path={BACKOFFICE_GENRES_URL}
                    render={() => redirectBackoffice(userRole, BackofficeGenrePage)}
                  />
                  <Route
                    exact
                    path={BACKOFFICE_SONGS_URL}
                    render={() => redirectBackoffice(userRole, BackofficeSongsPage)}
                  />
                  <Route exact path={BACKOFFICE_USER_URL} render={() => redirectBackoffice(userRole, UserPage)} />
                  <Route
                    exact
                    path={BACKOFFICE_USERS_URL}
                    render={() => redirectBackoffice(userRole, BackofficeUsersPage)}
                  />
                  <Route
                    exact
                    path={BACKOFFICE_USER_ROLES_URL}
                    render={() => redirectBackofficeSuperadmin(userRole, BackofficeUserRolesPage)}
                  />
                  <Route
                    exact
                    path={BACKOFFICE_ERRORS_URL}
                    render={() => redirectBackofficeSuperadmin(userRole, BackofficeErrorsPage)}
                  />
                  <Route component={NotFoundPage} />
                </Switch>
              </ScrollToTop>
            </div>
          )}
        </>
      )}
    </main>
  );
};

Main.defaultProps = {
  loading: false,
  noConnection: false,
  user: null,
  userRole: null,
};

Main.propTypes = {
  initialize: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  noConnection: PropTypes.bool,
  user: PropTypes.object,
  userRole: PropTypes.string,
};

export default withRouter(Main);
