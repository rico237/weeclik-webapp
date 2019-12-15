import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { allEvent } from './allEvent.reducer';
import { registration } from './registration.reducer';
import { authentication } from './authentication.reducer';

const rootReducer = combineReducers({
    alert,
    allEvent,
    registration,
    authentication
});

export default rootReducer;