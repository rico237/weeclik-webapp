import React, { Component } from 'react';
import logo from '../../assets/icons/LogoWeeclik.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, Avatar, Grid, TextField, Box, Typography, Paper } from '@material-ui/core';
import { Copyright } from '../copyright/Copyright';


const theme = createMuiTheme({
    spacing: 4,
});

const root = {
    // marginTop: theme.spacing(8),
    marginTop: '70px',
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
    width: 160,
    height: 160
}

const form = {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
            alertMsg: ''
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

    render() {

        const { msg } = this.props;
        
        const { username, password, alertMsg } = this.state;

        return (
            <div component="main" maxWidth="sm" className="App-header2">
                <CssBaseline/>
                <Paper style={root}>
                    <div style={paper}>
                        <Avatar alt="Logo" src={logo} style={avatar}/>
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
                                // fullWidth
                                variant="contained"
                                color="primary"
                                style={submit}
                                value="S'identifier"
                                onClick={this.handleSubmit}/>

                            <Grid container justify="flex-end">
                                <Grid item xs>
                                    <Link to="/forgot" style={{color: "#00F", padding: "10px", fontSize: "15px"}}>{"Informations de compte oubliées ?"}</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Paper>
                <Box mt={8}>
                    <Copyright/>
                </Box>
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

