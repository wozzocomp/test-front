import { USER, COMMON } from '../../utils/dispatchTypes';

const initialState = {
  initialLoading: true,
  loading: false,
  user: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER.LOADING:
      return { ...state, loading: true };
    case USER.LOADING_END:
      return { ...state, loading: false, initialLoading: false };
    case USER.SET_USER:
      return { ...state, user: action.user };
    case COMMON.LOGOUT:
      return { ...initialState, initialLoading: false };
    default:
      return { ...state };
  }
};

export default user;
