import React, { Component } from 'react';
import logoComptePro from '../../assets/icons/users.svg';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';
import { Container, CssBaseline, Avatar, Typography, Grid, TextField, Button, Box } from '@material-ui/core';
import { Copyright } from '../copyright/Copyright';


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
    margin: theme.spacing(5),
    borderRadius: 0,
    width: 160,
    height: 160
}

const form = {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
}

const submit = {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    outline: 'none'
}

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                repeatPw: ''
            },
            alertMsg: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (this.state.user.firstName &&
            this.state.user.lastName &&
            this.state.user.email &&
            this.state.user.password &&
            this.state.user.repeatPw) {
                if (this.state.user.password === this.state.user.repeatPw) {
                    this.props.register(user);
                }
        }
        if (!this.state.user.password || !this.state.user.repeatPw) {
            this.setState({ alertMsg: 'Veuillez entrer un mot de passe' });
        }
        if (!this.state.user.email) {
            this.setState({ alertMsg: 'Veuillez entrer un e-mail' });
        }
        if (!this.state.user.firstName || !this.state.user.lastName) {
            this.setState({ alertMsg: 'Veuillez entrer un prénom et un nom' });
        }
        // else {
        //     this.setState({ alertMsg: 'Veuillez remplir tout les champs' });
        // }
        
    }

    printErrorMessage(codeError) {
        if (codeError === 202) {
            return 'Le compte existe déjà pour ce nom d\'utilisateur';
        }
    }

    render() {

        const { /*registering*/msg } = this.props;
        const { user, alertMsg/*, submitted*/ } = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div style={paper}>
                    <Avatar alt="Logo" src={logoComptePro} style={avatar}/>
                    <Typography component="h1" variant="h5" style={{color: "#000"}}>Création d'un compte professionnel</Typography>
                    <form style={form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstName"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    type="string"
                                    name="firstName"
                                    label="Prénom"
                                    value={user.firstName}
                                    onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastName"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    type="string"
                                    name="lastName"
                                    label="Nom de famille"
                                    value={user.lastName}
                                    onChange={this.handleChange}/>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    id="username"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    type="email"
                                    name="username"
                                    label="Username"
                                    value={user.username}
                                    onChange={this.handleChange}/>
                            </Grid> */}
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    type="email"
                                    name="email"
                                    label="E-mail"
                                    value={user.email}
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
                                    label="Nouveau mot de passe"
                                    value={user.password}
                                    onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="repeatPw"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    type="password"
                                    name="repeatPw"
                                    label="Confirmation de mot de passe"
                                    value={user.repeatPw}
                                    onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <label style={{ fontSize: '14px' }}>
                                    {'En cliquant sur S\'enregistrer, vous acceptez nos '}
                                    <a style={{ color: 'blue', textDecoration: 'none' }} href="https://weeclik.com">Conditions générales</a>{'. '}
                                </label>
                            </Grid>
                        </Grid>

                        {
                            msg ?
                            <Typography variant="h6" style={{color: '#F00', textAlign: "center"}}>{this.printErrorMessage(msg)}</Typography> :
                            <Typography variant="h6" style={{color: '#F00', textAlign: "center"}}>{alertMsg}</Typography>
                        }

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={submit}
                            onClick={this.handleSubmit}>S'enregistrer</Button>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright/>
                </Box>
            </Container>
        );
    }
}

function mapState(state) {
    const { registering, msg } = state.registration;
    return { registering, msg };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators) (RegisterPage);
export { connectedRegisterPage as RegisterPage };

