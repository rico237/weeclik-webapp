import React, { Component, Fragment } from 'react';
import './css/bootstrap.css';
import './css/fontawesome-all.css';
import './css/styles.css';

import Michel from '../../assets/images/michel.jpg';
import Aziz from '../../assets/images/aziz.jpg';
import Mohamed from '../../assets/images/mohamed.jpg';
import Herrick from '../../assets/images/herrick.jpg';
import Grace from '../../assets/images/grace.jpg';
import detail1 from './images/details-1-iphone.png';
import detail2 from './images/details-2-iphone.png';
import download from './images/download.png';
import headerIphone from './images/header-iphone.png';


import NavigationBar from '../NavigationBar';


class HomePage extends Component {
    
    render() {

        return (
            <Fragment>
                <NavigationBar/>
                
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
                            <h3>Une gestion simplifié de vos commerce</h3>
                            <p>Gérez, en temps réel, les informations de votre commerce. Augmentez votre visibilité gratuitement en partageant 3 photos &amp; 1 vidéo avec la communauté Weeclik<sup>©</sup>.</p>
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
                            <div className="text-container">
                                <h3>Une réseau de confiance et humain</h3>
                                <p>Partagez l'amour et la confiance que vous rend votre commerçant en la partageant avec vos proches, votre famille, vos voisins ou encore avec vos collègues de travail.</p>
                                <p>Intégrez le réseau de partage viral Weeclik<sup>©</sup> et profitez de promotions exclusives avec vos commerçants de confiance.</p>
                            </div> 
                            </div> 
                            <div className="col-lg-6">
                            <img className="img-fluid" src={detail2} alt="alternative"/>
                            </div> 
                        </div> 
                        </div> 
                    </div> 
                    </div> 

                    <div className="basic-3">
                        <div className="container-fluid">
                            <div className="row">
                            <div className="col-lg-12">

                                <h2 style={{textAlign:'center', paddingBottom:'1em'}}>Qui sommes nous ?</h2>

                                <div className="container w3-grayscale">
                                <div className="row">
                                    <div className="col-lg-2 offset-lg-1 offset-0 col-6" style={{marginTop:'16px'}}>
                                    <div className="w3-card">
                                        <img src={Aziz} alt="Aziz" style={{width:'100%'}}/>
                                        <div className="w3-container">
                                        <h3>Aziz</h3>
                                        <p className="w3-opacity">CEO et Fondateur</p>
                                        <p></p>
                                        {/* <p><button className="w3-button w3-light-grey w3-block"><i className="fa fa-envelope"></i> Contact</button></p> */}
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-2 col-6" style={{marginTop:'16px'}}>
                                    <div className="w3-card">
                                        <img src={Michel} alt="Michel" style={{width:'100%'}}/>
                                        <div className="w3-container">
                                        <h3>Michel</h3>
                                        <p className="w3-opacity">Directeur des operations</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-2 col-6" style={{marginTop:'16px'}}>
                                    <div className="w3-card">
                                        <img src={Herrick} alt="Mike" style={{width:'100%'}}/>
                                        <div className="w3-container">
                                        <h3>Herrick</h3>
                                        <p className="w3-opacity">CTO et Développeur lead iOS</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-2 col-6" style={{marginTop:'16px'}}>
                                    <div className="w3-card">
                                        <img src={Mohamed} alt="Dan" style={{width:'100%'}}/>
                                        <div className="w3-container">
                                        <h3>Mohamed</h3>
                                        <p className="w3-opacity">Expert Android</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-2 col-6" style={{marginTop:'16px'}}>
                                    <div className="w3-card">
                                        <img src={Grace} alt="Dan" style={{width:'100%'}}/>
                                        <div className="w3-container">
                                        <h3>Grâce</h3>
                                        <p className="w3-opacity">Expert ReactJS</p>
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
                        <div className="col-lg-6 col-xl-5">
                            <div className="text-container">
                            <h2>Télécharger <span className="blue">Weeclik</span></h2>
                            <p className="p-large">Profitez de promotions diverses et variés, faites parti d'un réseaux de commerçants de confiance, ensemble œuvrons pour des valeures plus humaines.</p> 
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
                            <div className="footer-col">
                            <h4>À propos de Weeclik</h4>
                            <p>Chez Weeclik, nous sommes pionniers dans le partage de confiance.
                                <br/>Avec notre app, adoptez vous aussi le réflexe de partage avec vos commerçants !</p>
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
                            </div> 
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="copyright">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                            <p className="p-small">Copyright 2019 - Weeclik<sup>©</sup></p>
                            </div>
                        </div>
                        </div>
                    </div>

            </Fragment>);
        }
    }
    
    export default HomePage;