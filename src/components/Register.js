import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from './Footer';
import Parse from 'parse';
import LoadApp from './external_link/LoadApp';
import img_promo from '../assets/images/pub_example.png';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account: {
                username: '',
                email: '',
                password: '',
                password1: ''
            },
            submitted: false,
            newAccount: false,
            isAuthenticated: false
        };

        this.signingUpWithAccount = this.signingUpWithAccount.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
    }

    handleChange1(event) {
        const username = event.target.value;
        this.setState(prevState => ({
            account: {
                ...prevState.account,
                username
            }
        }));
    }

    handleChange2(event) {
        const email = event.target.value;
        this.setState(prevState => ({
            account: {
                ...prevState.account,
                email
            }
        }));
    }

    handleChange3(event) {
        const password = event.target.value;
        this.setState(prevState => ({
            account: {
                ...prevState.account,
                password
            }
        }));
    }

    handleChange4(event) {
        const password1 = event.target.value;
        this.setState(prevState => ({
            account: {
                ...prevState.account,
                password1
            }
        }));
    }

    signingUpWithAccount(event) {
        console.log("SIGNING UP");
        event.preventDefault();
        this.setState({ submitted: true });
        if (this.state.account.username && this.state.account.email && this.state.account.password && this.state.account.password1) {
            if (this.state.account.password === this.state.account.password1) {                
                var user = new Parse.User();
                user.set("name", this.state.account.username);
                user.set("isPro", true);
                user.set("username", this.state.account.email);
                user.set("password", this.state.account.password);
                user.set("email", this.state.account.email);
                try {
                    // if (Parse.Error.INVALID_SESSION_TOKEN) {
                    //     user.logOut();
                    // }
                    user.signUp()
                        .then(() => {
                            if (user) {
                                this.setState({
                                    isAuthenticated: true
                                })
                            }
                        }).catch((error) => {
                            alert("Error: " + error.code + " " + error.message);
                        });
                } catch (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            }
        } else {
            return;
        }
    }

    render() {
        console.log(this.props);
        const { username, email, password, password1 } = this.state;

        if (this.state.isAuthenticated) {
            return (
                <Redirect to="/home" />
            )
        }

        return (
            <div>
                <div className="container" style={{ marginTop: 80 }}>
                    <div className="row">
                        <div className="col-12 col-md" style={{ backgroundColor : '#FFF' }}>
                            <div>
                                <h1 style={{color: '#000'}}>On aime, on partage!</h1>
                                <p className="text-secondary">Gerer vos commerces avec weeclik</p>
                                <form onSubmit={this.signingUpWithAccount}>
                                    <div className="form-group">
                                        <input
                                            value={username}
                                            onChange={this.handleChange1.bind(this)}

                                            type="text"
                                            className="form-control border-0 bg-light"
                                            id="exampleInputUsername1"
                                            placeholder="Nom"
                                            style={{ width : '300px' }}/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            value={email}
                                            onChange={this.handleChange2.bind(this)}

                                            autoComplete="off"
                                            type="email"
                                            className="form-control border-0 bg-light"
                                            id="exampleInputEmail1"
                                            placeholder="Adresse e-mail"
                                            style={{ width : '300px' }}/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            value={password}
                                            onChange={this.handleChange3.bind(this)}

                                            type="password"
                                            className="form-control border-0 bg-light"
                                            id="exampleInputPassword1"
                                            placeholder="Mot de passe"
                                            style={{ width : '300px' }}/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            value={password1}
                                            onChange={this.handleChange4.bind(this)}

                                            type="password"
                                            className="form-control border-0 bg-light"
                                            id="exampleInputPassword2"
                                            placeholder="Confirmer Mot de passe"
                                            style={{ width : '300px' }}/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary rounded mr-2">Rejoindre weeclik</button>
                                    </div>
                                            
                                    <div className="form-group">
                                        <Link className="nav-link" to="/">Déjà Membre Weeclik?</Link>
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
            </div>
        )
    }
}
export default Register;