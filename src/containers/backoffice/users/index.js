import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import BackofficeUsersPage from '../../../pages/backoffice/Users';

const mapStateToProps = ({ user }) => ({
  user: user.user,
  userRole: user.user?.userRole?.name,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({}, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BackofficeUsersPage));
