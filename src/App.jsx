import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import { loginSuccess } from './reducers/authReducer';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    if (token && rememberMe) {
      const firstName = localStorage.getItem("firstName");
      const lastName = localStorage.getItem("lastName");
      dispatch(loginSuccess({ firstName, lastName }));
    }
  }, [dispatch]);

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={isAuthenticated ? <Navigate to="/user" /> : <SignIn />} />
          <Route path="/user" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;