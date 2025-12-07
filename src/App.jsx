import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import GeneralAI from './Components/general_Ai';
import CompanyDetail from './Components/CompanyDetail';
import Practice from './components/Practice';
import MockTest from './Components/MockTest';
import GeneralAI from './Components/general_Ai';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('landing'); // Start with landing page
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRound, setSelectedRound] = useState(null);




  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setUser(user);
    setLoading(false);

    // ❗ Only redirect when email is verified
    if (user) {
      await user.reload(); // refresh verification status
      
      if (user.emailVerified) {
        setCurrentPage('landing');  // HOME page
      } else {
        setCurrentPage('login');    // force stay on login
      }
    } else {
      setCurrentPage('login');      // no user → always login
    }
  });

  return unsubscribe;
}, []);


  const handleGetStarted = () => {
    // This takes user to the GeneralAI page which has Home, General Section, Company Based, AI Interview
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

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="App">
      {currentPage === 'landing' && (
        <LandingPage 
          user={user} 
          onGetStarted={handleGetStarted}
        />
      )}
      
      {currentPage === 'generalAI' && (
        <GeneralAI 
          user={user}
          onBack={() => setCurrentPage('landing')}
          onCompanySelect={handleCompanySelect}
        />
      )}
      
      {currentPage === 'companyDetail' && selectedCompany && (
        <CompanyDetail 
          company={selectedCompany}
          onPracticeStart={handlePracticeStart}
          onMockTestStart={handleMockTestStart}
          onBack={handleBackToHome}
        />
      )}
      
      {currentPage === 'practice' && selectedCompany && selectedRound && (
        <Practice 
          company={selectedCompany}
          round={selectedRound}
          user={user}
          onBack={handleBackToDetail}
        />
      )}
      
      {currentPage === 'mockTest' && selectedCompany && (
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