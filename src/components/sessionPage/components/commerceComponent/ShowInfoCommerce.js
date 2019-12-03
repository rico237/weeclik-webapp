/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import Parse from 'parse';
import { Container, CssBaseline, Grid, Paper, Typography, Card, CardContent, CardHeader } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import Picture from './Picture';

import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import CallRoundedIcon from '@material-ui/icons/CallRounded';


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
    borderRadius: 16,
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


class ShowInfoCommerce extends Component {
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

    getUrlPicture = async () => {
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

                    <Picture
                        commerceId={this.props.match.params.commerceId}
                        commerceName={this.state.commerce.nomCommerce}
                        commerceCategory={this.state.commerce.currencyCategory}
                        commerceNbShare={this.state.commerce.nombrePartages}/>
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

export default { ShowInfoCommerce };