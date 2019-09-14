import React, { Component } from 'react';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Commerce from './Commerce';
import Footer from './Footer';
import Profile from '../profile/Profile'

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: Parse.User.current(),
            commerceList: []
        };
    }

    getAllCommerces() {
        console.log("-- GETTING ALL COMMERCES --");
        
    }

    render() {

        if (!this.state.currentUser) {
            return (
                <Redirect to="/" />
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
                            <Commerce/>
                            <Commerce/>
                            <Commerce/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
        
        
    }

}

export default Account;