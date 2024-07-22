import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Home from './pages/Home'
import RecoverPassword from './pages/RecoverPassword'
// import Cameras from './pages/Cameras'
import Stadistics from './pages/Stadistics'
import Settings from './pages/Settings'
import VideoStream from './components/VideoStream'



function App() {

  return (
    
    <BrowserRouter>
      <Routes> 
        <Route path='/' element={ <About/>} />
        <Route path='/login' element={ <Login />} />
        <Route path='/RecoverPassword' element={ <RecoverPassword />} />
        <Route path='/home' element={ <Home />} />
        <Route path='/cameras' element={ <VideoStream />} />
        <Route path='/stadistics' element={ <Stadistics />} />
        <Route path='/settings' element={ <Settings />} />
        <Route path='*' element={ <NotFound />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
