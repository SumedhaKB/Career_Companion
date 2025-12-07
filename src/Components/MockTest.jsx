// MockTest.jsx - Complete Mock Test System with Locking
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import './MockTest.css';

function MockTest({ company, user, onBack }) {
  const [mockRounds, setMockRounds] = useState([
    {
      id: 'aptitude',
      name: 'Aptitude Round',
      description: '20 MCQ questions - 30 minutes',
      questionCount: 20,
      duration: '30 minutes',
      passingPercentage: 60,
      locked: false
    },
    {
      id: 'technical',
      name: 'Technical Round',
      description: '30 MCQ questions - 45 minutes',
      questionCount: 30,
      duration: '45 minutes',
      passingPercentage: 60,
      locked: true // Initially locked
    }
  ]);
  
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentRound, setCurrentRound] = useState(null);
  const [inTest, setInTest] = useState(false);

  useEffect(() => {
    fetchUserProgress();
  }, [company.id, user.uid]);

  const fetchUserProgress = async () => {
    try {
      setLoading(true);
      const progressRef = doc(db, 'users', user.uid, 'mock-progress', company.id);
      const progressSnap = await getDoc(progressRef);
      
      if (progressSnap.exists()) {
        const progress = progressSnap.data();
        setUserProgress(progress);
        
        // Update lock status based on progress
        const updatedRounds = [...mockRounds];
        
        // If aptitude is completed with >= 60%, unlock technical
        if (progress.aptitude && progress.aptitude.completed) {
          const percentage = (progress.aptitude.score / progress.aptitude.total) * 100;
          updatedRounds[1].locked = percentage < 60;
        }
        
        setMockRounds(updatedRounds);
      } else {
        setUserProgress({});
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching progress:', error);
      setLoading(false);
    }
  };

  const handleStartRound = (round) => {
    if (round.locked) {
      alert('Complete Aptitude Round with 60% or more to unlock this round!');
      return;
    }
    
    setCurrentRound(round);
    setInTest(true);
  };

  const handleTestComplete = async (roundId, score, total) => {
    const percentage = (score / total) * 100;
    
    // Save progress to Firebase
    try {
      const progressRef = doc(db, 'users', user.uid, 'mock-progress', company.id);
      
      const updatedProgress = {
        ...userProgress,
        [roundId]: {
          completed: true,
          score: score,
          total: total,
          percentage: percentage,
          timestamp: new Date().toISOString()
        }
      };
      
      await setDoc(progressRef, updatedProgress);
      
      // Update UI
      setUserProgress(updatedProgress);
      setInTest(false);
      setCurrentRound(null);
      
      // Unlock next round if passed
      if (roundId === 'aptitude' && percentage >= 60) {
        const updatedRounds = [...mockRounds];
        updatedRounds[1].locked = false;
        setMockRounds(updatedRounds);
      }
      
      // Show result
      if (percentage >= 60) {
        alert(`🎉 Congratulations! You scored ${percentage.toFixed(1)}%\n${roundId === 'aptitude' ? 'Technical Round is now unlocked!' : 'You passed the mock test!'}`);
      } else {
        alert(`📚 You scored ${percentage.toFixed(1)}%\nYou need 60% or more to pass. Try again!`);
      }
      
    } catch (error) {
      console.error('Error saving progress:', error);
      alert('Error saving your progress. Please try again.');
    }
  };

  const handleRetakeRound = (roundId) => {
    if (window.confirm('Are you sure you want to retake this round? Your previous score will be replaced.')) {
      const round = mockRounds.find(r => r.id === roundId);
      setCurrentRound(round);
      setInTest(true);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading mock test...</p>
      </div>
    );
  }

  if (inTest && currentRound) {
    return (
      <MockTestRound 
        company={company}
        round={currentRound}
        onComplete={handleTestComplete}
        onBack={() => {
          if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
            setInTest(false);
            setCurrentRound(null);
          }
        }}
      />
    );
  }

  return (
    <div className="mock-test-container">
      <nav className="navbar">
        <button onClick={onBack} className="back-btn">← Back</button>
        <h1>{company.name} - Mock Test</h1>
      </nav>

      <div className="mock-test-content">
        <div className="mock-test-header">
          <h2>🎯 Full Mock Interview Test</h2>
          <p>Complete both rounds to simulate real interview experience</p>
          <div className="mock-info">
            <span>⏱️ Timed Test</span>
            <span>✅ 60% Required to Pass</span>
            <span>🔒 Sequential Rounds</span>
          </div>
        </div>

        <div className="mock-rounds-container">
          {mockRounds.map((round, index) => {
            const progress = userProgress?.[round.id];
            const isCompleted = progress?.completed;
            const percentage = progress ? (progress.score / progress.total) * 100 : 0;
            const hasPassed = percentage >= 60;

            return (
              <div 
                key={round.id} 
                className={`mock-round-card ${round.locked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
              >
                <div className="round-number">Round {index + 1}</div>
                
                {round.locked && (
                  <div className="lock-overlay">
                    <div className="lock-icon">🔒</div>
                    <p>Complete Round 1 with 60%+ to unlock</p>
                  </div>
                )}

                <div className="round-content">
                  <h3>{round.name}</h3>
                  <p className="round-description">{round.description}</p>

                  <div className="round-stats">
                    <div className="stat">
                      <span className="stat-icon">❓</span>
                      <span>{round.questionCount} Questions</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">⏱️</span>
                      <span>{round.duration}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">✅</span>
                      <span>{round.passingPercentage}% to Pass</span>
                    </div>
                  </div>

                  {isCompleted && (
                    <div className={`score-display ${hasPassed ? 'passed' : 'failed'}`}>
                      <div className="score-badge">
                        {hasPassed ? '✓' : '✗'} {percentage.toFixed(1)}%
                      </div>
                      <p className="score-text">
                        {progress.score} / {progress.total} correct
                      </p>
                      <p className="score-status">
                        {hasPassed ? '🎉 Passed!' : '📚 Need 60% to pass'}
                      </p>
                    </div>
                  )}

                  <div className="round-actions">
                    {!round.locked && (
                      <>
                        {!isCompleted ? (
                          <button 
                            className="start-round-btn"
                            onClick={() => handleStartRound(round)}
                          >
                            Start Round →
                          </button>
                        ) : (
                          <button 
                            className="retake-round-btn"
                            onClick={() => handleRetakeRound(round.id)}
                          >
                            🔄 Retake Round
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {userProgress?.aptitude?.completed && userProgress?.technical?.completed && (
          <div className="completion-banner">
            <h3>🎊 Mock Test Completed!</h3>
            <p>You've finished both rounds. Review your performance above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Separate component for taking the test
function MockTestRound({ company, round, onComplete, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(round.id === 'aptitude' ? 30 * 60 : 45 * 60); // seconds
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [company.id, round.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const questionsRef = collection(db, 'mock-tests', company.id, round.id);
      const querySnapshot = await getDocs(questionsRef);
      const questionsList = [];
      
      querySnapshot.forEach((doc) => {
        questionsList.push({ id: doc.id, ...doc.data() });
      });
      
      // Shuffle questions
      const shuffled = questionsList.sort(() => 0.5 - Math.random());
      setQuestions(shuffled);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex);
  };

//   const handleSaveAndNext = () => {
//     if (selectedAnswer !== null) {
//       setAnswers({
//         ...answers,
//         [currentIndex]: selectedAnswer
//       });
//     }
    
//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//       setSelectedAnswer(answers[currentIndex + 1] ?? null);
//       setShowResult(false);
//     }
//   };
const handleSaveAndNext = () => {
    if (selectedAnswer !== null) {
      const updatedAnswers = {
        ...answers,
        [currentIndex]: selectedAnswer
      };
      setAnswers(updatedAnswers);
    }
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(answers[currentIndex + 1] ?? null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(answers[currentIndex - 1] ?? null);
      setShowResult(false);
    }
  };

//   const handleSubmitTest = () => {
//     // Save current answer
//     const finalAnswers = selectedAnswer !== null ? {
//       ...answers,
//       [currentIndex]: selectedAnswer
//     } : answers;

//     // Calculate score
//     let score = 0;
//     questions.forEach((q, idx) => {
//       if (finalAnswers[idx] === q.correctAnswer) {
//         score++;
//       }
//     });

//     onComplete(round.id, score, questions.length);
//   };

const handleSubmitTest = () => {
    // Save current answer first
    const finalAnswers = selectedAnswer !== null ? {
      ...answers,
      [currentIndex]: selectedAnswer
    } : answers;

    // Calculate score
    let score = 0;
    questions.forEach((q, idx) => {
      if (finalAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });

    onComplete(round.id, score, questions.length);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading test...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="error-screen">
        <h2>No questions available</h2>
        <button onClick={onBack}>Go Back</button>
      </div>
    );
  }

//   const currentQuestion = questions[currentIndex];
//   const isAnswered = answers[currentIndex] !== undefined;
//   const answeredCount = Object.keys(answers).length;

const currentQuestion = questions[currentIndex];
  const isAnswered = answers[currentIndex] !== undefined || selectedAnswer !== null;
  const answeredCount = Object.keys(answers).length + (selectedAnswer !== null && answers[currentIndex] === undefined ? 1 : 0);

  return (
    <div className="mock-test-round-container">
      <div className="test-header">
        <div className="test-info">
          <h2>{round.name}</h2>
          <span>Question {currentIndex + 1} of {questions.length}</span>
        </div>
        <div className={`timer ${timeLeft < 300 ? 'warning' : ''}`}>
          ⏱️ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="test-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          ></div>
        </div>
        <p>{answeredCount} / {questions.length} answered</p>
      </div>

      <div className="test-question-card">
        <div className="question-header">
          <span className="difficulty-badge">{currentQuestion.difficulty}</span>
        </div>

        <h3 className="question-text">{currentQuestion.question}</h3>

        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`option ${selectedAnswer === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="option-label">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
              {isAnswered && answers[currentIndex] === index && (
                <span className="saved-indicator">✓ Saved</span>
              )}
            </div>
          ))}
        </div>

        <div className="test-navigation">
          <button 
            className="nav-btn prev-btn"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            ← Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button 
              className="nav-btn next-btn"
              onClick={handleSaveAndNext}
            >
              Save & Next →
            </button>
          ) : (
            <button 
              className="nav-btn submit-btn"
              onClick={() => {
                if (window.confirm(`Submit test with ${answeredCount} answered questions?`)) {
                  handleSubmitTest();
                }
              }}
            >
              Submit Test
            </button>
          )}
        </div>

        <div className="question-navigator">
          <h4>Question Navigator:</h4>
          <div className="question-grid">
            {questions.map((_, idx) => (
              <button
                key={idx}
                className={`q-nav-btn ${idx === currentIndex ? 'current' : ''} ${answers[idx] !== undefined ? 'answered' : ''}`}
                onClick={() => {
                  setCurrentIndex(idx);
                  setSelectedAnswer(answers[idx] ?? null);
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockTest;