import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'

import Login from "./components/Login"
import SignUp from './components/SignUp'

function App() {

  return (
    <div className='main__container'>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/dashboard' element={<Dashboard />}/>

      </Routes>
    </div>
  )
}

export default App
