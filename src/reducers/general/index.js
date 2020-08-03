import { COMMON } from '../../utils/dispatchTypes';

const initialState = {
  loading: false,
  noConnection: false,
};

const general = (state = initialState, action) => {
  switch (action.type) {
    case COMMON.NO_CONNECTION:
      return { ...state, noConnection: action.noConnection };
    case COMMON.LOADING_END:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};

export default general;
