import React, { Component } from 'react';
import logoComptePro from '../../assets/icons/users.svg';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';
import { Container, Avatar, Typography, Grid, TextField, Paper } from '@material-ui/core';
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
}

const submit = {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(3, 0, 2),
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
                } else {
                    this.setState({ alertMsg: 'Le mot de passe n\'est pas identique' });
                }
        }
        if (this.state.user.password.length <= 5 && this.state.user.password.length > 15) {
            this.setState({ alertMsg: 'Le mot de passe doit comporter entre six et quinze caractères' });
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
        if (this.state.user.password && !this.state.user.repeatPw) {
            this.setState({ alertMsg: 'Veuillez confirmer votre mot de passe' });
        }
        // if (this.state.user.password || this.state.user.repeatPw) {
        //     this.setState({ alertMsg: 'Le mot de passe n\'est pas identique' });
        // }
        // else {
        //     this.setState({ alertMsg: 'Veuillez remplir tout les champs' });
        // }
        
    }

    printErrorMessage(codeError) {
        if (codeError === 202) {
            return 'Cette adresse e-mail est déjà utilisée';
        }
        if (codeError === 125) {
            return "Cette adresse e-mail est n'est pas valide";
        }
    }

    render() {

        const { /*registering*/msg } = this.props;
        const { user, alertMsg/*, submitted*/ } = this.state;

        return (
            <div component="main" className="App-header2">
                <Container maxWidth={'sm'}>
                    <Paper style={root}>
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
                                            {'En cliquant sur s\'enregistrer, vous acceptez nos '}
                                            <a style={{ color: 'blue', textDecoration: 'none' }} href="_blank">Conditions générales</a>{'. '}
                                        </label>
                                    </Grid>
                                </Grid>

                                {
                                    msg ?
                                    <Typography variant="h6" style={{color: '#F00', textAlign: "center"}}>{this.printErrorMessage(msg)}</Typography> :
                                    <Typography variant="h6" style={{color: '#F00', textAlign: "center"}}>{alertMsg}</Typography>
                                }

                                <input
                                    className="btn-solid-lg"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={submit}
                                    value="S'enregistrer"
                                    onClick={this.handleSubmit}/>
                            </form>
                        </div>
                    </Paper>
                </Container>
                <Footer/>
            </div>
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

