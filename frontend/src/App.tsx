import React from 'react'

//*Authentification
import { AuthContext } from "./services/AuthContextProvider";

//* Data
import * as Props from './components/DataPanel/dataProps.tsx';

//* React Router
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'

//* Components
import Header from './components/Header.tsx';
import Navbar from './components/Navbar.tsx';
import MeetingPage from './components/MeetingPage.tsx';
import ErrorPage from './components/ErrorPage.tsx';
// import DatabaseForm from './components/DatabaseForm.tsx';
import DataPanel from './components/DataPanel/DataPanel.tsx';

//* Styles - UI
import { CircularProgress } from '@mui/material';
import './App.css'


function App() {
  const user = React.useContext(AuthContext);
  const location = useLocation()

  const managePanel =
    user.isAdmin ?
      <div className='main-panel'>
        {/* <DatabaseForm /> */}
        <Outlet />
      </div> :
      <Navigate to='/' replace={true} />


  return (
    <>
      {!user.isAuthenticated && <span style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex:'9999=d' }}><CircularProgress size={'12rem'} thickness={2.5} /></span>}
      {JSON.stringify(location).search('error') == -1 &&
        <>
          <Header />
          {user.isAdmin && <Navbar />}
        </>
      }

      < Routes >
        <Route path='/' element={
          <div className={user.isAdmin ? 'main-panel' : 'main-panel no-nav'} >
            <MeetingPage />
          </div>
        } />
        <Route path='manage' element={managePanel}  >
          <Route path='buildings' element={<DataPanel key={'buildings'} {...Props.building} />}></Route>
          <Route path='rooms' element={<DataPanel key={'rooms'} {...Props.room} />}></Route>
          <Route path='peripherals' element={<DataPanel key={'peripherals'} {...Props.peripheral} />}></Route>
        </Route >
        <Route path='error' element={<ErrorPage />} />
      </Routes >
    </>
  )
}


export default App