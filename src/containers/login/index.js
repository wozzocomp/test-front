import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import LoginPage from '../../pages/Login';
import { login } from '../../actions/user';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      login,
    },
    dispatch,
  ),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
