import React from 'react';
import { Briefcase, Code, Mic, FileText, Users, ClipboardCheck } from 'lucide-react';
import Landingimg from './Images/landing_page_image.png';

function LandingPage({ onGetStarted }) {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 80px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          fontSize: '22px',
          fontWeight: '700',
          color: '#1a1a1a'
        }}>
          Career Companion
        </div>
        
        <div style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center'
        }}>
          <a href="#" style={{
            color: '#2563eb',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '500'
          }}>Home</a>
          <a href="#features-section" onClick={(e) => { e.preventDefault(); scrollToFeatures(); }} style={{
            color: '#6b7280',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>Features</a>
          <a href="#" style={{
            color: '#6b7280',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '500'
          }}>Pricing</a>
          <a href="#" style={{
            color: '#6b7280',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '500'
          }}>Contact</a>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center'
        }}>
          <button
          onClick={onGetStarted}
          style={{
            padding: '10px 24px',
            background: 'transparent',
            border: 'none',
            color: '#6b7280',
            fontSize: '15px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Login
          </button>
          <button 
          onClick={onGetStarted}
          style={{
            padding: '10px 24px',
            background: '#2563eb',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.background = '#2563eb'}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        padding: '80px 80px 100px',
        background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 50%, #e0e7ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '80px'
        }}>
          {/* Left - Illustration */}
<div style={{
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}}>
  <img 
    src={Landingimg}
    alt="Career preparation illustration"
    style={{
      width: '100%',
      maxWidth: '500px',
      height: 'auto',
      borderRadius: '20px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
    }}
  />
</div>

          {/* Right - Content */}
          <div style={{
            flex: '1',
            maxWidth: '600px'
          }}>
            <h1 style={{
              fontSize: '52px',
              fontWeight: '800',
              color: '#1a1a1a',
              lineHeight: '1.2',
              marginBottom: '20px'
            }}>
              Your Complete Career Companion for Interview Success
            </h1>
            
            <p style={{
              fontSize: '18px',
              color: '#4b5563',
              lineHeight: '1.7',
              marginBottom: '40px'
            }}>
              Aptitude, Coding, Company-Specific Prep, AI Mock Interviews — all in one place.
            </p>

            <div style={{
              display: 'flex',
              gap: '15px'
            }}>
              <button 
              onClick={onGetStarted}
              style={{
                padding: '14px 32px',
                background: '#2563eb',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.background = '#2563eb'}
              >
                Sign Up
              </button>
              <button 
              onClick={onGetStarted}
              style={{
                padding: '14px 32px',
                background: 'white',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                color: '#1a1a1a',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.borderColor = '#9ca3af'}
              onMouseLeave={(e) => e.target.style.borderColor = '#d1d5db'}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
{/* Why Choose Us Section */}
<div id="features-section" style={{
  padding: '80px 80px',
  backgroundColor: 'white',
  position: 'relative'
}}>
  <h2 style={{
    fontSize: '36px',
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: '60px',
    position: 'relative'
  }}>
    Why Choose Us
    <div style={{
      position: 'absolute',
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '4px',
      background: 'linear-gradient(90deg, #2563eb, #10b981)',
      borderRadius: '2px'
    }}></div>
  </h2>

  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px'
  }}>
    {/* Card 1 */}
    <div style={{
      background: 'white',
      padding: '40px 30px',
      borderRadius: '20px',
      boxShadow: `
        0 4px 20px rgba(37, 99, 235, 0.1),
        0 8px 30px rgba(37, 99, 235, 0.08)
      `,
      border: '1px solid rgba(37, 99, 235, 0.1)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = `
        0 20px 40px rgba(37, 99, 235, 0.2),
        0 15px 30px rgba(37, 99, 235, 0.15),
        0 0 60px rgba(37, 99, 235, 0.1)
      `;
      e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = `
        0 4px 20px rgba(37, 99, 235, 0.1),
        0 8px 30px rgba(37, 99, 235, 0.08)
      `;
      e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.1)';
    }}
    >
      {/* Glowing background effect */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03), rgba(37, 99, 235, 0))',
        opacity: 0,
        transition: 'opacity 0.4s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
      ></div>
      
      <div style={{
        width: '48px',
        height: '48px',
        background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        position: 'relative',
        zIndex: '1',
        boxShadow: '0 6px 20px rgba(37, 99, 235, 0.3)'
      }}>
        <Code size={24} color="white" />
      </div>
      <h3 style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: '12px',
        position: 'relative',
        zIndex: '1'
      }}>
        Aptitude & Coding
      </h3>
      <p style={{
        fontSize: '15px',
        color: '#6b7280',
        lineHeight: '1.6',
        position: 'relative',
        zIndex: '1'
      }}>
        Practice thousands of questions and coding challenges with detailed solutions.
      </p>
    </div>

    {/* Card 2 */}
    <div style={{
      background: 'white',
      padding: '40px 30px',
      borderRadius: '20px',
      boxShadow: `
        0 4px 20px rgba(16, 185, 129, 0.1),
        0 8px 30px rgba(16, 185, 129, 0.08)
      `,
      border: '1px solid rgba(16, 185, 129, 0.1)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = `
        0 20px 40px rgba(16, 185, 129, 0.2),
        0 15px 30px rgba(16, 185, 129, 0.15),
        0 0 60px rgba(16, 185, 129, 0.1)
      `;
      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = `
        0 4px 20px rgba(16, 185, 129, 0.1),
        0 8px 30px rgba(16, 185, 129, 0.08)
      `;
      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)';
    }}
    >
      {/* Glowing background effect */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.03), rgba(16, 185, 129, 0))',
        opacity: 0,
        transition: 'opacity 0.4s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
      ></div>
      
      <div style={{
        width: '48px',
        height: '48px',
        background: 'linear-gradient(135deg, #10b981, #34d399)',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        position: 'relative',
        zIndex: '1',
        boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)'
      }}>
        <Briefcase size={24} color="white" />
      </div>
      <h3 style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: '12px',
        position: 'relative',
        zIndex: '1'
      }}>
        Company-Specific Prep
      </h3>
      <p style={{
        fontSize: '15px',
        color: '#6b7280',
        lineHeight: '1.6',
        position: 'relative',
        zIndex: '1'
      }}>
        Targeted resources and interview questions for top tech companies.
      </p>
    </div>

    {/* Card 3 */}
    <div style={{
      background: 'white',
      padding: '40px 30px',
      borderRadius: '20px',
      boxShadow: `
        0 4px 20px rgba(245, 158, 11, 0.1),
        0 8px 30px rgba(245, 158, 11, 0.08)
      `,
      border: '1px solid rgba(245, 158, 11, 0.1)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = `
        0 20px 40px rgba(245, 158, 11, 0.2),
        0 15px 30px rgba(245, 158, 11, 0.15),
        0 0 60px rgba(245, 158, 11, 0.1)
      `;
      e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = `
        0 4px 20px rgba(245, 158, 11, 0.1),
        0 8px 30px rgba(245, 158, 11, 0.08)
      `;
      e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.1)';
    }}
    >
      {/* Glowing background effect */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.03), rgba(245, 158, 11, 0))',
        opacity: 0,
        transition: 'opacity 0.4s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
      ></div>
      
      <div style={{
        width: '48px',
        height: '48px',
        background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        position: 'relative',
        zIndex: '1',
        boxShadow: '0 6px 20px rgba(245, 158, 11, 0.3)'
      }}>
        <Mic size={24} color="white" />
      </div>
      <h3 style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: '12px',
        position: 'relative',
        zIndex: '1'
      }}>
        AI Mock Interviews
      </h3>
      <p style={{
        fontSize: '15px',
        color: '#6b7280',
        lineHeight: '1.6',
        position: 'relative',
        zIndex: '1'
      }}>
        Real-time feedback, performance analysis, and personalized coaching.
      </p>
    </div>
  </div>
</div>

      {/* Footer */}
      <footer style={{
        background: '#1e3a5f',
        color: 'white',
        padding: '40px 80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '18px',
            fontWeight: '700',
            marginBottom: '15px'
          }}>
            Career Companion
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center'
        }}>
          <a href="#" style={{
            color: '#cbd5e1',
            textDecoration: 'none',
            fontSize: '14px'
          }}>About</a>
          <a href="#" style={{
            color: '#cbd5e1',
            textDecoration: 'none',
            fontSize: '14px'
          }}>Careers</a>
          <a href="#" style={{
            color: '#cbd5e1',
            textDecoration: 'none',
            fontSize: '14px'
          }}>Privacy Policy</a>
          <a href="#" style={{
            color: '#cbd5e1',
            textDecoration: 'none',
            fontSize: '14px'
          }}>Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;