/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { Dialog, DialogTitle } from '@material-ui/core';
import Michel from '../../assets/images/team/michel.jpg';
import Aziz from '../../assets/images/team/aziz.jpg';
import Mohamed from '../../assets/images/team/mohamed.jpg';
import Herrick from '../../assets/images/team/herrick.jpg';
import Grace from '../../assets/images/team/grace.jpg';
import detail1 from './images/details-1-iphone.png';
import ambassadeurPic from '../../assets/images/blur-businessman-cellphone-727x300.jpg';
import previewWeeclik from '../../assets/images/weeclik_0.png';
import download from './images/download.png';
import headerIphone from './images/header-iphone.png';
import { Player, ControlBar } from 'video-react';

import './css/bootstrap.css';
import './css/fontawesome-all.css';
import './css/styles.css';

const urlMovieAmbassadeur = process.env.REACT_APP_SERVER_URL+"/files/"+process.env.REACT_APP_APP_ID+"/d65422f06592f1f3e4daaac82369f89f_weeclik_ambassadeur.mp4";
const urlMovieDescription = process.env.REACT_APP_SERVER_URL+"/files/"+process.env.REACT_APP_APP_ID+"/d6c44f3f966dc53911d961e0ddec5a66_weeclik_description.mp4"

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    getUrlCommerceMovie = (urlVideo) => {
        // rewrite the link url to work on Safari
        return urlVideo.replace(process.env.REACT_APP_SERVER_URL+"/files/"+process.env.REACT_APP_APP_ID+"/", 
        "https://firebasestorage.googleapis.com/v0/b/weeclik-1517332083996.appspot.com/o/baas_files%2F")+"?alt=media"
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {

        return (
            <Fragment>
                <div className="balise-body home-page">
                    <header id="header" className="header">
                        <div className="header-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="text-container">
                                            <h1>Weeclik <br/><span id="js-rotating">On aime, on partage<br/>On œuvre pour l'humanité</span></h1>
                                            <a className="btn-solid-lg page-scroll" href="https://apps.apple.com/us/app/weeclik/id1082731862?l=fr" target="_blank" rel="noopener noreferrer"><i className="fab fa-apple"></i>APP STORE</a>
                                            <a className="btn-solid-lg page-scroll" href="https://play.google.com/store/apps/details?id=cantum.weeclik" target="_blank" rel="noopener noreferrer"><i className="fab fa-google-play"></i>PLAY STORE</a>
                                        </div>
                                    </div> 
                                    <div className="col-lg-6">
                                        <div className="image-container">
                                            <img className="img-fluid" src={headerIphone} alt="alternative"/>
                                        </div>
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                    </header>

                    <div id="details" className="basic-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <img className="img-fluid" src={detail1} alt="alternative"/>
                                </div>
                                <div className="col-lg-6">
                                    <div className="text-container">
                                        <h3>Une gestion simplifiée de vos commerces</h3>
                                        <p id="balise-p">Gérez, en temps réel, les informations de votre commerce. Augmentez votre visibilité gratuitement en partageant votre commerce avec la communauté Weeclik.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="basic-3">
                        <div className="second">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div style={{padding: '10px 0', margin: '20px 0'}}>
                                            <div>
                                                <h3>Devenir ambassadeur et ambassadrice du seul réseau de confiance humain</h3>
                                                
                                                <p>Partagez la confiance que vous avez avec votre commerçant à vos proches, voisins et collègues de travail.</p>
                                                <p>Intégrez le réseau de partage Weeclik et profitez de promotions exclusives avec vos commerçants de confiance.</p>
                                            </div>
                                            <br/>
                                            <a className="btn btn-solid-lg-ambassador" onClick={() => {this.handleOpen()}}>DEVENIR AMBASSADEUR OU AMBASSADRICE</a>
                                        </div>
                                    </div> 
                                    <div className="col-lg-6">
                                        <img className="img-fluid" src={ambassadeurPic} alt="alternative" style={{padding: '10px 0'}}/>
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                    </div>




                    <div>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            style={{ minHeight: "600px"}}
                            fullWidth={true}
                            maxWidth={"md"}
                        >
                        <DialogTitle id="alert-dialog-title">{"Devenir ambassadeur et ambassadrice du seul réseau de confiance humain"}</DialogTitle>
                            <Player ref={(player) => { this.player = player }} poster={previewWeeclik} style={{height: '200px'}} fluid={false} height={600}>
                                <source src={this.getUrlCommerceMovie(urlMovieAmbassadeur)} />
                                <ControlBar autoHide={false} />
                            </Player>
                        </Dialog>
                    </div>

                    <div className="basic-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">

                                    <h2 style={{textAlign:'center', paddingBottom:'1em'}}>Qui sommes nous ?</h2>

                                    <div className="container w3-grayscale">
                                        <div className="row">
                                            <div className="col-lg">
                                                <center>
                                                    <Player
                                                        ref={(player) => { this.player = player }}
                                                        poster={previewWeeclik}
                                                        style={{height: '200px'}} fluid={false} height={600}>
                                                            <source src={this.getUrlCommerceMovie(urlMovieDescription)} />
                                                            <ControlBar autoHide={false} />
                                                    </Player>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <div className="container w3-grayscale">
                                        <div className="row">
                                            <div className="col-lg col-6" style={{marginTop:'16px'}}>
                                                <div className="w3-card">
                                                    <img src={Aziz} alt="Aziz" style={{width:'100%'}}/>
                                                    <div className="w3-container" style={{ margin: '0 5px' }}>
                                                        <h3>Aziz</h3>
                                                        <p className="w3-opacity">CEO et Fondateur</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg col-6" style={{marginTop:'16px'}}>
                                                <div className="w3-card">
                                                    <img src={Michel} alt="Michel" style={{width:'100%'}}/>
                                                    <div className="w3-container" style={{ margin: '0 5px' }}>
                                                        <h3>Michel</h3>
                                                        <p className="w3-opacity">Directeur des operations</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg col-6" style={{marginTop:'16px'}}>
                                                <div className="w3-card">
                                                    <img src={Herrick} alt="Mike" style={{width:'100%'}}/>
                                                    <div className="w3-container" style={{ margin: '0 5px' }}>
                                                        <h3>Herrick</h3>
                                                        <p className="w3-opacity">CTO et Développeur lead iOS</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg col-6" style={{marginTop:'16px'}}>
                                                <div className="w3-card">
                                                    <img src={Mohamed} alt="Dan" style={{width:'100%'}}/>
                                                    <div className="w3-container" style={{ margin: '0 5px' }}>
                                                        <h3>Mohamed</h3>
                                                        <p className="w3-opacity">Expert Android</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg col-6" style={{marginTop:'16px'}}>
                                                <div className="w3-card">
                                                    <img src={Grace} alt="Dan" style={{width:'100%', objectFit: 'cover'}}/>
                                                    <div className="w3-container" style={{ margin: '0 5px' }}>
                                                        <h3>Grâce</h3>
                                                        <p className="w3-opacity">Développeur</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                        </div> 
                    </div>

                    <div className="basic-4">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-xl-5" style={{textAlign: 'justify'}}>
                                    <div className="text-container">
                                        <h2>Télécharger <span className="blue">Weeclik</span></h2>
                                        <p className="p-large">Profitez de promotions diverses et variées, faites partis d'un réseau de commerçants de confiance, ensemble œuvrons pour des valeurs plus humaines.</p> 
                                        <p className="p-large weeclik-slogan">Avec Weeclik<sup>©</sup>, on aime, on partage.</p>
                                        <a className="btn-solid-lg" href="https://apps.apple.com/us/app/weeclik/id1082731862" target="_blank" rel="noopener noreferrer"><i className="fab fa-apple"></i>APP STORE</a>
                                        <a className="btn-solid-lg" href="https://play.google.com/store/apps/details?id=cantum.weeclik" target="_blank" rel="noopener noreferrer"><i className="fab fa-google-play"></i>PLAY STORE</a>
                                    </div> 
                                </div> 
                                <div className="col-lg-6 col-xl-7">
                                    <div className="image-container">
                                        <img className="img-fluid" src={download} alt="alternative"/>
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                    </div>

                    <div className="footer">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="footer-col" style={{textAlign: 'justify'}}>
                                        <h4>À propos de Weeclik</h4>
                                        <p>Chez Weeclik, nous sommes pionniers dans le partage de confiance.
                                        <br/>Avec notre App, adoptez vous aussi le réflexe de partager vos commerçants !</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="footer-col middle">
                                        <h4>Liens importants</h4>
                                        <ul className="list-unstyled li-space-lg">
                                            <li className="media">
                                                <i className="fas fa-square"></i>
                                                <div className="media-body">Lire nos <a className="turquoise" href="#">Termes &amp; Conditions</a>, <a className="turquoise" href="#">Politique de vie privée</a></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="footer-col last">
                                        <h4>Réseaux sociaux</h4>
                                        <span className="fa-stack">
                                            <a href="https://twitter.com/weeclik" target="_blank" rel="noopener noreferrer">
                                                <i className="fas fa-circle fa-stack-2x"></i>
                                                <i className="fab fa-twitter fa-stack-1x"></i>
                                            </a>
                                        </span>
                                        <span className="fa-stack">
                                            <a href="https://www.facebook.com/weeclik" target="_blank" rel="noopener noreferrer">
                                                <i className="fas fa-circle fa-stack-2x"></i>
                                                <i className="fab fa-facebook fa-stack-1x"></i>
                                            </a>
                                        </span>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="copyright">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <p className="p-small">© {new Date().getFullYear()} Weeclik.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedHomePage = connect(mapState, actionCreators) (HomePage);
export { connectedHomePage as HomePage };

