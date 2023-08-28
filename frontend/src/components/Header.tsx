import React from 'react'
import './Header.css'
import { Button } from "@openfun/cunningham-react";
import { AuthContext } from '../services/AuthContextProvider';
import logo from "/assets/marianne.svg"
import { Link } from 'react-router-dom';

export default function Header() {
    const authContext = React.useContext(AuthContext);

    return (
        <header className='globalHeader'>
            <img className='marianne' src={logo} alt="[Marianne]" />
            <Link to={"/"}><h1 className='siteTitle noselect'>OBTP Plug-in</h1></Link>
            <div className="mainHeaderActions">
                <p>{authContext.username}</p>
                <Button color='secondary' id='logout-btn' onClick={authContext.logout}>Log-out</Button>
            </div>
        </header>
    )
}