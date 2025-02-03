import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import UserDashboard from './pages/UserDashboard';
import TransactionsPage from './pages/TransactionsPage';
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
      axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(response => {
        const { firstName, lastName } = response.data.body;
        dispatch(loginSuccess({ firstName, lastName, token }));
      }).catch(error => {
        console.error("Failed to fetch user profile:", error);
      });
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
          <Route path="/transactions/:accountId" element={<PrivateRoute><TransactionsPage /></PrivateRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;