import React from 'react';
import Parse from 'parse';

class CommercePicture extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commerceId: this.props.commerceId,
            commerceName: this.props.commerceName,
            commerceNbShare: this.props.commerceNbShare,
            commerceCategory: this.props.commerceCategory,
            listImg: [],
        }
    }

    //#region LOAD_IMAGES_AND_VIDEO
    getPicturesCommerce = () => {
        let commercePicture = [];

        const ParseCommerce = Parse.Object.extend("Commerce");

        const ParseCommercePhoto = Parse.Object.extend("Commerce_Photos");
        const queryCommercePhoto = new Parse.Query(ParseCommercePhoto);

        queryCommercePhoto.equalTo("commerce", new ParseCommerce({id: this.state.commerceId}));

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

    getUrlCommercePicture = async () => {
        const listPicture = await this.getPicturesCommerce();
        // console.log(`>>>-------> ${listPicture}`);
        this.setState({
            listImg : listPicture
        })
    }
    //#endregion


    componentDidMount() {
        // setInterval(() => {
            this.getUrlCommercePicture();
        // }, 1000);
    }


    render() {
        return (
            <div>
                {
                    this.state.listImg.length > 0 ?
                    (<img style={{width: '100%', height: 128, objectFit: 'cover'}} src={this.state.listImg[0]} alt={this.props.title} />) :
                    (<img style={{width: '100%', height: 128, objectFit: 'cover'}} src={this.props.imgCategory} alt={this.props.title} />)
                }
            </div>
        )
    }
}

export default CommercePicture;