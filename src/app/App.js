import React, { Component } from 'react';
import Parse from 'parse';
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
import PayPage from '../components/private/PayPage';

import '../css/App.css';
import Navigation from '../containers/Navigation';
import ErrorBoundary from '../containers/ErrorBoundary';
import DocumentReader from '../components/docs/DocumentReader';
import ChooseDoc from '../components/docs/ChooseDoc';
import DocReader from '../components/docs/DocReader';

class App extends Component {

	constructor(props) {
		super(props);

		history.listen((location, action) => {
			// clear alert on location change
			this.props.clearAlerts();
		});
	}

	componentDidMount() {
		try {
			const CurrentUser = Parse.User.current();
			const query = new Parse.Query(Parse.Object.extend('_Session'));
			query.equalTo("sessionToken", CurrentUser.getSessionToken())
			query.find()
			.then((snapshot) => {
				snapshot.forEach(res => {
					console.log(`aaaaa ${res.get('sessionToken')}`);
				})
			})
			.catch(error => {
				Parse.User.logOut();
				window.location.reload();
				// console.error(error);
			})
		} catch (error) {
			
		}
	}

	render() {
		console.log(`Link : ${window.location.pathname.substring(0, 16)}`);
		
		return (
			<div
				style={{
					msUserSelect: 'none',
					MozUserSelect: 'none',
					WebkitUserSelect: 'none',
				}}
			>
				<Router history={history}>
					<ErrorBoundary>
						{ window.location.pathname.substring(0, 15) !== "/doc/phone/link" && <Navigation/> }
						<Switch>
							<Route exact path='/' component={HomePage}/>
							<Route exact path="/forgot" component={ForgotPage}/>
							<ProtectedSigninRoute path="/login" component={LoginPage}/>
							<ProtectedSignupRoute path="/register" component={RegisterPage}/>
							<PrivateRoute path="/user" component={ProfilePage}/>
							<PrivateRoute path="/createcommerce" component={CreateCommerce}/>
							<PrivateRoute path="/updatecommerce" component={UpdateCommerce}/>
							<PrivateRoute path="/aboutcommerce" component={AboutCommerce}/>
							<PrivateRoute path="/pay" component={PayPage}/>
							<Route exact path="/doc" component={DocumentReader}/>
							<Route exact path="/doc/phone/link" component={ChooseDoc}/>
							<Route exact path="/doc/phone/link/:index" component={DocReader}/>
							<Route path="/doc/:index" component={DocumentReader}/>
							<Route path='/commerce/:commerceId' component={ReceiveCommercePage}/>
							<Route path="/*" component={Page404} />
						</Switch>
					</ErrorBoundary>
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

