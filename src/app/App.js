import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute, ProtectedSigninRoute, ProtectedSignupRoute } from '../components';
import { ProfilePage, CreateCommerce, AboutCommerce, UpdateCommerce } from '../components/sessionPage';
import { connect } from 'react-redux';
import { history } from '../helpers';
import { alertActions } from '../redux/actions'
import { HomePage } from '../components/HomePage';
import { ForgotPage } from '../components/forgotPasswordPage';
import { LoginPage } from '../components/loginPage';
import { RegisterPage } from '../components/registerPage';
import { Page404 } from '../components/notFoundPage';
import { ReceiveCommercePage } from '../components/receiveCommercePage';
import CreateCom from '../components/sessionPage/CreateCom';
import PayPage from '../components/private/PayPage';

import '../css/App.css';
import Navigation from '../containers/Navigation';

class App extends Component {

	constructor(props) {
		super(props);

		history.listen((location, action) => {
			// clear alert on location change
			this.props.clearAlerts();
		});
	}

	render() {
		return (
			<div
				style={{
					msUserSelect: 'none',
					MozUserSelect: 'none',
					WebkitUserSelect: 'none',
				}}
			>
				<Router history={history}>
					<Navigation/>
					<Switch>
						<Route exact path='/' component={HomePage}/>
						<Route exact path="/forgot" component={ForgotPage}/>
						<ProtectedSigninRoute path="/login" component={LoginPage}/>
						<ProtectedSignupRoute path="/register" component={RegisterPage}/>
						<PrivateRoute path="/user" component={ProfilePage}/>
						<PrivateRoute path="/createcom" component={CreateCom}/>
						<PrivateRoute path="/createcommerce" component={CreateCommerce}/>
						<PrivateRoute path="/updatecommerce" component={UpdateCommerce}/>
						<PrivateRoute path="/aboutcommerce" component={AboutCommerce}/>
						<PrivateRoute path="/pay" component={PayPage}/>
						<Route path='/commerce/:commerceId' component={ReceiveCommercePage}/>
						<Route path="/*" component={Page404} />
					</Switch>
				</Router>
			</div>
		);
	}
}

function mapState(state) {
	const { alert } = state;
	return { alert };
}

const actionCreators = {
	clearAlerts: alertActions.clear
}

const connectedApp = connect(mapState, actionCreators) (App);


export { connectedApp as App };

