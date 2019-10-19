import React, { Component } from 'react';
import Parse from 'parse';
import { Container, CssBaseline, Avatar, Button, GridList, GridListTile, ListSubheader, GridListTileBar, IconButton, Grid, Paper, Typography, Box } from '@material-ui/core';
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
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../redux/actions';
import InfoIcon from '@material-ui/icons/Info';
import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    spacing: 4,
});

const root = {
    flexGrow: 1,
    paddingTop: '70px',
}


const paper = {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}



class CommercesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commerceList: [],
            user: {
                name: '',
                username: '',
                picture: ''
            },
            
        };
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


    componentDidMount() {
        // this.props.getUserInfo();
        // const id = JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`));
        this.getAllCommerces();
    }

    render() {
        // const { user } = this.props;className="App-header"
        console.log(this.state.commerceList);

        return (
            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <div style={root}>
                    <Grid container direction="row-reverse" spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <GridList cellHeight={300} spacing={4} style={{width: 'auto'}}>
                                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                                    <Box component="span" m={1}>
                                        <Button variant="contained" component={Link} to="/createcommerce">Create new commerce</Button>
                                        <ListSubheader component="div">Mes commerces</ListSubheader>
                                    </Box>
                                </GridListTile>
                                {this.state.commerceList.map((elt, index) => (
                                    
                                    <GridListTile key={index} cols={2}>
                                        <img src={elt.imgCategory} alt={elt.name} />
                                        <GridListTileBar
                                            title={elt.name}
                                            subtitle={<span>status: {elt.status}</span>}
                                            actionIcon={
                                                <IconButton onClick={() => { this.goToDetail(elt.id) }} aria-label={`info about ${elt.title}`}>
                                                    <InfoIcon />
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Paper style={paper}>
                                <Grid item  style={{ padding: '30px' }}><Avatar>W</Avatar></Grid>
                                <Grid item xs>
                                    Ambassadeur ...
                                    <Typography noWrap>
                                        Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.
                                    </Typography>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Container>
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
const connectedCommercesPage = connect(mapState, actionCreators) (CommercesPage);
export { connectedCommercesPage as CommercesPage };

