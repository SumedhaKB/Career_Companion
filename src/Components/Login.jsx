import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  updateProfile, 
  reload 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Loginimg from './Images/login_page_image.png'

function Login({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      {/* Main Container - Square with Rounded Corners */}
      <div style={{
        width: '900px',
        height: '550px',
        display: 'flex',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.05)',
        backgroundColor: 'white'
      }}>
        {/* Left Section - Branding & Image */}
        <div style={{
          flex: 1,
          background: 'linear-gradient(135deg, #0b3b68ff 0%, #194377ff 50%, #4b83d7ff 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          position: 'relative'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#1a1a1a',
            marginBottom: '40px',
            position: 'relative',
            zIndex: '1'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              marginBottom: '8px',
              color: '#ffffff',
              letterSpacing: '-0.5px'
            }}>
              Career
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              marginBottom: '40px',
              color: '#ffffff',
              letterSpacing: '-0.5px'
            }}>
              Companion
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              lineHeight: '1.3',
              marginBottom: '20px',
              color: '#7bc784ff'
            }}>
              Welcome Back
            </div>
            <div style={{
              fontSize: '16px',
              color: '#bbbec5ff',
              lineHeight: '1.5',
              maxWidth: '300px',
              margin: '0 auto'
            }}>
              Prepare for your next interview with personalized tools.
            </div>
          </div>
          
          {/* Image Container */}
          <div style={{
            width: '280px',
            height: '220px',
            borderRadius: '16px',
            overflow: 'hidden',
            marginTop: '20px',
            position: 'relative',
            zIndex: '1',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}>
            <img 
              src={Loginimg}
              alt="Career preparation illustration"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div style={{
          flex: 1,
          padding: '50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{
            marginBottom: '32px'
          }}>
            <h2 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '8px'
            }}>
              Sign in to your account
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {isSignUp && (
              <div style={{
                marginBottom: '20px'
              }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#1a1a1a',
                    backgroundColor: 'white',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            )}

            <div style={{
              marginBottom: '20px'
            }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1a1a1a',
                  backgroundColor: 'white',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Password
                </label>

              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength="6"
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1a1a1a',
                  backgroundColor: 'white',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: '12px',
                backgroundColor: '#fee2e2',
                border: '1px solid #fca5a5',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '14px',
                marginBottom: '20px'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#2563eb',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '28px',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#1d4ed8';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#2563eb';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>

            <div style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#6b7280',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '24px'
            }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '0'
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;