import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification, 
  updateProfile, 
  reload 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ---------------------- GOOGLE SIGN IN ----------------------
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user document exists in Firestore
      const sanitizedEmail = user.email.replace(/\./g, "_");
      const userDocRef = doc(db, "users", sanitizedEmail);
      const userDoc = await getDoc(userDocRef);
      
      // If user doesn't exist, create a new document
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          uid: user.uid,
          createdAt: new Date(),
          verified: true, // Google accounts are pre-verified
          name: user.displayName || 'User'
        });
      }
      
      localStorage.setItem("userEmail", sanitizedEmail);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
    
    setLoading(false);
  };

  // ---------------------- SIGN UP ----------------------
  const handleSignup = async () => {
    if (!email || !password || !name) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await updateProfile(user, { displayName: name });
      await sendEmailVerification(user);
      
      alert("Verification email sent. Please check your inbox.");

      const id = email.replace(/\./g, "_");
      await setDoc(doc(db, "users", id), {
        email,
        uid: user.uid,
        createdAt: new Date(),
        verified: false,
        name
      });

      setIsSignUp(false);
      await auth.signOut();
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // ---------------------- LOGIN ----------------------
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await reload(user);

      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        await auth.signOut();
        setLoading(false);
        return;
      }

      const sanitizedEmail = email.replace(/\./g, "_");
      localStorage.setItem("userEmail", sanitizedEmail);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) handleSignup();
    else handleLogin();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🎯 Interview Prep Platform</h1>
          <p>Prepare for top tech companies</p>
        </div>

        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength="6"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button 
          onClick={handleGoogleSignIn} 
          className="google-btn"
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
            <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
            <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p className="toggle-text">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => setIsSignUp(!isSignUp)} className="toggle-link">
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
