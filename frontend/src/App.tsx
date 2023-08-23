import React from 'react'

//*Authentification
import { AuthContext } from "./services/AuthContextProvider";

//* Data
import * as Props from './components/DataPanel/dataProps.tsx';

//* React Router
import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom'

//* Components
import Header from './components/Header.tsx';
import Navbar from './components/Navbar.tsx';
import MeetingPage from './components/MeetingPage.tsx';
// import DatabaseForm from './components/DatabaseForm.tsx';
import DataPanel from './components/DataPanel/DataPanel.tsx';

//* Styles - UI
import { CircularProgress } from '@mui/material';
import './App.css'
import { Button } from '@mantine/core';


function App() {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  const managePanel =
    auth.isAdmin ?
      <div className='main-panel'>
        {/* <DatabaseForm /> */}
        <Outlet />
      </div> :
      <Navigate to='/' replace={true} />


  return (
    <>
      <Header />
      {!auth.isAuthenticated ?
        <div
          style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', zIndex: '9999=d' }}>
          {!auth.error ?
            <>
              <CircularProgress size={'12rem'} thickness={2.5} />
              <h4>Reaching for keycloak server ...</h4>
            </> : auth.error}
        </div> :
        <>
          {auth.isAdmin && <Navbar />}
          <Routes>
            <Route path='/' element={
              <div className={auth.isAdmin ? 'main-panel' : 'main-panel no-nav'} >
                <MeetingPage />
              </div>
            } />
            <Route path='manage' element={auth.isAdmin ? managePanel :
              <div className='main-panel no-nav'>
                <h2>On dirait que vous n'êtes pas au bon endroit ...</h2>
                <br />
                <Button onClick={() => navigate("/")}>Retour</Button>
              </div>
            } >
              <Route path='buildings' element={<DataPanel key={'buildings'} {...Props.building} />}></Route>
              <Route path='rooms' element={<DataPanel key={'rooms'} {...Props.room} />}></Route>
              <Route path='peripherals' element={<DataPanel key={'peripherals'} {...Props.peripheral} />}></Route>
            </Route>
          </Routes>
        </>
      }
    </>
  )
}


export default App