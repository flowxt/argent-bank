import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';
import logo from '../assets/images/argentBankLogo.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const firstName = useSelector((state) => state.auth.firstName);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className='main-nav'>
      <Link className='main-nav-logo' to='/'>
        <img className='main-nav-logo-image' src={logo} alt='Argent Bank Logo'/>
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <Link className='main-nav-item' to="/user">
              <i className="fa fa-user-circle"></i> {firstName}
            </Link>
            <button className='main-nav-item' onClick={handleLogout}>
              <i className="fa fa-sign-out"></i> Sign Out
            </button>
          </>
        ) : (
          <Link className='main-nav-item' to="/sign-in">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;