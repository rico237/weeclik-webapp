import React, { Component } from 'react';
import Parse from 'parse';
import FacebookLogin from 'react-facebook-login';
import logo from '../../assets/icons/LogoWeeclik.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';
import { Avatar, Grid, TextField, Typography, Paper } from '@material-ui/core';
import Footer from '../footer/Footer';


const theme = createMuiTheme({
    spacing: 4,
});

const root = {
    // marginTop: theme.spacing(8),
    marginTop: '70px',
    marginBottom: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '30px'
}

const paper = {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const avatar = {
    margin: theme.spacing(5),
    borderRadius: 0,
    width: 100,
    height: 100
}

const form = {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: "10px",
}

const submit = {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(3, 0, 2),
    outline: 'none'
}


class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            alertMsg: '',

            isLoggedIn: false,
            userID: '',
            name: '',
            email: '',
            picture: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.setState({ alertMsg: '...' });
            this.props.login(username, password);
        }
        if (!username && password) {
            this.setState({ alertMsg: 'Adresse e-mail est incomplète' });
        }
        if (username && !password) {
            this.setState({ alertMsg: 'Le mot de passe est incomplet' });
        }
        if (!username && !password) {
            this.setState({ alertMsg: 'L\'adresse e-mail et le mot de passe sont incomplets' });
        }
    }

    componentClicked = () => {
        // console.log("CLIK")
    }

    responseFacebook(response) {
        try {
            Parse.FacebookUtils.logIn();
            // null, {
            //     success: function(user) {
            //         if (!user.existed()) {
            //             user.set('username', response.email)
            //             user.set('email', response.email);
            //             user.set('name', response.name);
            //             user.set('profilePictureURL', response.picture.data.url);
            //             user.set('isPro', true);

            //             console.log('FB LOGIN BAD ');
            //         } else {
            //             console.log('FB LOGIN OK ' + user);
            //         }
            //     },
            //     error: function(result, error) {
            //         alert('Whoops Fb Login error, please try again');
            //         console.log('FB LOGIN ERROR => ', error);
            //     }
            // });
            // user.then(t => {
            //     console.log("----->>>> "+JSON.stringify(t, null, 2));
            // })
        } catch (error) {
            
        }
        // this.props.loginWith(/*response.userID, response.name, response.email, response.picture.data.url*/);
        // this.setState({
        //     isLoggedIn: true,
        //     userID: response.userID,
        //     name: response.name,
        //     email: response.email,
        //     picture: response.picture.data.url
        // })
    }

    render() {

        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = null;
        } else {
            fbContent = (<FacebookLogin
                appId="1263383433872506"
                autoLoad={false}
                fields="name,email,picture"
                textButton="Se connecter avec Facebook"
                cssClass="facebook-style-btn"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);
        }

        const { msg } = this.props;
        
        const { username, password, alertMsg } = this.state;

        return (
            <div component="main" className="App-header2">
                <Paper style={root}>
                    <div style={paper}>
                        <Avatar alt="Logo" src={logo} style={avatar}/>

        {/* <div>{fbContent}</div>
        <div style={{color: 'gray'}}>- ou -</div> */}

                        <form style={form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="username"
                                        fullWidth
                                        required
                                        variant="outlined"
                                        type="email"
                                        name="username"
                                        label="Adresse e-mail"
                                        value={username}
                                        onChange={this.handleChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="password"
                                        fullWidth
                                        required
                                        variant="outlined"
                                        type="password"
                                        name="password"
                                        label="Mot de passe"
                                        value={password}
                                        onChange={this.handleChange}/>
                                </Grid>
                                
                            </Grid>
                            {
                                msg ?
                                <Typography variant="h6" style={{color: '#F00', textAlign: "center"}}>{msg}</Typography> :
                                <Typography variant="h6" style={{color: '#F00', textAlign: "center"}}>{alertMsg}</Typography>
                            }
                                
                            
            
                            <input
                                className="btn-solid-lg"
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={submit}
                                value="S'identifier"
                                onClick={this.handleSubmit}/>

                            <Grid container justify="flex-end">
                                <Grid item xs>
                                    <Link to="/forgot" style={{color: "#00F", padding: "10px", fontSize: "15px", textDecoration: 'none'}}>{"Informations de compte oubliées ?"}</Link>
                                </Grid>
                            </Grid>
                        </form>
                        
                    </div>
                </Paper>
                <Footer/>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn, msg } = state.authentication;
    return { loggingIn, msg };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
}

const connectedLoginPage = connect(mapState, actionCreators) (LoginPage);
export { connectedLoginPage as LoginPage };

