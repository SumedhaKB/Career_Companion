// // import React, { useState, useEffect } from 'react';
// // import { auth } from './firebase';
// // import { onAuthStateChanged } from 'firebase/auth';
// // import Login from './components/Login';
// // import CompanyList from './components/CompanyList';
// // import CompanyDetail from './components/CompanyDetail';
// // import Practice from './components/Practice';
// // import './App.css';

// // function App() {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [currentPage, setCurrentPage] = useState('companies');
// //   const [selectedCompany, setSelectedCompany] = useState(null);
// //   const [selectedRound, setSelectedRound] = useState(null);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       setUser(user);
// //       setLoading(false);
// //     });
// //     return unsubscribe;
// //   }, []);

// //   const handleCompanySelect = (company) => {
// //     setSelectedCompany(company);
// //     setCurrentPage('companyDetail');
// //   };

// //   const handlePracticeStart = (company, round) => {
// //     setSelectedCompany(company);
// //     setSelectedRound(round);
// //     setCurrentPage('practice');
// //   };

// //   const handleBackToCompanies = () => {
// //     setCurrentPage('companies');
// //     setSelectedCompany(null);
// //     setSelectedRound(null);
// //   };

// //   const handleBackToDetail = () => {
// //     setCurrentPage('companyDetail');
// //     setSelectedRound(null);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="loading-screen">
// //         <div className="spinner"></div>
// //         <p>Loading...</p>
// //       </div>
// //     );
// //   }

// //   if (!user) {
// //     return <Login />;
// //   }

// //   return (
// //     <div className="App">
// //       {currentPage === 'companies' && (
// //         <CompanyList 
// //           user={user} 
// //           onCompanySelect={handleCompanySelect}
// //         />
// //       )}
      
// //       {currentPage === 'companyDetail' && selectedCompany && (
// //         <CompanyDetail 
// //           company={selectedCompany}
// //           onPracticeStart={handlePracticeStart}
// //           onBack={handleBackToCompanies}
// //         />
// //       )}
      
// //       {currentPage === 'practice' && selectedCompany && selectedRound && (
// //         <Practice 
// //           company={selectedCompany}
// //           round={selectedRound}
// //           user={user}
// //           onBack={handleBackToDetail}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState, useEffect } from 'react';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Login from './components/Login';
// import CompanyList from './components/CompanyList';
// import CompanyDetail from './components/CompanyDetail';
// import Practice from './components/Practice';
// import MockTest from './Components/MockTest';
// import general_Ai from './Components/general_Ai';

//  // ADD THIS
// import './App.css';

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState('companies');
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [selectedRound, setSelectedRound] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   const handleCompanySelect = (company) => {
//     setSelectedCompany(company);
//     setCurrentPage('companyDetail');
//   };

//   const handlePracticeStart = (company, round) => {
//     setSelectedCompany(company);
//     setSelectedRound(round);
//     setCurrentPage('practice');
//   };

//   // ADD THIS - Handle Mock Test
//   const handleMockTestStart = (company) => {
//     setSelectedCompany(company);
//     setCurrentPage('mockTest');
//   };

//   const handleBackToCompanies = () => {
//     setCurrentPage('companies');
//     setSelectedCompany(null);
//     setSelectedRound(null);
//   };

//   const handleBackToDetail = () => {
//     setCurrentPage('companyDetail');
//     setSelectedRound(null);
//   };

//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <div className="spinner"></div>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return <Login />;
//   }

//   return (
//     <div className="App">
//       {currentPage === 'companies' && (
//         <CompanyList 
//           user={user} 
//           onCompanySelect={handleCompanySelect}
//         />
//       )}
      
//       {currentPage === 'companyDetail' && selectedCompany && (
//         <CompanyDetail 
//           company={selectedCompany}
//           onPracticeStart={handlePracticeStart}
//           onMockTestStart={handleMockTestStart} // ADD THIS
//           onBack={handleBackToCompanies}
//         />
//       )}
      
//       {currentPage === 'practice' && selectedCompany && selectedRound && (
//         <Practice 
//           company={selectedCompany}
//           round={selectedRound}
//           user={user}
//           onBack={handleBackToDetail}
//         />
//       )}
      
//       {/* ADD THIS - Mock Test Page */}
//       {currentPage === 'mockTest' && selectedCompany && (
//         <MockTest 
//           company={selectedCompany}
//           user={user}
//           onBack={handleBackToDetail}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Login from './components/Login';
// import CompanyList from './components/CompanyList';
// import CompanyDetail from './components/CompanyDetail';
// import Practice from './components/Practice';
// import MockTest from './Components/MockTest';
// import GeneralAI from './Components/general_Ai'; // Import your new component
// import './App.css';

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState('companies');
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [selectedRound, setSelectedRound] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   const handleCompanySelect = (company) => {
//     setSelectedCompany(company);
//     setCurrentPage('companyDetail');
//   };

//   const handlePracticeStart = (company, round) => {
//     setSelectedCompany(company);
//     setSelectedRound(round);
//     setCurrentPage('practice');
//   };

//   const handleMockTestStart = (company) => {
//     setSelectedCompany(company);
//     setCurrentPage('mockTest');
//   };

//   // ADD THIS - Handle General AI Practice
//   const handleGeneralPracticeStart = () => {
//     setCurrentPage('generalAI');
//   };

//   const handleBackToCompanies = () => {
//     setCurrentPage('companies');
//     setSelectedCompany(null);
//     setSelectedRound(null);
//   };

//   const handleBackToDetail = () => {
//     setCurrentPage('companyDetail');
//     setSelectedRound(null);
//   };

//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <div className="spinner"></div>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return <Login />;
//   }

//   return (
//     <div className="App">
//       {currentPage === 'companies' && (
//         <CompanyList 
//           user={user} 
//           onCompanySelect={handleCompanySelect}
//           onGeneralPractice={handleGeneralPracticeStart} // Pass this prop
//         />
//       )}
      
//       {currentPage === 'companyDetail' && selectedCompany && (
//         <CompanyDetail 
//           company={selectedCompany}
//           onPracticeStart={handlePracticeStart}
//           onMockTestStart={handleMockTestStart}
//           onBack={handleBackToCompanies}
//         />
//       )}
      
//       {currentPage === 'practice' && selectedCompany && selectedRound && (
//         <Practice 
//           company={selectedCompany}
//           round={selectedRound}
//           user={user}
//           onBack={handleBackToDetail}
//         />
//       )}
      
//       {currentPage === 'mockTest' && selectedCompany && (
//         <MockTest 
//           company={selectedCompany}
//           user={user}
//           onBack={handleBackToDetail}
//         />
//       )}
      
//       {/* ADD THIS - General AI Practice Page */}
//       {currentPage === 'generalAI' && (
//         <GeneralAI 
//           user={user}
//           onBack={handleBackToCompanies}
//         />
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import Practice from './components/Practice';
import MockTest from './Components/MockTest';
import GeneralAI from './Components/general_Ai';
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

  const handleMockTestStart = (company) => {
    setSelectedCompany(company);
    setCurrentPage('mockTest');
  };

  const handleGeneralPracticeStart = () => {
    setCurrentPage('generalAI');
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
          onGeneralPractice={handleGeneralPracticeStart}
        />
      )}
      
      {currentPage === 'companyDetail' && selectedCompany && (
        <CompanyDetail 
          company={selectedCompany}
          onPracticeStart={handlePracticeStart}
          onMockTestStart={handleMockTestStart}
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
      
      {currentPage === 'mockTest' && selectedCompany && (
        <MockTest 
          company={selectedCompany}
          user={user}
          onBack={handleBackToDetail}
        />
      )}
      
      {currentPage === 'generalAI' && (
        <GeneralAI 
          user={user}
          onBack={handleBackToCompanies}
          onCompanySelect={handleCompanySelect}  // ADD THIS LINE
        />
      )}
    </div>
  );
}

export default App;