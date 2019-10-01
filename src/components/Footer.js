import React, { Component } from 'react';
import { } from 'react-router-dom';
import LoadApp from './external_link/LoadApp';
import { Typography, Link, Container, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';


const stylesFooter = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        width: '100%', 
        padding: theme.spacing(2),
        marginTop: 'auto',
        backgroundColor: 'white',
    },
});


const greyColor = grey[900];
const whiteColor = grey[50];


class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        const { classes } = this.props;

        return (
            <footer className={classes.footer} style={{ backgroundColor: greyColor, color: whiteColor }}>
                <Container component="main" className={classes.main}>
                    <div className="">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h5" component="h3">Weeclik</Typography>
                                <div style={{ marginLeft: "-15px" }}>
                                    <LoadApp/>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography variant="h5" component="h3">À propos de Weeclik</Typography>
                                <p>Chez Weeclik, nous sommes pionniers dans le partage de confiance.
                        	<br/>Avec notre app, adoptez vous aussi le réflexe de partage avec vos commerçants !</p>
                            </Grid>
                        </Grid>
                    </div>          
                    <Typography variant="body2" align="center" style={{ marginTop: "50px" }}>
                        {'Copyrigth © '}
                        <Link color="inherit" href="#">Weeclik</Link>
                        {' 2019.'}
                    </Typography>
                    
                </Container>
            </footer>
        )
    }
}

export default withStyles(stylesFooter) (Footer);