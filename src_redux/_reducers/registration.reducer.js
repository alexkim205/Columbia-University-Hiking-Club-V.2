import { userConstants } from '../_constants';
import { userConstants } from '../_constants/user.constants';

// used by spinner animation

export function registration (state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {registering: true};
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
}