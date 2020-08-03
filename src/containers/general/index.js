import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import MainPage from '../../pages/Main';
import { initialize } from '../../actions/general';

const mapStateToProps = ({ general, user }) => ({
  noConnection: general.noConnection,
  loading: general.loading || user.initialLoading,
  user: user.user,
  userRole: user.user?.userRole?.name,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ initialize }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));
