import React, { Component } from 'react';
import Parse from 'parse';
import { } from 'react-router-dom';
import { Typography, Card, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { Carousel } from 'react-bootstrap'
import { withStyles } from '@material-ui/core/styles';

import grey from '@material-ui/core/colors/grey';


const useStyles = theme => ({
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
        height: 200,
        backgroundColor: "#000000",
    },
    bulletCommerce: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(1)',
    },
});

class Commerce extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listImg: []
        }
    }

    getPictureSlideByCommerce = () => {
        let commercePicture = [];

        const ParseCommerce = Parse.Object.extend("Commerce");

        const ParseCommercePhoto = Parse.Object.extend("Commerce_Photos");
        const queryCommercePhoto = new Parse.Query(ParseCommercePhoto);

        queryCommercePhoto.equalTo("commerce", new ParseCommerce({id: this.props.id}));

        queryCommercePhoto.find()
        .then(responseSnapshot => {
            responseSnapshot.forEach((elt) => {
                commercePicture.push(elt.get("photo").url());
            });
        });
        
        return new Promise(resolve => {
            setTimeout(() => resolve(commercePicture), 300)
        });
    }

    updateUrl = async () => {
        const listPicture = await this.getPictureSlideByCommerce();
        this.setState({
            listImg : listPicture
        })
    }

    // test2 = async () => {
    //     return Promise.resolve('test me------->');
    // }



    componentDidMount() {
        this.updateUrl();
        // this.test2().then((ttt) => console.log(ttt));
    }




    render() {
        const { classes } = this.props;

        let listSlidePicture = this.state.listImg.map((url, index) => {
            return <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            style={{ height: 200, backgroundColor: grey[300], objectFit: "cover" }}
                            src={url}
                            alt="Second slide"
                        />
                        {/* <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
        });

        return (
            <div className={classes.divContainer}>
            
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        // image={fakeImg}
                        title="Image par defaut du commerce"
                    >
                        <Carousel /* showArrows={true} */className={classes.media}>
                            {listSlidePicture}
                        </Carousel>
                    </CardMedia>
                    <CardContent style={{ color: grey[900] }}>
                        <Typography gutterBottom variant="h5" component="h2" style={{ color: grey[900] }}>{this.props.name}</Typography>
                        <Typography gutterBottom variant="h6" component="h2" style={{ color: grey[900] }}>{this.props.status}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">{this.props.description}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">{this.props.images}</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <div className={classes.divInfo}>{this.props.nbPartage} <FavoriteIcon/></div>
                        <div className={classes.divInfo2}>
                            <Button size="small" color="primary" onClick={() => this.props.showDetails(this.props.id)}>Plus de détail</Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withStyles(useStyles) (Commerce);