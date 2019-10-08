import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/images/oops.png'
import { CssBaseline, Container, Typography, Paper, makeStyles } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    }
}))

function NotFoundPage() {

    const classes = useStyles();

    return (
        <Fragment>
            <CssBaseline />
            <Container fixed>
                <Typography component="div" style={{
                    // backgroundColor: '#cfe8fc',
                    height: '100vh',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center" }}>
                    <Paper className={classes.root}>
                        <h1 style={{
                            padding: "50px",
                            color: "white",
                            backgroundImage: `url(${img1})`,
                            fontSize: '9em',
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontFamily: 'sans-serif'
                        }}>Oops!</h1>
                        <center>
                            <h3 style={{ color: blue[900] }}>La page n'existe pas ¯\_(ツ)_/¯</h3>
                            <Link to="/" style={{ color: blue[500] }}>Return to Home Page</Link>
                        </center>
                    </Paper>
                </Typography>
            </Container>
        </Fragment>
    );
}
export default NotFoundPage;