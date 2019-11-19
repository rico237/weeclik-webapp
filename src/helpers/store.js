import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../redux/reducers';

const actions = []

const loggerMiddleware = createLogger({
    predicate: (getState, action) => includeAlways(action.type) || includeTemporarily(action.type)
});

const includeAlways = actionType => actions.includes(actionType)
const includeTemporarily = actionType =>
  window && window.MY_GLOBAL && window.MY_GLOBAL.log && window.MY_GLOBAL.log.enabled === true && window.MY_GLOBAL.log.actions.includes(actionType)

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);