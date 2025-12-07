// import React, { useState, useEffect } from 'react';
// import { db, auth } from '../firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import { signOut } from 'firebase/auth';
// import './CompanyList.css';

// function CompanyList({ user, onCompanySelect }) {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'companies'));
//       const companiesList = [];
//       querySnapshot.forEach((doc) => {
//         companiesList.push({ id: doc.id, ...doc.data() });
//       });
//       setCompanies(companiesList);
//     } catch (error) {
//       console.error('Error fetching companies:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="company-list-container">
//       <nav className="navbar">
//         <h1>🎯 Interview Prep Platform</h1>
//         <div className="nav-user">
//           <span>Welcome, {user.displayName || user.email}</span>
//           <button onClick={handleLogout} className="logout-btn">Logout</button>
//         </div>
//       </nav>

//       <div className="content">
//         <div className="page-header">
//           <h2>Select a Company</h2>
//           <p>Choose from top tech companies to start your preparation</p>
//         </div>

//         <div className="companies-grid">
//           {companies.map((company) => (
//             <div 
//               key={company.id} 
//               className="company-card"
//               onClick={() => onCompanySelect(company)}
//             >
//               <div className="company-logo">
//                 <img src={company.logo} alt={company.name} />
//               </div>
//               <h3>{company.name}</h3>
//               <p className="company-role">{company.role}</p>
//               <p className="company-rounds">{company.rounds?.length || 0} Rounds</p>
//               <button className="explore-btn">Explore →</button>
//             </div>
//           ))}
//         </div>

//         {companies.length === 0 && (
//           <div className="no-companies">
//             <p>No companies available yet. Please run the scraper first!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CompanyList;
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import './CompanyList.css';

function CompanyList({ user, onCompanySelect, onGeneralPractice }) { // Add onGeneralPractice prop
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'companies'));
      const companiesList = [];
      querySnapshot.forEach((doc) => {
        companiesList.push({ id: doc.id, ...doc.data() });
      });
      setCompanies(companiesList);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="company-list-container">
      <nav className="navbar">
        <h1>🎯 Interview Prep Platform</h1>
        <div className="nav-user">
          <span>Welcome, {user.displayName || user.email}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="content">
        <div className="page-header">
          <h2>Select a Company</h2>
          <p>Choose from top tech companies to start your preparation</p>
        </div>

        {/* ADD THIS - General Practice Button */}
        <div className="general-practice-section">
          <button 
            className="general-practice-btn"
            onClick={onGeneralPractice}
          >
            <span className="btn-icon">📚</span>
            <div className="btn-content">
              <h3>General Practice</h3>
              <p>Aptitude • Technical • Coding • HR • AI Mock Interview</p>
            </div>
            <span className="btn-arrow">→</span>
          </button>
        </div>

        <div className="page-header" style={{ marginTop: '40px' }}>
          <h2>Company-Specific Preparation</h2>
          <p>Or choose a specific company below</p>
        </div>

        <div className="companies-grid">
          {companies.map((company) => (
            <div 
              key={company.id} 
              className="company-card"
              onClick={() => onCompanySelect(company)}
            >
              <div className="company-logo">
                <img src={company.logo} alt={company.name} />
              </div>
              <h3>{company.name}</h3>
              <p className="company-role">{company.role}</p>
              <p className="company-rounds">{company.rounds?.length || 0} Rounds</p>
              <button className="explore-btn">Explore →</button>
            </div>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="no-companies">
            <p>No companies available yet. Please run the scraper first!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyList;