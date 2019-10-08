import React, { Component } from 'react';
import { } from 'react-router-dom';
import NavBar from './NavBar';
import Commerce from './Commerce';
import Footer from './Footer';
import Profile from '../profile/Pofile'

class DetailsCommerce extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        
        return (
            <div>
                <NavBar/>
                <div className="container" style={{marginTop: "30px"}}>
                    <div className="row">
                        <div className="col-sm-4">
                            <Profile/>
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

export default DetailsCommerce;