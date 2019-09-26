import React, { Component } from 'react';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

import { Container, CssBaseline, TextField, Button, MenuItem } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField2: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField3: {
        minWidth: '53.5%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField4: {
        minWidth: '40%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    label: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    buttonSubmit: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(5),
    },
    textTitle: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    formControl: {
        // minWidth: '97%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    menu: {
        width: 200,
    },
});


class AddCommerce extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: Parse.User.current(),

            isCreate: false,
            
            nomCommerce: '',
            adresse: '',
            ville: '',
            bp: '',
            siteWeb: '',
            tel: '',
            description: '',
            statutCommerce: '',
            nombrePartages: 0,
            owner: '',
            position: '',
            mail: '',

            currencyCategory: '',

            id: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.createNewCommerce = this.createNewCommerce.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeSelect(event) {
        this.setState({currencyCategory: event.target.value});
    }


    handleIsCreate(_id) {
        this.setState(state => ({
            id: _id,
            isCreate: !state.isCreate
        }));
    }

    createNewCommerce(event) {
        event.preventDefault();

        const s = this.state;
        let addr = "";
        if (s.adresse !== "" && s.ville !== "" && s.bp !== "") {
            addr = s.adresse + ", " + s.ville + " " + s.bp;
        } else if (s.adresse !== "") {
            addr = s.adresse
        }

        if (s.nomCommerce !== "" && s.currencyCategory !== "" && addr !== "" && s.tel !== "") {
            const ParseCommerce = Parse.Object.extend("Commerce");
            const newCommerce   = new ParseCommerce();
            const point         = new Parse.GeoPoint({latitude: 0.0, longitude: 0.0})

            newCommerce.save({
                "nomCommerce": s.nomCommerce,
                "position": point,
                "siteWeb": s.siteWeb,
                "statutCommerce": 0,
                "adresse": addr,
                "nombrePartages": 0,
                "owner": Parse.User.createWithoutData(s.currentUser.id),
                "typeCommerce": s.currencyCategory,
                "mail": this.state.currentUser.email,
                "tel": s.tel,
                "description": s.description
            })
            .then((newCommerce) => {
                console.log(`Le commerce ${newCommerce.id} a été créer`);
                this.handleIsCreate(newCommerce.id);
            }, (error) => {
                console.log(`Failed to create new object, with error code: ' + ${error.message}`);
            })
        } else {
            console.log(s)
        }
    }



    render() {

        const { classes } = this.props;

        if (!this.state.currentUser) {
            return (
                <Redirect to="/" />
            )
        }

        if (this.state.isCreate) {
            return (
                <Redirect to={{
                    pathname: '/aboutcommerce',
                    state: { id: this.state.id }
                }} />
            )
        }

        return (
            <div>
                <NavBar/>
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="sm">
                        <div style={{ width: 500 }}>
                            <h3 className={classes.textTitle} >Creer un nouveau commerce</h3>
                            <form className={classes.container} autoComplete="on" onSubmit={this.createNewCommerce}>
                                <TextField
                                    // required
                                    className={classes.textField}
                                    fullWidth
                                    onChange={this.handleChange}
                                    name="nomCommerce"
                                    id="outlined-name"
                                    label="Nom du commerce"
                                    margin="dense"
                                    variant="outlined"
                                />
                                {/* Catégorie du commerce */}
                                <TextField
                                    select
                                    fullWidth
                                    variant="outlined"
                                    value={this.state.currencyCategory}
                                    onChange={this.handleChangeSelect}
                                    // required
                                    className={classes.textField2}
                                    label="Catégorie"
                                >   
                                    <MenuItem value=""><em>Aucune</em></MenuItem>
                                    <MenuItem value="Alimentaire">Alimentaire</MenuItem>
                                    <MenuItem value="Artisanat">Artisanat</MenuItem>
                                    <MenuItem value="Bâtiment">Bâtiment</MenuItem>
                                    <MenuItem value="Bien-être">Bien-être</MenuItem>
                                    <MenuItem value="Décoration">Décoration</MenuItem>
                                    <MenuItem value="Dépannage">Dépannage</MenuItem>
                                    <MenuItem value="Evènement">Evènement</MenuItem>
                                    <MenuItem value="E-commerce">E-commerce</MenuItem>
                                    <MenuItem value="Fabricant">Fabricant</MenuItem>
                                    <MenuItem value="Garagiste">Garagiste</MenuItem>
                                    <MenuItem value="Hôtellerie">Hôtellerie</MenuItem>
                                    <MenuItem value="Humanitaire">Humanitaire</MenuItem>
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
                                
                                {/* Informations du commerce */}
                                <TextField
                                    // required
                                    className={classes.textField}
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                    name="adresse"
                                    id="outlined-name"
                                    label="Adresse"
                                    margin="dense"
                                    variant="outlined"
                                />
                                <TextField
                                    // required
                                    className={classes.textField3}
                                    onChange={this.handleChange.bind(this)}
                                    name="ville"
                                    id="outlined-name"
                                    label="Ville"
                                    margin="dense"
                                    variant="outlined"
                                />
                                <TextField
                                    // required
                                    className={classes.textField4}
                                    onChange={this.handleChange.bind(this)}
                                    name="bp"
                                    id="outlined-name"
                                    label="Code postal"
                                    margin="dense"
                                    variant="outlined"
                                />
                                <TextField
                                    // required
                                    className={classes.textField}
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                    name="tel"
                                    id="outlined-name"
                                    label="Numéro de téléphone"
                                    margin="dense"
                                    variant="outlined"
                                />
                                <TextField
                                    // required
                                    className={classes.textField}
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                    name="siteWeb"
                                    id="outlined-name"
                                    label="Site web"
                                    margin="dense"
                                    variant="outlined"
                                />
                                {/* Description de votre commerce */}
                                <TextField
                                    // required
                                    className={classes.textField}
                                    multiline
                                    fullWidth
                                    rows="4"
                                    onChange={this.handleChange.bind(this)}
                                    name="description"
                                    id="outlined-name"
                                    label="Description du commerce"
                                    margin="dense"
                                    variant="outlined"
                                />
                                {/* Mes promotions */}
                                {/*
            statutCommerce: '',
            nombrePartages: '',
            owner: '',
            position: '',
            mail: '', */}
                                <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary">Creer le commerce</Button>
                            </form>
                        </div>
                    </Container>
                </React.Fragment>
                <Footer/>
            </div>
        );
        
        
    }

}

export default withStyles(styles) (AddCommerce);