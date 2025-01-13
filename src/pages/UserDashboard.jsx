import React from 'react';
import { useSelector } from 'react-redux';
import Account from '../components/Account';

const UserDashboard = () => {
  const userName = useSelector((state) => state.auth.userName);

  return (
    <main className='main bg-dark'>
      <div className='header'>
        <h1>Welcome back <br />{userName}!</h1>
        <button className='edit-button'>Edit Name</button>    
      </div>
      <section>
        <Account 
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </section>
    </main>
  );
};

export default UserDashboard;