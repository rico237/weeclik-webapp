import React from 'react';
// import { Typography, Divider, Grid, IconButton, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';

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
				<Container maxWidth={'lg'} style={{paddingLeft: '55px', paddingRight: '55px'}}>
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
                                        <div className="media-body">Lire nos <a className="turquoise" href="_blank">Termes &amp; Conditions</a>, <a className="turquoise" href="_blank">Politique de vie privée</a></div>
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
                </Container>
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
    )
}