import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Practice.css';

function Practice({ company, round, user, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [company.id, round.type]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const questionsRef = collection(db, 'questions', company.id, round.type);
      const querySnapshot = await getDocs(questionsRef);
      const questionsList = [];
      
      querySnapshot.forEach((doc) => {
        questionsList.push({ id: doc.id, ...doc.data() });
      });
      
      setQuestions(questionsList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    if (showResult) return; // Prevent changing answer after showing result
    setSelectedAnswer(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setShowResult(true);
    
    // Update score and answered list
    setAnswered([...answered, {
      questionIndex: currentQuestionIndex,
      selectedAnswer,
      correct: isCorrect
    }]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered([]);
    setCompleted(false);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="practice-container">
        <nav className="navbar">
          <button onClick={onBack} className="back-btn">← Back</button>
          <h1>{round.name}</h1>
        </nav>
        <div className="no-questions">
          <h2>No questions available yet</h2>
          <p>Questions for this round are being prepared. Check back soon!</p>
        </div>
      </div>
    );
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="practice-container">
        <nav className="navbar">
          <button onClick={onBack} className="back-btn">← Back</button>
          <h1>Quiz Completed!</h1>
        </nav>
        
        <div className="results-container">
          <div className="results-card">
            <div className="results-icon">
              {percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '💪'}
            </div>
            
            <h2>Your Score</h2>
            <div className="score-display">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {questions.length}</span>
            </div>
            
            <div className="percentage-bar">
              <div 
                className="percentage-fill" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="percentage-text">{percentage}% Correct</p>
            
            <div className="results-actions">
              <button onClick={handleRestartQuiz} className="retry-btn">
                Try Again
              </button>
              <button onClick={onBack} className="back-btn">
                Back to Rounds
              </button>
            </div>
            
            <div className="performance-message">
              {percentage >= 70 && "Excellent work! You're well prepared! 🌟"}
              {percentage >= 50 && percentage < 70 && "Good job! Keep practicing to improve! 📚"}
              {percentage < 50 && "Keep learning! Practice makes perfect! 💪"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="practice-container">
      <nav className="navbar">
        <button onClick={onBack} className="back-btn">← Back</button>
        <h1>{company.name} - {round.name}</h1>
      </nav>

      <div className="practice-content">
        <div className="progress-section">
          <div className="progress-info">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>Score: {score}/{answered.length}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="question-card">
          <div className="question-header">
            <span className="question-type-badge">{currentQuestion.type}</span>
            <span className="difficulty-badge">{currentQuestion.difficulty}</span>
          </div>

          <h2 className="question-text">{currentQuestion.question}</h2>

          <div className="options-container">
            {currentQuestion.options && currentQuestion.options.length > 0 ? (
              currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`option ${
                    selectedAnswer === index ? 'selected' : ''
                  } ${
                    showResult && index === currentQuestion.correctAnswer ? 'correct' : ''
                  } ${
                    showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer ? 'incorrect' : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="option-label">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                  {showResult && index === currentQuestion.correctAnswer && (
                    <span className="result-icon">✓</span>
                  )}
                  {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <span className="result-icon">✗</span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-answer">
                <p>This is a subjective question. Please review the explanation below.</p>
              </div>
            )}
          </div>

          {showResult && (
            <div className={`result-feedback ${
              selectedAnswer === currentQuestion.correctAnswer ? 'correct' : 'incorrect'
            }`}>
              <h3>
                {selectedAnswer === currentQuestion.correctAnswer 
                  ? '✓ Correct!' 
                  : '✗ Incorrect'}
              </h3>
              <div className="explanation">
                <h4>Explanation:</h4>
                <p>{currentQuestion.explanation}</p>
              </div>
            </div>
          )}

          <div className="action-buttons">
            {!showResult ? (
              <button 
                className="submit-btn"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null && currentQuestion.options?.length > 0}
              >
                Submit Answer
              </button>
            ) : (
              <button 
                className="next-btn"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Practice;