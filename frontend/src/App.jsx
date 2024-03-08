import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';


function App() {
  const {authuser} = useAuthContext();
  return <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authuser?<Home/>:<Navigate to="/login" />}/>
        <Route path='/login' element={authuser?<Navigate to="/" />: <Login/>}/>
        <Route path='/signup' element={authuser?<Navigate to="/" />: <Signup/>}/>
      </Routes>
      <Toaster/>
  </div>;      
}

export default App
