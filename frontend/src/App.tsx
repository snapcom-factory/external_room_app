import './styles/App.css'
import * as api from './api/api'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import Form from './components/Forms/Form.tsx';
import MeetingForm from './components/Forms/MeetingForm.tsx';
// import DatabaseForm from './components/DatabaseForm.tsx';
import DataPanel from './components/DataPanel/DataPanel.tsx';
import { buildingProps, periphProps, roomProps } from './constants/dataProps.tsx';
import { Routes, Route, Outlet } from 'react-router-dom'


function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path='/create-meeting' element={
          <div className='main-panel'>
            <div className='meeting-page'>
              <Form formTitle='Créer votre Réunion :' submitTitle={'Créer'} apiAction={api.createMeeting}>
                <MeetingForm />
              </Form>
            </div>
          </div>}
        />
        <Route path='/manage' element={
          <div className='main-panel'>
            {/* <DatabaseForm /> */}
            <Outlet />
          </div>
        }>
          <Route path='buildings' element={<DataPanel key={'buildings'} {...buildingProps} />}></Route>
          <Route path='rooms' element={<DataPanel key={'rooms'} {...roomProps} />}></Route>
          <Route path='peripherals' element={<DataPanel key={'peripherals'} {...periphProps} />}></Route>
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App