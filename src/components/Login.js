import React, { useState } from 'react';
import { auth, googleProvider } from './firebase/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import './css/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      if (!userCred.user.emailVerified) {
        setError('Please verify your email before logging in.');
        return;
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <button type="button" onClick={handleGoogleLogin} className="google-button" aria-label="Login with Google" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <FcGoogle size={28} />
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
      <p><a href="/forgot-password">Forgot Password?</a></p>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
