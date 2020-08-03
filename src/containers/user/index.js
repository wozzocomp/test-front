import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import UserPage from '../../pages/User';
import { updateCurrentUser } from '../../actions/user';

const mapStateToProps = ({ user }) => ({
  loading: user.loading,
  selectedUser: user.user,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      updateCurrentUser,
    },
    dispatch,
  ),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));
