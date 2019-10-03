import React, { Component, Fragment } from 'react';
import './css/bootstrap.css';
import './css/fontawesome-all.css';
import './css/styles.css';

// import Michel from '../assets/images/michel.jpg';
// import Aziz from '../assets/images/aziz.jpg';
// import Mohamed from '../assets/images/mohamed.jpg';
// import Herrick from '../assets/images/herrick.jpg';
// import Grace from '../assets/images/grace.jpg';
import detail1 from './images/details-1-iphone.png';
import detail2 from './images/details-2-iphone.png';
import download from './images/download.png';
import headerIphone from './images/header-iphone.png';


import NavigationBar from '../NavigationBar';
import Footer from '../Footer';


class HomePage extends Component {
    
    render() {

        return (
            <Fragment>
                <NavigationBar/>
                
                <header id="header" class="header">
                    <div class="header-content">
                        <div class="container">
                        <div class="row">
                            <div class="col-lg-6">
                            <div class="text-container">
                                <h1>Weeclik <br/><span id="js-rotating">On aime, on partage<br/>On œuvre pour l'humanité</span></h1>
                                <a class="btn-solid-lg page-scroll" href="https://apps.apple.com/us/app/weeclik/id1082731862?l=fr" target="_blank" rel="noopener noreferrer"><i class="fab fa-apple"></i>APP STORE</a>
                                <a class="btn-solid-lg page-scroll" href="https://play.google.com/store/apps/details?id=cantum.weeclik" target="_blank" rel="noopener noreferrer"><i class="fab fa-google-play"></i>PLAY STORE</a>
                            </div>
                            </div> 
                            <div class="col-lg-6">
                            <div class="image-container">
                                <img class="img-fluid" src={headerIphone} alt="alternative"/>
                            </div>
                            </div> 
                        </div> 
                        </div> 
                    </div> 
                    </header> 

                    <div id="details" class="basic-2">
                    <div class="container">
                        <div class="row">
                        <div class="col-lg-6">
                            <img class="img-fluid" src={detail1} alt="alternative"/>
                        </div>
                        <div class="col-lg-6">
                            <div class="text-container">
                            <h3>Une gestion simplifié de vos commerce</h3>
                            <p>Gérez, en temps réel, les informations de votre commerce. Augmentez votre visibilité gratuitement en partageant 3 photos &amp; 1 vidéo avec la communauté Weeclik<sup>©</sup>.</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="basic-3">
                    <div class="second">
                        <div class="container">
                        <div class="row">
                            <div class="col-lg-6">
                            <div class="text-container">
                                <h3>Une réseau de confiance et humain</h3>
                                <p>Partagez l'amour et la confiance que vous rend votre commerçant en la partageant avec vos proches, votre famille, vos voisins ou encore avec vos collègues de travail.</p>
                                <p>Intégrez le réseau de partage viral Weeclik<sup>©</sup> et profitez de promotions exclusives avec vos commerçants de confiance.</p>
                            </div> 
                            </div> 
                            <div class="col-lg-6">
                            <img class="img-fluid" src={detail2} alt="alternative"/>
                            </div> 
                        </div> 
                        </div> 
                    </div> 
                    </div> 

                    <div class="basic-4">
                    <div class="container">
                        <div class="row">
                        <div class="col-lg-6 col-xl-5">
                            <div class="text-container">
                            <h2>Télécharger <span class="blue">Weeclik</span></h2>
                            <p class="p-large">Profitez de promotions diverses et variés, faites parti d'un réseaux de commerçants de confiance, ensemble œuvrons pour des valeures plus humaines.</p> 
                            <p class="p-large weeclik-slogan">Avec Weeclik<sup>©</sup>, on aime, on partage.</p>
                            <a class="btn-solid-lg" href="https://apps.apple.com/us/app/weeclik/id1082731862" target="_blank" rel="noopener noreferrer"><i class="fab fa-apple"></i>APP STORE</a>
                            <a class="btn-solid-lg" href="https://play.google.com/store/apps/details?id=cantum.weeclik" target="_blank" rel="noopener noreferrer"><i class="fab fa-google-play"></i>PLAY STORE</a>
                            </div> 
                        </div> 
                        <div class="col-lg-6 col-xl-7">
                            <div class="image-container">
                            <img class="img-fluid" src={download} alt="alternative"/>
                            </div> 
                        </div> 
                        </div> 
                    </div> 
                    </div>

                    <div class="footer">
                    <div class="container">
                        <div class="row">
                        <div class="col-md-4">
                            <div class="footer-col">
                            <h4>À propos de Weeclik</h4>
                            <p>Chez Weeclik, nous sommes pionniers dans le partage de confiance.
                                <br/>Avec notre app, adoptez vous aussi le réflexe de partage avec vos commerçants !</p>
                            </div>
                            </div>
                            <div class="col-md-4">
                            <div class="footer-col middle">
                                <h4>Liens importants</h4>
                                <ul class="list-unstyled li-space-lg">
                                <li class="media">
                                    <i class="fas fa-square"></i>
                                    <div class="media-body">Lire nos <a class="turquoise" href="">Termes &amp; Conditions</a>, <a class="turquoise" href="#">Politique de vie privée</a></div>
                                </li>
                                </ul>
                            </div>
                            </div>
                            <div class="col-md-4">
                            <div class="footer-col last">
                                <h4>Réseaux sociaux</h4>
                                <span class="fa-stack">
                                <a href="https://twitter.com/weeclik" target="_blank" rel="noopener noreferrer">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-twitter fa-stack-1x"></i>
                                </a>
                                </span>
                            </div> 
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="copyright">
                        <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                            <p class="p-small">Copyright 2019 - Weeclik<sup>©</sup></p>
                            </div>
                        </div>
                        </div>
                    </div>

            </Fragment>);
        }
    }
    
    export default HomePage;