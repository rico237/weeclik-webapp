import React, { Component } from 'react';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Commerce from './Commerce';
import Footer from './Footer';
import Geocode from 'react-geocode';

import { Container, CssBaseline, TextField, Button, MenuItem, InputLabel } from '@material-ui/core';

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
    label: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    buttonSubmit: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
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
            NewCommerce: Parse.Object.extend("Commerce"),
            
            nomCommerce: '',
            adresse: '',
            siteWeb: '',
            tel: '',
            promotions: '',
            description: '',
            statutCommerce: '',
            nombrePartages: 0,
            owner: '',
            position: '',
            mail: '',

            currencyCategory: '',
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

    createNewCommerce() {
        const s = this.state;
        if (s.nomCommerce !== "" && s.currencyCategory !== "" && s.adresse !== "" && s.tel !== "") {

            alert("OK", s.nomCommerce, s.currencyCategory, s.adresse, s.siteWeb, s.tel, s.promotions, s.description, s.statutCommerce);

            // const newCommerce = this.state.NewCommerce;
            // newCommerce.set("nomCommerce", s.nomCommerce);
            // newCommerce.set("typeCommerce", s.currencyCategory);    // currencyCategory
            // newCommerce.set("adresse", s.adresse);
            // newCommerce.set("siteWeb", s.siteWeb);
            // newCommerce.set("tel", s.tel);
            // newCommerce.set("promotions", s.promotions);
            // newCommerce.set("description", s.description);
            // newCommerce.set("statutCommerce", s.statutCommerce);
            // newCommerce.set("nombrePartages", s.nombrePartages);
            // newCommerce.set("owner", s.currentUser.id);
            // newCommerce.set("position", s.position);
            // newCommerce.set("mail", s.currentUser.getEmail);
            // newCommerce.save()
            //     .then((newCommerce) => {
            //         console.log(`Le commerce ${newCommerce.id} a été créer`);
            //         alert("OK");
            //     }, (error) => {
            //         console.log(`Failed to create new object, with error code: ' + ${error.message}`);
            //         alert("BAD");
            //     })
        }
    }



    render() {

        const { classes } = this.props;

        if (!this.state.currentUser) {
            return (
                <Redirect to="/" />
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
                            <form className={classes.container} autoComplete="off" onSubmit={this.createNewCommerce}>
                                <TextField
                                    required
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
                                {/* <InputLabel className={classes.label} required>Catégorie</InputLabel> */}
                                <TextField
                                    select
                                    fullWidth
                                    variant="outlined"
                                    value={this.state.currencyCategory}
                                    onChange={this.handleChangeSelect}
                                    required
                                    className={classes.textField}
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
                                
                                {/* Informations du commerce */}
                                <TextField
                                    required
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
                                    required
                                    className={classes.textField}
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                    name="nomCommerce"
                                    id="outlined-name"
                                    label="Ville"
                                    margin="dense"
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    className={classes.textField}
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.adresse}
                                    id="outlined-name"
                                    label="Code postal"
                                    margin="dense"
                                    variant="outlined"
                                />
                                <TextField
                                    required
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
                                    required
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
                                    required
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
                                <TextField
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    name="promotions"
                                    multiline
                                    fullWidth
                                    rows="4"
                                    id="outlined-name"
                                    label="Promotion"
                                    margin="dense"
                                    variant="outlined"
                                />
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