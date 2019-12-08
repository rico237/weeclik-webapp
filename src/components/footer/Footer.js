import React from 'react';
// import { Typography, Divider, Grid, IconButton, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// import Logo_Instagram from '../../assets/icons/instagram.svg';
// import Logo_Facebook from '../../assets/icons/facebook.svg';
// import Logo_Twitter from '../../assets/icons/twitter.svg';

// import AppStore from '../../assets/icons/app-store-badge.png';
// import GooglePlay from '../../assets/icons/google-play-badge.png';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        color: 'grey',
		backgroundColor: '#000',
		fontSize: '18px',
		// eslint-disable-next-line no-dupe-keys
		color: '#FFF',
    },
    chip: {
        marginRight: '8px',
    },
    section1: {
        margin: '24px 16px',
    },
    section2: {
        margin: '16px',
	},
	title: {
		color: 'white', fontSize: '18px', fontWeight: '900', lineHeight: '24px', paddingBottom: '10px'
	},
	subtitle: {
		border: 0, fontSize: '100%', font: 'inherit', padding: 0, listStyleType: 'none'
	},
	subtitle_a: {
		color: 'white', fontSize: '15px',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none',
			color: '#1EB0F8'
		}
	}
}))

export default function Footer() {
    const classes = useStyles();

    return (
		<div className={classes.root}>
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
                                                <div className="media-body">Lire nos <a className="turquoise" href="fake_url">Termes &amp; Conditions</a>, <a className="turquoise" href="fake_url">Politique de vie privée</a></div>
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
        // <div className={classes.root}>
		// 	<Container maxWidth={'lg'}>
		// 		<div className={classes.section1}>
		// 			<Grid container>
		// 				<Grid item xs={12} sm>
		// 					<Typography variant="h3" color="textSecondary" className={classes.title}>Découvrir Weeclik</Typography>
		// 					<ul className={classes.subtitle}>
		// 						<li>
		// 							<a href={'blank_url'} className={classes.subtitle_a}>À propos</a>
		// 						</li>
		// 						<li>
		// 							<a href={'blank_url'} className={classes.subtitle_a}>Nous contacter</a>
		// 						</li>
		// 						<li>
		// 							<a href={'blank_url'} className={classes.subtitle_a}>Créer un nouveau commerce</a>
		// 						</li>
		// 					</ul>
		// 				</Grid>
		// 				<Grid item xs={12} sm>
		// 					<Typography variant="h3" color="textSecondary" className={classes.title}>Mentions légales</Typography>
		// 					<ul className={classes.subtitle}>
		// 						<li>
		// 							<a href={'blank_url'} className={classes.subtitle_a}>Mentions légales</a>
		// 						</li>
		// 						<li>
		// 							<a href={'blank_url'} className={classes.subtitle_a}>Confidentialité</a>
		// 						</li>
		// 						<li>
		// 							<a href={'blank_url'} className={classes.subtitle_a}>Conditions</a>
		// 						</li>
		// 					</ul>
		// 				</Grid>
		// 				<Grid item xs={12} sm>
		// 					<Typography variant="h3" color="textSecondary" className={classes.title}>Weeclik dans votre poche</Typography>
		// 					<center style={{padding: 0}}>
		// 						<img alt="App Store" onClick={() => window.open("https://apps.apple.com/us/app/weeclik/id1082731862?l=fr")} src={AppStore} style={{ width: "40%", cursor: 'pointer', margin: '10px' }}/>
		// 						<img alt="Google Play" onClick={() => window.open("https://play.google.com/store/apps/details?id=cantum.weeclik")} src={GooglePlay} style={{ width: "40%", cursor: 'pointer', margin: '10px' }}/>
		// 					</center>
		// 				</Grid>
		// 			</Grid>
		// 		</div>
		// 		<Divider variant="middle" style={{background: 'grey'}}/>
		// 		<div className={classes.section2}>
		// 			<Grid container>
		// 				<Grid item xs>
		// 					<Typography variant="body2" color="textSecondary" style={{ color: 'grey', paddingTop: '15px' }}>
		// 						{'©'}{' '}{new Date().getFullYear()}{' '}{'Weeclik'}
		// 					</Typography>
		// 				</Grid>
		// 				<Grid item>
		// 						<IconButton onClick={() => window.open("https://m.facebook.com/weeclik")} style={{outline: 'none'}}>
		// 							<img alt="facebook" src={Logo_Facebook} style={{ width: '24px'}}/>
		// 						</IconButton>
		// 						<IconButton onClick={() => window.open("https://twitter.com/weeclik")} style={{outline: 'none'}}>
		// 							<img alt="twitter" src={Logo_Twitter} style={{ width: '24px'}}/>
		// 						</IconButton>
		// 						<IconButton onClick={() => window.open()} style={{outline: 'none'}}>
		// 							<img alt="instagram" src={Logo_Instagram} style={{ width: '24px'}}/>
		// 						</IconButton>
		// 				</Grid>
		// 			</Grid>
		// 		</div>
		// 	</Container>
        // </div>
    )
}