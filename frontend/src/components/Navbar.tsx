import './styles/Navbar.css'
import { NavLink } from 'react-router-dom'


export default function Navbar() {
    return (
        <nav className='navBar'>
            <h4 className='noselect'>Utilisateur</h4>
            <NavLink to='/create-meeting'> Créer une réunion</NavLink>
            {/* <span/> */}
            <h4 className='noselect' style={{ marginTop: '2rem' }}>Administrateur</h4>
            <NavLink to='/manage/buildings'> Emplacements</NavLink>
            <NavLink to='/manage/rooms'> Salles </NavLink>
            <NavLink to='/manage/periphs'> Périphériques </NavLink>
        </nav>

        // <></>
    )
}  