import React from 'react';
import logo from '../assets/icons/LogoWeeclik.svg';
import { Link } from 'react-router-dom';
import { AppBar, Tooltip, Container, Box, Toolbar, Grid, Avatar, IconButton, Menu, MenuItem, ListItemIcon, Typography, withStyles } from '@material-ui/core';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import DehazeRoundedIcon from '@material-ui/icons/DehazeRounded';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions';
import defaultProfile from '../assets/icons/defaultUser.svg'

// Colors
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
	palette: {
		primary: red
	},
	typography: {
		button: {
            textTransform: 'none',
			fontWeight: '900',
            fontSize: '17px',
		}
	}
})

const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

const useStyles = makeStyles(theme => ({
    popup: {
        width: 400,
    },
    rootNav: {
        flexGrow: 1,
        backgroundColor: "#FFF"
    },
    bulletPrincipal: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    nameTitle: {
        float: 'left',
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 'bold',
        fontSize: '25px',
        color: grey[500],
        filter: 'brightness(1)'
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
        // margin: theme.spacing(1),
        fontSize: 30,
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(2, 4),
        color: "#141C58",
        fontSize: 15,
        fontWeight: 'bold',
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: 'none'
        }
    },
    linkButton: {
        margin: theme.spacing(1),
        color: "#000",
        textDecoration: 'none',
        // fontSize: 15,
        fontWeight: 'bold',
        "&:hover": {
            color: '#000',
            backgroundColor: "none",
            textDecoration: 'none',
        }
    },
    linkMenu: {
        display: 'flex',
        alignItems: 'center',
        color: 'black',
        textDecoration: 'none',
        verticalAlign: 'middle',
    },
    typographyStyle: {
        color: 'black',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        }
    },
    sectionDesktop: {
        width: '100%',
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


function Navigation(props) {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-menu';
    const mobileMenuId = 'primary-menu-mobile';

    const disconnect = () => {
        props.logout();
        handleMenuClose();
        window.location.reload();
    }

    return (
        <div className={classes.rootNav}>
            <ThemeProvider theme={theme}>
                <AppBar color="inherit" position="absolute" elevation={0}>
                    {
                        !localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`) ?
                        (<Container maxWidth={'lg'}><Toolbar>
                            <LightTooltip title="Accueil">
                                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                    <Grid edge="start" style={{ float: 'left', padding: '10px' }} color="inherit" aria-label="Menu">
                                        <Avatar src={logo} alt="Weeclik Logo" style={{ borderRadius: 0 }} />
                                    </Grid>
                                    <Typography className={classes.nameTitle} variant="h5">{'Weeclik'}</Typography>
                                </Link>
                            </LightTooltip>
                            <div className={classes.grow}/>
                            <div style={{ marginLeft: "auto" }}>
                                <div>
                                    <div className={classes.sectionDesktop}>
                                        <Typography><a href="/login" className={classes.linkButton} style={{ marginRight: '20px' }}>Connexion</a></Typography>
                                        <Typography><a href="/register" className={classes.linkButton} style={{ marginRight: '5px' }}>Inscription</a></Typography>
                                    </div>
                                    <div className={classes.sectionMobile}>
                                        <IconButton
                                            aria-label="show more"
                                            aria-controls={mobileMenuId}
                                            aria-haspopup="true"
                                            onClick={handleMobileMenuOpen}
                                            color="inherit"
                                            style={{outline: 'none'}}
                                        >
                                            <DehazeRoundedIcon style={{ color: 'black' }} />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </Toolbar></Container>) :
                        (<Container maxWidth={'lg'}><Toolbar>
                            <LightTooltip title="Accueil">
                                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                    <Grid edge="start" style={{ float: 'left', padding: '10px' }} color="inherit" aria-label="Menu">
                                        <Avatar src={logo} alt="Weeclik Logo" style={{ borderRadius: 0 }} />
                                    </Grid>
                                    <Typography className={classes.nameTitle} variant="h5">{'Weeclik'}</Typography>
                                </Link>
                            </LightTooltip>
                            {/* <div className={classes.grow}/> */}
                            <div className={classes.sectionDesktop}>
                                <Box mx={2}/>
                                <Grid
                                    container
                                    justify="flex-end"
                                >
                                    <Grid item>
                                        <LightTooltip title="Accueil">
                                            <button
                                                aria-label="Go to accueil page"
                                                aria-haspopup="true"
                                                className={classes.button}
                                                onClick={() => window.location.href="/"}
                                                style={{padding: '0', border: 'none', background: 'none', outline: 'none'}}>Accueil</button>
                                        </LightTooltip>
                                        <LightTooltip title="Mon profil">
                                            <button
                                                aria-label="Go to profile page"
                                                aria-haspopup="true"
                                                className={classes.button}
                                                onClick={() => window.location.href="/user"}
                                                style={{padding: '0', border: 'none', background: 'none', outline: 'none'}}>Mon profil</button>
                                        </LightTooltip>
                                    </Grid>
                                    <Grid item>
                                        <LightTooltip title="Se déconnecter">
                                            <IconButton
                                                edge="end"
                                                aria-label="Se déconnecter"
                                                onClick={disconnect}
                                                style={{outline: 'none'}}>
                                                <PowerSettingsNewRoundedIcon/>
                                            </IconButton>
                                        </LightTooltip>
                                    </Grid>
                                </Grid>
                                
                            </div>
                            <div style={{ marginLeft: "auto" }}>
                                    <div>
                                        <div className={classes.sectionMobile}>
                                            <IconButton
                                                aria-label="show more"
                                                aria-controls={mobileMenuId}
                                                aria-haspopup="true"
                                                onClick={handleProfileMenuOpen}
                                                color="inherit"
                                                style={{outline: 'none'}}
                                            >
                                                <DehazeRoundedIcon style={{ color: 'black' }} />
                                            </IconButton>
                                        </div>
                                    </div>
                            </div>
                                
                        </Toolbar></Container>)
                    }
                </AppBar>
            </ThemeProvider>



            <Menu
                id={mobileMenuId}
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


            <Menu
                id={menuId}
                keepMounted
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                className={classes.popup}
            >
                <MenuItem onClick={handleMenuClose}>
                    <Link to="/user" className={classes.linkMenu}>
                        <ListItemIcon>
                            <Avatar 
                                src={localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`) ?
                                    JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`)).profilePictureURL :
                                    defaultProfile}
                                alt="Weeclik Logo" />
                        </ListItemIcon>
                        <Typography variant="inherit" className={classes.typographyStyle}>Mon profil</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={disconnect}>
                    <ListItemIcon><PowerSettingsNewIcon/></ListItemIcon>
                    <Typography variant="inherit">Se déconnecter</Typography>
                </MenuItem>
            </Menu>
        </div>
    )

}


function mapState(state) {
    const { user } = state.authentication;
    return { user };
}

const actionCreators = {
    getUserInfo: userActions.getInfo,//userActions.getAllInfo
    logout: userActions.logout
}

export default connect(mapState, actionCreators) (Navigation);