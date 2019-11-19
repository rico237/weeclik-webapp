import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { registration } from './registration.reducer';
import { authentication } from './authentication.reducer';

const rootReducer = combineReducers({
    alert,
    registration,
    authentication
});

export default rootReducer;