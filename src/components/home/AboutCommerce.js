import React, { Component } from 'react';
import Parse from 'parse';
import { } from 'react-router-dom';
import NavBar from './NavBar';
import Commerce from './Commerce';
import Footer from './Footer';

import profileImg from '../../assets/images/users.svg';

import { Container, CssBaseline, TextField, Button, MenuItem, Typography, GridList, GridListTile, GridListTileBar, IconButton, Card, CardContent, CardActions } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';

import { withStyles } from '@material-ui/core/styles';





const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    card: {
        marginTop: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField1: {
        minWidth: '41.5%',
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField2: {
        minWidth: '31%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField3: {
        minWidth: '6.5%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField4: {
        minWidth: '25%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField5: {
        minWidth: '71%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField6: {
        minWidth: '40%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    label: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    buttonSubmit: {
        margin: theme.spacing(1),
    },
    formControl: {
        // minWidth: '97%',
        margin: theme.spacing(1),
    },
    menu: {
        width: 200,
    },
    sousMenu: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        // padding: theme.spacing(1),
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
});

class AboutCommerce extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: Parse.User.current(),

            commerceID: this.props.location.state.id,

            commerce: {
                name: '',
                status: '',
                nbPartage: 0,

                currencyCategory: '',

                adresse: '',
                ville: '',
                bp: '',
                tel: '',
                siteWeb: '',

                description: '',

                promotion: '',
            },

        }
    }

    getCommerceInfo() {
        console.log("id = " + this.state.commerceID);
        const ParseCommerce = Parse.Object.extend("Commerce");
        const queryCommerce   = new Parse.Query(ParseCommerce);

        queryCommerce.get(this.state.commerceID)
            .then((object) => {
                object.fetch().then((fetchedCommerce) => {
                    var _name = fetchedCommerce.get('nomCommerce');
                    var _statusCommerce = fetchedCommerce.get('statutCommerce');
                    var _nbPartage = fetchedCommerce.get('nombrePartages');
                    var _typeCommerce = fetchedCommerce.get('typeCommerce');
                    var _addr = fetchedCommerce.get('adresse');
                    var _tel = fetchedCommerce.get('tel');
                    var _siteWeb = fetchedCommerce.get('siteWeb');
                    var _description = fetchedCommerce.get('description');
                    var _promotions = fetchedCommerce.get('promotions');
                    // var username = fetchedCommerce.getUsername();
                    // var email = fetchedCommerce.getEmail();
                    // var objectId = fetchedCommerce.id;
                    
                    this.setState(prevState => ({
                        commerce: {                 // object that we want to update
                            ...prevState.commerce,  // keep all other key-value pairs
                            nbPartage: _nbPartage,       // update the value of specific key
                            status: _statusCommerce,
                            name: _name,
                            currencyCategory: _typeCommerce,
                            adresse: _addr,
                            tel: _tel,
                            siteWeb: _siteWeb,
                            description: _description,
                            promotion: _promotions


                        }
                    }));
                });
                console.log("Successfully retrieved " + object + " scores.");
                console.log(JSON.stringify(object, null, 2));
                console.log("++======++++"+this.state.name);
            })
            .catch((error) => {

            });
    }


    componentDidMount() {
        this.getCommerceInfo();
    }



    render() {

        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        
        return (
            <div>
                <NavBar/>
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="md">

                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h4" component="h2">
                                    {this.state.commerce.name}
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>Statut</Typography>
                                <Typography variant="h5" component="h2" style={{ color: "#F00" }}>
                                    {"Hors ligne"}
                                    {bull}
                                    {"en attente de paiement"}
                                </Typography>

                                <Typography className={classes.title} color="textSecondary" gutterBottom>Nombre de partage</Typography>
                                <Typography variant="h5" component="h2">
                                    <ShareRoundedIcon/> {" "}
                                    {this.state.commerce.nbPartage}
                                    {bull}
                                    {" Partages"}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">About status</Button>
                            </CardActions>
                        </Card>

                        <div className={classes.sousMenu}>
                            <Typography variant="h6" gutterBottom>{"Catégorie du commerce"}</Typography>
                        </div>

                        <form className={classes.container} autoComplete="on" onSubmit={this.createNewCommerce}>
                            <TextField
                                select
                                variant="filled"
                                value={this.state.commerce.currencyCategory}
                                onChange={this.handleChangeSelect}
                                // required
                                className={classes.textField2}
                                label="Catégorie"
                            >   
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="Alimentaire">Alimentaire</MenuItem>
                                <MenuItem value="Humanitaire">Humanitaire</MenuItem>
                                <MenuItem value="Artisanat">Artisanat</MenuItem>
                                <MenuItem value="Bâtiment">Bâtiment</MenuItem>
                                <MenuItem value="Bien-être">Bien-être</MenuItem>
                                <MenuItem value="Décoration">Décoration</MenuItem>
                                <MenuItem value="Dépannage">Dépannage</MenuItem>
                                <MenuItem value="Evènement">Evènement</MenuItem>
                                <MenuItem value="E-commerce">E-commerce</MenuItem>
                                <MenuItem value="Garagiste">Garagiste</MenuItem>
                                <MenuItem value="Hôtellerie">Hôtellerie</MenuItem>
                                <MenuItem value="Immobilier">Immobilier</MenuItem>
                                <MenuItem value="Informatique">Informatique</MenuItem>
                                <MenuItem value="Nautisme">Nautisme</MenuItem>
                                <MenuItem value="Restauration">Restauration</MenuItem>
                                <MenuItem value="Textile">Textile</MenuItem>
                                <MenuItem value="Transport">Transport</MenuItem>
                                <MenuItem value="Tourisme">Tourisme</MenuItem>
                                <MenuItem value="Santé">Santé</MenuItem>
                                <MenuItem value="Autre">Autre</MenuItem>
                            </TextField>
                            <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary">Modifier la Catégorie</Button>
                        </form>

                        <div className={classes.sousMenu}>
                            <Typography variant="h6" gutterBottom>{"Informations du commerce"}</Typography>
                        </div>

                        <form className={classes.container} autoComplete="on" onSubmit={this.createNewCommerce}>
                            <TextField
                                required
                                value={this.state.commerce.adresse}
                                className={classes.textField1}
                                name="adresse"
                                id="outlined-name"
                                label="Adresse"
                                margin="dense"
                                variant="filled"
                            />
                            <TextField
                                // required
                                className={classes.textField2}
                                name="ville"
                                id="outlined-name"
                                label="Ville"
                                margin="dense"
                                variant="filled"
                            />
                            <TextField
                                // required
                                className={classes.textField3}
                                name="bp"
                                id="outlined-name"
                                label="Code postal"
                                margin="dense"
                                variant="filled"
                            />
                            <TextField
                                required
                                value={this.state.commerce.tel}
                                className={classes.textField4}
                                name="tel"
                                id="outlined-name"
                                label="Numéro de téléphone"
                                margin="dense"
                                variant="filled"
                            />
                            <TextField
                                required
                                value={this.state.commerce.siteWeb}
                                className={classes.textField5}
                                name="siteWeb"
                                id="outlined-name"
                                label="Site web"
                                margin="dense"
                                variant="filled"
                            />
                            <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary">Modifier les informations</Button>
                        </form>


                        <div className={classes.sousMenu}>
                            <Typography variant="h6" gutterBottom>{"Description de votre commerce"}</Typography>
                        </div>

                        <form className={classes.container} autoComplete="on" onSubmit={this.createNewCommerce}>
                            <TextField
                                required
                                value={this.state.commerce.description}
                                className={classes.textField}
                                multiline
                                fullWidth
                                rows="4"
                                name="description"
                                id="outlined-name"
                                label="Description du commerce"
                                margin="dense"
                                variant="filled"
                            />
                            <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary">Modifier la description</Button>
                        </form>

                        <div className={classes.sousMenu}>
                            <Typography variant="h6" gutterBottom>{"Promotion"}</Typography>
                        </div>

                        <form className={classes.container} autoComplete="on" onSubmit={this.createNewCommerce}>
                            <TextField
                                required
                                value={this.state.commerce.promotion}
                                className={classes.textField}
                                multiline
                                fullWidth
                                rows="4"
                                name="description"
                                id="outlined-name"
                                label="Promotion"
                                margin="dense"
                                variant="filled"
                            />
                            <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary">Modifier la promotion</Button>
                        </form>

                        <div className={classes.sousMenu}>
                            <Typography variant="h6" gutterBottom>{"Photos du commerce"}</Typography>
                        </div>

                        <GridList cellHeight={250} cols={3}>
                            <GridListTile>
                                <img src={profileImg} alt="Titre" />
                                <GridListTileBar
                                    title="Titre A"
                                    subtitle={<span>at : "Date de creation"</span>}
                                    actionIcon={
                                        <IconButton>
                                            <EditOutlinedIcon style={{ color: '#FFF' }}/>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                            <GridListTile>
                                <img src={profileImg} alt="Titre" />
                                <GridListTileBar
                                    title="Titre A"
                                    subtitle={<span>at : "Date de creation"</span>}
                                    actionIcon={
                                        <IconButton>
                                            <EditOutlinedIcon style={{ color: '#FFF' }}/>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                            <GridListTile>
                                <img src={profileImg} alt="Titre" />
                                <GridListTileBar
                                    title="Titre A"
                                    subtitle={<span>at : "Date de creation"</span>}
                                    actionIcon={
                                        <IconButton>
                                            <EditOutlinedIcon style={{ color: '#FFF' }}/>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        </GridList>


                        <div className={classes.sousMenu}>
                            <Typography variant="h6" gutterBottom>{"Vidéo du commerce"}</Typography>
                            <Button>COUCOU</Button>
                        </div>

                    </Container>
                </React.Fragment>
                <Footer/>
            </div>
        );
    }

}

export default withStyles(styles) (AboutCommerce);