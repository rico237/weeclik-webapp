/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { Container, CssBaseline, Button, TextField, MenuItem, Typography, Grid, Box } from '@material-ui/core';
// import AddImg from '../../assets/images/addImage.svg'
import IMG1 from '../../assets/images/img1.png';
import addCommercePicture from '../../assets/icons/addCommercePicture.png';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';

import { Copyright } from '../copyright/Copyright';

const theme = createMuiTheme({
    spacing: 4,
});

const root = {
    flexGrow: 1,
    paddingTop: '70px',
}

const button = {
    margin: theme.spacing(1),
}



class CreateCommerce extends Component {
    constructor(props) {
        super(props);

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

        this.handleValidate = this.handleValidate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createNewCommerce = this.createNewCommerce.bind(this);
        this.changePicture1 = this.changePicture1.bind(this);
        this.changePicture2 = this.changePicture2.bind(this);
        this.changePicture3 = this.changePicture3.bind(this);

        this.onUploadImage = this.onUploadImage.bind(this);
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

    getUserPicture() {
        var currentUser = Parse.User.current();
        if (currentUser) {
            currentUser.fetch().then((snapshot) => {
                var name = snapshot.get('name');
                var PICTURE = snapshot.get('profilePictureURL');
                var username = snapshot.getUsername();

                if (!PICTURE) {
                    PICTURE = {IMG1}
                }
                // console.log("%%%%%zahdu%%% " +JSON.stringify(snapshot, null, 2));
                this.setState(prevState => ({
                    user: {
                        ...prevState.user,
                        name: name,
                        username: username,
                        picture: PICTURE
                    }
                }))
            })
        } else {
            
        }
    }






    //#region UPLOAD_IMAGES
    changePicture1(event) {
        // var file = new Parse.File("image", event.target.files[0]);
        this.setState({
            imgPreview1: URL.createObjectURL(event.target.files[0]),
            // imgPreview1a: JSON.parse(event.target.files[0])
        });
    }
    changePicture2(event) {
        this.setState({
            imgPreview2: URL.createObjectURL(event.target.files[0]),
            // imgPreview2a: JSON.parse(event.target.files[0])
        });
    }
    changePicture3(event) {
        this.setState({
            imgPreview3: URL.createObjectURL(event.target.files[0]),
            // imgPreview3a: JSON.parse(event.target.files[0])
        });
    }

    _uploadImageToSerServer(img, idCommerce) {
        var file = new Parse.File(img.name, img);
        var Commerce_Photos = new Parse.Object("Commerce_Photos");
        var ParseCommerce = Parse.Object.extend("Commerce");
        var currentUser = Parse.User.current();

        if (currentUser) {
            file.save().then(() => {
                Commerce_Photos.set("photo", file);
                Commerce_Photos.set("commerce", Parse.Object.extend("Commerce").createWithoutData(this.state.commerceId));
                Commerce_Photos.save().then((snapshot) => {
                    const instanceCommerce = new ParseCommerce();
                    instanceCommerce.id = idCommerce
                    instanceCommerce.set("thumbnailPrincipal", { "__type": "Pointer", "className": "Commerce_Photos", "objectId": snapshot.id });
                    instanceCommerce.save().then(() => {
                        // console.log("$$$$$ default image");
                    }, (error) => {
                        console.error('Failed to update commerce');
                    })
                    this.setState({
                        nbImageUpload: this.state.nbImageUpload + 1
                    })
                })
            })
        }
    }

    onUploadImage(_file, _idCommerce) {
        if (_file instanceof Blob) {
            var options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            }
            imageCompression(_file, options)
                .then((compressedFile) => {
                    return this._uploadImageToSerServer(compressedFile, _idCommerce);
                })
                .catch((error) => {
                    console.error(error);
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
                    "mail": JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`)).email,
                    "tel": _state_commerce.tel,
                    "description": _state_commerce.description,
                    "promotions": _state_commerce.promotions
                })
                .then((newCommerce) => {
                    if (this.state.imgPreview1) {
                        console.log("---- "+(typeof this.state.imgPreview1))
                        console.log("---- "+(typeof document.querySelector('input[id=icon-input-file-img1]').files[0]))
                        console.log("----ddd "+(typeof JSON.parse(document.querySelector('input[id=icon-input-file-img1]').files[0])))
                        console.log("----/// "+(typeof this.state.imgPreview1a))
                        console.log("---- "+JSON.stringify(document.querySelector('input[id=icon-input-file-img1]').files[0]))
                        // this.onUploadImage(document.querySelector('input[id=icon-input-file-img1]').files[0], newCommerce.id);
                    }
                    if (this.state.imgPreview2) {
                        // this.onUploadImage(document.querySelector('input[id=icon-input-file-img2]').files[0], newCommerce.id);
                    }
                    if (this.state.imgPreview3) {
                        // this.onUploadImage(document.querySelector('input[id=icon-input-file-img3]').files[0], newCommerce.id);
                    }
                    // console.log(`Le commerce ${newCommerce.id} a été créer ${JSON.stringify(currentUser, null, 2)}`);
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
        // this.props.getUserInfo();
        // const id = JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`));
        this.getAllCommerces();
    }

    render() {
        // const { user } = this.props;className="App-header"
        // console.log(this.state.commerce);

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
                <Container component="main" maxWidth="sm">
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
                                            onChange={this.changePicture1}
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
                                            onChange={this.changePicture2}
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
                                            onChange={this.changePicture3}
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

                            <Button variant="contained" color="primary" type="submit" className={"buttonSubmit"} style={button}>Ajouter mon commerce</Button>
                            <Button variant="outlined" color="secondary" onClick={() => this.goToBack()} className={"buttonSubmit"} style={button}>Annuler</Button>
                        </form>
                    </div>
                </Container>
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
const connectedCreateCommerce = connect(mapState, actionCreators) (CreateCommerce);
export { connectedCreateCommerce as CreateCommerce };

