import React from 'react';
import Parse from 'parse';
import { Link, Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Grid, Avatar, Container } from '@material-ui/core';
import profileImg from '../../assets/images/users.svg';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { withStyles } from '@material-ui/core/styles';


const stylesNavBar = theme => ({
    rootNav: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    avatar: {
        margin: 10,
        width: 55,
        height: 55,
    },
    icon: {
        margin: theme.spacing(1),
        fontSize: 32,
    }
});

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            logout: false
        }
    }

    isLogOut = () => {
        Parse.User.logOut();
        this.setState({
            logout: true
        })
    }

    renderRedirect = () => {
        if (this.state.logout) {
            return <Redirect to='/' />
        }
    }

    render() {
        const { classes } = this.props;


        return (
            // <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            //     <Link className="navbar-brand" to="/home">Weeclick Partenaire</Link>
            // </nav>
            <div className={classes.rootNav}>
                {this.renderRedirect()}
                <AppBar position="static" style={{ backgroundColor: "white" }}>
                    <Container fixed>
                        <Toolbar>
                            <Grid edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                                <Avatar alt="user img" src={profileImg} className={classes.avatar} />
                            </Grid>
                            <Typography variant="h6" className={classes.title}><Link style={{ color: '#000', textDecoration: 'none' }} to="/home">Weeclick Partenaire</Link></Typography>
                            <Button onClick={this.isLogOut}><PowerSettingsNewIcon className={classes.icon}/>Log-out</Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(stylesNavBar) (NavBar);