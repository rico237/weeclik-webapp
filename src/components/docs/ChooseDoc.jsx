import React, { Component } from 'react';

import icon from '../../assets/icons/notes.svg';
import { Link } from 'react-router-dom';


class ChooseDoc extends Component {

    render() {

        return (
            <div style={{backgroundColor: "#FFF", paddingTop: "100px", height: '100%'}}>
                <center className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3">
                            <Link to={`/doc/phone/link/cgu`} style={{color: "black", textDecoration: "none"}}>
                                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                                    <div className="card-body p-0">
                                        <div className="p-5">
                                            <img className="card-img-top p-3" src={icon} alt="Icon"/>
                                        </div>
                                        <h6 className="card-title">CGU</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <Link to={`/doc/phone/link/cgv`} style={{color: "black", textDecoration: "none"}}>
                                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                                    <div className="card-body p-0">
                                        <div className="p-5">
                                            <img className="card-img-top p-3" src={icon} alt="Icon"/>
                                        </div>
                                        <h6 className="card-title">CGV</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <Link to={`/doc/phone/link/cgu_cgv`} style={{color: "black", textDecoration: "none"}}>
                                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                                    <div className="card-body p-0">
                                        <div className="p-5">
                                            <img className="card-img-top p-3" src={icon} alt="Icon"/>
                                        </div>
                                        <h6 className="card-title">CGV et CGU applications</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <Link to={`/doc/phone/link/mlam`} style={{color: "black", textDecoration: "none"}}>
                                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                                    <div className="card-body p-0">
                                        <div className="p-5">
                                            <img className="card-img-top p-3" src={icon} alt="Icon"/>
                                        </div>
                                        <h6 className="card-title">Mentions légales applications</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <Link to={`/doc/phone/link/mlsw`} style={{color: "black", textDecoration: "none"}}>
                                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                                    <div className="card-body p-0">
                                        <div className="p-5">
                                            <img className="card-img-top p-3" src={icon} alt="Icon"/>
                                        </div>
                                        <h6 className="card-title">Mentions légales site web</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <Link to={`/doc/phone/link/newcguv`} style={{color: "black", textDecoration: "none"}}>
                                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                                    <div className="card-body p-0">
                                        <div className="p-5">
                                            <img className="card-img-top p-3" src={icon} alt="Icon"/>
                                        </div>
                                        <h6 className="card-title">Nouveau CGUV</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <Link to={`/doc/phone/link/rgpd`} style={{color: "black", textDecoration: "none"}}>
                                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                                    <div className="card-body p-0">
                                        <div className="p-5">
                                            <img className="card-img-top p-3" src={icon} alt="Icon"/>
                                        </div>
                                        <h6 className="card-title">Politique de confidentialité</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </center>
            </div>
        )
    };
}

export default ChooseDoc;