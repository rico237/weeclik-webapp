import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login/Login';
import Home from './connected_pages/Account';
import Register from './register/Register';
import AddCommerce from './connected_pages/AddCommerce';
import AboutCommerce from './connected_pages/AboutCommerce';
import ForgotPassword from './passwordforgot/RestorPass'
import HomePage from './HomePage/HomePage';
import HomePage2 from './HomePage/Home';
import PageNotFound from './NotFoundPage';
// import Notfound from './Login';


function Main() {
    // if (Parse.User.current()) {
    //     return <Redirect to='/home' />
    // }

    return (
        <div>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/home' component={HomePage2}/>
                <Route path='/profile' component={Home}/>
                <Route path='/addcommerce' component={AddCommerce}/>
                <Route path='/aboutcommerce' component={AboutCommerce}/>
                <Route path='/register' component={Register}/>
                <Route path='/forgotpassword' component={ForgotPassword}/>
                <Route path='/login' component={Login}/>
                <Route path='*' component={PageNotFound}/>
            </Switch>
        </div>
    )
}

export default Main;