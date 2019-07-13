import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoadApp from './external_link/LoadApp';
import img_promo from '../assets/images/pub_example.png';
import Footer from './home/Footer';
// import img_promo from '../assets/images/pub_example.png';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account: {
                username: '',
                password: ''
            },
            submitted: false,
            newAccount: false,
            isAuthenticated: false
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
            this.setState({
                isAuthenticated: true
            })
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

        if (this.state.isAuthenticated) {
            return (
                <Redirect to="/home" />
            )
        }

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md" style={{ backgroundColor : '#FFF' }}>
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
                                        <Link className="btn btn-outline-primary rounded" to="/register" role="button">Rejoindre weeclik</Link>
                                    </div>
                                            
                                    <div className="form-group">
                                        <Link className="nav-link" to="/forgotpassword">Mot de passe oublié?</Link>
                                    </div>
                                </form>
                                <LoadApp/>
                            </div>
                        </div>
                
                        <div className="col-12 col-md" style={{ backgroundColor : '#FFF' }}>
                            <img src={img_promo} className="rounded mx-auto d-block" alt="..." style={{ width : '600px'}}/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Login;