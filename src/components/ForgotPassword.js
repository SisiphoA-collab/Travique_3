import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase/firebase';
import './css/auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Send Reset Link</button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <p>Already have an account <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default ForgotPassword;
