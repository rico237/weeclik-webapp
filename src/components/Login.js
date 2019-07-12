import React, { Component } from 'react';
import app_store from '../assets/images/App_Store_Badge.eps';
import google_play from '../assets/images/google-play-badge.eps';
import img_promo from '../assets/images/pub_example.png';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account: {
                username: '',
                password: ''
            },
            submitted: false,
            newAccount: false
        };

        this.loginAccount = this.loginAccount.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }

    handleChangeUser(event) {
        const username = event.target.value;
        this.setState(prevState => ({
            account: {
                ...prevState.account,
                username
            }
        }));
    }

    handleChangePass(event) {
        const password = event.target.value;
        this.setState(prevState => ({
            account: {
                ...prevState.account,
                password
            }
        }));
    }

    loginAccount(event) {
        console.log("LOGIN");
        event.preventDefault();
        this.setState({ submitted: true });
        console.log(this.state.account.username);
        if (this.state.account.username && this.state.account.password ) {
            console.log("LOGIN" + JSON.stringify(this.account, null, 2));
            //return true;
        } else {
            return;
        }
    }

    createAccount() {
        console.log("CREATE ACCOUNT");
        if (!this.state.account.username || !this.state.account.password) {
            return;
        }
        console.log("CREATE ACCOUNT" + JSON.stringify(this.account, null, 2));
    }

    render() {

        const { username, password, submitted, newAccount } = this.state;

        return (
            <div>
                <h1>On aime, on partage!</h1>
                <p className="text-secondary">Gerer vos commerces avec weeclik</p>
                <form onSubmit={this.loginAccount}>
                    <div className="form-group">
                        <input
                            value={username}
                            onChange={this.handleChangeUser.bind(this)}

                            type="email"
                            className="form-control border-0 bg-light"
                            id="exampleInputEmail1"
                            placeholder="Adresse e-mail"
                            style={{ width : '300px' }}/>
                    </div>
                    <div className="form-group">
                        <input
                            value={password}
                            onChange={this.handleChangePass.bind(this)}

                            type="password"
                            className="form-control border-0 bg-light"
                            id="exampleInputPassword1"
                            placeholder="Mot de passe"
                            style={{ width : '300px' }}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary rounded mr-2">Se connecter</button>
                        <a className="btn btn-outline-primary rounded" href="#" role="button">Rejoindre weeclik</a>
                    </div>
                            
                    <div className="form-group">
                        <a href="#">Mot de passe oublié?</a>
                    </div>
                </form>
                <a className="navbar-brand" href="#">
                    <img src={app_store} alt="logo" />
                </a>
                <a className="navbar-brand" href="https://play.google.com/store/apps/details?id=cantum.weeclik&hl=fr">
                    <img src={google_play} alt="logo" />
                </a>
            </div>
        )
    }
}

export default Login;