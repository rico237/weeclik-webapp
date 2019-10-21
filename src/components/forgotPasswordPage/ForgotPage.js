import React, { Component } from 'react';
import Parse from 'parse';
import logo from '../../assets/icons/LogoWeeclik.svg';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { Container, CssBaseline, Avatar, Typography, Grid, TextField, Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    spacing: 4,
});

const paper = {
    marginTop: theme.spacing(8),
    paddingTop: '70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const avatar = {
    margin: theme.spacing(1),
}

const form = {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
}

const submit = {
    margin: theme.spacing(3, 0, 2),
}

class ForgotPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginAccount = this.loginAccount.bind(this);
    }

    handleChange(event) {
        const username = event.target.value;
        this.setState({username: username});
    }

    loginAccount(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        console.log(this.state.username);
        if (this.state.username) {
            const user = new Parse.User.requestPasswordReset(this.state.username);
            user.then(() => {
                console.log("SEND new Password" + this.state.username);
            }).catch(() => {
                alert("BAD : " + this.state.username);
            })
            //return true;
            this.setState({
                isAuthenticated: true
            })
        } else {
            return;
        }
    }

    render() {
        const { username } = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div style={paper}>
                    <Avatar alt="Logo" src={logo} style={avatar}/>
                    <Typography component="h1" variant="h5" style={{color: "#000"}}>Mot de passe oublié</Typography>
                    <form style={form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="username"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    type="text"
                                    name="username"
                                    label="Username"
                                    value={username}
                                    onChange={this.handleChange}/>
                            </Grid>
                            
                        </Grid>
        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={submit}
                            onClick={this.handleSubmit}>Envoyer mail</Button>
                    </form>
                </div>
            </Container>
            // <Link className="App-link" to="/login">Send</Link>
            // <Link className="App-link" to="/">Home</Link>
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

const connectedForgotPage = connect(mapState, actionCreators) (ForgotPage);
export { connectedForgotPage as ForgotPage };

