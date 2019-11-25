import React from 'react';
import logo from '../assets/icons/LogoWeeclik.svg';
// import logoCommercant from '../assets/icons/users.svg';
import { Link } from 'react-router-dom';
import { AppBar, Tooltip, /*Container,*/ Box, Button, Toolbar, Grid, Avatar, IconButton, Menu, MenuItem, ListItemIcon, Typography, makeStyles, withStyles } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import DehazeRoundedIcon from '@material-ui/icons/DehazeRounded';
import grey from '@material-ui/core/colors/grey';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions';
import defaultProfile from '../assets/icons/defaultUser.svg'

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
        margin: theme.spacing(1),
        color: "#141C58",
        fontSize: 15,
        fontWeight: 'bold',
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)"
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
            <AppBar color="inherit" position="fixed" elevation={0}>
                {
                    !localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`) ?
                    (<Toolbar>
                        <LightTooltip title="Accueil">
                            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <Grid edge="start" style={{ float: 'left', width: '50%' }} color="inherit" aria-label="Menu">
                                    <Avatar src={logo} alt="Weeclik Logo" style={{ borderRadius: 0 }} />
                                </Grid>
                                <Typography style={{ float: 'left', width: '50%', fontWeight: 'bold', color: grey[500] }} variant="h5">Weeclik</Typography>
                            </Link>
                        </LightTooltip>
                        <div className={classes.grow}/>
                        <div style={{ marginLeft: "auto" }}>
                            <div>
                                <div className={classes.sectionDesktop}>
                                    <a className="btn-solid-lg" href="/login" style={{ marginRight: '5px' }}>Connexion</a>
                                    <a className="btn-solid-lg"  href="/register" style={{ marginRight: '5px' }}>Inscription</a>
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
                    </Toolbar>) :
                    (<Toolbar>
                        <LightTooltip title="Accueil">
                            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <Grid edge="start" style={{ float: 'left', width: '50%' }} color="inherit" aria-label="Menu">
                                    <Avatar src={logo} alt="Weeclik Logo" style={{ borderRadius: 0 }} />
                                </Grid>
                                <Typography style={{ float: 'left', width: '50%', fontWeight: 'bold', color: grey[500] }} variant="h5">Weeclik</Typography>
                            </Link>
                        </LightTooltip>
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <LightTooltip title="Accueil">
                                <Button
                                    component={Link}
                                    to='/'
                                    aria-label="Go to accueil page"
                                    aria-haspopup="true"
                                    className={classes.button}
                                >Accueil</Button>
                            </LightTooltip>
                            <LightTooltip title="Mon profil">
                                <Button
                                    component={Link}
                                    to='/user'
                                    aria-label="Go to profile page"
                                    aria-haspopup="true"
                                    className={classes.button}
                                    // startIcon={<Avatar 
                                    //                 src={localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`) ?
                                    //                     JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`)).profilePictureURL :
                                    //                     defaultProfile}
                                    //                 alt="Weeclik Logo"
                                    //                 style={{ width: '24px', height: '24px'}} />}
                                >Mon profil</Button>
                            </LightTooltip>
                            <Box mx={9}/>
                            <LightTooltip title="Se déconnecter">
                                <IconButton
                                    edge="end"
                                    aria-label="Se déconnecter"
                                    onClick={disconnect}
                                    style={{outline: 'none', width: '55px'}}>
                                    <PowerSettingsNewRoundedIcon/>
                                </IconButton>
                            </LightTooltip>
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
                            
                    </Toolbar>)
                }
            </AppBar>




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