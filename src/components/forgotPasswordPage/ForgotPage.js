import React, { Component } from 'react';
import Parse from 'parse';
import logo from '../../assets/icons/LogoWeeclik.svg';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { Avatar, Typography, Grid, TextField, Paper } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import Footer from '../footer/Footer';
import { isValideEmail } from '../../functions/weeclik.func';


const theme = createMuiTheme({
    spacing: 4,
});

const root = {
    // marginTop: theme.spacing(8),
    margin: '80px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '30px'
}

const paper = {
    margin: theme.spacing(8),
    // paddingTop: '70px',
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
}

class ForgotPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            submitted: false,
            alertMsg: '',
            sec: 3
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendNewPassword = this.sendNewPassword.bind(this);
    }

    handleChange(event) {
        const username = event.target.value;
        console.log("--- >: "+isValideEmail(username));
        this.setState({username: username});
    }

    sendNewPassword(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        // console.log(this.state.username);
        if (this.state.username) {
            const user = new Parse.User.requestPasswordReset(this.state.username);
            user.then(() => {
                // console.log("SEND new Password" + this.state.username);
                this.setState({ alertMsg: '...' });
                var counter = 3;

                this.intervalId = setInterval(() => {
                    counter--;
                    if (counter === -1) {
                        clearInterval(this.intervalId)
                        this.props.history.push('/');
                    } else {
                        this.setState({ sec: counter })
                        // console.log(counter + " secondes restantes");
                    }
                }, 1000);
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
        const { username, alertMsg, sec } = this.state;

        return (
            <div component="main" className="App-header2">
                <Paper style={root}>
                    <div style={paper}>
                        <Avatar alt="Logo" src={logo} style={avatar}/>
                        {
                            alertMsg ?
                            <div>
                                <Typography variant="h6" style={{textAlign: "center"}}>{`Un mail a été envoyé à l'adresse suivante ${username}`}</Typography>
                                <Typography component="p" style={{textAlign: "center"}}>{`${sec} ...`}</Typography>
                            </div> :
                            <div>
                                <Typography component="h1" variant="h5" style={{color: "#000"}}>Mot de passe oublié</Typography>
                                <Typography>Merci de saisir l'adresse mail associé à votre compte.</Typography>
                                <form style={form}>
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
                                                {
                                                    isValideEmail(username) ?
                                                    null :
                                                    (<div style={{ color: "red", fontSize: "14px" }}>
                                                        * Veuillez entrer un mail valide.
                                                    </div>)
                                                }
                                        </Grid>
                                    </Grid>

                                    <input
                                        disabled={!isValideEmail(username)}
                                        className="btn-solid-lg"
                                        type="submit"
                                        // fullWidth
                                        variant="contained"
                                        color="primary"
                                        style={submit}
                                        value="Envoyer le mail"
                                        onClick={this.sendNewPassword}/>
                                </form>
                            </div>
                        }
                    </div>
                </Paper>
                <Footer/>
            </div>
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

