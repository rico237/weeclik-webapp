/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import logo from '../../assets/icons/LogoWeeclik.svg';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';


class Page404 extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <header className="App-header2">
				<img src={logo} className="App-logo" alt="logo" />
                <h1 style={{ margin: '40px'}}>Cette page n'existe pas.</h1>
                <a className="btn-solid-lg" href="/">ACCUEIL</a>
			</header>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedPage404 = connect(mapState, actionCreators) (Page404);
export { connectedPage404 as Page404 };

