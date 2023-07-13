import React from 'react'

//*Authentification
import { AuthContext } from "./services/AuthContextProvider";

//* Data
import { buildingProps, periphProps, roomProps } from './constants/dataProps.tsx';

//* React Router
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

//* Components
import Header from './components/Header.tsx';
import Navbar from './components/Navbar.tsx';
import MeetingPage from './components/MeetingPage.tsx';
// import DatabaseForm from './components/DatabaseForm.tsx';
import DataPanel from './components/DataPanel/DataPanel.tsx';

//* Styles - UI
import { CircularProgress } from '@mui/material';
import './App.css'


function App() {
  const user = React.useContext(AuthContext);

  if (!user.isAuthenticated) {
    return <span style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress size={'12rem'} thickness={2.5} /></span>
  }
  else {
    return (
      <>
        <Header />
        {user.isAdmin && <Navbar />}

        <Routes>
          <Route path='/' element={
            <div className={user.isAdmin ? 'main-panel' : 'main-panel no-nav'} >
              <MeetingPage />
            </div>
          } />
          <Route path='/manage' element={user.isAdmin ?
            <div className='main-panel'>
              {/* <DatabaseForm /> */}
              <Outlet />
            </div> :
            <Navigate to='/' replace={true} />
          } >
            <Route path='buildings' element={<DataPanel key={'buildings'} {...buildingProps} />}></Route>
            <Route path='rooms' element={<DataPanel key={'rooms'} {...roomProps} />}></Route>
            <Route path='peripherals' element={<DataPanel key={'peripherals'} {...periphProps} />}></Route>
          </Route>
        </Routes >
      </>
    )
  }
}

export default App