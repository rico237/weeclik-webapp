import React, { Component } from 'react';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Commerce from './Commerce';
import Footer from '../Footer';
import Profile from '../profile/Profile'
import { Carousel } from 'react-bootstrap'

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: Parse.User.current(),
            commerceList: [],
            cccc: [],
            isSelect: false,
            id: ''
        };
    }

    onShowDetails(elt) {
        this.setState(state => ({
            id: elt.id,
            isSelect: !state.isSelect
        }));
    }

    getAllCommerces() {
        const ParseCommerce = Parse.Object.extend("Commerce");
        const queryCommerce = new Parse.Query(ParseCommerce);

        const ParseCommercePhoto = Parse.Object.extend("Commerce_Photos");
        const queryCommercePhoto = new Parse.Query(ParseCommercePhoto);
        
        queryCommerce.equalTo("owner", this.state.currentUser);

        let newCommerces = [];
        let commercePicture = [];

        // console.log("vvvvvvv" + JSON.stringify(queryCommerce, null, 2));
        queryCommerce.find()
            .then(response => {
                response.forEach((el) => {

                    var _status;

                    switch (el.get("statutCommerce")) {
                        case 0:
                            _status = "Hors ligne - en attente de paiement"
                            break;
                        case 1:
                            _status = "En ligne"
                            break;
                        case 2:
                            _status = "Hors ligne - paiement annulé"
                            break;
                        case 3:
                            _status = "Erreur lors du paiement ou du renouvellement"
                            break;
                        case 4:
                            _status = ""
                            break;
                    
                        default:
                            _status = "Statut inconnu"
                            break;
                    }

                    queryCommercePhoto.equalTo("commerce", new ParseCommerce({id: el.id}));

                    var promise1 = new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(
                                queryCommercePhoto.find()
                                    .then(response2 => {
                                        response2.forEach((elt) => {
                                            commercePicture.push(elt.get("photo").url());
                                        });
                                        console.log(commercePicture);
                                        // promise1.then((value) => {
                                            // console.log("-------------------" + value);
                                        // })
                                        return commercePicture;
                                    })
                            );
                        }, 300);
                    });

                    // queryCommercePhoto.find()
                    //     .then(response2 => {
                    //         response2.forEach((elt) => {
                    //             commercePicture.push(elt.get("photo").url());
                    //         });
                    //         console.log(commercePicture);
                    //         promise1.then((value) => {
                    //             console.log("-------------------" + value);
                    //         })
                    //     });


                    let obj = {slidePicture: []}

                    promise1.then((value) => {
                        obj["slidePicture"] = value
                        this.setState({
                            // commerceList: value //newCommerces
                            // listPicture: value
                            
                        });
                        // // var myString = value;
                        // // var myArray = myString.split(',');
                        // commercePicture = value.split(',');
                        console.log("-------_____--------" + commercePicture[0]);
                        console.log("-------_____-----___--" + JSON.stringify(obj.slidePicture, null, 2));
                        this.setState({
                            cccc: obj.slidePicture
                        })
                    })

                    console.log("----uuuu-_____-----___--" + obj.slidePicture);

                    console.log(('coucou, adu, az').split(','));

                    newCommerces.push({
                        "id": el.id,
                        "name": el.get("nomCommerce"),
                        "status": _status,
                        "description": el.get("description"),
                        "nbPartage": el.get("nombrePartages")
                        // "listImage": promise1
                    });//(commercePicture + " -- " + promise1)


                    console.log("++++++++++++++++++" + this.state.cccc);
                    
                });
                console.log("Liste des commerces"+JSON.stringify(newCommerces, null, 2));
                // this.setState({commerceList: newCommerces}, () => {
                //     this.callAsync().catch(e => {

                //     })
                // });
                this.setState({
                        commerceList: newCommerces,
                        // cccc: obj.slidePicture
                    });
                console.log(this.state.commerceList);
            })
            .catch(error => {
                console.log(error);
            });

    }

    componentDidMount() {
        console.log("===="+this.getAllCommerces());
        // setInterval(
        //     this.getAllCommerces(),
        //     1000
        // );
    }

    renderImage(imageUrl) {
        console.log('rrrrrr');
        
        return (
            <img
                    className="d-block w-100"
                    style={{ height: 200, backgroundColor: "#F00", objectFit: "cover" }}
                    src={imageUrl}
                    alt="First slide"
                />
            // <Carousel.Item>
            //     <img
            //         className="d-block w-100"
            //         style={{ height: 200, backgroundColor: "#F00", objectFit: "cover" }}
            //         src={imageUrl}
            //         alt="First slide"
            //     />
            //         <Carousel.Caption>
            //             <h3>First slide label</h3>
            //             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            //         </Carousel.Caption>
            // </Carousel.Item>
        )
    }

    render() {

        if (!this.state.currentUser) {
            return (
                <Redirect to="/" />
            )
        }

        

        let listCommerce = this.state.commerceList.map((el, index) => {
            return <Commerce
                id={el.id}
                name={el.name}
                status={el.status}
                description={el.description}
                nbPartage={el.nbPartage}
                images={el.listImage}
                key={index}
                showDetails={this.onShowDetails.bind(this, el)}
            />
        })
        console.log("$$$$$"+JSON.stringify(this.state.commerceList, null, 2));

        if (this.state.isSelect) {
            return (
                <Redirect to={{
                    pathname: '/aboutcommerce',
                    state: { id: this.state.id }
                }} />
            )
        }


        return (
            <div>
                <NavBar/>
                <div className="container" style={{marginTop: "30px"}}>
                    <div className="row">
                        <div className="col-sm-4">
                            <Profile/>
                            {/* <p>{this.state.currentUser}</p> */}
                        </div>
                        <div className="col-sm-8">
                            {listCommerce}
                        </div>
                    </div>
                </div>
                <div style={{ width: '100%', marginTop: '100px', bottom: 0 }}>
                <Footer/>
                </div>
            </div>
        );
        
        
    }

}

export default Account;