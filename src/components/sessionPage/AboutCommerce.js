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
    GridList,
    Paper,
    Typography,
    IconButton,
    DialogContentText,
    DialogContent,
    DialogActions,
    CircularProgress,
    Card} from '@material-ui/core';
import imageCompression from 'browser-image-compression';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';


import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import DeleteIcon from '@material-ui/icons/Delete';
// import Add from '@material-ui/icons/Add';
import Info from '@material-ui/icons/Info';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import CallRoundedIcon from '@material-ui/icons/CallRounded';

//#region COLOR
import grey from '@material-ui/core/colors/grey';
import Picture from './components/commerceComponent/Picture';
import Footer from '../footer/Footer';
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

// const paper = {
//     padding: theme.spacing(3),
//     // marginTop: theme.spacing(4),
//     // marginBottom: theme.spacing(4),
//     // margin: '25px'
// }

// const styleButton2 = {
//     background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     marginTop: '15px',
//     marginBottom: '15px',
//     outline: 'none',
//     fontSize: '18px'
// }
//#endregion

class AboutCommerce extends Component {
    constructor(props) {
        super(props);

        this.infoRef = React.createRef();
        this.imageRef = React.createRef();
        this.movieRef = React.createRef();
        this.payementRef = React.createRef();

        this.state = {
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
            nbImageUpload: 0,
            colorStatus: '#F00'
        };

        this.handleValidate = this.handleValidate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.changePicture1 = this.changePicture1.bind(this);
        this.changePicture2 = this.changePicture2.bind(this);
        this.changePicture3 = this.changePicture3.bind(this);

        this.onUploadImage = this.onUploadImage.bind(this);
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
                    var _mail = fetchedCommerce.get('mail');
                    var _siteWeb = fetchedCommerce.get('siteWeb');
                    var _description = fetchedCommerce.get('description');
                    var _promotions = fetchedCommerce.get('promotions');

                    switch (_statusCommerce) {
                        case 0:
                            _statusCommerce = "Hors ligne - en attente de paiement"
                            this.setState({colorStatus: '#F00'});
                            break;
                        case 1:
                            _statusCommerce = "En ligne"
                            this.setState({colorStatus: '#00F'});
                            break;
                        case 2:
                            _statusCommerce = "Hors ligne - paiement annulé"
                            this.setState({colorStatus: '#F00'});
                            break;
                        case 3:
                            _statusCommerce = "Erreur lors du paiement ou du renouvellement"
                            this.setState({colorStatus: '#F00'});
                            break;
                        case 4:
                            _statusCommerce = ""
                            this.setState({colorStatus: '#F00'});
                            break;
                    
                        default:
                            _statusCommerce = "Statut inconnu"
                            this.setState({colorStatus: '#F00'});
                            break;
                    }


                    // commerce: {
                    //     ville: '',
                    //     bp: '',
                    //     owner: '',
                    //     position: '',
                    //     mail: '',
                    //     id: ''
                    // },

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
                // console.log("@@@@@@@@@@@@@@@@@>"+JSON.stringify(file, null, 2));
                Commerce_video.set("nameVideo", movie.name);
                Commerce_video.set("video", file);
                Commerce_video.set("leCommerce", Parse.Object.extend("Commerce").createWithoutData(this.state.commerceId));
                Commerce_video.save().then((Commerce_video) => {
                    // console.log("#################>"+JSON.stringify(Commerce_video, null, 2));
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
                commercePicture.push({ id: elt.id, url : elt.get("photo").url()});
            });
        });
        
        return new Promise(resolve => {
            setTimeout(() => resolve(commercePicture), 300)
        });
    }

    getUrlCommercePicture = async () => {
        const listPicture = await this.getPicturesCommerce();
        console.log(listPicture)
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
        this.getCommerceData();
        this.getUrlCommercePicture();
        this.getUrlCommerceMovie();
    }

    render() {
        return (
            <div>
                {/* <ShowInfoCommerce/> */}
                <div style={{position: 'relative', height: '400px'}}>
                    <div style={{position: 'absolute', zIndex: -1}}>
                        <Picture
                            commerceId={this.state.commerceId}
                            commerceName={this.state.commerce.nomCommerce}
                            commerceCategory={this.state.commerce.currencyCategory}
                            commerceNbShare={this.state.commerce.nombrePartages}
                        />
                    </div>
                    {/* <div style={{background: "#FFF", position: 'absolute', top: '70%', left: '50%', padding: '.8em 1.2em', transform: 'translate(-50%, -50%)'}}>
                        <Card elevation={0}>
                            <Typography variant="h4" component="h3" style={{color:"#000"}}>{this.state.commerce.nomCommerce}</Typography>
                            <Typography color="textSecondary">{this.state.commerce.currencyCategory}</Typography>
                            <Typography style={{color: this.state.colorStatus, margin: '10px 0'}}>
                                {this.state.commerce.statutCommerce}{' '}
                                <IconButton onClick={() => { this.handleOpenInfo() }} aria-label="delete" style={{ color: "gray", outline: 'none'}} size="small">
                                    <Info fontSize="small" />
                                </IconButton>
                            </Typography>
                            <h6 style={{color:"#000"}}>
                                <RoomRoundedIcon style={{ color: "gray"}}/>
                                {" : " + this.state.commerce.adresse}
                            </h6>
                        </Card>
                    </div> */}
                </div>
                <div style={{paddingTop: '100px'}}>
                    <Paper elevation={0} style={{borderRadius: 0}}>
                        <center>
                            <Grid container spacing={3}>
                                <Grid item xs={2}><Button variant="outlined" color="primary" onClick={() => { this.goToBack() }} style={{ outline: 'none' }}>Mes commerces</Button></Grid>
                                <Grid item xs={2}><Button fullWidth variant="outlined" color="primary" onClick={() => { this.getDetail(this.state.commerceId) }} style={{ outline: 'none' }}>Modifier le commerce</Button></Grid>
                                <Grid item xs={2}><Button onClick={() => {window.scrollTo(0, this.infoRef.current.offsetTop)}} style={{ outline: 'none' }}>Informations</Button></Grid>
                                <Grid item xs={2}><Button onClick={() => {window.scrollTo(0, this.imageRef.current.offsetTop)}} style={{ outline: 'none' }}>Images</Button></Grid>
                                <Grid item xs={2}><Button onClick={() => {window.scrollTo(0, this.infoRef.current.offsetTop)}} style={{ outline: 'none' }}>Vidéo</Button></Grid>
                                <Grid item xs={2}><Button onClick={() => {window.scrollTo(0, this.infoRef.current.offsetTop)}} style={{ outline: 'none' }}>Payer</Button></Grid>
                            </Grid>
                        </center>
                    </Paper>
                </div>
                <div ref={this.infoRef} style={{margin:'10px'}}></div>
                {/* Les informations */}
                <div>
                    <Container maxWidth={'md'}>
                        <Typography variant="h4" component="h5">Les informations sur le commerce</Typography>
                        <Paper elevation={0} style={{borderRadius: 0}}>
                            <Card elevation={0} style={root2}>
                                <Typography variant="h4" component="h3" style={{color:"#000"}}>{this.state.commerce.nomCommerce}</Typography>
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
                                    {" : "}<a href={"http://"+this.state.commerce.mail} target={"_blank"} style={{color: '#00F'}}>{this.state.commerce.mail}</a>
                                </h6>
                                <h6 style={{color:"#000"}}>
                                    <LanguageRoundedIcon/>
                                    {" : "}<a href={"http://"+this.state.commerce.siteWeb} target={"_blank"} style={{color: '#00F'}}>{this.state.commerce.siteWeb}</a>
                                </h6>
                                <h5 style={{color:"#000", paddingTop: '50px'}}>
                                    <FavoriteBorderRoundedIcon style={{color:"#F00"}}/>
                                    {' '}{this.state.commerce.nombrePartages} {this.state.commerce.nombrePartages > 1 ? "Partages" : "Partage"}
                                </h5>
                            </Card>
                        </Paper>
                    </Container>
                </div>
                <div style={{margin:'10px'}}></div>
                {/* La description */}
                <div>
                    <Container maxWidth={'md'}>
                        <Paper elevation={0} style={root2}>
                            <Typography variant="h5" component="h3" style={{color:"#000"}}>Description de votre commerce</Typography>
                            <Grid item x={12}>
                                <Typography variant="body1" style={{color:"#000", fontSize: '100'}}>{this.state.commerce.description}</Typography>
                            </Grid>
                        </Paper>
                    </Container>
                </div>
                <div style={{margin:'10px'}}></div>
                {/* La promotion */}
                <div>
                    <Container maxWidth={'md'}>
                        <Paper elevation={0} style={root2}>
                            <Grid
                                container
                                alignItems="center">
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="h3" style={{color:"#000"}}>Mes promotions</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        this.state.commerce.promotion ?
                                        (<Typography variant="body1" style={{color:"#000", fontSize: '100'}}>{this.state.commerce.promotion}</Typography>):
                                        (<Typography variant="h3" style={{color: grey[300], textAlign: 'center'}}>{"Pas de promotions en cours"}</Typography>)
                                    }
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </div>
                {/* Les images */}
                <div ref={this.imageRef} style={{margin:'10px'}}></div>
                <div>
                    <Container maxWidth={'md'}>
                        <Typography variant="h4" component="h5">La galerie</Typography>
                        <Paper elevation={0} style={root2}>
                            <Grid
                                container
                                justify="space-between"
                                alignItems="center">
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="h3" style={{color:"#000"}}>Images du commerce</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" style={{color:"#000", fontSize: '100'}}>Vous pouvez ajouter au maximum 3 images de présentation de votre établissement</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    {
                                        this.state.listImg.length < 3 ?
                                        (<div>
                                            <input
                                                id="icon-input-file-img"
                                                type="file"
                                                onChange={this.onUploadImage}
                                                style={{ display: 'None' }}
                                                accept="image/*"
                                                multiple/>
                                            <label htmlFor="icon-input-file-img">
                                                <Button variant="outlined" color="primary" size="small" component="span">
                                                    Ajouter des images
                                                </Button>
                                            </label>
                                        </div>):
                                        (<div></div>)
                                    }
                                </Grid>
                                <Grid item xs={6}>
                                    {
                                        this.state.listImg.length > 0 ?
                                        (<Button onClick={() => { this.deleteAllPictureCommerce() }} variant="outlined" color="secondary" size="small" style={{marginBottom:'10px', outline: 'none'}}>Tout supprimer</Button>):
                                        (<div></div>)
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        this.state.listImg.length > 0 ?
                                        (<GridList cellHeight={250} cols={3} style={{ height: '450' }}>
                                            {this.state.listImg && [...this.state.listImg].map((object, index) => (
                                                <div key={index}>
                                                    <div style={{height: 160, maxWidth: '100%', overflow: 'hidden'}}>
                                                        <img
                                                            src={object.url}
                                                            style={{width: '200px', height: '200px', objectFit: 'cover'}}
                                                        />
                                                    </div>
                                                    <IconButton onClick={() => { this.deletePictureCommerceById(object.id) } } aria-label="delete" color="secondary" size="medium" style={{outline: 'none'}}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </div>
                                            ))}
                                        </GridList>):
                                        (<Typography variant="h3" style={{color: grey[300], textAlign: 'center'}}>{"Pas d'images"}</Typography>)
                                    }
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </div>
                <div ref={this.movieRef} style={{margin:'10px'}}></div>
                {/* La promotion */}
                <div>
                    <Container maxWidth={'md'}>
                        <Paper elevation={0} style={root2}>
                            <Grid
                                container
                                justify="space-between"
                                alignItems="center">
                                    <Grid item xs={12}>
                                        <Typography variant="h5" component="h3" style={{color:"#000"}}>Vidéo du commerce</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
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
                                                    <Button variant="outlined" color="primary" size="small" component="span">
                                                        Ajouter une vidéo
                                                    </Button>
                                                </label>
                                            </div>)
                                        }
                                    </Grid>
                                    <Grid item xs={6}>
                                        {
                                            this.state.movieURL[0] ?
                                            (<Button onClick={() => { this.deleteMovieCommerce() }} variant="outlined" color="secondary" size="small" style={{marginBottom:'10px', outline: 'none'}}>Supprimer la vidéo</Button>) : (<div></div>)
                                        }
                                        
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
                
                
                <div style={root}>
                    <Container component="main" maxWidth="md" style={{ color: "#000" }}>
                        <CssBaseline/>
                        
                        {/* <div style={root}>
                            <Grid
                                container
                                spacing={1}
                                direction="row"
                                justify="center">
                                <Grid item xs={12} sm={4} className="Weeclik-App-Info-Commerce2" style={paper}>
                                    <Paper elevation={0} style={root2}>
                                        <Button fullWidth variant="outlined" color="primary" onClick={() => { this.goToBack() }} style={{ outline: 'none', marginTop: '15px', marginBottom: '15px' }}>Mes commerces</Button>
                                        <Button fullWidth variant="outlined" color="primary" onClick={() => { this.getDetail(this.state.commerceId) }} style={{ outline: 'none', marginTop: '15px', marginBottom: '15px' }}>Modifier le commerce</Button>
                                        {
                                            this.state.commerce.statutCommerce !== "En ligne"?
                                            (<div>
                                                <Typography component="p" style={{color:"#000"}}>Payer pour mettre votre commerce en ligne</Typography>
                                                <Button fullWidth onClick={() => { this.goToPay(this.state.commerceId) }} style={styleButton2} startIcon={<Payment />}>Payer 329.99 €</Button>
                                            </div>):
                                            (<div></div>)

                                        }
                                        
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={8} className="Weeclik-App-Info-Commerce2" style={paper}>
                                    <div style={{margin:'10px'}}></div>
                                </Grid>
                            </Grid>
                        </div> */}

                        <div>
                            <Dialog
                                open={this.state.openPopupVideoDelete}
                                onClose={this.handleCloseDeleteVideo}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                style={{ minHeight: "600px"}}
                                maxWidth={"md"}
                            >
                                <DialogTitle id="alert-dialog-title" style={{
                                    width: "100px",
                                    height: "100px",
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}><CircularProgress color="secondary" /></DialogTitle>
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
                                <DialogTitle id="alert-dialog-title" style={{
                                    width: "100px",
                                    height: "100px",
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    alignItems: 'center'
                                }}><CircularProgress /></DialogTitle>
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

