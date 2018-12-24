import { userConstants } from '../_constants';
import { userConstants } from '../_constants/user.constants';

// used by spinner animation

export function registration (state = {}, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {registering: true};
    case userConstants.LOGIN_SUCCESS:
      return {};
    case userConstants.LOGIN_FAILURE:
      return {};
    default:
      return state;
  }
}