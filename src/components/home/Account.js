import React, { Component } from 'react';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Commerce from './Commerce';
import Footer from '../Footer';
import Profile from '../profile/Profile'

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: Parse.User.current(),
            commerceList: [],
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
        const queryCommerce   = new Parse.Query(ParseCommerce);
        queryCommerce.equalTo( "owner", this.state.currentUser);
        queryCommerce.find()
            .then(response => {
                let newCommerce = [];
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


                    newCommerce.push({
                        "id": el.id,
                        "name": el.get("nomCommerce"),
                        "status": _status,
                        "description": el.get("description"),
                        "nbPartage": el.get("nombrePartages")
                    });
                })
                this.setState(({
                    commerceList: newCommerce
                }))
                console.log(this.state.commerceList);
            })
            .catch(error => {
                console.log(error);
            });

    }

    componentDidMount() {
        this.getAllCommerces();
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
                key={index}
                showDetails={this.onShowDetails.bind(this, el)}
            />
        })

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
                <Footer/>
            </div>
        );
        
        
    }

}

export default Account;