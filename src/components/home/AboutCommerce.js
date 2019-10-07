import React, { Component } from 'react';
import Parse from 'parse';
import { } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from '../Footer';
import { Container, CssBaseline, TextField, Button, MenuItem, Typography, GridList, GridListTile, GridListTileBar, IconButton, Card, CardContent, CardActions } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import { withStyles } from '@material-ui/core/styles';
import imageCompression from 'browser-image-compression';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    card: {
        marginTop: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField1: {
        minWidth: '41.5%',
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField2: {
        minWidth: '31%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField3: {
        minWidth: '6.5%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField4: {
        minWidth: '25%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField5: {
        minWidth: '71%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField6: {
        minWidth: '40%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    label: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    buttonSubmit: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
    },
    menu: {
        width: 200,
    },
    sousMenu: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
});

class AboutCommerce extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: Parse.User.current(),

            commerceID: this.props.location.state.id,

            commerce: {
                name: '',
                status: '',
                nbPartage: 0,

                currencyCategory: '',

                adresse: '',
                ville: '',
                bp: '',
                tel: '',
                siteWeb: '',

                description: '',

                promotion: '',
            },

            listImg: [],

            urls: {
                urlImg1: '',
                urlImg2: '',
                urlImg3: ''
            }

        }

        this.onUploadPicture = this.onUploadPicture.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);

        this.handleUpdateInfo = this.handleUpdateInfo.bind(this);
        this.handleUpdateCategory = this.handleUpdateCategory.bind(this);
        this.handleUpdatePromotion = this.handleUpdatePromotion.bind(this);
        this.handleUpdateDescription = this.handleUpdateDescription.bind(this);
    }

    handleChangeAddress(value) {
        this.setState(prevState => ({
            commerce: {
                ...prevState.commerce,
                adresse: value
            }
        }));
    }

    handleChangeCity(value) {
        this.setState(prevState => ({
            commerce: {
                ...prevState.commerce,
                ville: value
            }
        }));
    }

    handleChangeBP(value) {
        this.setState(prevState => ({
            commerce: {
                ...prevState.commerce,
                bp: value
            }
        }));
    }

    handleChangePhone(value) {
        this.setState(prevState => ({
            commerce: {
                ...prevState.commerce,
                tel: value
            }
        }));
    }

    handleChangeWeb(value) {
        this.setState(prevState => ({
            commerce: {
                ...prevState.commerce,
                siteWeb: value
            }
        }));
    }

    handleChangeDescription(value) {
        this.setState(prevState => ({
            commerce: {
                ...prevState.commerce,
                description: value
            }
        }));
    }

    handleChangePromotion(value) {
        this.setState(prevState => ({
            commerce: {
                ...prevState.commerce,
                promotion: value
            }
        }));
    }

    handleChangeSelect(event) {
        event.preventDefault();
        this.setState(prevState => ({
            commerce: {
                ...prevState.commerce,
                currencyCategory: event.target.value
            }
        }));
    }

    handleUpdateCategory(event) {
        event.preventDefault();
        const state = this.state;
        const ParseCommerce = Parse.Object.extend("Commerce");
        const instanceCommerce = new ParseCommerce();
        instanceCommerce.id = state.commerceID;
        instanceCommerce.set("typeCommerce", state.commerce.currencyCategory);
        instanceCommerce.save();
    }

    handleUpdateInfo(event) {
        event.preventDefault();
        const state = this.state;
        let addr = "";
        if (state.commerce.adresse !== "" && state.commerce.ville !== "" && state.commerce.bp !== "") {
            addr = state.commerce.adresse + ", " + state.commerce.ville + " " + state.commerce.bp;
        } else if (state.commerce.adresse !== "") {
            addr = state.commerce.adresse
        }
        const ParseCommerce = Parse.Object.extend("Commerce");
        const instanceCommerce = new ParseCommerce();
        instanceCommerce.id = state.commerceID;
        instanceCommerce.set("addr", addr);
        instanceCommerce.save();
    }

    handleUpdateDescription(event) {
        event.preventDefault();
        const state = this.state;
        const ParseCommerce = Parse.Object.extend("Commerce");
        const instanceCommerce = new ParseCommerce();
        instanceCommerce.id = state.commerceID;
        instanceCommerce.set("description", state.commerce.description);
        instanceCommerce.save();
    }

    handleUpdatePromotion(event) {
        event.preventDefault();
        const state = this.state;
        const ParseCommerce = Parse.Object.extend("Commerce");
        const instanceCommerce = new ParseCommerce();
        instanceCommerce.id = state.commerceID;
        instanceCommerce.set("promotions", state.commerce.promotion);
        instanceCommerce.save();
    }

    hashCode = function(s) {
        return s.split("").reduce(function(a, b) {a=((a << 5) - a) + b.charCodeAt(0);return a&a},0);
    }


    uploadToServer(img) {
        var file = new Parse.File(img.name, img);
        var Commerce_Photos = new Parse.Object("Commerce_Photos");
        if (this.state.currentUser) {
            file.save().then(() => {
                Commerce_Photos.set("photo", file);
                Commerce_Photos.set("commerce", Parse.Object.extend("Commerce").createWithoutData(this.state.commerceID));
                Commerce_Photos.save();
            }, function(error) {
                console.error(error);
            });
        }
    }

    /**
     * Met a jour les photos des commerces
     * @param {*} event 
     */
    onUploadPicture(event) {
        // var currentUser = Parse.User.current();

        // console.log(event.target.files[0]);
        // console.log(event.target.files[1]);
        // console.log(event.target.files[2]);
        // console.log(event.target.files.length);
        
        var taille = 0;

        if (event.target.files.length <= 3) {
            taille = event.target.files.length;
            for (var i = 0; i < taille; i++) {
                var img = event.target.files[i];
                // console.log('OriginalFile instanceof Blob', img instanceof Blob);
                // console.log('OriginalFile size ' + (img.size / 1024 / 1024) + " MB");

                var options = {
                    maxSizeMB: 0.5,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true
                }

                imageCompression(img, options)
                    .then((compressedFile) => {
                        // console.log('CompressFile instanceof Blob', compressedFile instanceof Blob);
                        // console.log('CompressFile size ' + (compressedFile.size / 1024 / 1024) + " MB");
                        return this.uploadToServer(compressedFile);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                // console.log(event.target.files[i].name);
                // console.log(event.target.files[i].size);
            }
        } else {
            alert("Attention seulement vous pouvez ajouter que 3 images maximum");
        }
    }

    uploadVideoToServer(movie) {
        var file = new Parse.File(movie.name, movie);
        var Commerce_Video = new Parse.Object("Commerce_Videos");
        if (this.state.currentUser) {
            file.save().then(() => {
                Commerce_Video.set("nameVideo", movie.name);
                Commerce_Video.set("video", file);
                Commerce_Video.set("leCommerce", Parse.Object.extend("Commerce").createWithoutData(this.state.commerceID));
                Commerce_Video.save();
            }, (error) => {
                console.error(error);
            });
        }
    }

    onUploadVideo = (event) => {
        console.log("Upload video");
        var taille = 0;
        if (event.target.files.length === 1) {
            taille = event.target.files.length;
            var video = event.target.files[0];
            console.log('OriginalFile size ' + (video instanceof Blob) + " MB");
            console.log('OriginalFile size ' + (video.size / 1024 / 1024) + " MB");
            console.log(video)

            this.uploadVideoToServer(video);

        } else {
            
        }
    }



    getCommerceInfo() {
        // console.log("id = " + this.state.commerceID);
        const ParseCommerce = Parse.Object.extend("Commerce");
        const queryCommerce   = new Parse.Query(ParseCommerce);

        queryCommerce.get(this.state.commerceID)
            .then((object) => {
                object.fetch().then((fetchedCommerce) => {
                    var _name = fetchedCommerce.get('nomCommerce');
                    var _statusCommerce = fetchedCommerce.get('statutCommerce');
                    var _nbPartage = fetchedCommerce.get('nombrePartages');
                    var _typeCommerce = fetchedCommerce.get('typeCommerce');
                    var _addr = fetchedCommerce.get('adresse');
                    var _tel = fetchedCommerce.get('tel');
                    var _siteWeb = fetchedCommerce.get('siteWeb');
                    var _description = fetchedCommerce.get('description');
                    var _promotions = fetchedCommerce.get('promotions');
                    // var username = fetchedCommerce.getUsername();
                    // var email = fetchedCommerce.getEmail();
                    // var objectId = fetchedCommerce.id;
                    
                    this.setState(prevState => ({
                        commerce: {                 // object that we want to update
                            ...prevState.commerce,  // keep all other key-value pairs
                            nbPartage: _nbPartage,       // update the value of specific key
                            status: _statusCommerce,
                            name: _name,
                            currencyCategory: _typeCommerce,
                            adresse: _addr,
                            tel: _tel,
                            siteWeb: _siteWeb,
                            description: _description,
                            promotion: _promotions
                        }
                    }));
                });
                // console.log("Successfully retrieved " + object + " scores.");
                // console.log(JSON.stringify(object, null, 2));
                // console.log("++======++++"+this.state.name);
            })
            .catch((error) => {

            });
    }


    getAllPicture() {
        const ParseCommerce = Parse.Object.extend("Commerce");
        const queryCommerce = new Parse.Query(ParseCommerce);

        const ParseCommercePhoto = Parse.Object.extend("Commerce_Photos");
        const queryCommercePhoto = new Parse.Query(ParseCommercePhoto);
        
        queryCommerce.equalTo("owner", this.state.currentUser);

        let commercePicture = [];
        queryCommercePhoto.equalTo("commerce", new ParseCommerce({id: this.state.commerceID}));

        queryCommercePhoto.find().then((response) => {
            response.forEach((elt) => {
                commercePicture.push(elt.get("photo").url());
                // console.log(elt.get("photo").url());
                console.log(commercePicture);
                
            });
            this.setState({
                allPicture: []
            }, function() {
                this.setState({
                    allPicture: ["commercePicture"]
                })
            })
            
        });

        this.setState(prevState => ({
            urls: {
                ...prevState.urls,
                urlImg1: commercePicture[0],
                urlImg2: commercePicture[1],
                urlImg3: commercePicture[2],
            }
        }));
    }


    getPictureSlideByCommerce = () => {
        let commercePicture = [];

        const ParseCommerce = Parse.Object.extend("Commerce");

        const ParseCommercePhoto = Parse.Object.extend("Commerce_Photos");
        const queryCommercePhoto = new Parse.Query(ParseCommercePhoto);

        queryCommercePhoto.equalTo("commerce", new ParseCommerce({id: this.state.commerceID}));

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

    updateUrlPicture = async () => {
        const listPicture = await this.getPictureSlideByCommerce();
        this.setState({
            listImg : listPicture
        })
    }


    componentDidMount() {
        this.getCommerceInfo();
        this.updateUrlPicture();
    }



    render() {

        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        
        return (
            <div>
                <NavBar/>
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="md" style={{ marginTop: '100px' }}>

                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h4" component="h2" style={{ color: grey[900] }}>
                                    {this.state.commerce.name}
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>Statut</Typography>
                                <Typography variant="h5" component="h2" style={{ color: "#F00" }}>
                                    {"Hors ligne"}
                                    {bull}
                                    {"en attente de paiement"}
                                </Typography>

                                <Typography className={classes.title} color="textSecondary" gutterBottom>Nombre de partage</Typography>
                                <Typography variant="h5" component="h2" style={{ color: grey[900] }}>
                                    <ShareRoundedIcon/> {" "}
                                    {this.state.commerce.nbPartage}
                                    {bull}
                                    {" Partages"}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">About status</Button>
                            </CardActions>
                        </Card>

                        <div className={classes.sousMenu}>
                            <Typography variant="h6" gutterBottom style={{ color: grey[900] }}>{"Catégorie du commerce"}</Typography>
                        </div>

                        <form className={classes.container} autoComplete="on" onSubmit={this.handleUpdateCategory}>
                            <TextField
                                select
                                variant="outlined"
                                value={this.state.commerce.currencyCategory}
                                onChange={this.handleChangeSelect}
                                // required
                                className={classes.textField2}
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
                            <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary">Modifier la Catégorie</Button>
                        </form>

                        <div className={classes.sousMenu}>
                            <Typography variant="h6" gutterBottom style={{ color: grey[900] }}>{"Informations du commerce"}</Typography>
                        </div>

                        <form className={classes.container} autoComplete="on" onSubmit={this.handleUpdateInfo}>
                            <TextField
                                required
                                value={this.state.commerce.adresse}
                                onChange={e => this.handleChangeAddress(e.target.value)}
                                className={classes.textField1}
                                name="adresse"
                                id="outlined-name"
                                label="Adresse"
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                // required
                                className={classes.textField2}
                                onChange={e => this.handleChangeCity(e.target.value)}
                                name="ville"
                                id="outlined-name"
                                label="Ville"
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                // required
                                className={classes.textField3}
                                onChange={e => this.handleChangeBP(e.target.value)}
                                name="bp"
                                id="outlined-name"
                                label="Code postal"
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                required
                                value={this.state.commerce.tel}
                                onChange={e => this.handleChangePhone(e.target.value)}
                                className={classes.textField4}
                                name="tel"
                                id="outlined-name"
                                label="Numéro de téléphone"
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                required
                                value={this.state.commerce.siteWeb}
                                onChange={e => this.handleChangeWeb(e.target.value)}
                                className={classes.textField5}
                                name="siteWeb"
                                id="outlined-name"
                                label="Site web"
                                margin="dense"
                                variant="outlined"
                            />
                            <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary">Modifier les informations</Button>
                        </form>


                        <div className={classes.sousMenu}>
                            <Typography variant="h6" gutterBottom style={{ color: grey[900] }}>{"Description de votre commerce"}</Typography>
                        </div>

                        <form className={classes.container} autoComplete="on" onSubmit={this.handleUpdateDescription}>
                            <TextField
                                required
                                value={this.state.commerce.description}
                                onChange={e => this.handleChangeDescription(e.target.value)}
                                className={classes.textField}
                                multiline
                                fullWidth
                                rows="4"
                                name="description"
                                id="outlined-name"
                                label="Description du commerce"
                                margin="dense"
                                variant="outlined"
                            />
                            <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary">Modifier la description</Button>
                        </form>

                        <div className={classes.sousMenu}>
                            <Typography variant="h6" gutterBottom style={{ color: grey[900] }}>{"Promotion"}</Typography>
                        </div>

                        <form className={classes.container} autoComplete="on" onSubmit={this.handleUpdatePromotion}>
                            <TextField
                                required
                                helperText="Une petite description sur ce qu'est une promotion"
                                value={this.state.commerce.promotion}
                                onChange={e => this.handleChangePromotion(e.target.value)}
                                className={classes.textField}
                                multiline
                                fullWidth
                                rows="4"
                                name="promotions"
                                id="outlined-name"
                                label="Promotion"
                                margin="dense"
                                variant="outlined"
                            />
                            <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary">Modifier la promotion</Button>
                        </form>

                        <div className={classes.sousMenu}>
                            <Typography variant="h6" gutterBottom style={{ color: grey[900] }}>{"Photos du commerce"}</Typography>
                            <p style={{ color: grey[600] }}>3 Photos maximum</p>
                            <input type="file" onChange={this.onUploadPicture} multiple/>
                        </div>

                        <GridList cellHeight={250} cols={3}>
                            <GridListTile>
                                <img src={this.state.listImg[0]} alt="Titre" />
                                <GridListTileBar
                                    title="Titre A"
                                    subtitle={<span>at : "Date de creation"</span>}
                                    actionIcon={
                                        <IconButton>
                                            <EditOutlinedIcon style={{ color: '#FFF' }}/>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                            <GridListTile>
                                <img src={this.state.listImg[1]} alt="Titre" />
                                <GridListTileBar
                                    title="Titre A"
                                    subtitle={<span>at : "Date de creation"</span>}
                                    actionIcon={
                                        <IconButton>
                                            <EditOutlinedIcon style={{ color: '#FFF' }}/>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                            <GridListTile>
                                <img src={this.state.listImg[2]} alt="Titre" />
                                <GridListTileBar
                                    title="Titre A"
                                    subtitle={<span>at : "Date de creation"</span>}
                                    actionIcon={
                                        <IconButton>
                                            <EditOutlinedIcon style={{ color: '#FFF' }}/>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        </GridList>


                        <div className={classes.sousMenu}>
                            <Typography variant="h6" gutterBottom style={{ color: grey[900] }}>{"Vidéo du commerce"}</Typography>
                            <input type="file" onChange={this.onUploadVideo} accept="video/mp4,video/x-m4v,video/*"/>
                        </div>

                    </Container>
                </React.Fragment>
                <Footer/>
            </div>
        );
    }

}

export default withStyles(styles) (AboutCommerce);