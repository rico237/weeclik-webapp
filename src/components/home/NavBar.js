import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <Link className="navbar-brand" to="/home">Weeclick Partenaire</Link>
        </nav>
    )
}

export default NavBar;