import React, { Component } from 'react';
import Parse from 'parse';
import { } from 'react-router-dom';
import { Typography, Card, CardMedia, GridListTileBar, GridListTile, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';

// import { Carousel } from 'react-bootstrap'
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

    componentDidMount() {
        this.updateUrl();
    }

    render() {
        const { classes } = this.props;
        console.log("---------------- "+this.props.name);
        

        return (
            <div>
                <GridListTile key={"tile.img"} cols={2}>
                    <img src={"tile.img"} alt={this.props.name} style={{width: "100px"}} />
                    <GridListTileBar
                        title={this.props.name}
                        subtitle={<span>by: {"this.props.author"}</span>}
                        actionIcon={
                            <IconButton aria-label={`info about ${"tile.title"}`}>
                                <InfoIcon />
                            </IconButton>
                        }
                    />
                </GridListTile>
            </div>
        );
    }

}

export default withStyles(useStyles) (Commerce);