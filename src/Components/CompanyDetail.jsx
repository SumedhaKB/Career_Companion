import React from 'react';
import './CompanyDetail.css';

function CompanyDetail({ company, onPracticeStart, onBack }) {
  return (
    <div className="company-detail-container">
      <nav className="navbar">
        <button onClick={onBack} className="back-btn">← Back to Companies</button>
        <h1>{company.name}</h1>
      </nav>

      <div className="content">
        <div className="company-header">
          <img src={company.logo} alt={company.name} className="company-logo-large" />
          <div className="company-info">
            <h2>{company.name}</h2>
            <p className="role-badge">{company.role}</p>
            <p className="company-description">{company.description}</p>
          </div>
        </div>

        <div className="rounds-section">
          <h2>Interview Rounds</h2>
          <p className="section-subtitle">
            Prepare for each round with curated questions and practice tests
          </p>

          <div className="rounds-grid">
            {company.rounds?.map((round, index) => (
              <div key={index} className="round-card">
                <div className="round-header">
                  <span className="round-number">{index + 1}</span>
                  <h3>{round.name}</h3>
                </div>
                
                <p className="round-description">{round.description}</p>
                
                <div className="round-stats">
                  <div className="stat">
                    <span className="stat-icon">⏱️</span>
                    <span>{round.duration}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">❓</span>
                    <span>{round.questionCount} Questions</span>
                  </div>
                </div>

                <button 
                  className="practice-btn"
                  onClick={() => onPracticeStart(company, round)}
                >
                  Start Practice →
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="tips-section">
          <h3>💡 Preparation Tips</h3>
          <ul>
            <li>Practice consistently - aim for at least 30 minutes daily</li>
            <li>Focus on understanding concepts, not just memorizing answers</li>
            <li>Time yourself to simulate actual interview conditions</li>
            <li>Review your mistakes and learn from them</li>
            <li>Stay updated with company-specific interview patterns</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;