import React from 'react';
import { } from 'react-router-dom';
import fakeImg from '../../assets/images/pub_example.png';


function Commerce() {

    return (
        <div>
            <h2>Nom du commerce</h2>
            <h5>Etat payé/non payé</h5>
            <div>
                <img src={fakeImg} alt="..." style={{ width: 200 }} />
            </div>
            <p>Some text...</p>
            <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
            <br/>
        </div>
    )
}

export default Commerce;