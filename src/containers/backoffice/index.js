import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import MainBackofficePage from '../../pages/backoffice/Main';

const mapStateToProps = ({ user }) => ({
  userRole: user.user?.userRole?.name,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({}, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainBackofficePage));
