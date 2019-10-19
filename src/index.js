import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { App } from './app';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { store } from './helpers';

import Parse from 'parse';

Parse.serverURL = process.env.REACT_APP_SERVER_URL;
Parse.initialize(process.env.REACT_APP_APP_ID);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();