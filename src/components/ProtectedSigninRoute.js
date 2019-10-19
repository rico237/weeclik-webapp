import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedSigninRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
);