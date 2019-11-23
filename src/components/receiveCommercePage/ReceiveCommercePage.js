/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import Parse from 'parse';
import { Container, CssBaseline, Grid, Paper, Typography, AppBar, Tabs, Tab, Card, CardContent, CardHeader } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import CommercePicture from './CommercePicture';

import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';

import "../../../node_modules/video-react/dist/video-react.css";


//#region THEME
const theme = createMuiTheme({
    spacing: 4,
});

const root = {
    flexGrow: 1,
    paddingTop: '40px',
}

const root2 = {
    padding: theme.spacing(5),
}

const paper = {
    padding: theme.spacing(3),
}

const heading = {
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 0.5,
}

const card = {
    width: '100%',
    // maxWidth: 500,
    borderRadius: theme.spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 8,
    paddingRight: 8,
    background:
      'linear-gradient(34deg, rgba(55,16,83,1) 0%, rgba(162,73,190,1) 29%, rgba(33,16,83,1) 92%)',
}

const media = {
    flexShrink: 0,
    width: '50%',
    float: 'right',
    // marginRight: 'auto',
}

const content = {

}

const overline = {
    lineHeight: 2,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '0.625rem',
    opacity: 0.7,
}
//#endregion


class ReceiveCommercePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commerceId: this.props.match.params.commerceId,
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
            activeTabIndex: 0
        };

        this.handleValidate = this.handleValidate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTab = (event, value) => {
        this.setState({ activeTabIndex: value })
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
        // console.log(`--fff-------> ${movie}`);
        this.setState({
            movieURL: movie
        })
        // console.log(`--ggg-------> ${this.state.movieURL}`);
    }
    //#endregion

    goToGalery = (_id) => {
        this.props.history.push({
            pathname: '/galery',
            state: { id: _id }
        })
    }





    componentDidMount() {
        this.getCommerceData();
    }

    render() {

        return (
            <Container component="main" maxWidth="md" style={{ color: "#000" }}>
                <CssBaseline/>
                {this.props.match.params.commerceId}
                <div style={root}>

                    <CommercePicture
                        commerceId={this.props.match.params.commerceId}
                        commerceName={this.state.commerce.nomCommerce}
                        commerceCategory={this.state.commerce.currencyCategory}
                        commerceNbShare={this.state.commerce.nombrePartages}/>

                    <AppBar position="static" color="default" elevation={0}>
                        <Tabs
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            value={this.state.activeTabIndex}
                            onChange={this.handleChangeTab}
                            TabIndicatorProps={{style: { backgroundColor: "#00000000" }}}
                            aria-label="simple tabs example">
                            <Tab
                                onClick={() => {console.log("Téléphone")}}
                                icon={<PhoneRoundedIcon />}
                                aria-label="Téléphone"
                                style={{outline: 'none', color: '#1A76D2'}}/>
                            <Tab
                                onClick={() => {console.log("Localisation")}}
                                icon={<RoomRoundedIcon />}
                                aria-label="Localisation"
                                style={{outline: 'none', color: '#1A76D2'}}/>
                            <Tab
                                onClick={() => {console.log("Site Web")}}
                                icon={<LanguageRoundedIcon />}
                                aria-label="Site Web"
                                style={{outline: 'none', color: '#1A76D2'}}/>
                            <Tab
                                onClick={() => {window.open("mailto:xyz@abc.com")}}
                                icon={<MailRoundedIcon />}
                                aria-label="Mail"
                                style={{outline: 'none', color: '#1A76D2'}}/>
                            <Tab
                                onClick={() => {console.log("Galerie")}}
                                icon={<PhotoLibraryRoundedIcon />}
                                aria-label="Galerie"
                                style={{outline: 'none', color: '#1A76D2'}}/>
                        </Tabs>
                    </AppBar>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="center">
                        <Grid item xs={12} className="Weeclik-App-Info-Commerce2" style={paper}>
                            <div style={{margin:'10px'}}></div>

                            <Card style={card}>
                                <CardContent style={content}>
                                    <Typography style={heading} variant="h6" gutterBottom>
                                        Promotions
                                    </Typography>
                                    <Grid container spacing={1}>
                                        <Grid item xs={8}>
                                            <Typography style={overline} variant="overline">
                                                Promotions Blab bla bla
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <img src={'https://jkkm.info/ui/images/awards/victory.png'} style={media}/>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <div style={{margin:'10px'}}></div>

                            <Paper elevation={0} style={root2}>
                                <h6 style={{color:"#000"}}>
                                    {" " + this.state.commerce.adresse}
                                </h6>
                                <h6 style={{color:"#000"}}>
                                    {" " + this.state.commerce.tel}
                                </h6>
                                <h6 style={{color:"#000"}}>
                                    {" " + this.state.commerce.siteWeb}
                                </h6>
                            </Paper>
                            
                            <div style={{margin:'10px'}}></div>

                            <CardHeader
                                style={{ background: '#FFF', borderRadius: 16, padding: 16, fontWeight: 'bold',
                                fontSize: '1.5rem', subheader: {color: 'rgba(255, 255, 255, 0.76)',}
                            }}
                                title="Description"
                                subheader={this.state.commerce.description}
                            />

                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export { ReceiveCommercePage };

