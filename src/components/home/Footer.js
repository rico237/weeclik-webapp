import React, { Component } from 'react';
import { } from 'react-router-dom';
import { Box, Typography, Link, CssBaseline, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


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

class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        const { classes } = this.props;

        return (
            <footer className={classes.footer}>
                <Container component="main" className={classes.main} maxWidth="sm">            
                    <Typography variant="body2" color="textSecondary" align="center">
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