import React from 'react';
import Parse from 'parse';
import { Link, Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Grid, Avatar, Container, Menu, MenuItem, IconButton, ListItemIcon } from '@material-ui/core';
import profileImg from '../../assets/images/users.svg';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import { withStyles } from '@material-ui/core/styles';


const stylesNavBar = theme => ({
    popup: {
        width: 200,
    },
    rootNav: {
        flexGrow: 1,
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
    }
});

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: Parse.User.current(),
            anchorEl: undefined,
            open: false,
            logout: false,
        }
    }

    handleClick = (event) => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    isLogOut = () => {
        Parse.User.logOut();
        this.setState({
            logout: true,
            open: false
        });
    }

    renderRedirectProfile = () => {
        this.handleClose();
        console.log("--))))----");
    }

    renderRedirect = () => {
        if (this.state.logout) {
            return <Redirect to='/' />
        }
    }

    componentDidMount() {
        this.renderRedirect();
    }

    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bulletPrincipal}>•</span>;

        return (
            <div className={classes.rootNav}>
                {this.renderRedirect()}
                <AppBar position="static" elevation={1} style={{ backgroundColor: "white" }}>
                    <Container fixed>
                        <Toolbar>
                            <Grid edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                                <Avatar alt="user img" src={profileImg} className={classes.avatar} />
                            </Grid>
                            <Typography variant="h6" className={classes.title}><Link style={{ color: '#000', textDecoration: 'none' }} to="/home">{this.state.currentUser.get("name")} {bull} Weeclik Partenaire</Link></Typography>
                            <IconButton
                                aria-label="show more"
                                aria-owns={this.state.open ? 'simple-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <AccountCircle className={classes.icon}/>
                            </IconButton>
                        </Toolbar>
                    </Container>
                </AppBar>

                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <MenuItem className={classes.popup} onClick={this.renderRedirectProfile}>
                        <Link style={{ color: 'black', textDecoration: 'none' }} to="/profile">
                            <ListItemIcon>
                                <AccountCircleOutlined className={classes.icon}/>
                            </ListItemIcon>
                            <Typography variant="inherit">
                                Profile
                            </Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <ListItemIcon>
                            <PowerSettingsNewIcon className={classes.icon}/>    
                        </ListItemIcon>
                        <Typography variant="inherit">Mes commerces</Typography>
                    </MenuItem>
                    <MenuItem onClick={this.isLogOut}>
                        <ListItemIcon>
                            <PowerSettingsNewIcon className={classes.icon}/>
                        </ListItemIcon>
                        <Typography variant="inherit" noWrap>Log-out</Typography>
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}

export default withStyles(stylesNavBar) (NavBar);