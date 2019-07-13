import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import Footer from '../home/Footer';
import { Container, CssBaseline, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        color: 'white',
        padding: '0 30px',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


class RestorPass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            submitted: false
        };

        this.loginAccount = this.loginAccount.bind(this);
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

    render() {

        const { classes } = this.props;

        const { username, submitted } = this.state;

        if (this.state.isAuthenticated) {
            return (
                <Redirect to="/home" />
            )
        }

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
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
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Adresse e-mail"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary rounded mr-2">Se connecter</button>
                            <Link className="btn btn-outline-primary rounded" to="/" role="button">Retourner</Link>
                        </div>
                    </form>
                    <Footer/>
                </div>
            </Container>
            
        )
    }
}

export default withStyles(styles) (RestorPass);