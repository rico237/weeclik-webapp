import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './css/w3.css';
// import './css/w3_styles.css';


import App from './components/App';
import Parse from 'parse';
// import Notfound from './components/Notfound';
// import Register from './components/Register';

import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

Parse.serverURL = 'https://weeclik-server-dev.herokuapp.com/parse';
Parse.initialize("JVQZMCuNYvnecPWvWFDTZa8A");

const routing = (
    <Router>
        <App/>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
