import React from 'react';
import app_store from '../assets/images/App_Store_Badge.eps';
import google_play from '../assets/images/google-play-badge.eps';
import img_promo from '../assets/images/pub_example.png';

class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>On aime, on partage!</h1>
                <p className="text-secondary">Gerer vos commerces avec weeclik</p>
                <form>
                    <div className="form-group">
                        <input type="email" class="form-control border-0 bg-light" id="exampleInputEmail1" placeholder="Adresse e-mail" style={{ width : '300px' }}/>
                    </div>
                    <div className="form-group">
                        <input type="password" class="form-control border-0 bg-light" id="exampleInputPassword1" placeholder="Mot de passe" style={{ width : '300px' }}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary rounded mr-2">Se connecter</button>
                        <a className="btn btn-outline-primary rounded" href="#" role="button">Rejoindre weeclik</a>
                    </div>
                            
                    <div className="form-group">
                        <a href="#">Mot de passe oublié?</a>
                    </div>
                </form>
                <a className="navbar-brand" href="#">
                    <img src={app_store} alt="logo" />
                </a>
                <a className="navbar-brand" href="https://play.google.com/store/apps/details?id=cantum.weeclik&hl=fr">
                    <img src={google_play} alt="logo" />
                </a>
            </div>
        )
    }
}

export default Login;