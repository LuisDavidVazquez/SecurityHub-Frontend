import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Home from './pages/Home';
import RecoverPassword from './pages/RecoverPassword';
import Cameras from './pages/Cameras';
import Stadistics from './pages/Stadistics';
import Settings from './pages/Settings';



// Componente de rutas protegidas
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <About /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/RecoverPassword' element={ <RecoverPassword /> } />
        <Route path='/home' element={ <ProtectedRoute element={<Home />} /> } />
        <Route path='/cameras' element={ <ProtectedRoute element={<Cameras />} /> } />
        <Route path='/stadistics' element={ <ProtectedRoute element={<Stadistics />} /> } />
        <Route path='/settings' element={ <ProtectedRoute element={<Settings />} /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
