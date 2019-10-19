import React, { Component } from 'react';
import Parse from 'parse';
import { Container, CssBaseline, Button, Grid, GridList, GridListTile } from '@material-ui/core';
import imageCompression from 'browser-image-compression';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';

import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';


//#region THEME
const theme = createMuiTheme({
    spacing: 4,
});

const root = {
    flexGrow: 1,
    paddingTop: '70px',
}


const paper = {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    // margin: '25px'
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
            submitted: false
        };

        this.handleValidate = this.handleValidate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
                            break;
                        case 1:
                            _statusCommerce = "En ligne"
                            break;
                        case 2:
                            _statusCommerce = "Hors ligne - paiement annulé"
                            break;
                        case 3:
                            _statusCommerce = "Erreur lors du paiement ou du renouvellement"
                            break;
                        case 4:
                            _statusCommerce = ""
                            break;
                    
                        default:
                            _statusCommerce = "Statut inconnu"
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



    //#region UPLOAD_IMAGE
    uploadImageToServer(img) {
        var file = new Parse.File(img.name, img);
        var Commerce_Photos = new Parse.Object("Commerce_Photos");
        var currentUser = Parse.User.current();
        // console.log("$$$$$$$$$$$ "+this.state.commerceId);
        
        if (currentUser) {
            file.save().then(() => {
                Commerce_Photos.set("photo", file);
                Commerce_Photos.set("commerce", Parse.Object.extend("Commerce").createWithoutData(this.state.commerceId));
                Commerce_Photos.save();
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
                        return this.uploadImageToServer(compressedFile);
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
        var file = new Parse.File(movie.name, movie);
        var Commerce_video = new Parse.Object("Commerce_Videos");
        // console.log("€€€€€€€€€€€ "+this.state.commerceId);

        if (this.state.currentUser) {
            file.save().then(() => {
                Commerce_video.set("nameVideo", movie.name);
                Commerce_video.set("video", file);
                Commerce_video.set("leCommerce", Parse.Object.extend("Commerce").createWithoutData(this.state.commerceId));
                Commerce_video.save();
            }, (error) => {
                console.error(error);
            });
        }
    }

    onUploadVideo = (event) => {
        if (event.target.files.length === 1) {
            var video = event.target.files[0];
            this.uploadVideoToServer(video);
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
        })
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
        console.log(`--fff-------> ${movie}`);
        this.setState({
            movieURL: movie
        })
        console.log(`--ggg-------> ${this.state.movieURL}`);
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





    componentDidMount() {
        // this.props.getUserInfo();
        // const id = JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`));
        this.getCommerceData();
        this.getUrlCommercePicture();
        this.getUrlCommerceMovie();
        console.log(`-----------> ${this.state.movieURL}`);
        // console.log(`-----------> ${this.props.location.state.id}`);
        
    }

    render() {
        // const { user } = this.props;className="App-header"
        console.log(this.state.commerce);
        console.log(this.state.listImg);

        let columns = this.props.width === 'xs' || this.props.width === 'sm' ? 1 : 3;

        return (
            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <div style={root}>
                    <Grid
                        container
                        // direction="column"
                        // justify="space-between"
                        // alignItems="center"
                    >
                        <Grid item xs={12} className="Weeclik-App-Info-Commerce" style={paper}>
                            <Button onClick={() => { this.goToBack() }}>Go back</Button>
                            <Button onClick={() => { this.getDetail(this.state.commerceId) }}>Update commerce</Button>
                            <Button onClick={() => { this.goToBack() }}>Nouvelle promotion</Button>
                        </Grid>

                        <Grid item xs={12} className="Weeclik-App-Info-Commerce" style={paper}>
                            <Button onClick={() => { this.goToBack() }}>Payer pour voir la visibilité de votre commerce</Button>
                        </Grid>

                        <Grid item xs={12} className="Weeclik-App-Info-Commerce" style={paper}>
                            <h1>{this.state.commerce.nomCommerce}</h1>
                            <h6>{this.state.commerce.statutCommerce}</h6>
                            <h5>{this.state.commerce.nombrePartages} {this.state.commerce.nomCommerce > 1 ? "Partages" : "Partage"}</h5>
                            <h6>Type : {this.state.commerce.currencyCategory}</h6>
                            <p>{this.state.commerce.siteWeb}</p>
                            <p>{this.state.commerce.tel}</p>
                            <p>{this.state.commerce.adresse}</p>
                            <p>{this.state.commerce.promotion}</p>
                            <p>{this.state.commerce.description}</p>
                        </Grid>


                        <Grid item xs={12} className="Weeclik-App" style={paper}>
                            <h1>Gallerie</h1>
                            Vos images: 
                            <GridList cellHeight={160} cols={columns}>
                                {this.state.listImg && [...this.state.listImg].map((url, index) => (
                                    <GridListTile key={index}>
                                        <img src={url} alt={"Images "+index+" du commerce"}/>
                                    </GridListTile>
                                ))}
                            </GridList>

                            Vous pouvez ajouter au maximum 3 Images de présentation de votre établissement
                            <input type="file" onChange={this.onUploadImage} accept='image/*' multiple/>
                            New images:
                            <GridList cellHeight={160} cols={columns}>
                                {this.state.file && [...this.state.file].map((file, index) => (
                                    <GridListTile key={index}>
                                        <img src={URL.createObjectURL(file)} alt={"tile.title"}/>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>

                        <Grid item xs={12} className="Weeclik-App" style={paper}>
                            <Player
                                playsInline
                                src={this.state.movieURL[0]}
                            />
                            <h6>Ajouter une vidéo</h6>
                            <input type="file" onChange={this.onUploadVideo} accept="video/mp4,video/x-m4v,video/*"/>
                        </Grid>
                    </Grid>
                    
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
const connectedAboutCommerce = connect(mapState, actionCreators) (AboutCommerce);
export { connectedAboutCommerce as AboutCommerce };

