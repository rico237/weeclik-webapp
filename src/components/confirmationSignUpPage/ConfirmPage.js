import React, { Component } from 'react';
import logo from '../../assets/icons/LogoWeeclik.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../redux/actions';


class ConfirmPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Confirmer le mail
				</p>
                <Link className="App-link" to="/login">Sign - in</Link>
                <Link className="App-link" to="/">Home</Link>
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

const connectedConfirmPage = connect(mapState, actionCreators) (ConfirmPage);
export { connectedConfirmPage as ConfirmPage };

