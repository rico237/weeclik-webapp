import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, AppBar, Toolbar, Avatar, Container, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MoreIcon from '@material-ui/icons/MoreVert';

// Ressources
import Logo from '../assets/images/LogoWeeclik.svg';

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
    grow: {
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
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
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
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    return (
        <div className={classes.grow}>
            <AppBar position="fixed" elevation={1} style={{ backgroundColor: "white" }}>
                <Container fixed>
                    <Toolbar>
                        <Grid edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                            <Avatar alt="user img" src={Logo} className={classes.avatar} style={{borderRadius:0}}/>
                        </Grid>
                        <Typography variant="h4" className={classes.title}>Weeclik</Typography>
                        {/* <Button onClick={gotoRefConnexion}>Connexion</Button> */}
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <Link className="btn btn-primary rounded" style={{ textDecoration: 'none' }} to="/login" role="button">Connexion</Link>
                            <Link className="btn btn-outline-primary rounded" style={{ marginLeft: '10px', textDecoration: 'none' }} to="/register" role="button">Inscription</Link>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls="mobileMenuId"
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon style={{ color: 'black' }} />
                            </IconButton>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>

            <Menu
                id="mobileMenuId"
                anchorEl={mobileMoreAnchorEl}
                keepMounted
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
                <MenuItem>
                    <Link style={{ textDecoration: 'none' }} to="/login" role="button">
                        <Typography variant="inherit" style={{ color: 'black' }}>Connexion</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link style={{ textDecoration: 'none' }} to="/register" role="button">
                        <Typography variant="inherit" style={{ color: 'black' }}>Inscription</Typography>
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    ); 
    
}