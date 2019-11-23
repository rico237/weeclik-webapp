/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import Parse from 'parse';
import { Link } from 'react-router-dom';
import { Avatar, Grid, Container, IconButton, Paper, Typography, Button, CardHeader, Card, CardContent, Box } from '@material-ui/core';
import defaultProfile from '../../assets/icons/defaultUser.svg'
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import CommercePicture from './CommercePicture';

import { Copyright } from '../copyright/Copyright';

import IMG1 from '../../assets/images/img1.png';
import Artisanat from '../../assets/images/categories/cover1.jpg';
import BienEtre from '../../assets/images/categories/cover2.jpg';
import Decoration from '../../assets/images/categories/cover3.jpg';
import ECommerce from '../../assets/images/categories/cover4.jpg';
import Hotellerie from '../../assets/images/categories/cover6.jpg';
import Immobilier from '../../assets/images/categories/cover7.jpg';
import Informatique from '../../assets/images/categories/cover8.jpg';
import Alimentaire from '../../assets/images/categories/cover9.jpg';
import Nautisme from '../../assets/images/categories/cover12.png';
import Sante from '../../assets/images/categories/cover13.jpg';
import Restauration from '../../assets/images/categories/cover14.jpg';
import Textile from '../../assets/images/categories/cover16.jpg';
import Tourisme from '../../assets/images/categories/cover17.jpg';
import Transport from '../../assets/images/categories/cover18.jpg';
import Humanitaire from '../../assets/images/categories/cover19.jpg';


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
    background:
      'linear-gradient(34deg, rgba(55,16,83,1) 0%, rgba(162,73,190,1) 29%, rgba(33,16,83,1) 92%)',
}

const media = {
    flexShrink: 0,
    width: '50%',
    float: 'right',
    // marginRight: 'auto',
}

const content = {

}
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
            commerceList: [],
            nbCommerce: 0,
            open: false,
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
        // console.log("#####>>>>"+listPicture);
        return listPicture;
        // this.setState({
        //     listImg : listPicture
        // }, () => {
        //     this.setState({
        //         imgPreview1: this.state.listImg[0],
        //         imgPreview2: this.state.listImg[1],
        //         imgPreview3: this.state.listImg[2]
        //     })
        // })
        // console.log("aaaa   a   aaa "+this.state.imgPreview1);
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
                    var _img;

                    switch (elt.get("statutCommerce")) {
                        case 0:
                            _status = "Hors ligne - en attente de paiement"
                            break;
                        case 1:
                            _status = "En ligne"
                            break;
                        case 2:
                            _status = "Hors ligne - paiement annulé"
                            break;
                        case 3:
                            _status = "Erreur lors du paiement ou du renouvellement"
                            break;
                        case 4:
                            _status = ""
                            break;
                    
                        default:
                            _status = "Statut inconnu"
                            break;
                    }

                    switch (elt.get("typeCommerce")) {
                        case "Alimentaire":
                            _img = Alimentaire
                            break;
                        case "Artisanat":
                            _img = Artisanat
                            break;
                        case "Bâtiment":
                            _img = "Hors ligne - paiement annulé"
                            break;
                        case "Bien-être":
                            _img = BienEtre
                            break;
                        case "Décoration":
                            _img = Decoration
                            break;
                        case "Dépannage":
                            _img = "Hors ligne - en attente de paiement"
                            break;
                        case "Evènement":
                            _img = "Hors ligne - en attente de paiement"
                            break;
                        case "E-commerce":
                            _img = ECommerce
                            break;
                        case "Fabricant":
                            _img = "Hors ligne - en attente de paiement"
                            break;
                        case "Garagiste":
                            _img = "Hors ligne - en attente de paiement"
                            break;
                        case "Hôtellerie":
                            _img = Hotellerie
                            break;
                        case "Humanitaire":
                            _img = Humanitaire
                            break;
                        case "Immobilier":
                            _img = Immobilier
                            break;
                        case "Informatique":
                            _img = Informatique
                            break;
                        case "Nautisme":
                            _img = Nautisme
                            break;
                        case "Restauration":
                            _img = Restauration
                            break;
                        case "Textile":
                            _img = Textile
                            break;
                        case "Transport":
                            _img = Transport
                            break;
                        case "Tourisme":
                            _img = Tourisme
                            break;
                        case "Santé":
                            _img = Sante
                            break;
                        case "Autre":
                            _img = "Hors ligne - en attente de paiement"
                            break;
                    
                        default:
                            _img = IMG1
                            break;
                    }

                    newCommerces.push({
                        "id": elt.id,
                        "name": elt.get("nomCommerce"),
                        "status": _status,
                        "imgCategory": _img,
                        "description": elt.get("description"),
                        "nbPartage": elt.get("nombrePartages")
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
                var PICTURE = snapshot.get('profilePictureURL');
                var username = snapshot.getUsername();
                var mail = snapshot.getEmail();

                if (!PICTURE) {
                    PICTURE = {defaultProfile}
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
            <div>
                <header className="App-header-profile">
                    <div style={{height: '100vh', margin: '0px', padding: '0px'}}>
                        <Grid container spacing={2} style={{height: '100vh'}}>
                            <Grid item xs={12} sm={3} style={{background: 'white'}}>
                                <Paper style={{ margin: '10px', padding: '20px' }}>
                                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                                        <Grid item xs={12}>
                                            <div>
                                                {
                                                    this.state.user.picture.length > 2 ?
                                                    (<div><Avatar
                                                        alt="Image profil"
                                                        src={this.state.user.picture}
                                                        style={{
                                                            margin: 10,
                                                            width: 150,
                                                            height: 150,
                                                            display: 'block',
                                                            marginLeft: 'auto',
                                                            marginRight: 'auto',
                                                            border: 'solid #DA5456',
                                                            marginBottom: '30px'
                                                        }}
                                                    /></div>) :
                                                    (<Avatar
                                                        alt="Image de profil par defaut"
                                                        src={defaultProfile}
                                                        style={{
                                                            margin: 10,
                                                            width: 150,
                                                            height: 150,
                                                            display: 'block',
                                                            marginLeft: 'auto',
                                                            marginRight: 'auto',
                                                            border: 'solid #DA5456',
                                                            marginBottom: '30px'
                                                        }}
                                                    />)
                                                }
                                                <center style={{color: "black", padding: "auto 0px"}}>
                                                    <CardHeader
                                                        style={{ /*background: '#FFF', borderRadius: 16, padding: 16, */fontWeight: 'bold',
                                                            fontSize: '1.5rem', subheader: {color: 'rgba(255, 255, 255, 0.76)',}
                                                        }}
                                                        title={this.state.user.name}
                                                        subheader={this.state.user.email}
                                                    />
                                                </center>
                                            </div>
                                            <div style={{ float: "right", top: '0' }}>
                                                <IconButton
                                                    aria-label="edit"
                                                    component={Link}
                                                    to="/updateuser"
                                                    style={{ margin: '10px', outline: 'none' }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>

                                
                            </Grid>
                            <Grid item xs={12} sm={9} style={{background: '#F8F9FC'}}>
                                <Container component="main" maxWidth="md">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Card style={card}>
                                                <CardContent style={content}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={8}>
                                                            <Typography style={heading} variant="h6" gutterBottom>
                                                            TODO : Description sur la réduction dès la premiere utilisation
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <img alt="Ambassador" src={'https://jkkm.info/ui/images/awards/victory.png'} style={media}/>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                                <Button
                                                    variant="contained"
                                                    component={Link}
                                                    to="/createcommerce"
                                                    style={{
                                                        background: '#1EB0F8',
                                                        border: 0,
                                                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                                        color: 'white',
                                                    }}
                                                >Nouveau commerce</Button>
                                            </Card>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Card style={card}>
                                                <CardContent style={content}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={8}>
                                                            <Typography style={heading} variant="h6" gutterBottom>
                                                            Devenir ambassadeur et ambassadrice du seul réseau de confiance humain
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <img alt="Ambassador" src={'https://jkkm.info/ui/images/awards/victory.png'} style={media}/>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>


                                    </Grid>

                                    <Typography
                                        variant="h5"
                                        color="inherit"
                                        noWrap
                                        style={{ marginTop: '20px', flexDirection: "column", color: "#141C58", fontWeight: '900', letterSpacing: 0.5,  }}>Mes commerces</Typography>

                                    <Grid container direction="row-reverse" spacing={5}>
                                        <Container component="main" maxWidth="md">
                                            <Grid container spacing={2} style={{ marginTop: '25px' }}>
                                                {this.state.commerceList.map((elt, index) => (
                                                    <Grid key={index} item xs={12} sm={6}>
                                                        <div style={{ flexGrow: 1 }}>
                                                            <Paper style={{ padding: '10px', margin: 'auto', maxWidth: 500 }}>
                                                                <Grid container spacing={1}>
                                                                    <Grid item xs={4}>
                                                                        <CommercePicture
                                                                            commerceId={elt.id}
                                                                            imgCategory={elt.imgCategory}
                                                                            title={elt.name}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={8} container>
                                                                        <Grid item xs container direction="column" spacing={2}>
                                                                            <Grid item xs>
                                                                                <Typography gutterBottom variant="subtitle1">{elt.name}</Typography>
                                                                                <Typography variant="body2" color="textSecondary">{elt.status}</Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Button color="primary" onClick={() => { this.goToDetail(elt.id) }} aria-label={`info about ${elt.title}`} style={{outline: 'none'}}>Plus de détail</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <h5 style={{color:"#000"}}>
                                                                                {elt.nbPartage} {' '}
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#F00" width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                                                                            </h5>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Paper>
                                                        </div>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Container>
                                    </Grid>
                                </Container>
                            </Grid>
                        </Grid>
                    </div>
                </header>
                <Box mt={5}>
                    <Copyright/>
                </Box>
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

