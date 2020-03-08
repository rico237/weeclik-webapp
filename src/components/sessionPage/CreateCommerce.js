/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
import {
    Dialog,
    DialogContentText,
    DialogContent,
    CircularProgress,
    Container, CssBaseline, Button, TextField, MenuItem, Typography, Grid } from '@material-ui/core';
import addCommercePicture from '../../assets/icons/addCommercePicture.png';
import BGImage from '../../assets/images/download-background.jpg';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { PopupMessage } from '../PopupMessage';

import axios from "axios";

import Footer from '../footer/Footer';

const root = {
    flexGrow: 1,
    paddingTop: '70px',
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
                openPopupAddCommerce: false,

                id: '',

                isCreate: false,

                codeRequiered: 0
            };
        } catch(error) {}

        this.handleChange = this.handleChange.bind(this);
        this.createNewCommerce = this.createNewCommerce.bind(this);
        this.handleChangePicture1 = this.handleChangePicture1.bind(this);
        this.handleChangePicture2 = this.handleChangePicture2.bind(this);
        this.handleChangePicture3 = this.handleChangePicture3.bind(this);
    }

    handleOpenAddCommerce = () => {
        this.setState({ openPopupAddCommerce: true });
    }

    handleCloseAddCommerce = () => {
        this.setState({ openPopupAddCommerce: false });
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

    //#region UPLOAD_IMAGES
    handleChangePicture1(event) {
        const file = event.target.files[0];
        getBase64(file).then((base64) => {
            // localStorage["file1Base64"] = base64;
            try {
                localStorage.setItem("file1Base64", base64);
            } catch(error) {console.error("Unhandled Rejection (QuotaExceededError): The quota has been exceeded.");}
            
        })
        this.setState({
            imgPreview1: URL.createObjectURL(file),
        });
    }
    handleChangePicture2(event) {
        const file = event.target.files[0];
        getBase64(file).then((base64) => {
            try {
                localStorage.setItem("file2Base64", base64);
            } catch(error) {console.error("Unhandled Rejection (QuotaExceededError): The quota has been exceeded.");}
        })
        this.setState({
            imgPreview2: URL.createObjectURL(file),
        });
    }
    handleChangePicture3(event) {
        const file = event.target.files[0];
        getBase64(file).then((base64) => {
            try {
                localStorage.setItem("file3Base64", base64);
            } catch(error) {console.error("Unhandled Rejection (QuotaExceededError): The quota has been exceeded.");}
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

    isCreate(_id) {
        this.setState(state => ({
            id: _id,
            isCreate: !state.isCreate
        }));
    }

    initGeocode(adresse) {
        axios.get("https://nominatim.openstreetmap.org/search?q="+adresse+"&format=json")
        .then((res) => {
            console.log(`${JSON.stringify(res.data, null, 2)}`);
            var sizeOfObject = res.data.length;
            for (var i = 0; i < sizeOfObject; i++) {
                console.log(`---> Lat : ${JSON.stringify(res.data[i], null, 2)}`);
                console.log(`---> Lat : ${res.data[i].lat}\n---> Lat : ${res.data[i].lon}`);
            }
        }, (error) => {
            console.error(error);
        })
    }

    createNewCommerce(event) {
        event.preventDefault();
        this.handleOpenAddCommerce();
        

        const _state_commerce = this.state.commerce;
        
        /**
         * Gestion de l'adresse
         */
        var addr = "";
        if (_state_commerce.adresse !== "" && _state_commerce.ville !== "" && _state_commerce.bp !== "") {
            addr = _state_commerce.adresse + ", " + _state_commerce.ville + " " + _state_commerce.bp;
        }

        if (_state_commerce.nomCommerce.length > 0 && _state_commerce.currencyCategory.length > 0 && _state_commerce.tel.length > 0 && (addr.length > 0 || addr !== undefined)) {
                // START
                axios.get("https://nominatim.openstreetmap.org/search?q="+addr+"&format=json")
                .then((res) => {
                    var sizeOfObject = res.data.length;
                    for (var i = 0; i < sizeOfObject; i++) {

                        // __START
                        const currentUser = Parse.User.current()
                        const ParseCommerce = Parse.Object.extend("Commerce");
                        const newCommerce   = new ParseCommerce();
                        const point         = new Parse.GeoPoint({latitude: Number(res.data[i].lat), longitude: Number(res.data[i].lon)});
                        const acl           = new Parse.ACL();
                        acl.setPublicReadAccess(true);
                        acl.setRoleWriteAccess("admin", true);
                        acl.setWriteAccess(currentUser.id, true);
                        newCommerce.setACL(acl);

                        newCommerce.save({
                            "nomCommerce": _state_commerce.nomCommerce,
                            "position": point,
                            "siteWeb": _state_commerce.siteWeb,
                            "statutCommerce": 0,
                            "adresse": addr,
                            "nombrePartages": 0,
                            "owner": Parse.User.createWithoutData(currentUser.id),
                            "endSubscription": new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                            "typeCommerce": _state_commerce.currencyCategory,
                            "mail": this.props.user.email,//JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`)).email,
                            "tel": _state_commerce.tel,
                            "description": _state_commerce.description,
                            "promotions": _state_commerce.promotions,
                            "brouillon": true, 
                            "createdFromProject": "ReactJS"
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
                            this.handleCloseAddCommerce();
                            this.isCreate(newCommerce.id);
                        }, (error) => {
                            console.error(`Failed to create new object, with error code: ' + ${error.message}`);
                        })
                        // __END
                    }
                }, (error) => {
                    console.error(error);
                })
                // END
                
        } else {
            console.error("Veuillez remplir tout le formulaire");
            if (_state_commerce.nomCommerce.length < 1) {
                console.error("Veuillez remplir le nom de commerce");
            }

            if (_state_commerce.currencyCategory.length < 1) {
                console.error("Veuillez remplir la categorie du commerce");
            }

            if (_state_commerce.adresse.length < 1) {
                console.error("Veuillez remplir l'adresse'");
            }

            if (_state_commerce.bp.length < 1) {
                console.error("Veuillez remplir le Code postal");
            }

            if (_state_commerce.ville.length < 1) {
                console.error("Veuillez remplir la ville");
            }

            if (_state_commerce.tel.length < 1) {
                console.error("Veuillez remplir le numero de tel");
            }

            if (_state_commerce.description.length < 1) {
                console.error("Veuillez remplir la description");
            }
        }
        
    }

    goToBack = () => {
        this.props.history.goBack();
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
        const { nomCommerce, adresse, bp, ville, tel, description, currencyCategory } = this.state.commerce;
        const isEnabled = nomCommerce.length > 0 && adresse.length > 0 && bp.length > 3 && ville.length > 0 && tel.length > 7 && description.length > 10 && currencyCategory.length > 0;

        return (
            <div style={{backgroundImage: `linear-gradient(rgba(29, 177, 248, 0.5), rgba(255, 255, 255, 0.5)), url("${BGImage}")`, backgroundSize: 'cover', objectFit: 'cover', height: '100%'}}>
                <Container component="main" maxWidth="sm" style={{background: "white", paddingBottom: '50px'}}>
                    <CssBaseline/>
                    <div style={root}>
                        {(() => {
                            switch (this.state.codeRequiered) {
                                case 1: return <PopupMessage open={true} message={"Veuillez entrer le nom de votre commerce"} bgColor="#F00" fgColor="#FFF"/>;
                                default: return null;
                            }
                        })()}
                        
                        <form onSubmit={this.createNewCommerce}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <label style={{ fontSize: '14px', color: 'black' }}>
                                        {'⚠️ Pour créer un nouveau commerce, veuillez à bien remplir tous les champs avec un * ensuite vous pouvez cliquer sur Créer mon commerce'}<br/>
                                    </label>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={this.handleChange}
                                        fullWidth name="nomCommerce" id="outlined-name" label="Nom du commerce" placeholder="Nom du commerce" margin="dense" variant="outlined"
                                        helperText="* Veuillez ajouter un nom de commerce"
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
                                        onChange={this.handleChange} value={this.state.commerce.currencyCategory}
                                        select fullWidth variant="outlined" name="currencyCategory" label="Catégorie"
                                        helperText="* Veuillez sélectionner une catégorie"
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
                                        onChange={this.handleChange.bind(this)}
                                        placeholder="Adresse (N° rue, avenue, boulevard, ...)"
                                        fullWidth name="adresse" id="outlined-name" label="Adresse" margin="dense" variant="outlined"
                                        helperText="* Veuillez ajouter l'adresse de votre commerce (N° rue, avenue, boulevard, ...)"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={this.handleChange.bind(this)}
                                        fullWidth name="bp" id="outlined-name" label="Code postal" margin="dense" variant="outlined"
                                        helperText="* Veuillez ajouter le code postal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={this.handleChange.bind(this)}
                                        fullWidth name="ville" id="outlined-name" label="Ville" margin="dense" variant="outlined"
                                        helperText="* Veuillez ajouter la ville"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={this.handleChange.bind(this)}
                                        fullWidth name="tel" id="outlined-name" label="Numéro de téléphone" margin="dense" variant="outlined"
                                        helperText="* Veuillez ajouter un numéro de téléphone"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={this.handleChange.bind(this)}
                                        fullWidth name="siteWeb" id="outlined-name" label="Site web" margin="dense" variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {/* Description de votre commerce */}
                                    <TextField
                                        onChange={this.handleChange.bind(this)}
                                        multiline fullWidth rows="4" name="description" id="outlined-name" label="Description du commerce" margin="dense" variant="outlined"
                                        helperText="* Veuillez ajouter une description"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={this.handleChange.bind(this)}
                                        multiline fullWidth rows="4" name="promotions" id="outlined-name" label="Mes promotions" margin="dense" variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <label style={{ fontSize: '14px', color: 'black', paddingBottom: '20px' }}>
                                        {'⚠️ Avant de créer un nouveau commerce, vérifiez que tous les champs avec un * sont bien remplis'}<br/>
                                        {'En cliquant sur Créer mon commerce, vous acceptez nos '}
                                        <a style={{ color: 'blue', textDecoration: 'none' }} href="_blank">Conditions générales</a>{'... '}
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid item style={{paddingBottom: '50px'}}>
                                <Button variant="outlined" color="secondary" onClick={() => this.goToBack()} className={"buttonSubmit"} style={{margin: '4px', outline: 'none', borderRadius: '2rem', padding: '12px 60px'}}>Annuler</Button>

                                
                                <input
                                    disabled={!isEnabled}
                                    className="btn-solid-lg"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    value="Créer mon commerce"
                                    style={{margin: '4px', outline: 'none', borderRadius: '2rem', float: 'right'}}
                                />
                            </Grid>
                        </form>
                    </div>


                    <div>
                        <Dialog
                            open={this.state.openPopupAddCommerce}
                            // onClose={this.handleCloseAddCommerce}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            style={{ minHeight: "600px"}}
                            maxWidth={"md"}
                        >
                            <DialogContent>
                                <center>
                                    <DialogContentText id="alert-dialog-description">
                                        Création d'un nouveau commerce. Cette étape peut prendre plusieurs minutes. N'actualisez pas la page et ne sélectionnez pas Précédent. Si vous procédez ainsi, vous annulez la demande
                                    </DialogContentText>
                                    <CircularProgress color="secondary" />
                                </center>
                            </DialogContent>
                            {/* <DialogActions>
                                <Button onClick={this.handleCloseAddCommerce} color="primary">Annuler</Button>
                            </DialogActions> */}
                        </Dialog>
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

