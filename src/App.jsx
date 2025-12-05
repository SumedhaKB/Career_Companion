import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './Components/Login';
import CompanyList from './Components/CompanyList';
import CompanyDetail from './Components/CompanyDetail';
import Practice from './Components/Practice';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('companies');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRound, setSelectedRound] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setCurrentPage('companyDetail');
  };

  const handlePracticeStart = (company, round) => {
    setSelectedCompany(company);
    setSelectedRound(round);
    setCurrentPage('practice');
  };

  const handleBackToCompanies = () => {
    setCurrentPage('companies');
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
      {currentPage === 'companies' && (
        <CompanyList 
          user={user} 
          onCompanySelect={handleCompanySelect}
        />
      )}
      
      {currentPage === 'companyDetail' && selectedCompany && (
        <CompanyDetail 
          company={selectedCompany}
          onPracticeStart={handlePracticeStart}
          onBack={handleBackToCompanies}
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
    </div>
  );
}

export default App;