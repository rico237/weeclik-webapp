/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import Parse from 'parse';
import { Link } from 'react-router-dom';
import { Avatar, Grid, Container, IconButton, Typography, Button, CardHeader, Card, CardContent, /*Badge, */Tooltip, CardActions,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import CommercePicture from './CommercePicture';

import AppStore from '../../assets/icons/app-store-badge.png';
import GooglePlay from '../../assets/icons/google-play-badge.png';
import NoImage from '../../assets/images/no-image.png';
import NoProfile from '../../assets/images/no-profile.jpg';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import { UpdateUser } from './UpdateUser';




//#region THEME
const theme = createMuiTheme({
    spacing: 4,
});

const heading = {
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 0.5,
}

const card = {
    width: '100%',
    borderRadius: theme.spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgb(30, 176, 248)'
}

const card1 = {
    width: '100%',
    borderRadius: theme.spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
}

const content = {

}

const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

// const StyledBadgeRed = withStyles(theme => ({
//     badge: {
//         backgroundColor: '#F00',
//         width: 15,
//         height: 15,
//         boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//         '&::after': {
//             position: 'absolute',
//             top: 0, left: 0,
//             width: '100%', height: '100%',
//             borderRadius: '50%',
//             animation: '$ripple 1.2s infinite ease-in-out',
//             border: '1px solid #F00',
//             content: '""',
//         },
//     },
//     '@keyframes ripple': {
//         '0%': {
//             transform: 'scale(.8)',
//             opacity: 1,
//         },
//         '100%': {
//             transform: 'scale(2.4)',
//             opacity: 0,
//         },
//     }
// }))(Badge)

// const StyledBadgeGreen = withStyles(theme => ({
//     badge: {
//         backgroundColor: '#44b700',
//         width: 15,
//         height: 15,
//         boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//         '&::after': {
//             position: 'absolute',
//             top: 0, left: 0,
//             width: '100%', height: '100%',
//             borderRadius: '50%',
//             animation: '$ripple 1.2s infinite ease-in-out',
//             border: '1px solid #44b700',
//             content: '""',
//         },
//     },
//     '@keyframes ripple': {
//         '0%': {
//             transform: 'scale(.8)',
//             opacity: 1,
//         },
//         '100%': {
//             transform: 'scale(2.4)',
//             opacity: 0,
//         },
//     }
// }))(Badge)
//#endregion


class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                username: '',
                picture: '',
                email: ''
            },
            alertMsg: '',
            colorStatus: 'textSecondary',
            commerceList: [],
            nbCommerce: 0,
            open: false,
            modifyUserProfile: false
        };
    }

    handleChangeName(value) {
        this.setState(prevState => ({
            user: {                 // object that we want to update
                ...prevState.user,  // keep all other key-value pairs
                name: value   // update the value of specific key
            }
        }))
    }

    handleChangeMail(value) {
        this.setState(prevState => ({
            user: {                 // object that we want to update
                ...prevState.user,  // keep all other key-value pairs
                email: value   // update the value of specific key
            }
        }))
    }

    handleOpenUpdateProfile = () => {
        this.setState({ open: true });
    }

    handleCloseUpdateProfile = () => {
        this.setState({ open: false });
    }

    getThumbnailCommerce = (idCommerce) => {
        let commercePicture = '';

        const ParseCommerce = Parse.Object.extend("Commerce");

        const ParseCommercePhoto = Parse.Object.extend("Commerce_Photos");
        const queryCommercePhoto = new Parse.Query(ParseCommercePhoto);

        queryCommercePhoto.equalTo("commerce", new ParseCommerce({id: idCommerce}));

        queryCommercePhoto.find()
        .then(responseSnapshot => {
            responseSnapshot.forEach((elt) => {
                commercePicture = elt.get("photo").url();
                // commercePicture.push({ id: elt.id, url : elt.get("photo").url()});
            });
        });
        
        return new Promise(resolve => {
            setTimeout(() => resolve(commercePicture), 300)
        });
    }

    getUrlCommercePicture = async (idCommerce) => {
        const listPicture = await this.getThumbnailCommerce(idCommerce);
        return listPicture;
    }

    getAllCommerces() {
        const ParseCommerce = Parse.Object.extend("Commerce");
        const queryCommerce = new Parse.Query(ParseCommerce);

        queryCommerce.equalTo("owner", Parse.User.current());

        let newCommerces = [];
        

        queryCommerce.find()
            .then(snapshot => {
                snapshot.forEach((elt) => {
                    var _status;
                    var _color;

                    switch (elt.get("statutCommerce")) {
                        case 0:
                            _status = "Hors ligne - en attente de paiement"
                            _color = red[400]
                            break;
                        case 1:
                            _status = "En ligne"
                            _color = green[500]
                            break;
                        case 2:
                            _status = "Hors ligne - paiement annulé"
                            _color = red[400]
                            break;
                        case 3:
                            _status = "Erreur lors du paiement ou du renouvellement"
                            _color = red[400]
                            break;
                        case 4:
                            _status = ""
                            break;
                    
                        default:
                            _status = "Statut inconnu"
                            break;
                    }

                    newCommerces.push({
                        "id": elt.id,
                        "name": elt.get("nomCommerce"),
                        "status": _status,
                        "imgCategory": NoImage,
                        "description": elt.get("description"),
                        "nbPartage": elt.get("nombrePartages"),
                        "colorStatus": _color
                    });
                });

                this.setState({
                    commerceList: newCommerces,
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    goToDetail = (_id) => {
        this.props.history.push({
            pathname: '/aboutcommerce',
            state: { id: _id }
        })
    }

    getUserPicture() {
        var currentUser = Parse.User.current();
        if (currentUser) {
            currentUser.fetch().then((snapshot) => {
                var name = snapshot.get('name');
                // console.log(snapshot.get("profilPicFile")._url);
                var PICTURE = null
                if (snapshot.get("profilPicFile")._url) {
                    PICTURE = snapshot.get("profilPicFile")._url;
                } else {
                    PICTURE = snapshot.get('profilePictureURL');
                }
                var username = snapshot.getUsername();
                var mail = snapshot.getEmail();

                if (!PICTURE) {
                    PICTURE = {NoProfile}
                }

                this.setState(prevState => ({
                    user: {
                        ...prevState.user,
                        name: name,
                        username: username,
                        picture: PICTURE,
                        email: mail
                    }
                }))
            })
        } else {
            
        }
    }


    componentDidMount() {
        this.getUserPicture();
        this.getAllCommerces();
    }

    render() {
        return (
            <div style={{height: '100vh'}}>
                <Container style={{paddingTop: '70px'}}>
                    <Grid container spacing={1} style={{height: '100vh'}}>
                        <Grid item xs={12} sm={3}>
                            {/**
                             * COMPONENT GET USER PROFILE
                             */}
                            {
                                this.state.modifyUserProfile ?
                                (<Card style={{ margin: '0 10px' }}><UpdateUser/></Card>) :
                                (<Card style={{ margin: '0 10px' }}>
                                    <CardHeader
                                        action={
                                            <LightTooltip title="Modifier mon profil.">
                                                <IconButton
                                                    aria-label="edit"
                                                    onClick={() => {this.setState({modifyUserProfile: true});}}
                                                    style={{outline: 'none'}}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </LightTooltip>
                                        }
                                    />
                                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>                        
                                        <Grid item xs={12}>
                                            <div>
                                                {
                                                    this.state.user.picture.length > 2 ?
                                                    (<div>
                                                    <Avatar
                                                        alt="Image profil"
                                                        src={this.state.user.picture}
                                                        style={{margin: 10,width: 150,height: 150,display: 'block',marginLeft: 'auto',marginRight: 'auto',border: 'solid #1EB0F8',marginBottom: '10px'}}/></div>) :
                                                    (<Avatar
                                                        alt="Image de profil par defaut"
                                                        src={NoProfile}
                                                        style={{margin: 10,width: 150,height: 150,display: 'block',marginLeft: 'auto',marginRight: 'auto',border: 'solid #DA5456',marginBottom: '10px'}}/>)
                                                }
                                                <center style={{color: "black", padding: "auto 0px"}}>
                                                    <CardHeader
                                                        style={{ fontWeight: 'bold',fontSize: '1.5rem', subheader: {color: 'rgba(255, 255, 255, 0.76)',}}}
                                                        title={this.state.user.name}
                                                        subheader={this.state.user.email}/>
                                                </center>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Card>)
                            }
                            <Card style={{ color:"#000", margin: '10px' }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">Télécharger Weeclik</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">Profitez de promotions diverses et variées, faites partis d'un réseau de commerçants de confiance.</Typography>
                                </CardContent>
                                <CardActions>
                                    <img alt="App Store" onClick={() => window.open("https://apps.apple.com/us/app/weeclik/id1082731862?l=fr")} src={AppStore} style={{ width: "50%"}}/>
                                    <img alt="Google Play" onClick={() => window.open("https://play.google.com/store/apps/details?id=cantum.weeclik")} src={GooglePlay} style={{ width: "50%"}}/>
                                </CardActions>
                            </Card>
                        </Grid>






                        <Grid item xs={12} sm={9} style={{height: '100vh'}}>
                            {/**
                             * COMPONENT GET ALL COMMERCE
                             */}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Card style={card1}>
                                            <CardContent style={content}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="h6" gutterBottom style={{fontWeight: '900',color: '#000',letterSpacing: 0.5}}>
                                                            Pour son lancement l'ajout d'un commerce sur Weeclik est à un tarif préférenciel de 329.99 €
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Button
                                                    variant="contained"
                                                    component={Link}
                                                    to="/createcommerce"
                                                    style={{background: '#1EB0F8',border: 0,boxShadow: '0 3px 5px 2px rgba(30, 176, 248, .3)',color: 'white',textTransform: 'none',fontSize: 15,fontWeight: 700,borderRadius: 100}}>Créer un nouveau commerce</Button>
                                            </CardContent>   
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Card style={card}>
                                            <CardContent style={content}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs>
                                                        <Typography style={heading} variant="h6" gutterBottom>Devenir ambassadeur et ambassadrice du seul réseau de confiance humain</Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>

                                <Typography variant="h5" color="inherit" noWrap style={{ marginTop: '20px', flexDirection: "column", color: "#141C58", fontWeight: '900', letterSpacing: 0.5,  }}>Mes commerces</Typography>

                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                    {this.state.commerceList.map((elt, index) => (
                                        <Grid key={index} item xs={12} sm={6}>
                                            <div style={{ flexGrow: 1 }}>
                                                <Card style={{ padding: '0px' }}>
                                                    <Grid container direction="row" justify="center" alignItems="flex-start">
                                                        <Grid item xs={12} sm={12} md={4}>
                                                            <CommercePicture commerceId={elt.id} imgCategory={elt.imgCategory} title={elt.name}/>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={8}>
                                                            <CardContent style={{margin: "-12px 0 0 -8px", maxHeight: 128}}>
                                                                <Grid container direction="column" spacing={1}>
                                                                    <Grid item xs>
                                                                        <Typography gutterBottom variant="subtitle1">{elt.name}</Typography>
                                                                        <Typography variant="body2" style={{color: elt.colorStatus}}>{elt.status}</Typography>
                                                                    </Grid>
                                                                    <Grid item xs>
                                                                        <Grid container direction="row" justify="space-between" alignItems="flex-start">
                                                                            <Grid item xs>
                                                                                <h5 style={{color:"#000"}}>{elt.nbPartage} {' '}<svg xmlns="http://www.w3.org/2000/svg" fill="#F00" width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg></h5>
                                                                            </Grid>
                                                                            <Grid item xs>
                                                                                <Button size="small" variant="outlined" color="primary" onClick={() => { this.goToDetail(elt.id) }} aria-label={`info about ${elt.title}`}
                                                                                    style={{outline: 'none', textTransform: 'none', borderRadius: 100}}>Plus de détail</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </CardContent>
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

function mapState(state) {
    const { user } = state.authentication;
    return { user };
}

const actionCreators = {
    getUserInfo: userActions.getInfo,//userActions.getAllInfo
    // logout: userActions.logout
}

// connect permet de lier le component au state et aux actions
const connectedProfilePage = connect(mapState, actionCreators) (ProfilePage);
export { connectedProfilePage as ProfilePage };

