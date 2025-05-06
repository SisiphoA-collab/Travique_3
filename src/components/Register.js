import React, { useState } from 'react';
import { auth } from './firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './css/auth.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: fullName });
      await sendEmailVerification(userCred.user);
      setMessage('Registration successful! Check your email for verification.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <p>Already have an account <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
