import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, AppBar, Toolbar, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Parse from 'parse';
import NavBar from './home/NavBar';

// Ressources
import Logo from '../assets/images/logo_weeclik.png';

const styles =  makeStyles(theme => ({
    root: {
        height: '100%',
    },
    image: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        color: 'white',
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
        // width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root2: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: '#000',
        fontWeight: '600',
    },
}));

  export default function NavigationBar() {

    // const gotoRefConnexion = () => {
    //     if (this.refConnexion.current) {
    //         this.refConnexion.current.scrollIntoView(true);
    //         // this.refConnexion.current.scrollIntoView({
    //         //     behavior: "smooth",
    //         //     block: "nearest"
    //         // })
    //     }
    // }

    const classes = styles();

    // if (Parse.User.current()) {
    //     return (
    //         <NavBar/>
    //     )
    // }

    return (
        <div className={classes.root2}>
            <AppBar position="fixed" elevation={1} style={{ backgroundColor: "white" }}>
                <Toolbar>
                    <Grid edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                        <Avatar alt="user img" src={Logo} className={classes.avatar} style={{borderRadius:0}}/>
                    </Grid>
                    <Typography variant="h4" className={classes.title}>Weeclik</Typography>
                    {/* <Button onClick={gotoRefConnexion}>Connexion</Button> */}
                    <Link className="btn btn-primary rounded" style={{ textDecoration: 'none' }} to="/login" role="button">Connexion</Link>
                    <Link className="btn btn-outline-primary rounded" style={{ marginLeft: '10px', textDecoration: 'none' }} to="/register" role="button">Inscription</Link>
                </Toolbar>
            </AppBar>
        </div>
    ); 
    
}