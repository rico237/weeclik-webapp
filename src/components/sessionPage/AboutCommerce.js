/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import Parse from 'parse';
import {
    Container,
    CssBaseline,
    Button, Grid,
    Dialog,
    DialogTitle,
    Paper,
    Typography,
    IconButton,
    DialogContentText,
    DialogContent,
    DialogActions,
    CircularProgress,
    Card,
    Tooltip,
    Box,
    withStyles} from '@material-ui/core';
import imageCompression from 'browser-image-compression';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import Info from '@material-ui/icons/Info';

import NoImage from '../../assets/images/no-image.png';

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

//#region COLOR
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
// import Picture from './components/commerceComponent/Picture';
import Footer from '../footer/Footer';
// import HUE from '@material-ui/core/colors/HUE';
// import ShowInfoCommerce from './components/commerceComponent/ShowInfoCommerce';
//#endregion



//#region THEME
const theme = createMuiTheme({
    spacing: 4,
});

const root = {
    flexGrow: 1,
    paddingTop: '70px',
}

const root2 = {
    padding: theme.spacing(5),
}

const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);
//#endregion

class AboutCommerce extends Component {
    constructor(props) {
        super(props);

        this.infoRef = React.createRef();
        this.imageRef = React.createRef();
        this.movieRef = React.createRef();
        this.payementRef = React.createRef();

        try {
            this.state = {
                error: null,
                commerceId: this.props.location.state.id,
                currentUser: Parse.User.current(),
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
                    owner: '',
                    position: '',
                    mail: '',
                    currencyCategory: '',
                    promotion: '',
                    id: ''
                },
                file: [],
                imgs: null,
                listImg: [],
                movieURL: [],
                validate: false,
                submitted: false,
                openPopupVideoDelete: false,
                openPopupVideoAdd: false,
                openInfo: false,
                alertMsg: '',
                sec: 3,
                sec2: 0,
                imgPreview1: null,
                imgPreview2: null,
                imgPreview3: null,
                idPic1: '',
                idPic2: '',
                idPic3: '',
                canUpdateInfo: false,
                canUpdatePromo: false,
                canUpdateDescription: false,
                nbImageUpload: 0,
                colorStatus: red[400]
            };
        } catch (error) {
                
        }
        this.handleValidate = this.handleValidate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.changePicture1 = this.changePicture1.bind(this);
        this.changePicture2 = this.changePicture2.bind(this);
        this.changePicture3 = this.changePicture3.bind(this);

        this.onUploadImage = this.onUploadImage.bind(this);

        this.updateTheInfo = this.updateTheInfo.bind(this);
        this.updateThePromo = this.updateThePromo.bind(this);
        this.updateTheDescription = this.updateTheDescription.bind(this);
    }

    handleOpenInfo = () => {
        this.setState({ openInfo: true });
    }

    handleCloseInfo = () => {
        this.setState({ openInfo: false });
    }

    handleOpenDeleteVideo = () => {
        this.setState({ openPopupVideoDelete: true });
    }

    handleCloseDeleteVideo = () => {
        this.setState({ openPopupVideoDelete: false });
    }

    handleOpenAddVideo = () => {
        this.setState({ openPopupVideoAdd: true });
    }

    handleCloseAddVideo = () => {
        this.setState({ openPopupVideoAdd: false });
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

    isCreate(_id) {
        this.setState(state => ({
            id: _id,
            isCreate: !state.isCreate
        }));
    }

    getUUID() {
        return 'xxyxx'.replace(/[xy]/g, (c) => {
            var rand = Math.random() * 16 | 0, v = c === 'x' ? rand : (rand && (0x3 || 0x8));
            return v.toString(16);
        });
    }

    getCommerceData() {
        const ParseCommerce = Parse.Object.extend("Commerce");
        const queryCommerce = new Parse.Query(ParseCommerce);

        queryCommerce.get(this.state.commerceId)
            .then((snapshotObject) => {
                snapshotObject.fetch().then((fetchedCommerce) => {
                    var _name = fetchedCommerce.get('nomCommerce');
                    var _statusCommerce = fetchedCommerce.get('statutCommerce');
                    var _nbPartage = fetchedCommerce.get('nombrePartages');
                    var _typeCommerce = fetchedCommerce.get('typeCommerce');
                    var _addr = fetchedCommerce.get('adresse');
                    var _tel = fetchedCommerce.get('tel');
                    var _mail = fetchedCommerce.get('mail');
                    var _siteWeb = fetchedCommerce.get('siteWeb');
                    var _description = fetchedCommerce.get('description');
                    var _promotions = fetchedCommerce.get('promotions');

                    switch (_statusCommerce) {
                        case 0:
                            _statusCommerce = "Hors ligne - en attente de paiement"
                            this.setState({colorStatus: red[400]});
                            break;
                        case 1:
                            _statusCommerce = "En ligne"
                            this.setState({colorStatus: green[500]});
                            break;
                        case 2:
                            _statusCommerce = "Hors ligne - paiement annulé"
                            this.setState({colorStatus: red[400]});
                            break;
                        case 3:
                            _statusCommerce = "Erreur lors du paiement ou du renouvellement"
                            this.setState({colorStatus: red[400]});
                            break;
                        case 4:
                            _statusCommerce = ""
                            this.setState({colorStatus: red[400]});
                            break;
                    
                        default:
                            _statusCommerce = "Statut inconnu"
                            this.setState({colorStatus: red[400]});
                            break;
                    }

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
                            mail: _mail,
                            adresse: _addr,
                            promotion: _promotions
                        }
                    }));
                });
            })
            .catch(error => {
                console.error(error);
            });
    }


    //#region UPLOAD_IMAGE_PER_IMAGE
    changePicture1(event) {
        var currentUser = Parse.User.current();
        var file = new Parse.File("image", event.target.files[0]);
        var Commerce_Photos = new Parse.Object("Commerce_Photos");
        if (currentUser) {
            this.setState({
                imgPreview1: URL.createObjectURL(event.target.files[0]),
            });
            file.save().then(() => {
                Commerce_Photos.set("photo", file);
                Commerce_Photos.set("commerce", Parse.Object.extend("Commerce").createWithoutData(this.state.commerceId));
                Commerce_Photos.save()
                    .then((snapshot) => {
                        this.setState({
                            idPic1: snapshot.id
                        })
                        window.location.reload();
                    });
            }, (error) => {
                console.error(error.code + " --- " + error.message);
            })
        }
    }

    changePicture2(event) {
        var currentUser = Parse.User.current();
        var file = new Parse.File("image", event.target.files[0]);
        var Commerce_Photos = new Parse.Object("Commerce_Photos");
        if (currentUser) {
            this.setState({
                imgPreview2: URL.createObjectURL(event.target.files[0])
            });
            file.save().then(() => {
                Commerce_Photos.set("photo", file);
                Commerce_Photos.set("commerce", Parse.Object.extend("Commerce").createWithoutData(this.state.commerceId));
                Commerce_Photos.save()
                    .then((snapshot) => {
                        this.setState({
                            idPic2: snapshot.id
                        })
                        window.location.reload();
                    });
            }, (error) => {
                console.error(error.code + " --- " + error.message);
            })
        }
    }

    changePicture3(event) {
        var currentUser = Parse.User.current();
        var file = new Parse.File("image", event.target.files[0]);
        var Commerce_Photos = new Parse.Object("Commerce_Photos");
        if (currentUser) {
            this.setState({
                imgPreview3: URL.createObjectURL(event.target.files[0])
            });
            file.save().then(() => {
                Commerce_Photos.set("photo", file);
                Commerce_Photos.set("commerce", Parse.Object.extend("Commerce").createWithoutData(this.state.commerceId));
                Commerce_Photos.save()
                    .then((snapshot) => {
                        this.setState({
                            idPic3: snapshot.id
                        })
                        window.location.reload();
                    });
            }, (error) => {
                console.error(error.code + " --- " + error.message);
            })
        }
    }
    //#endregion

    //#region UPLOAD_IMAGE
    uploadImageToServer(img, n, n_max) {
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
                    if (n === 0) {
                        instanceCommerce.id = this.state.commerceId
                        instanceCommerce.set("thumbnailPrincipal", { "__type": "Pointer", "className": "Commerce_Photos", "objectId": snapshot.id });
                        instanceCommerce.save().then(() => {
                            // console.log("$$$$$ default image");
                        }, (error) => {
                            console.error('Failed to update commerce');
                        })
                    }
                    this.setState({
                        nbImageUpload: this.state.nbImageUpload + 1
                    })
                    if (this.state.nbImageUpload === n_max) {
                        window.location.reload();
                    }
                });
            }, (error) => {
                console.error(error);
            })
        }
    }

    onUploadImage(event) {
        this.setState({
            file: event.target.files
        })

        var taille = 0;

        if (event.target.files.length <= 3) {
            taille = event.target.files.length;
            for (let i = 0; i < taille; i++) {
                var img = event.target.files[i];

                var options = {
                    maxSizeMB: 0.5,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true
                }

                imageCompression(img, options)
                    .then((compressedFile) => {
                        return this.uploadImageToServer(compressedFile, i, taille);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            
        } else {
            alert("Attention seulement vous pouvez ajouter que 3 images maximum");
        }
    }
    //#endregion

    //#region UPLOAD_VIDEO
    uploadVideoToServer = (movie) => {
        this.setState({ alertMsg: 'Sauvegarde de la vidéo : ' });
        this.handleOpenAddVideo();
        
        var file = new Parse.File(movie.name, movie);
        var Commerce_video = new Parse.Object("Commerce_Videos");

        if (this.state.currentUser) {
            var counter = 0;
            this.intervalId = setInterval(() => {
                counter++;
            //    if (counter === 1) {
            //         clearInterval(this.intervalId);
            //         this.handleCloseAddVideo();
            //         this.setState({
            //             alertMsg: '',
            //             sec2: 0
            //         });
            //         window.location.reload();
            //         } else {
                        this.setState({ sec2: counter })
            //         }
            }, 1000);

            
            file.save().then((file) => {
                Commerce_video.set("nameVideo", movie.name);
                Commerce_video.set("video", file);
                Commerce_video.set("leCommerce", Parse.Object.extend("Commerce").createWithoutData(this.state.commerceId));
                Commerce_video.save().then((Commerce_video) => {
                    this.handleCloseAddVideo();
                    this.setState({ alertMsg: 'Vidéo sauvegardé', sec2: 0 });
                    clearInterval(this.intervalId);
                    window.location.reload();
                });
            }, (error) => {
                console.error(error);
            });
        }
    }

    onUploadVideo = (event) => {
        if (event.target.files.length === 1) {
            this.deleteMovieCommerce();
            var video = event.target.files[0];
            this.uploadVideoToServer(video);    // Ajout de la video
        }
    }
    //#endregion

    //#region LOAD_IMAGES_AND_VIDEO
    getPicturesCommerce = () => {
        let commercePicture = [];

        const ParseCommerce = Parse.Object.extend("Commerce");

        const ParseCommercePhoto = Parse.Object.extend("Commerce_Photos");
        const queryCommercePhoto = new Parse.Query(ParseCommercePhoto);

        queryCommercePhoto.equalTo("commerce", new ParseCommerce({id: this.state.commerceId}));

        queryCommercePhoto.find()
        .then(responseSnapshot => {
            responseSnapshot.forEach((elt) => {
                commercePicture.push({ id: elt.id, url: elt.get("photo").url(), default: false });
            });
            for (let i = responseSnapshot.length; i < 3; i++) {
                var uuid = this.getUUID();
                commercePicture.push({ id: uuid, url: NoImage, default: true })
            }
        });
        
        return new Promise(resolve => {
            setTimeout(() => resolve(commercePicture), 300)
        });
    }

    getUrlCommercePicture = async () => {
        const listPicture = await this.getPicturesCommerce();
        this.setState({
            listImg : listPicture
        }, () => {
            this.setState({
                imgPreview1: this.state.listImg[0],
                imgPreview2: this.state.listImg[1],
                imgPreview3: this.state.listImg[2]
            })
        })
        // console.log("aaaa   a   aaa "+this.state.imgPreview1);
    }

    getMovieCommerce = () => {
        let movie = [];

        const ParseCommerce = Parse.Object.extend("Commerce");

        const ParseCommerceVideo = Parse.Object.extend("Commerce_Videos");
        const queryCommerceVideo = new Parse.Query(ParseCommerceVideo);

        queryCommerceVideo.equalTo("leCommerce", new ParseCommerce({id: this.state.commerceId}));

        queryCommerceVideo.find()
        .then(responseSnapshot => {
            responseSnapshot.forEach((elt) => {
                movie.push(elt.get("video").url());
            });
        });

        return new Promise(resolve => {
            setTimeout(() => resolve(movie), 400)
        });
    }

    getUrlCommerceMovie = async () => {
        const movie = await this.getMovieCommerce();
        // console.log(`--fff-------> ${movie}`);
        this.setState({
            movieURL: movie
        })
        // console.log(`--ggg-------> ${this.state.movieURL}`);
    }
    //#endregion

    //#region DELETE
    deleteMovieCommerce = () => {
        const ParseCommerce = Parse.Object.extend("Commerce");

        const ParseCommerceVideo = Parse.Object.extend("Commerce_Videos");
        const queryCommerceVideo = new Parse.Query(ParseCommerceVideo);

        queryCommerceVideo.equalTo("leCommerce", new ParseCommerce({id: this.state.commerceId}));

        queryCommerceVideo.find()
        .then(responseSnapshot => {
            responseSnapshot.forEach((elt) => {
                // Suppression de la video
                elt.destroy()
                    .then((elt) => {
                        // The object was deleted from the Parse Cloud.
                        this.setState({ alertMsg: 'Suppression de la vidéo : ' })
                        this.handleOpenDeleteVideo();
                        var counter = 3;
                        this.intervalId = setInterval(() => {
                            counter--;
                            if (counter === -1) {
                                clearInterval(this.intervalId);
                                this.handleCloseDeleteVideo();
                                this.setState({
                                    alertMsg: '',
                                    sec: 3
                                });
                                window.location.reload();
                            } else {
                                this.setState({ sec: counter })
                            }
                        }, 1000);
                    }, (error) => {
                        // The delete failed.
                        // error is a Parse.Error with an error code and message.
                        console.error(error.code + " --- " + error.message);
                    });
            });
        });
    }

    deleteAllPictureCommerce = () => {
        const ParseCommerce = Parse.Object.extend("Commerce");
        const ParseCommercePhoto = Parse.Object.extend("Commerce_Photos");
        const queryCommercePhoto = new Parse.Query(ParseCommercePhoto);

        queryCommercePhoto.equalTo("commerce", new ParseCommerce({id: this.state.commerceId}));

        queryCommercePhoto.find()
        .then(responseSnapshot => {
            responseSnapshot.forEach((elt) => {
                // Suppression de la photo
                elt.destroy()
                    .then((elt) => {
                        // The object was deleted from the Parse Cloud.
                        this.setState({ alertMsg: 'Suppression de(s) photo(s) : ' })
                        this.handleOpenDeleteVideo();
                        var counter = 3;
                        this.intervalId = setInterval(() => {
                            counter--;
                            if (counter === -1) {
                                clearInterval(this.intervalId);
                                this.handleCloseDeleteVideo();
                                this.setState({
                                    alertMsg: '',
                                    sec: 3
                                });
                                window.location.reload();
                            } else {
                                this.setState({ sec: counter })
                            }
                        }, 1000);
                    }, (error) => {
                        // The delete failed.
                        // error is a Parse.Error with an error code and message.
                        console.error(error.code + " --- " + error.message);
                    })
            })
        })
    }

    deletePictureCommerceById = (imgId) => {
        const ParseCommercePhoto = Parse.Object.extend("Commerce_Photos");
        const queryCommercePhoto = new Parse.Query(ParseCommercePhoto);

        queryCommercePhoto.equalTo("objectId", imgId);

        queryCommercePhoto.find()
        .then(responseSnapshot => {
            responseSnapshot.forEach((elt) => {
                // Suppression de la photo
                elt.destroy()
                    .then((elt) => {
                        // The object was deleted from the Parse Cloud.
                        this.setState({ alertMsg: 'Suppression de la photo : ' })
                        this.handleOpenDeleteVideo();
                        var counter = 3;
                        this.intervalId = setInterval(() => {
                            counter--;
                            if (counter === -1) {
                                clearInterval(this.intervalId);
                                this.handleCloseDeleteVideo();
                                this.setState({
                                    alertMsg: '',
                                    sec: 3
                                });
                                window.location.reload();
                            } else {
                                // console.log("--->"+counter);
                                this.setState({ sec: counter })
                            }
                        }, 1000);
                    }, (error) => {
                        // The delete failed.
                        // error is a Parse.Error with an error code and message.
                        console.error(error.code + " --- " + error.message);
                    })
            })
        })
    }
    //#endregion

    //#region UPDATE_COMMERCE
    updateTheInfo(event) {
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
            const ParseCommerce = Parse.Object.extend("Commerce");
            const instanceCommerce = new ParseCommerce();
            instanceCommerce.id = this.state.commerceId;
            instanceCommerce.set("nomCommerce", _state_commerce.nomCommerce);
            instanceCommerce.set("siteWeb", _state_commerce.siteWeb);
            instanceCommerce.set("adresse", addr);
            instanceCommerce.set("typeCommerce", _state_commerce.currencyCategory);
            instanceCommerce.set("mail", _state_commerce.mail);
            instanceCommerce.set("tel", _state_commerce.tel);
            instanceCommerce.save()
            .then((newCommerce) => {
                this.setState({canUpdateInfo: false})
            }, (error) => {
                    console.error(`Failed to create new object, with error code: ' + ${error.message}`);
            })
        }
    }

    updateThePromo(event) {
        event.preventDefault();
        const _state_commerce = this.state.commerce;

        // if (_state_commerce.promotion !== "") {
            const ParseCommerce = Parse.Object.extend("Commerce");
            const instanceCommerce = new ParseCommerce();
            instanceCommerce.id = this.state.commerceId;
            instanceCommerce.set("promotions", _state_commerce.promotion)
            instanceCommerce.save()
            .then((newCommerce) => {
                this.setState({canUpdatePromo: false})
            }, (error) => {
                    console.error(`Failed to create new object, with error code: ' + ${error.message}`);
            })
        // }
    }

    updateTheDescription(event) {
        event.preventDefault();
        const _state_commerce = this.state.commerce;
        // if (_state_commerce.promotion !== "") {
            const ParseCommerce = Parse.Object.extend("Commerce");
            const instanceCommerce = new ParseCommerce();
            instanceCommerce.id = this.state.commerceId;
            instanceCommerce.set("description", _state_commerce.description)
            instanceCommerce.save()
            .then((newCommerce) => {
                this.setState({canUpdateDescription: false})
            }, (error) => {
                    console.error(`Failed to create new object, with error code: ' + ${error.message}`);
            })
        // }
    }
    //#endregion

    goToBack = () => {
        this.props.history.goBack();
    }

    getDetail = (_id) => {
        this.props.history.push({
            pathname: '/updatecommerce',
            state: { id: _id }
        })
    }

    goToPay = (_id) => {
        this.props.history.push({
            pathname: '/pay',
            state: { id: _id }
        })
    }





    componentDidMount() {
        try {
            this.getCommerceData();
            this.getUrlCommercePicture();
            this.getUrlCommerceMovie();
        } catch (error) {
            this.setState({ error })
        }
    }

    render() {
        try {
            return (
                <div>
                    <div style={{paddingTop: '70px'}}>
                        <Container maxWidth={'lg'}>
                            <Paper elevation={0} style={{borderRadius: 0}}>
                                <center>
                                    <Grid container spacing={3}>
                                        <Grid item xs><Button variant="outlined" color="primary" onClick={() => { this.goToBack() }} style={{ outline: 'none',color: "#2096F3" }}>Mes commerces</Button></Grid>
                                        {/* <Grid item xs><Button variant="outlined" color="primary" onClick={() => { this.getDetail(this.state.commerceId) }} style={{ outline: 'none' }}>Modifier le commerce</Button></Grid> */}
                                        {
                                            this.state.commerce.statutCommerce !== "En ligne" ? (
                                                <Grid item xs><Button variant="contained" color="primary" onClick={() => {this.goToPay(this.state.commerceId)}} style={{ outline: 'none' }}>Payer 329.99 €</Button></Grid>
                                            ) : (
                                                null
                                            )
                                        }
                                    </Grid>
                                </center>
                            </Paper>
                        </Container>
                    </div>
                    <div ref={this.infoRef} style={{margin:'10px'}}></div>
                    {/* Les informations */}
                    <Box my={3}/>
                    <div>
                        <Container maxWidth={'lg'}>
                            <Paper elevation={0} style={{borderRadius: 0}}>
                                <Card elevation={0} style={root2}>
                                    <Grid container justify="space-between">
                                        <Grid item><Typography variant="h4" component="h3" style={{color:"#000"}}>{this.state.commerce.nomCommerce}</Typography></Grid>
                                        <Grid item>
                                            <Button onClick={() => {this.setState({canUpdateInfo: true})}} variant="text" color="primary" size="small" style={{outline: 'none', color: "#2096F3"}} startIcon={<EditRoundedIcon/>}>Modifier</Button>
                                        </Grid>
                                    </Grid>
                                    {
                                        this.state.canUpdateInfo ? (
                                            <div>
                                                <form onSubmit={this.updateTheInfo} /*style={{width:'500px'}}*/>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <label>Nom du commerce</label>
                                                            <input
                                                                style={{margin: '-10px 0 -10px 0',width:'100%'}}
                                                                onChange={this.handleChange}
                                                                value={this.state.commerce.nomCommerce}
                                                                name="nomCommerce"
                                                                id="outlined-name"
                                                                // variant="filled"
                                                                // InputProps={{disableUnderline: true}}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <label>Cathégorie</label>
                                                            <select
                                                                style={{margin: '-10px 0 -10px 0',width:'100%'}}
                                                                name="currencyCategory"
                                                                onChange={this.handleChange}
                                                                value={this.state.commerce.currencyCategory}>
                                                                    <option value="">--Aucune--</option>
                                                                    <option value="Alimentaire">Alimentaire</option>
                                                                    <option value="Artisanat">Artisanat</option>
                                                                    <option value="Bâtiment">Bâtiment</option>
                                                                    <option value="Bien-être">Bien-être</option>
                                                                    <option value="Décoration">Décoration</option>
                                                                    <option value="Dépannage">Dépannage</option>
                                                                    <option value="Evènement">Evènement</option>
                                                                    <option value="E-commerce">E-commerce</option>
                                                                    <option value="Fabricant">Fabricant</option>
                                                                    <option value="Garagiste">Garagiste</option>
                                                                    <option value="Hôtellerie">Hôtellerie</option>
                                                                    <option value="Humanitaire">Humanitaire</option>
                                                                    <option value="Immobilier">Immobilier</option>
                                                                    <option value="Informatique">Informatique</option>
                                                                    <option value="Nautisme">Nautisme</option>
                                                                    <option value="Restauration">Restauration</option>
                                                                    <option value="Textile">Textile</option>
                                                                    <option value="Transport">Transport</option>
                                                                    <option value="Tourisme">Tourisme</option>
                                                                    <option value="Santé">Santé</option>
                                                                    <option value="Autre">Autre</option>
                                                            </select>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <label>Adresse</label>
                                                            <input
                                                                style={{margin: '-10px 0 -10px 0',width:'100%'}}
                                                                onChange={this.handleChange}
                                                                value={this.state.commerce.adresse}
                                                                name="adresse"
                                                                id="outlined-name"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <label>Numéro de téléphone</label>
                                                            <input
                                                                style={{margin: '-10px 0 -10px 0',width:'100%'}}
                                                                onChange={this.handleChange}
                                                                value={this.state.commerce.tel}
                                                                name="tel"
                                                                id="outlined-name"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <label>Adresse mail</label>
                                                            <input
                                                                style={{margin: '-10px 0 -10px 0',width:'100%'}}
                                                                onChange={this.handleChange}
                                                                value={this.state.commerce.mail}
                                                                name="mail"
                                                                id="outlined-name"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <label>Site web</label>
                                                            <input
                                                                style={{margin: '-10px 0 10px 0',width:'100%'}}
                                                                onChange={this.handleChange}
                                                                value={this.state.commerce.siteWeb}
                                                                name="siteWeb"
                                                                id="outlined-name"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Button variant="contained" color="primary" type="submit">valider</Button>
                                                    <Button variant="outlined" color="secondary" onClick={() => {this.setState({canUpdateInfo: false})}} style={{outline: 'none', marginLeft: '20px'}}>Annuler</Button>
                                                </form>
                                            </div>
                                        ) : (
                                            <div>
                                                <h6 style={{color: this.state.colorStatus, margin: '10px 0'}}>
                                                    {this.state.commerce.statutCommerce}{' '}
                                                    <IconButton onClick={() => { this.handleOpenInfo() }} aria-label="delete" style={{ color: "gray", outline: 'none'}} size="small">
                                                        <Info fontSize="small" />
                                                    </IconButton>
                                                </h6>
                                                <h6 style={{color:"#000"}}>Type : {this.state.commerce.currencyCategory}</h6>
                                                <h6 style={{color:"#000"}}>
                                                    <RoomRoundedIcon/>
                                                    {" : " + this.state.commerce.adresse}
                                                </h6>
                                                <h6 style={{color:"#000"}}>
                                                    <CallRoundedIcon/>
                                                    {" : " + this.state.commerce.tel}
                                                </h6>
                                                <h6 style={{color:"#000"}}>
                                                    <EmailRoundedIcon/>
                                                    {" : "}<a href={"http://"+this.state.commerce.mail} target={"_blank"} style={{color: blue[500]}}>{this.state.commerce.mail}</a>
                                                </h6>
                                                {
                                                    this.state.commerce.siteWeb ? (
                                                        <h6 style={{color:"#000"}}>
                                                            <LanguageRoundedIcon/>{" : "}<a href={"http://"+this.state.commerce.siteWeb} target={"_blank"} style={{color: blue[500]}}>{this.state.commerce.siteWeb}</a>
                                                        </h6>
                                                    ) : (
                                                        <h6 style={{color: grey[500]}}>
                                                            <LanguageRoundedIcon/>{" : Aucun site web"}
                                                        </h6>
                                                    )
                                                }
                                                <h5 style={{color:"#000", paddingTop: '20px'}}>
                                                    <FavoriteBorderRoundedIcon style={{color:"#F00"}}/>
                                                    {' '}{this.state.commerce.nombrePartages} {this.state.commerce.nombrePartages > 1 ? "Partages" : "Partage"}
                                                </h5>
                                            </div>
                                        )
                                    }
                                </Card>
                            </Paper>
                        </Container>
                    </div>
                    <div style={{margin:'10px'}}></div>
                    {/* La promotion */}
                    <div>
                        <Container maxWidth={'lg'}>
                            <Paper elevation={0} style={root2}>
                                <Grid container justify="space-between">
                                    <Grid item><Typography variant="h5" component="h3" style={{color:"#000"}}>Mes promotions</Typography></Grid>
                                    <Grid item>
                                        <Button onClick={() => {this.setState({canUpdatePromo: true})}} variant="text" color="primary" size="small" style={{outline: 'none', color: "#2096F3"}} startIcon={<EditRoundedIcon/>}>Modifier</Button>
                                    </Grid>
                                </Grid>
                                {
                                    this.state.canUpdatePromo ? (
                                        <div>
                                            <form onSubmit={this.updateThePromo}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <label>Ajouter des promotions</label>
                                                        <textarea
                                                            style={{margin: '-5px 0 10px 0',width:'100%', outline: 'none'}}
                                                            onChange={this.handleChange}
                                                            value={this.state.commerce.promotion}
                                                            rows="5"
                                                            name="promotion"
                                                            id="outlined-name"
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Button variant="contained" color="primary" type="submit">valider</Button>
                                                <Button variant="outlined" color="secondary" onClick={() => {this.setState({canUpdatePromo: false})}} style={{outline: 'none', marginLeft: '20px'}}>Annuler</Button>
                                            </form>
                                        </div>
                                    ) : (
                                        <Grid
                                            container
                                            alignItems="center">
                                            <Grid item xs={12}>
                                                {
                                                    this.state.commerce.promotion ?
                                                    (<Typography variant="body1" style={{color:"#000", fontSize: '100'}}>{this.state.commerce.promotion}</Typography>):
                                                    (<Typography variant="h3" style={{color: grey[300], textAlign: 'center'}}>{"Pas de promotions en cours"}</Typography>)
                                                }
                                            </Grid>
                                        </Grid>
                                    )
                                }
                            </Paper>
                        </Container>
                    </div>
                    {/* Les images */}
                    <div ref={this.imageRef} style={{margin:'10px'}}></div>
                    <div>
                        <Container maxWidth={'lg'}>
                            <Paper elevation={0} style={root2}>
                                <Grid
                                    container
                                    justify="space-between"
                                    alignItems="center">
                                    <Grid item xs={12}>
                                        <Grid container justify="space-between">
                                            <Grid item><Typography variant="h5" component="h3" style={{color:"#000"}}>Photos du commerce</Typography></Grid>
                                            <Grid item>
                                                <Grid container justify="space-between">
                                                    <Grid item xs={6}>
                                                        {
                                                            this.state.listImg.filter((obj) => obj.default === false).length < 3 ?
                                                            (<div>
                                                                <input
                                                                    id="icon-input-file-img"
                                                                    type="file"
                                                                    onChange={this.onUploadImage}
                                                                    style={{ display: 'None' }}
                                                                    accept="image/*"
                                                                    multiple/>
                                                                <label htmlFor="icon-input-file-img">
                                                                    <LightTooltip title="Ajouter des images">
                                                                        <IconButton aria-label="upload picture" component="span" color="primary" style={{outline: 'none', color: "#2096F3"}}>
                                                                            <AddCircleRoundedIcon />
                                                                            {/* <AddPhotoAlternateRoundedIcon /> */}
                                                                        </IconButton>
                                                                    </LightTooltip>
                                                                    {/* <LightTooltip title="Ajouter des images">
                                                                        <Button variant="outlined" color="primary" size="small" component="span">
                                                                            Ajouter des images
                                                                        </Button>
                                                                    </LightTooltip> */}
                                                                </label>
                                                            </div>):
                                                            (<div></div>)
                                                        }
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {
                                                            this.state.listImg.length > 0 ?
                                                            (<LightTooltip title="Tout supprimer">
                                                                <IconButton onClick={() => { this.deleteAllPictureCommerce() } } aria-label="delete" color="secondary" size="medium" style={{outline: 'none', color: "#2096F3"}}>
                                                                    <DeleteForeverRoundedIcon />
                                                                </IconButton>
                                                            </LightTooltip>):
                                                            (null)
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            this.state.listImg.filter((obj) => obj.default === false).length < 1 ? (
                                                <Typography variant="body1" style={{color: grey[400], fontSize: '100'}}>Vous pouvez ajouter au maximum 3 images de présentation de votre établissement</Typography>
                                            ) : (
                                                <Typography variant="body1" style={{color: grey[400], fontSize: '100'}}>Vous pouvez ajouter {this.state.listImg.filter((obj) => obj.default === true).length}
                                                {" "}{this.state.listImg.filter((obj) => obj.default === true).length <= 1 ? ("image") : ("images")} de votre établissement</Typography>
                                            )
                                        }
                                        {/* <Typography variant="body1" style={{color: grey[400], fontSize: '100'}}>Vous pouvez ajouter au maximum 3 images de présentation de votre établissement</Typography>
                                        <Typography variant="body1" style={{color: grey[400], fontSize: '100'}}>Vous pouvez ajouter {this.state.listImg.length} images de votre établissement</Typography> */}
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        {
                                            this.state.listImg.length > 0 ?
                                            (<Grid
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="center"
                                                spacing={2}>
                                                {this.state.listImg && [...this.state.listImg].map((object, index) => (
                                                    <Grid key={index} item xs>
                                                        <center>
                                                            <div style={{height: 250, maxWidth: '100%', overflow: 'hidden'}}>
                                                                <img
                                                                    src={object.url}
                                                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                                />
                                                            </div>
                                                            {
                                                                (!object.default) ? (
                                                                    <IconButton onClick={() => { this.deletePictureCommerceById(object.id) } } aria-label="delete" color="secondary" size="medium" style={{outline: 'none', color: "#2096F3"}}>
                                                                        <DeleteForeverRoundedIcon fontSize="default" />
                                                                    </IconButton>
                                                                ) : (<div style={{margin: '50px'}}></div>)
                                                            }
                                                        </center>
                                                    </Grid>
                                                ))}
                                            </Grid>):
                                            (<Typography variant="h3" style={{color: grey[300], textAlign: 'center'}}>{"Pas d'images"}</Typography>)
                                        }
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Container>
                    </div>
                    <div ref={this.movieRef} style={{margin:'10px'}}></div>
                    {/* La video */}
                    <div>
                        <Container maxWidth={'lg'}>
                            <Paper elevation={0} style={root2}>
                                <Grid container justify="space-between">
                                    <Grid item><Typography variant="h5" component="h3" style={{color:"#000"}}>Vidéo du commerce</Typography></Grid>
                                    <Grid item>
                                        <Grid container>
                                            <Grid item spacing={2}>
                                                {
                                                    this.state.movieURL[0] ?
                                                    (<div></div>) :
                                                    (<div>
                                                        <input
                                                            id="icon-input-file-video"
                                                            type="file"
                                                            onChange={this.onUploadVideo}
                                                            style={{ display: 'None' }}
                                                            accept="video/mp4,video/x-m4v,video/*"/>
                                                        <label htmlFor="icon-input-file-video">
                                                            <Button variant="text" color="primary" size="small" component="span" style={{ outline: 'none', color: "#2096F3"}} startIcon={<AddCircleRoundedIcon/>}>Ajouter une vidéo</Button>
                                                        </label>
                                                    </div>)
                                                }
                                            </Grid>
                                            <Grid item xs>
                                                {
                                                    this.state.movieURL[0] ?
                                                    (<Button onClick={() => { this.deleteMovieCommerce() }} variant="text" color="secondary" size="small" style={{marginBottom:'10px', outline: 'none'}} startIcon={<DeleteForeverRoundedIcon/>}>Supprimer la vidéo</Button>) : (<div></div>)
                                                }                        
                                            </Grid>
                                        </Grid>
                                            
                                    </Grid>
                                        
                                </Grid>
                                            
                                <Grid item xs={12}>
                                    {
                                        this.state.movieURL[0] ?
                                        (<Player
                                            playsInline
                                            src={this.state.movieURL[0]}
                                        />) :
                                        (<center>
                                            <Typography variant="h3" style={{color: grey[300]}}>Pas de vidéo</Typography>
                                        </center>)
                                    }
                                </Grid>
                            </Paper>
                        </Container>
                    </div>
                    <div ref={this.movieRef} style={{margin:'10px'}}></div>
                    {/* La description */}
                    <div>
                        <Container maxWidth={'lg'}>
                            <Paper elevation={0} style={root2}>
                                <Grid container justify="space-between">
                                    <Grid item><Typography variant="h5" component="h3" style={{color:"#000"}}>Description de votre commerce</Typography></Grid>
                                    <Grid item>
                                        <Button onClick={() => {this.setState({canUpdateDescription: true})}} variant="text" color="primary" size="small" style={{outline: 'none', color: "#2096F3"}} startIcon={<EditRoundedIcon/>}>Modifier</Button>
                                    </Grid>
                                </Grid>
                                {
                                    this.state.canUpdateDescription ? (
                                        <div>
                                            <form onSubmit={this.updateTheDescription}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <label>La description de votre commerce</label>
                                                        <textarea
                                                            style={{margin: '-5px 0 10px 0',width:'100%', outline: 'none'}}
                                                            onChange={this.handleChange}
                                                            value={this.state.commerce.description}
                                                            rows="5"
                                                            name="description"
                                                            id="outlined-name"
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Button variant="contained" color="primary" type="submit">valider</Button>
                                                <Button variant="outlined" color="secondary" onClick={() => {this.setState({canUpdateDescription: false})}} style={{outline: 'none', marginLeft: '20px'}}>Annuler</Button>
                                            </form>
                                        </div>
                                    ) : (
                                        <Typography variant="body1" style={{color:"#000", fontSize: '100'}}>{this.state.commerce.description}</Typography>
                                    )
                                }
                            </Paper>
                        </Container>
                    </div>
                    
                    
                    <div style={root}>
                        <Container component="main"  maxWidth={'lg'} style={{ color: "#000" }}>
                            <CssBaseline/>
                            
                            <div>
                                <Dialog
                                    open={this.state.openPopupVideoDelete}
                                    onClose={this.handleCloseDeleteVideo}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    style={{ minHeight: "600px"}}
                                    maxWidth={"md"}
                                >
                                    <DialogContent>
                                        <center>
                                            <DialogContentText id="alert-dialog-description">
                                                <p>N'actualisez pas la page et ne sélectionnez pas Précédent. Si vous procédez ainsi, vous annulez la demande</p>
                                            </DialogContentText>
                                            <CircularProgress color="secondary" />
                                        </center>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div>
                                <Dialog
                                    open={this.state.openPopupVideoAdd}
                                    onClose={this.handleCloseAddVideo}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    style={{ minHeight: "600px"}}
                                    maxWidth={"md"}
                                >
                                    <DialogContent>
                                        <center>
                                            <DialogContentText id="alert-dialog-description">
                                                <p>Ajout d'une nouvelle vidéo. Cette étape peut prendre plusieurs minutes. N'actualisez pas la page et ne sélectionnez pas Précédent. Si vous procédez ainsi, vous annulez la demande</p>
                                            </DialogContentText>
                                            <CircularProgress color="secondary" />
                                        </center>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div>
                                <Dialog
                                    open={this.state.openInfo}
                                    onClose={this.handleCloseInfo}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    style={{ minHeight: "600px"}}
                                    // fullWidth={true}
                                    maxWidth={"sm"}
                                >
                                    <DialogTitle id="alert-dialog-title">A propos du status</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            {/* {this.state.commerce.statutCommerce}{' '} */}
                                            {
                                                this.state.commerce.statutCommerce === 'En ligne' ?
                                                (<p>Votre commerce est en ligne et visible de tous, prêt à être partagé</p>) :
                                                (<p>Votre commerce est toujours sur Weeclik mais invisible de tout le monde car il y a surement eu une erreur dans le paiement ou que lʼabonnement nʼest plus valable</p>)
                                            }
                                            
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleCloseInfo} color="primary" autoFocus style={{outline: 'none'}}>Ok</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>

                            
                        </Container>
                    </div>
                    <Footer/>
                </div>
            );
        } catch (error) { return <Redirect to='/error'/> }
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
const connectedAboutCommerce = connect(mapState, actionCreators) (AboutCommerce);
export { connectedAboutCommerce as AboutCommerce };

