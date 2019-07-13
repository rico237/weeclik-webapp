import React from 'react';
import app_store from '../../assets/images/App_Store_Badge.svg';
import google_play from '../../assets/images/google-play-badge.svg';

function LoadApp() {
    return (
        <div>
            <a className="navbar-brand" href="https://apps.apple.com/nl/app/weeclik/id1082731862?l=en">
                <img src={app_store} alt="logo" />
            </a>
            <a className="navbar-brand" href="https://play.google.com/store/apps/details?id=cantum.weeclik&hl=fr">
                <img src={google_play} alt="logo" />
            </a>
        </div>
    )
}

export default LoadApp;