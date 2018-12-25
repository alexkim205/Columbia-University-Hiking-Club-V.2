import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration }   from './registration.reducer';
import { users }          from './users.reducer';
import { profile }           from './profile.reducer';
import { alert }          from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  profile,
  alert,
});

export default rootReducer;