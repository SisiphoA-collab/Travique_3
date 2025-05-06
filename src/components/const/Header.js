import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import '../css/Header.css';

const Header = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="header">
      <div className="header-profile">
        <img src="https://i.pravatar.cc/40" alt="Profile" className="profile-icon" />
        <span>{userEmail ? userEmail : 'Guest'}</span>
      </div>
    </header>
  );
};

export default Header;
