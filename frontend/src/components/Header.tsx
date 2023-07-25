import React from 'react'
import './Header.css'
import logo from '../../public/assets/marianne.svg'
import { Button } from "@openfun/cunningham-react";
import { AuthContext } from '../services/AuthContextProvider';


export default function Header() {
    const authContext = React.useContext(AuthContext);

    return (
        <header className='globalHeader'>
            <img className='marianne' src={logo} alt="[Logo Finances puliques]" />
            <h1 className='siteTitle noselect'>OBTP Plug-in</h1>
            <div className="mainHeaderActions">
                <p>{authContext.username}</p>
                <Button color='secondary' id='logout-btn' onClick={authContext.logout}>Log-out</Button>
            </div>
        </header>
    )
}