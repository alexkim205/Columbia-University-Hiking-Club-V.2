import { userConstants } from '../_constants';

// used for spinner on individual user profile page
// - Get one user
// - Update one user

export function profile (state = {}, action) {
  switch (action.type) {
    case userConstants.GETONE_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETONE_SUCCESS:
      return {
        item: action.user,
      };
    case userConstants.GETONE_FAILURE:
      return {
        error: action.error,
      };

    case userConstants.UPDATE_REQUEST:
      return {
        // add 'updating:true' property to user being updated
        updating: true,
      };
    case userConstants.UPDATE_SUCCESS:
      return {};
    case userConstants.UPDATE_FAILURE:
      return {};
    default:
      return state;
  }
}