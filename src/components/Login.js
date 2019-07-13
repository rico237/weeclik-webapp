import React, { Component } from 'react';
import Parse from 'parse';
import { Link, Redirect } from 'react-router-dom';
import LoadApp from './external_link/LoadApp';
// import img_promo from '../assets/images/pub_example.png';
import Logo from '../assets/images/logo.svg';
import Footer from './home/Footer';
import { Grid, CssBaseline, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        height: '100%',
    },
    image: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        // borderRadius: 3,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        // height: 48,
        // padding: '0 30px',
        
        // backgroundImage: 'url(' + {img_promo} + ')',
        // backgroundColor: "#000",
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        // backgroundColor: theme.palette.secondary.main,
    },
    form: {
        // width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


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
            try {
                const user = Parse.User.logIn(this.state.account.username, this.state.account.password);
                user.then(() => {
                    if (user) {
                        this.setState({
                            isAuthenticated: true
                        })
                    }
                }, (error) => {
                    alert("BAD : " + error);
                });
            } catch (error) {
                console.log("LOGIN" + error);
            }
    
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

        const { classes } = this.props;

        const { username, password, submitted, newAccount } = this.state;

        if (this.state.isAuthenticated) {
            return (
                <Redirect to="/home" />
            )
        }

        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <div className={classes.avatar}>
                            <img src={Logo} className="rounded mx-auto d-block" alt="..." style={{ width : '150px' }}/>
                        </div>
                        <Typography component="h1" variant="h5">On aime, on partage!</Typography>
                        <p className="text-secondary">Gerer vos commerces avec weeclik</p>
                        <form className={classes.form} onSubmit={this.loginAccount}>
                            <div className="form-group">
                                <input
                                    value={username}
                                    onChange={this.handleChangeUser.bind(this)}

                                    type="email"
                                    className="form-control border-0 bg-light"
                                    id="exampleInputEmail1"
                                    placeholder="Adresse e-mail"/>
                            </div>
                            <div className="form-group">
                                <input
                                    value={password}
                                    onChange={this.handleChangePass.bind(this)}

                                    type="password"
                                    className="form-control border-0 bg-light"
                                    id="exampleInputPassword1"
                                    placeholder="Mot de passe"/>
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
                </Grid>
                {/* Zone Image */}
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                {/* <Container fixed>
                    <Typography component="div" style={{ backgroundColor: '#CFE8FC', height: '100vh' }}>
                        
                    </Typography>
                </Container> */}
                <Footer/>
            </Grid>
            
        )
    }
}

export default withStyles(styles) (Login);