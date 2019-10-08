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
        const queryCommerce = new Parse.Query(ParseCommerce);

        queryCommerce.equalTo("owner", this.state.currentUser);

        let newCommerces = [];

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

                    newCommerces.push({
                        "id": el.id,
                        "name": el.get("nomCommerce"),
                        "status": _status,
                        "description": el.get("description"),
                        "nbPartage": el.get("nombrePartages")
                    });
                    
                });
                
                this.setState({
                    commerceList: newCommerces,
                });
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
                <div className="container">
                <Profile/>
                {listCommerce}
                    {/* <div className="row" style={{ paddingTop: "90px", marginBottom: 20, backgroundColor: "#0F0" }}>
                        <div className="col-sm-4" style={{ marginBottom: 20, backgroundColor: "#00F" }}>
                            <Profile/>
                        </div>
                        <div className="col-sm-8">
                            {listCommerce}
                        </div>
                    </div> */}
                </div>
                <div style={{ width: '100%', marginTop: '100px', bottom: 0 }}>
                    <Footer/>
                </div>
            </div>
        );
        
        
    }

}

export default Account;