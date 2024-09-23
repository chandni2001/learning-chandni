
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/authActions';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
}
