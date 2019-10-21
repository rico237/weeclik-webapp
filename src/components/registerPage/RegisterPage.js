import React, { Component } from 'react';
import logo from '../../assets/icons/LogoWeeclik.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';
import { Container, CssBaseline, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Box } from '@material-ui/core';
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
    margin: theme.spacing(1),
}

const form = {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
}

const submit = {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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
            this.state.user.username &&
            this.state.user.email &&
            this.state.user.password &&
            this.state.user.repeatPw) {
                if (this.state.user.password === this.state.user.repeatPw) {
                    this.props.register(user);
                }
        } else {
            
        }
    }

    render() {

        // const { registering } = this.props;
        const { user/*, submitted*/ } = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div style={paper}>
                    <Avatar alt="Logo" src={logo} style={avatar}/>
                    <Typography component="h1" variant="h5" style={{color: "#000"}}>Sign up</Typography>
                    <form style={form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstName"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    type="text"
                                    name="firstName"
                                    label="First Name"
                                    value={user.firstName}
                                    onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastName"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    type="text"
                                    name="lastName"
                                    label="Last Name"
                                    value={user.lastName}
                                    onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="username"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    type="text"
                                    name="username"
                                    label="Username"
                                    value={user.username}
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
                                    label="Email Address"
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
                                    label="Password"
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
                                    label="Reapet Password"
                                    value={user.repeatPw}
                                    onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="J'accepte les conditions d'utilisation et ... professionel..."/>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={submit}
                            onClick={this.handleSubmit}>Sign Up</Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/login" style={{color: "#00F"}}>Already have an account? Sign in</Link>
                            </Grid>
                        </Grid>
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
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators) (RegisterPage);
export { connectedRegisterPage as RegisterPage };

