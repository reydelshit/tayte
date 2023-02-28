import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Dashboard from './components/Dashboard'

import Login from "./components/Login"
import SignUp from './components/SignUp'

import Home from './components/dashboard/Home'
import Notes from "./components/dashboard/pages/Notes"
import Tasks from "./components/dashboard/pages/Tasks"

import { MainContext } from './components/context/MainContext'

import useLogin from './components/hooks/useLogin'
import useCrud from './components/hooks/useCrud'
import useUserDetails from './components/hooks/useUserDetails'

function App() {

  const {signInWithGoogle, signIn, setEmail, setPassword} = useLogin();
  const {storeFilteredData, setStoreFilteredData} = useUserDetails();
  const { getNotes } = useCrud()

  const [showAddModal, setShowAddModal] = useState(false)


  return (
    <MainContext.Provider value={{signInWithGoogle, signIn, setEmail, setPassword, storeFilteredData, setStoreFilteredData, showAddModal, setShowAddModal, getNotes}}>
      <div className='main__container'>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/dashboard/signup/:id' element={<SignUp />}/>
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='/dashboard' element={<Home />}/>
            <Route path='/dashboard/notes' element={<Notes />}/>
            <Route path='/dashboard/tasks' element={<Tasks />}/>
          </Route>
        </Routes>
      </div>
    </MainContext.Provider>

  )
}

export default App
