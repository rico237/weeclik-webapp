import React, { Component } from 'react';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
import { Container, Typography, Button, TextField, MenuItem, FormControlLabel, Checkbox, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';
import addCommercePicture from '../../assets/icons/addCommercePicture.png';

const theme = createMuiTheme({
    spacing: 4,
});

const root = {
    flexGrow: 1,
    paddingTop: '70px',
}

const button = {
    margin: theme.spacing(1),
    outline: 'none'
}



class UpdateCommerce extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commerceId: this.props.location.state.id,
            commerce: {
                nomCommerce: '',
                adresse: '',
                siteWeb: '',
                tel: '',
                description: '',
                promotions: '',
                statutCommerce: '',
                nombrePartages: 0,
                owner: '',
                position: '',
                mail: '',
                currencyCategory: '',
                id: ''
            },

            validate: false,

            submitted: false,
            
            isCreate: false
        };

        this.handleValidate = this.handleValidate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.updateCommerce = this.updateCommerce.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { commerce } = this.state;
        this.setState({
            commerce: {
                ...commerce,
                [name]: value
            }
        });
    }

    handleValidate(event) {
        this.setState({validate: event.target.checked});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
    }


    getCommerceData() {
        const ParseCommerce = Parse.Object.extend("Commerce");
        const queryCommerce = new Parse.Query(ParseCommerce);

        // queryCommerce.equalTo("owner", Parse.User.current());

        queryCommerce.get(this.state.commerceId)
            .then((snapshotObject) => {
                snapshotObject.fetch().then((fetchedCommerce) => {
                    var _name = fetchedCommerce.get('nomCommerce');
                    var _statusCommerce = fetchedCommerce.get('statutCommerce');
                    var _nbPartage = fetchedCommerce.get('nombrePartages');
                    var _typeCommerce = fetchedCommerce.get('typeCommerce');
                    var _addr = fetchedCommerce.get('adresse');
                    var _tel = fetchedCommerce.get('tel');
                    var _siteWeb = fetchedCommerce.get('siteWeb');
                    var _description = fetchedCommerce.get('description');
                    var _promotions = fetchedCommerce.get('promotions');

                    this.setState(prevState => ({
                        commerce: {
                            ...prevState.commerce,
                            nomCommerce: _name,
                            statutCommerce: _statusCommerce,
                            nombrePartages: _nbPartage,
                            description: _description,
                            currencyCategory: _typeCommerce,
                            siteWeb: _siteWeb,
                            tel: _tel,
                            adresse: _addr,
                            promotions: _promotions
                        }
                    }));
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    

    isCreate(_id) {
        this.setState(state => ({
            id: _id,
            isCreate: !state.isCreate
        }));
    }


    goToBack = () => {
        this.props.history.goBack();
    }


    updateCommerce(event) {
        event.preventDefault();

        const _state_commerce = this.state.commerce;
        let addr = "";

        if (_state_commerce !== "") {
            addr = _state_commerce.adresse;
        } else if (_state_commerce.adresse !== "") {
            addr = _state_commerce.adresse;
        }

        if (_state_commerce.nomCommerce !== "" &&
            _state_commerce.currencyCategory !== "" &&
            _state_commerce.tel !== "" && addr !== "") {

                // const currentUser = Parse.User.current()
                const ParseCommerce = Parse.Object.extend("Commerce");
                const instanceCommerce = new ParseCommerce();
                const point         = new Parse.GeoPoint({latitude: 0.0, longitude: 0.0});

                instanceCommerce.id = this.state.commerceId;
                instanceCommerce.set("nomCommerce", _state_commerce.nomCommerce);
                instanceCommerce.set("position", point);
                instanceCommerce.set("siteWeb", _state_commerce.siteWeb);
                instanceCommerce.set("adresse", addr);
                instanceCommerce.set("typeCommerce", _state_commerce.currencyCategory);
                instanceCommerce.set("mail", JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`)).email,);
                instanceCommerce.set("tel", _state_commerce.tel);
                instanceCommerce.set("description", _state_commerce.description);
                instanceCommerce.set("promotions", _state_commerce.promotions)




                instanceCommerce.save()
                .then((newCommerce) => {
                    // console.log(`Le commerce ${newCommerce.id} a été créer ${JSON.stringify(currentUser, null, 2)}`);
                    this.isCreate(newCommerce.id);
                }, (error) => {
                    console.error(`Failed to create new object, with error code: ' + ${error.message}`);
                })
                
        } else {
            console.error("Veillez remplir tout le formulaire");
            
        }
        
    }


    componentDidMount() {
        this.getCommerceData();
    }

    render() {
        if (this.state.isCreate) {
            return (
                <Redirect to={{
                    pathname: '/aboutcommerce',
                    state: { id: this.state.id }
                }} />
            )
        }

        return (
            <Container component="main" maxWidth="sm">
                <div style={root}>
                    <form onSubmit={this.updateCommerce}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    onChange={this.handleChange}
                                    value={this.state.commerce.nomCommerce}
                                    name="nomCommerce"
                                    id="outlined-name"
                                    label="Nom du commerce"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    color="inherit"
                                    noWrap
                                    style={{ flexDirection: "column", color: "#141C58", fontWeight: '900', letterSpacing: 0.5 }}>Photos du commerce</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{height: 160, maxWidth: '100%', overflow: 'hidden'}}>
                                    <input
                                        id="icon-input-file-img1"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'None' }}
                                        onChange={this.handleChangePicture1}
                                    />
                                    <label htmlFor="icon-input-file-img1">
                                        <img
                                            alt="select1"
                                            src={
                                                this.state.imgPreview1?
                                                this.state.imgPreview1 :
                                                addCommercePicture
                                            }
                                            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 50%'}}
                                        />
                                    </label>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{height: 160, maxWidth: '100%', overflow: 'hidden'}}>
                                    <input
                                        id="icon-input-file-img2"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'None' }}
                                        onChange={this.handleChangePicture2}
                                    />
                                    <label htmlFor="icon-input-file-img2">
                                        <img
                                            alt="select2"
                                            src={
                                                this.state.imgPreview2?
                                                this.state.imgPreview2 :
                                                addCommercePicture
                                            }
                                            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 50%'}}
                                        />
                                    </label>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{height: 160, maxWidth: '100%', overflow: 'hidden'}}>
                                    <input
                                        id="icon-input-file-img3"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'None' }}
                                        onChange={this.handleChangePicture3}
                                    />
                                    <label htmlFor="icon-input-file-img3">
                                        <img
                                            alt="select3"
                                            src={
                                                this.state.imgPreview3?
                                                this.state.imgPreview3 :
                                                addCommercePicture
                                            }
                                            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 50%'}}
                                        />
                                    </label>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    variant="outlined"
                                    name="currencyCategory"
                                    value={this.state.commerce.currencyCategory}
                                    onChange={this.handleChange}
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
                            </Grid>
                            {/* Informations du commerce */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.commerce.adresse}
                                    name="adresse"
                                    id="outlined-name"
                                    label="Adresse"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.commerce.tel}
                                    name="tel"
                                    id="outlined-name"
                                    label="Numéro de téléphone"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.commerce.siteWeb}
                                    name="siteWeb"
                                    id="outlined-name"
                                    label="Site web"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/* Description de votre commerce */}
                                <TextField
                                    multiline
                                    fullWidth
                                    rows="4"
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.commerce.description}
                                    name="description"
                                    id="outlined-name"
                                    label="Description du commerce"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    fullWidth
                                    rows="4"
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.commerce.promotions}
                                    name="promotions"
                                    id="outlined-name"
                                    label="Mes promotions"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox
                                                required
                                                value={this.state.validate}
                                                onChange={this.handleValidate}
                                                color="primary" />}
                                    label="En cochant vous acceptez les conditions d'utilisation ..."/>
                            </Grid>
                        </Grid>


                        <Button variant="contained" color="primary" type="submit" className={"buttonSubmit"} style={button}>Modifier commerce</Button>
                        <Button variant="outlined" color="secondary" onClick={() => this.goToBack()} className={"buttonSubmit"} style={button}>Annuler</Button>
                    </form>
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
const connectedUpdateCommerce = connect(mapState, actionCreators) (UpdateCommerce);
export { connectedUpdateCommerce as UpdateCommerce };

