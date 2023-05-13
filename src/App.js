import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
          <Route path="/update-password" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}></Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>


  );
}

export default App;
