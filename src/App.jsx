import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import GeneralAI from './Components/general_Ai';
import CompanyDetail from './Components/CompanyDetail';
import Practice from './components/Practice';
import MockTest from './Components/MockTest';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('landing'); // Always start with landing
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRound, setSelectedRound] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        const updatedUser = auth.currentUser;

        if (updatedUser?.emailVerified) {
          setUser(updatedUser);
          // Don't auto-redirect, let user stay on current page
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('generalAI');
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setCurrentPage('companyDetail');
  };

  const handlePracticeStart = (company, round) => {
    setSelectedCompany(company);
    setSelectedRound(round);
    setCurrentPage('practice');
  };

  const handleMockTestStart = (company) => {
    setSelectedCompany(company);
    setCurrentPage('mockTest');
  };

  const handleBackToHome = () => {
    setCurrentPage('generalAI');
    setSelectedCompany(null);
    setSelectedRound(null);
  };

  const handleBackToDetail = () => {
    setCurrentPage('companyDetail');
    setSelectedRound(null);
  };

  const handleLogout = () => {
    setCurrentPage('landing');
    setSelectedCompany(null);
    setSelectedRound(null);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {currentPage === 'landing' && (
        <LandingPage 
          onGetStarted={handleGetStarted}
        />
      )}

      {currentPage === 'login' && (
        <Login 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      {currentPage === 'generalAI' && user && (
        <GeneralAI 
          user={user}
          onLogout={handleLogout}
          onCompanySelect={handleCompanySelect}
        />
      )}
      
      {currentPage === 'companyDetail' && selectedCompany && user && (
        <CompanyDetail 
          company={selectedCompany}
          onPracticeStart={handlePracticeStart}
          onMockTestStart={handleMockTestStart}
          onBack={handleBackToHome}
        />
      )}
      
      {currentPage === 'practice' && selectedCompany && selectedRound && user && (
        <Practice 
          company={selectedCompany}
          round={selectedRound}
          user={user}
          onBack={handleBackToDetail}
        />
      )}
      
      {currentPage === 'mockTest' && selectedCompany && user && (
        <MockTest 
          company={selectedCompany}
          user={user}
          onBack={handleBackToDetail}
        />
      )}
    </div>
  );
}

export default App;

