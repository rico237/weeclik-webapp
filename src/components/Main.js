import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Home from './home/Account';
import Register from './Register';
import ForgotPassword from './passwordforgot/RestorPass'
// import Notfound from './Login';


function Main() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/home' component={Home}/>
                <Route path='/register' component={Register}/>
                <Route path='/forgotpassword' component={ForgotPassword}/>
            </Switch>
        </div>
    )
}

export default Main;