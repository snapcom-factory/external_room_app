import '../styles/Navbar.css'
import { NavLink } from 'react-router-dom'
import { EventRounded, Apartment, MeetingRoomRounded, TvRounded } from '@mui/icons-material/';


export default function Navbar() {
    return (
        <nav className='navBar'>

            <h4 className='noselect'>Utilisateur</h4>
            <NavLink className={'nav-link'} to='/create-meeting'> <EventRounded className='nav-icon' />Réservation</NavLink>

            <h4 className='noselect' id='nav-admin'>Administrateur</h4>
            <NavLink className={'nav-link'} to='/manage/buildings'><Apartment className='nav-icon' />Emplacements</NavLink>
            <NavLink className={'nav-link'} to='/manage/rooms'><MeetingRoomRounded className='nav-icon' />Salles </NavLink>
            <NavLink className={'nav-link'} to='/manage/peripherals'><TvRounded className='nav-icon' />Périphériques </NavLink>

        </nav>

    )
}  