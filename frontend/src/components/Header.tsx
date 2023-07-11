import '../styles/Header.css'
import logo from '../assets/marianne.svg'
import { Button } from "@openfun/cunningham-react";

export default function Header() {
    return (
        <header className='globalHeader'>
            <img className='marianne' src={logo} alt="[Logo Finances puliques]" />
            <h1 className='siteTitle noselect'>OBTP Plug-in</h1>
            <div className="mainHeaderActions">
                <p>'username'</p>
                <Button color="secondary" className='logX-btn' id='logout-btn'>Log-out</Button>
            </div>
        </header>
    )
}