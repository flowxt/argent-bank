import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../actions/userActions";
import Account from "../components/Account";

const UserDashboard = () => {
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateUserProfile({ firstName: newFirstName, lastName: newLastName }));
    setIsEditing(false);
  };

  return (
    <main className='main bg-dark'>
      <div className='header'>
        <h1>Welcome back <br />{firstName} {lastName}!</h1>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <input
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <button className='edit-button' onClick={() => setIsEditing(true)}>Edit Name</button>
        )}
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