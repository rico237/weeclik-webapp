import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Home from './home/Account';
import Register from './Register';
import AddCommerce from './home/AddCommerce';
import AboutCommerce from './home/AboutCommerce';
import ForgotPassword from './passwordforgot/RestorPass'
import HomePage from './HomePage/HomePage';
// import Notfound from './Login';


function Main() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/home' component={Home}/>
                <Route path='/addcommerce' component={AddCommerce}/>
                <Route path='/aboutcommerce' component={AboutCommerce}/>
                <Route path='/register' component={Register}/>
                <Route path='/forgotpassword' component={ForgotPassword}/>
                <Route path='/login' component={Login}></Route>
            </Switch>
        </div>
    )
}

export default Main;