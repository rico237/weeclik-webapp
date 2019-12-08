/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
import { Container, CssBaseline, Button, TextField, MenuItem, Typography, Grid } from '@material-ui/core';
import addCommercePicture from '../../assets/icons/addCommercePicture.png';
import BGImage from '../../assets/images/download-background.jpg';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';

import Footer from '../footer/Footer';

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



const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}



class CreateCommerce extends Component {
    constructor(props) {
        super(props);

        try {
            this.state = {
                commerce: {
                    nomCommerce: '',
                    adresse: '',
                    ville: '',
                    bp: '',
                    siteWeb: '',
                    tel: '',
                    description: '',
                    statutCommerce: '',
                    nombrePartages: 0,
                    promotions: '',
                    owner: '',
                    position: '',
                    mail: '',
                    currencyCategory: '',
                },
                imgPreview1: null,
                imgPreview1a: null,
                imgPreview2: null,
                imgPreview2a: null,
                imgPreview3: null,
                imgPreview3a: null,
                nbImageUpload: 0,

                id: '',

                validate: false,

                submitted: false,

                isCreate: false
            };
        } catch(error) {}

        this.handleValidate = this.handleValidate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createNewCommerce = this.createNewCommerce.bind(this);
        this.handleChangePicture1 = this.handleChangePicture1.bind(this);
        this.handleChangePicture2 = this.handleChangePicture2.bind(this);
        this.handleChangePicture3 = this.handleChangePicture3.bind(this);
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

    //#region UPLOAD_IMAGES
    handleChangePicture1(event) {
        const file = event.target.files[0];
        getBase64(file).then((base64) => {
            localStorage["file1Base64"] = base64;
        })
        this.setState({
            imgPreview1: URL.createObjectURL(file),
        });
    }
    handleChangePicture2(event) {
        const file = event.target.files[0];
        getBase64(file).then((base64) => {
            localStorage["file2Base64"] = base64;
        })
        this.setState({
            imgPreview2: URL.createObjectURL(file),
        });
    }
    handleChangePicture3(event) {
        const file = event.target.files[0];
        getBase64(file).then((base64) => {
            localStorage["file3Base64"] = base64;
        })
        this.setState({
            imgPreview3: URL.createObjectURL(file),
        });
    }

    _uploadImageToSerServer(img, idCommerce, localStore) {
        var file = new Parse.File("img.name", { base64: img });
        var Commerce_Photos = new Parse.Object("Commerce_Photos");
        var ParseCommerce = Parse.Object.extend("Commerce");
        var currentUser = Parse.User.current();

        if (currentUser) {
            file.save().then((f) => {
                Commerce_Photos.set("photo", file);
                Commerce_Photos.set("commerce", Parse.Object.extend("Commerce").createWithoutData(idCommerce));
                Commerce_Photos.save().then((snapshot) => {
                    const instanceCommerce = new ParseCommerce();
                    instanceCommerce.id = idCommerce
                    instanceCommerce.set("thumbnailPrincipal", { "__type": "Pointer", "className": "Commerce_Photos", "objectId": snapshot.id });
                    instanceCommerce.save().then(() => {
                        localStorage.removeItem(localStore)
                        localStorage.removeItem("file11Base64")
                    }, (error) => {
                        console.error('Failed to update commerce');
                    })
                })
            })
        }
    }
    //#endregion

    getAllCommerces() {
        const ParseCommerce = Parse.Object.extend("Commerce");
        const queryCommerce = new Parse.Query(ParseCommerce);

        queryCommerce.equalTo("owner", Parse.User.current());

        let newCommerces = [];

        queryCommerce.find()
            .then(snapshot => {
                snapshot.forEach((elt) => {
                    var _status;

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

                    newCommerces.push({
                        "id": elt.id,
                        "name": elt.get("nomCommerce"),
                        "status": _status,
                        "description": elt.get("description"),
                        "promotions": elt.get("promotions"),
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

    isCreate(_id) {
        this.setState(state => ({
            id: _id,
            isCreate: !state.isCreate
        }));
    }

    createNewCommerce(event) {
        event.preventDefault();

        const _state_commerce = this.state.commerce;
        let addr = "";

        if (_state_commerce !== "" && _state_commerce.ville !== "" && _state_commerce.bp !== "") {
            addr = _state_commerce.adresse + ", " + _state_commerce.ville + " " + _state_commerce.bp;
        } else if (_state_commerce.adresse !== "") {
            addr = _state_commerce.adresse;
        }

        if (_state_commerce.nomCommerce !== "" &&
            _state_commerce.currencyCategory !== "" &&
            _state_commerce.tel !== "" && addr !== "") {

                const currentUser = Parse.User.current()
                const ParseCommerce = Parse.Object.extend("Commerce");
                const newCommerce   = new ParseCommerce();
                const point         = new Parse.GeoPoint({latitude: 0.0, longitude: 0.0});

                newCommerce.save({
                    "nomCommerce": _state_commerce.nomCommerce,
                    "position": point,
                    "siteWeb": _state_commerce.siteWeb,
                    "statutCommerce": 0,
                    "adresse": addr,
                    "nombrePartages": 0,
                    "owner": Parse.User.createWithoutData(currentUser.id),
                    "typeCommerce": _state_commerce.currencyCategory,
                    "mail": this.props.user.email,//JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`)).email,
                    "tel": _state_commerce.tel,
                    "description": _state_commerce.description,
                    "promotions": _state_commerce.promotions
                })
                .then((newCommerce) => {
                    var localStore = "";
                    if (this.state.imgPreview1) {
                        localStore = "file1Base64";
                        this._uploadImageToSerServer(localStorage.getItem(localStore), newCommerce.id, localStore)
                    }
                    if (this.state.imgPreview2) {
                        localStore = "file2Base64";
                        this._uploadImageToSerServer(localStorage.getItem(localStore), newCommerce.id, localStore)
                    }
                    if (this.state.imgPreview3) {
                        localStore = "file3Base64";
                        this._uploadImageToSerServer(localStorage.getItem(localStore), newCommerce.id, localStore)
                    }
                    this.isCreate(newCommerce.id);
                }, (error) => {
                    console.error(`Failed to create new object, with error code: ' + ${error.message}`);
                })
                
        } else {
            console.error("Veillez remplir tout le formulaire");
            
        }
        
    }

    goToBack = () => {
        this.props.history.goBack();
    }


    componentDidMount() {
        try {
            this.getAllCommerces();
        } catch (error) {}
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
            <div style={{backgroundImage: `linear-gradient(rgba(29, 177, 248, 0.5), rgba(255, 255, 255, 0.5)), url("${BGImage}")`, backgroundSize: 'cover', objectFit: 'cover', height: '100%'}}>
                <Container component="main" maxWidth="sm" style={{background: "white", paddingBottom: '50px'}}>
                    <CssBaseline/>
                    <div style={root}>
                        <form onSubmit={this.createNewCommerce}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        className={"classes.textField"}
                                        fullWidth
                                        onChange={this.handleChange}
                                        name="nomCommerce"
                                        id="outlined-name"
                                        label="Nom du commerce"
                                        placeholder="Nom du commerce"
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
                                        required
                                        className={"classes.textField2"}
                                        label="Catégorie"
                                        helperText="Veuillez sélectionner une catégorie"
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
                                        required
                                        className={"classes.textField"}
                                        fullWidth
                                        onChange={this.handleChange.bind(this)}
                                        name="adresse"
                                        id="outlined-name"
                                        label="Adresse"
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        className={"classes.textField4"}
                                        fullWidth
                                        onChange={this.handleChange.bind(this)}
                                        name="bp"
                                        id="outlined-name"
                                        label="Code postal"
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        className={"classes.textField3"}
                                        fullWidth
                                        onChange={this.handleChange.bind(this)}
                                        name="ville"
                                        id="outlined-name"
                                        label="Ville"
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        className={"classes.textField"}
                                        fullWidth
                                        onChange={this.handleChange.bind(this)}
                                        name="tel"
                                        id="outlined-name"
                                        label="Numéro de téléphone"
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        // required
                                        className={"classes.textField"}
                                        fullWidth
                                        onChange={this.handleChange.bind(this)}
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
                                        required
                                        className={"classes.textField"}
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
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        // required
                                        multiline
                                        fullWidth
                                        rows="4"
                                        onChange={this.handleChange.bind(this)}
                                        name="promotions"
                                        id="outlined-name"
                                        label="Mes promotions"
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <label style={{ fontSize: '14px' }}>
                                        {'En cliquant sur ajouter mon commerce, vous acceptez nos '}
                                        <a style={{ color: 'blue', textDecoration: 'none' }} href="fake_url">Conditions générales</a>{'... '}
                                    </label>
                                </Grid>
                            </Grid>

                            <input
                                className="btn-solid-lg"
                                type="submit"
                                variant="contained"
                                color="primary"
                                value="Créer mon commerce"
                                style={button}
                            />

                            {/* <Button variant="contained" color="primary" type="submit" className={"buttonSubmit"} style={button}>Ajouter mon commerce</Button> */}
                            <Button variant="outlined" color="secondary" onClick={() => this.goToBack()} className={"buttonSubmit"} style={button}>Annuler</Button>
                        </form>
                    </div>
                </Container>
                <Footer/>
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
const connectedCreateCommerce = connect(mapState, actionCreators) (CreateCommerce);
export { connectedCreateCommerce as CreateCommerce };

