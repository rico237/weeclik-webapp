import React, { Component } from 'react';
import { } from 'react-router-dom';
import NavBar from './NavBar';
import Commerce from './Commerce';
import Footer from './Footer';

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        const fakeImg = {
            height: "200px",
            background: "#aaa"
        }


        return (
            <div>
                <NavBar/>
                <div className="container" style={{marginTop: "30px"}}>
                    <div className="row">
                        <div className="col-sm-4">
                            <h2>About Me</h2>
                            <h5>Photo of me:</h5>
                            <div className={fakeImg}> Fake Image </div>
                            <p>Some text about me in culpa qui officia deserunt mollit anim...</p>
                            <h3>Some Links</h3>
                            <p>Lorem ipsum dolor sit ame.</p>
                            <ul className="nav nav-pills flex-column">
                                <li className="nav-item"><a className="nav-link">Telephone</a></li>
                                <li className="nav-item"><a className="nav-link">Telephone</a></li>
                                <li className="nav-item"><a className="nav-link">Telephone</a></li>
                                <li className="nav-item"><a className="nav-link">Telephone</a></li>
                            </ul>
                            <hr className="d-sm-none"></hr>
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