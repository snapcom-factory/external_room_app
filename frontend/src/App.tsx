import './App.css'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import CreateMeeting from './components/CreateMeeting.tsx';
import DatabaseForm from './components/DatabaseForm.tsx';
import DataPanel from './components/DataPanel.tsx';
import { buildingProps, periphProps, roomProps } from './constants/dataProps.tsx';
import { Routes, Route, Outlet } from 'react-router-dom'


function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path='/create-meeting' element={
          <div className='main-panel'>
            <CreateMeeting />
          </div>}
        />
        <Route path='/manage' element={
          <div className='main-panel'>
            {/* <DatabaseForm /> */}
            <Outlet />
          </div>}>
          <Route path='buildings' element={<DataPanel {...buildingProps} />}></Route>
          <Route path='rooms' element={<DataPanel {...roomProps} />}></Route>
          <Route path='periphs' element={<DataPanel {...periphProps} />}></Route>
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App