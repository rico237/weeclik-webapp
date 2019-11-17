import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { registration } from './registration.reducer';
import { authentication } from './authentication.reducer';
import { reducer as geolocation } from 'react-redux-geolocation';

const rootReducer = combineReducers({
    alert,
    registration,
    authentication,
    geolocation
});

export default rootReducer;