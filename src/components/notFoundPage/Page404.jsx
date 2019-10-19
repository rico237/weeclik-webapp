import React, { Component } from 'react';
import logo from '../../logo.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../redux/actions';


class Page404 extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
                <h1 style={{color:'red'}}><code>404</code></h1>
                <h1 style={{color:'red'}}>NOT FOUND!!!</h1>
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

const connectedPage404 = connect(mapState, actionCreators) (Page404);
export { connectedPage404 as Page404 };

