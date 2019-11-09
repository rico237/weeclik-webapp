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
    GridListTile,
    Paper,
    Typography,
    IconButton,
    DialogContentText,
    DialogContent,
    DialogActions,
    Box} from '@material-ui/core';
import imageCompression from 'browser-image-compression';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';

import AddVideo from '../../assets/icons/addVideo.svg';
import Sad from '../../assets/images/sad.jpeg';


import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import DeleteIcon from '@material-ui/icons/Delete';
// import Add from '@material-ui/icons/Add';
import Info from '@material-ui/icons/Info';
import Payment from '@material-ui/icons/Payment';

import ModalImage from "react-modal-image";
import { Copyright } from '../copyright/Copyright';

//#region COLOR
import grey from '@material-ui/core/colors/grey';
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

const paper = {
    padding: theme.spacing(3),
    // marginTop: theme.spacing(4),
    // marginBottom: theme.spacing(4),
    // margin: '25px'
}

// const styleButton1 = {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     marginTop: '15px',
//     marginBottom: '15px',
//     outline: 'none'
// }

const styleButton2 = {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: '15px',
    marginBottom: '15px',
    outline: 'none',
    fontSize: '18px'
}
//#endregion

class AboutCommerce extends Component {
    constructor(props) {
        super(props);

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
                commercePicture.push(elt.get("photo").url());
            });
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

    deletePictureCommerce1 = (imgId) => {
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

                        var counter = 3;
                        this.intervalId = setInterval(() => {
                            counter--;
                            if (counter === -1) {
                                clearInterval(this.intervalId);
                                // this.handleCloseDeleteVideo();
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
        // this.props.getUserInfo();
        // const id = JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`));
        this.getCommerceData();
        this.getUrlCommercePicture();
        this.getUrlCommerceMovie();
        // console.log(`-----------> ${this.state.movieURL}`);
        // console.log(`-----------> ${this.props.location.state.id}`);
    }

    render() {
        // const { user } = this.props;className="App-header"
        // console.log(this.state.commerce);
        // console.log(this.state.listImg);
        // let columns = this.props.width === 'xs' || this.props.width === 'sm' ? 1 : 3;

        return (
            <Container component="main" maxWidth="md" style={{ color: "#000" }}>
                <CssBaseline/>
                <div style={root}>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="center">
                        <Grid item xs={12} sm={4} className="Weeclik-App-Info-Commerce2" style={paper}>
                            <Paper elevation={0} style={root2}>
                                <Button fullWidth variant="outlined" color="primary" onClick={() => { this.goToBack() }} style={{ outline: 'none', marginTop: '15px', marginBottom: '15px' }}>Mes commerces</Button>
                                <Button fullWidth variant="outlined" color="primary" onClick={() => { this.getDetail(this.state.commerceId) }} style={{ outline: 'none', marginTop: '15px', marginBottom: '15px' }}>Modifier le commerce</Button>
                                {/* <Typography component="p" style={{color:"#000"}}>TODO: un petit text resumé sur c'est quoi une promotion</Typography>
                                <Button fullWidth onClick={() => { alert("Fonctionnalité en cours de Developpement") }} style={styleButton1}>Nouvelle promotion</Button> */}
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
                            <Paper elevation={0} style={root2}>
                                <Typography variant="h4" component="h3" style={{color:"#000"}}>{this.state.commerce.nomCommerce}</Typography>
                                <h6 style={{color: this.state.colorStatus, margin: '10px 0'}}>
                                    {this.state.commerce.statutCommerce}{' '}
                                    <IconButton onClick={() => { this.handleOpenInfo() }} aria-label="delete" style={{ color: "gray", outline: 'none'}} size="small">
                                        <Info fontSize="small" />
                                    </IconButton>
                                </h6>
                                <h6 style={{color:"#000"}}>Type : {this.state.commerce.currencyCategory}</h6>
                                <h6 style={{color:"#000"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>	:
                                    {" " + this.state.commerce.adresse}
                                </h6>
                                <h6 style={{color:"#000"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg> :
                                    {" " + this.state.commerce.tel}
                                </h6>
                                <h6 style={{color:"#000"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg> :
                                    {" "}<a href={"http://"+this.state.commerce.siteWeb} target={"_blank"} style={{color: '#00F'}}>{this.state.commerce.siteWeb}</a>
                                </h6>
                                {/* <p>{this.state.commerce.promotion}</p>
                                <p>{this.state.commerce.description}</p> */}
                                <h5 style={{color:"#000", paddingTop: '50px'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#F00" width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                                    {' '}{this.state.commerce.nombrePartages} {this.state.commerce.nombrePartages > 1 ? "Partages" : "Partage"}
                                </h5>
                            </Paper>

                            <div style={{margin:'10px'}}></div>

                            <Paper elevation={0} style={root2}>
                                <Grid
                                    container
                                    justify="space-between"
                                    alignItems="center">
                                    <Grid item xs={12}>
                                        <Typography variant="h5" component="h3" style={{color:"#000"}}>Images du commerce</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" style={{color:"#000", fontSize: '100'}}>Vous pouvez ajouter au maximum 3 Images de présentation de votre établissement</Typography>
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
                                            (<Button onClick={() => { this.deleteAllPictureCommerce() }} variant="outlined" color="secondary" size="small" style={{outline: 'none'}}>Supprimer les Images</Button>):
                                            (<div></div>)
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            this.state.listImg.length > 0 ?
                                            (<GridList cellHeight={180} cols={3} style={{ height: '450' }}>
                                                {this.state.listImg && [...this.state.listImg].map((url, index) => (
                                                    <GridListTile key={index}>
                                                        <div style={{height: '200px', overflow: 'hidden'}}>
                                                            <ModalImage
                                                                small={url}
                                                                large={url}
                                                                hideDownload="false"
                                                                hideZoom="false"
                                                                style={{height: '160px'}}
                                                            />
                                                        </div>
                                                    </GridListTile>
                                                ))}
                                            </GridList>):
                                            (<Typography variant="h3" style={{color: grey[300], textAlign: 'center'}}>{"Pas d'images"}</Typography>)
                                        }
                                    </Grid>
                                </Grid>
                            </Paper>

                            <div style={{margin:'10px'}}></div>

                            <Paper elevation={0} style={root2}>
                                <Typography variant="h5" component="h3" style={{color:"#000"}}>Description de votre commerce</Typography>
                                <Grid item x={12}>
                                    <Typography variant="body1" style={{color:"#000", fontSize: '100'}}>{this.state.commerce.description}</Typography>
                                </Grid>
                            </Paper>

                            <div style={{margin:'10px'}}></div>

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
                                        {/* <Button color="secondary" size="small">Ajouter promotion</Button> */}
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Promotions</TableCell>
                                                    <TableCell align="right">Date de fin</TableCell>
                                                    <TableCell align="right">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">ayfjvbezvfhjekhzfgiyuhjejzfgiuyezy ayfjvbezvfhjekhzfgiyuhjejzfgiuyezy ayfjvbezvfhjekhzfgiyuhjejzfgiuyezy
                                                    </TableCell>
                                                    <TableCell align="right">12/2019</TableCell>
                                                    <TableCell align="right">
                                                        <IconButton aria-label="delete" color="secondary" size="small">
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Grid> */}
                                </Grid>
                                
                                
                            </Paper>

                            <div style={{margin:'10px'}}></div>

                            <Paper elevation={0} style={root2}>
                                <Grid
                                    container
                                    // justify="space-between"
                                    alignItems="center">
                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h5" component="h3" style={{color:"#000"}}>Vidéo du commerce</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={1}>
                                            <IconButton onClick={() => { this.deleteMovieCommerce() }} aria-label="delete" color="secondary" size="small" style={{outline: 'none'}}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={12} sm={1}>
                                            <input
                                                id="icon-input-file-video"
                                                type="file"
                                                onChange={this.onUploadVideo}
                                                style={{ display: 'None' }}
                                                accept="video/mp4,video/x-m4v,video/*"/>
                                            <label htmlFor="icon-input-file-video">
                                                <img
                                                    src={AddVideo}
                                                    className="rounded"
                                                    alt="Default profile"
                                                    style={{ width: 30 }}/>
                                            </label>
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
                        </Grid>
                    </Grid>
                </div>

                <div>
                    <Dialog
                        open={this.state.openPopupVideoDelete}
                        onClose={this.handleCloseDeleteVideo}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        style={{ minHeight: "600px"}}
                        // fullWidth={true}
                        maxWidth={"md"}
                    >
                        <DialogTitle id="alert-dialog-title">{this.state.alertMsg}{' '}{this.state.sec}{' ...'}</DialogTitle>
                    </Dialog>
                </div>

                <div>
                    <Dialog
                        open={this.state.openPopupVideoAdd}
                        onClose={this.handleCloseAddVideo}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        style={{ minHeight: "600px"}}
                        // fullWidth={true}
                        maxWidth={"md"}
                    >
                        <DialogTitle id="alert-dialog-title">{this.state.alertMsg}{' '}{this.state.sec2}{' ...'}</DialogTitle>
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
                                {this.state.commerce.statutCommerce}{' '}
                                Veut dire que le commerce est toujours sur Weeclik mais invisible de tout le monde car il y a surement eu une erreur dans le paiement ou que l'abonnement n'est plus valable
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseInfo} color="primary" autoFocus style={{outline: 'none'}}>Ok</Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <Box mt={8}>
                    <Copyright/>
                </Box>
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
const connectedAboutCommerce = connect(mapState, actionCreators) (AboutCommerce);
export { connectedAboutCommerce as AboutCommerce };

