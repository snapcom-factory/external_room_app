import Header from '../components/Header.tsx';
import Navbar from '../components/Navbar.tsx';
import { Outlet } from 'react-router-dom';

export default function HomePage() {
    return (
        <>
            <Header />
            <Navbar />
            <Outlet />
        </>
    )
}
