import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoadApp from './external_link/LoadApp';
import img_promo from '../assets/images/pub_example.png';

class Register extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md" style={{ backgroundColor : '#FFF' }}>
                        <div>
                            <h1>On aime, on partage!</h1>
                            <p className="text-secondary">Gerer vos commerces avec weeclik</p>
                            <form onSubmit={this.loginAccount}>
                                <div className="form-group">
                                    <input
                                        // value={username}
                                        // onChange={this.handleChangeUser.bind(this)}

                                        type="text"
                                        className="form-control border-0 bg-light"
                                        id="exampleInputUsername1"
                                        placeholder="Nom"
                                        style={{ width : '300px' }}/>
                                </div>
                                <div className="form-group">
                                    <input
                                        // value={username}
                                        // onChange={this.handleChangeUser.bind(this)}

                                        type="email"
                                        className="form-control border-0 bg-light"
                                        id="exampleInputEmail1"
                                        placeholder="Adresse e-mail"
                                        style={{ width : '300px' }}/>
                                </div>
                                <div className="form-group">
                                    <input
                                        // value={password}
                                        // onChange={this.handleChangePass.bind(this)}

                                        type="password"
                                        className="form-control border-0 bg-light"
                                        id="exampleInputPassword1"
                                        placeholder="Mot de passe"
                                        style={{ width : '300px' }}/>
                                </div>
                                <div className="form-group">
                                    <input
                                        // value={password}
                                        // onChange={this.handleChangePass.bind(this)}

                                        type="password"
                                        className="form-control border-0 bg-light"
                                        id="exampleInputPassword2"
                                        placeholder="Confirmer Mot de passe"
                                        style={{ width : '300px' }}/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary rounded mr-2">Rejoindre weeclik</button>
                                </div>
                                        
                                <div className="form-group">
                                    <Link className="nav-link" to="/">Déjà Membre Weeclik?</Link>
                                </div>
                            </form>
                            <LoadApp/>
                        </div>
                    </div>
            
                    <div className="col-12 col-md" style={{ backgroundColor : '#FFF' }}>
                        <img src={img_promo} className="rounded mx-auto d-block" alt="..." style={{ width : '600px'}}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;