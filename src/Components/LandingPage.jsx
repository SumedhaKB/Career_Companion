import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function LandingPage({ user, onGetStarted }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 60px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: '700',
          margin: 0
        }}>
          🎯 Interview Prep Platform
        </h1>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{
            color: 'white',
            fontSize: '14px',
            opacity: 0.9
          }}>
            {user.displayName || user.email}
          </span>
          <button 
            onClick={handleLogout}
            style={{
              padding: '10px 25px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid white',
              borderRadius: '25px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.color = 'white';
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 80px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Left Side - Content */}
        <div style={{
          flex: 1,
          color: 'white',
          maxWidth: '600px'
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '800',
            marginBottom: '24px',
            lineHeight: '1.2',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            Master Your Interview Skills
          </h1>
          
          <p style={{
            fontSize: '20px',
            marginBottom: '40px',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            Prepare for your dream job with AI-powered mock interviews, 
            company-specific questions, and comprehensive practice modules.
          </p>

          <button
            onClick={onGetStarted}
            style={{
              padding: '18px 50px',
              background: 'white',
              border: 'none',
              borderRadius: '50px',
              color: '#667eea',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            }}
          >
            Get Started
            <span style={{ fontSize: '24px' }}>→</span>
          </button>

          <div style={{
            marginTop: '50px',
            display: 'flex',
            gap: '40px'
          }}>
            {/* <div>
              <div style={{
                fontSize: '36px',
                fontWeight: '800',
                marginBottom: '5px'
              }}>500+</div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9
              }}>Practice Questions</div>
            </div>
            <div>
              <div style={{
                fontSize: '36px',
                fontWeight: '800',
                marginBottom: '5px'
              }}>5</div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9
              }}>Companies</div>
            </div>
            <div>
              <div style={{
                fontSize: '36px',
                fontWeight: '800',
                marginBottom: '5px'
              }}>AI</div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9
              }}>Mock Interviews</div>
            </div> */}
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            width: '500px',
            height: '500px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Person with Laptop Illustration */}
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
              {/* Laptop */}
              <rect x="100" y="220" width="200" height="120" rx="8" fill="white" opacity="0.9"/>
              <rect x="100" y="220" width="200" height="90" rx="4" fill="#667eea"/>
              <rect x="120" y="240" width="160" height="60" rx="2" fill="white" opacity="0.3"/>
              <rect x="130" y="250" width="60" height="4" rx="2" fill="white" opacity="0.6"/>
              <rect x="130" y="260" width="80" height="4" rx="2" fill="white" opacity="0.6"/>
              <rect x="130" y="270" width="40" height="4" rx="2" fill="white" opacity="0.6"/>
              
              {/* Laptop base */}
              <path d="M 80 340 L 320 340 L 300 350 L 100 350 Z" fill="white" opacity="0.9"/>
              
              {/* Person */}
              {/* Head */}
              <circle cx="200" cy="140" r="30" fill="#FFD7BA"/>
              
              {/* Body */}
              <ellipse cx="200" cy="200" rx="40" ry="50" fill="#4A5568"/>
              
              {/* Arms */}
              <path d="M 165 180 Q 140 200 150 240" stroke="#FFD7BA" strokeWidth="20" fill="none" strokeLinecap="round"/>
              <path d="M 235 180 Q 260 200 250 240" stroke="#FFD7BA" strokeWidth="20" fill="none" strokeLinecap="round"/>
              
              {/* Hands on laptop */}
              <circle cx="150" cy="240" r="12" fill="#FFD7BA"/>
              <circle cx="250" cy="240" r="12" fill="#FFD7BA"/>
              
              {/* Hair */}
              <path d="M 170 120 Q 200 110 230 120" fill="#2D3748" />
              
              {/* Smile */}
              <path d="M 190 145 Q 200 150 210 145" stroke="#2D3748" strokeWidth="2" fill="none" strokeLinecap="round"/>
              
              {/* Eyes */}
              <circle cx="190" cy="135" r="3" fill="#2D3748"/>
              <circle cx="210" cy="135" r="3" fill="#2D3748"/>
              
              {/* Decorative elements */}
              <circle cx="80" cy="100" r="8" fill="white" opacity="0.3"/>
              <circle cx="320" cy="150" r="12" fill="white" opacity="0.3"/>
              <circle cx="90" cy="280" r="6" fill="white" opacity="0.3"/>
              <circle cx="310" cy="280" r="10" fill="white" opacity="0.3"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <svg style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100px'
      }} preserveAspectRatio="none" viewBox="0 0 1200 120">
        <path d="M0,50 Q300,80 600,50 T1200,50 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.1)"/>
      </svg>
    </div>
  );
}

export default LandingPage;