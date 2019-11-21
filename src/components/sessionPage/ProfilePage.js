/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import Parse from 'parse';
import { Link } from 'react-router-dom';
import { Avatar, Grid, Container, IconButton, Paper, Typography, Button } from '@material-ui/core';
import defaultProfile from '../../assets/icons/defaultUser.svg'
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import EditIcon from '@material-ui/icons/Edit';

import IMG1 from '../../assets/images/img1.png';
import Artisanat from '../../assets/images/categories/cover1.jpg';
import BienEtre from '../../assets/images/categories/cover2.jpg';
import Decoration from '../../assets/images/categories/cover3.jpg';
import ECommerce from '../../assets/images/categories/cover4.jpg';
// import IMG1 from '../../assets/images/categories/cover5.jpg';
import Hotellerie from '../../assets/images/categories/cover6.jpg';
import Immobilier from '../../assets/images/categories/cover7.jpg';
import Informatique from '../../assets/images/categories/cover8.jpg';
import Alimentaire from '../../assets/images/categories/cover9.jpg';
// import IMG1 from '../../assets/images/categories/cover10.jpg';
// import IMG1 from '../../assets/images/categories/cover11.jpg';
import Nautisme from '../../assets/images/categories/cover12.png';
import Sante from '../../assets/images/categories/cover13.jpg';
import Restauration from '../../assets/images/categories/cover14.jpg';
// import IMG1 from '../../assets/images/categories/cover15.jpg';
import Textile from '../../assets/images/categories/cover16.jpg';
import Tourisme from '../../assets/images/categories/cover17.jpg';
import Transport from '../../assets/images/categories/cover18.jpg';
import Humanitaire from '../../assets/images/categories/cover19.jpg';


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
                    <Container maxWidth="sm">
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={2}>
                            <Grid item xs={12}>
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
                                    /></div>)
                                    : (<Avatar
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

                                <Grid item xs={12} style={{ background: "#E2E2E2", margin: '0px 10px', padding: '10px', color: 'black', fontWeight: 'bold' }}>Mon profil</Grid>
                                
                                <Grid item xs={12} style={{ margin: '0px 10px', padding: '10px', background: "#FFF", height: '100%', overflow: 'auto' }}>
                                    <div style={{ float: "left" }}>
                                        <h5 style={{color:"#000"}}>
                                            {this.state.user.name}
                                        </h5>
                                        <h5 style={{color:"grey"}}>
                                            {this.state.user.email}
                                        </h5>
                                    </div>
                                    <div style={{ float: "right" }}>
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

                                <Grid item xs={12} style={{
                                    background: "#E2E2E2",
                                    margin: '0px 10px',
                                    padding: '10px',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    // position: '-webkit-sticky',
                                    position: 'sticky',
                                    top: '55px',

                                }}>
                                    <div style={{ display: 'flex' }}>
                                        <Typography
                                            variant="h5"
                                            color="inherit"
                                            noWrap
                                            style={{ flexDirection: "column" }}>Mes commerces</Typography>
                                        <Typography
                                            variant="body2"
                                            color="inherit"
                                            noWrap
                                            style={{ marginLeft: "25%" }}>
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
                                            </Typography>
                                    </div>
                                </Grid>

                                <Grid container direction="row-reverse" spacing={5}>
                                    <Container component="main" maxWidth="sm">
                                        <Grid item xs={12} style={{ marginTop: '25px' }}>
                                            {this.state.commerceList.map((elt, index) => (
                                                <div key={index} style={{ flexGrow: 1, paddingBottom: '5px' }}>
                                                    <Paper style={{ padding: '10px', margin: 'auto', maxWidth: 500 }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={4}>
                                                                <img style={{width: 128, height: 128}} src={elt.imgCategory} alt={elt.name} />
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
                                            ))}
                                        </Grid>
                                    </Container>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </Container>
                </header>
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

