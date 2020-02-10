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

// Load the Facebook API asynchronous when the window starts loading
window.fbAsyncInit = function() {
Parse.FacebookUtils.init({  // this line replaces FB.init({
    appId   : "1263383433872506",   // Facebook App ID
    cookie  : true,     // enable cookies to allow Parse to access the session
    xfbml   : true,     // initialize Facebook social plugins on the page
    version : 'v2.3'    // point to the latest Facebook Graph API version, found in FB's App dashboard.
})};

// Include the Facebook SDK
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();