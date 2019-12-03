import React from 'react';
import { Typography, Divider, Grid, IconButton, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Logo_Instagram from '../../assets/icons/instagram.svg';
import Logo_Facebook from '../../assets/icons/facebook.svg';
import Logo_Twitter from '../../assets/icons/twitter.svg';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        color: 'grey',
        backgroundColor: '#000',
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
			<Container maxWidth={'xl'}>
				<div className={classes.section1}>
					<Grid container>
						<Grid item xs={12} sm>
							<Typography variant="h3" color="textSecondary" className={classes.title}>Découvrir Weeclik</Typography>
							<ul className={classes.subtitle}>
								<li>
									<a href={'blank_url'} className={classes.subtitle_a}>À propos</a>
								</li>
								<li>
									<a href={'blank_url'} className={classes.subtitle_a}>Nous contacter</a>
								</li>
								<li>
									<a href={'blank_url'} className={classes.subtitle_a}>Créer un nouveau commerce</a>
								</li>
							</ul>
						</Grid>
						<Grid item xs={12} sm>
							<Typography variant="h3" color="textSecondary" className={classes.title}>Mentions légales</Typography>
							<ul className={classes.subtitle}>
								<li>
									<a href={'blank_url'} className={classes.subtitle_a}>Mentions légales</a>
								</li>
								<li>
									<a href={'blank_url'} className={classes.subtitle_a}>Confidentialité</a>
								</li>
								<li>
									<a href={'blank_url'} className={classes.subtitle_a}>Conditions</a>
								</li>
							</ul>
						</Grid>
						<Grid item xs={12} sm>
							<Typography variant="h3" color="textSecondary" className={classes.title}>Weeclik dans votre poche</Typography>
						</Grid>
					</Grid>
				</div>
				<Divider variant="middle" style={{background: 'grey'}}/>
				<div className={classes.section2}>
					<Grid container>
						<Grid item xs>
							<Typography variant="body2" color="textSecondary" style={{ color: 'grey', paddingTop: '15px' }}>
								{'©'}{' '}{new Date().getFullYear()}{' '}{'Weeclik'}
							</Typography>
						</Grid>
						<Grid item>
								<IconButton>
									<img alt="facebook" src={Logo_Facebook} style={{ width: '24px'}}/>
								</IconButton>
								<IconButton>
									<img alt="twitter" src={Logo_Twitter} style={{ width: '24px'}}/>
								</IconButton>
								<IconButton>
									<img alt="instagram" src={Logo_Instagram} style={{ width: '24px'}}/>
								</IconButton>
						</Grid>
					</Grid>
				</div>
			</Container>
        </div>
    )
}