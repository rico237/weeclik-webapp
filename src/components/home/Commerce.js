import React from 'react';
import { } from 'react-router-dom';
import fakeImg from '../../assets/images/pub_example.png';
import { Typography, Card, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';



const useStyles = makeStyles(theme => ({
    root2: {
        padding: theme.spacing(3, 2),
    },
    divContainer: {
        margin: theme.spacing(1),
    },
    divInfo: {
        margin: theme.spacing(1),
    },
    divInfo2: {
        margin: theme.spacing(1),
        marginLeft: 'auto',
    },
    card: {
        // maxWidth: 345,
        margin: theme.spacing(1),
    },
    media: {
        height: 140,
    }
}));

function Commerce(props) {

    const classes = useStyles();

    return (
        <div className={classes.divContainer}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={fakeImg}
                    title="Image par defaut du commerce"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">Nom du commerce{props.name}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Short description du commerce{props.name}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <div className={classes.divInfo}>11 <FavoriteIcon/></div>
                    <div className={classes.divInfo}>16 <ShareIcon/></div>
                    <div className={classes.divInfo2}>
                        <Button size="small" color="primary">Plus de détail</Button>
                    </div>
                </CardActions>
            </Card>
            {/* <Paper className={classes.root2}>
                <h2>{props.name}</h2>
                <h5>Etat payé/non payé</h5>
                <div>
                    <img src={fakeImg} alt="..." style={{ width: 200 }} />
                </div>
                <p>Some text...</p>
                <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                <br/>
            </Paper> */}
        </div>
    )
}

export default Commerce;