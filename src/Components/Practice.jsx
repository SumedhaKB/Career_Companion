// Updated Practice.jsx - Handles coding and HR questions
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
  const [showSolution, setShowSolution] = useState(false); // For coding questions

  const isCodingRound = round.type.toLowerCase() === 'coding';
  const isHRRound = round.type.toLowerCase() === 'hr';

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
    if (showResult) return;
    setSelectedAnswer(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setShowResult(true);
    setAnswered([
      ...answered,
      {
        questionIndex: currentQuestionIndex,
        selectedAnswer,
        correct: isCorrect,
      },
    ]);
    if (isCorrect) setScore(score + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowSolution(false); // Reset coding solution
    } else {
      if (!isCodingRound) setCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered([]);
    setCompleted(false);
    setShowSolution(false);
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

  if (completed && !isCodingRound) {
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
              <div className="percentage-fill" style={{ width: `${percentage}%` }}></div>
            </div>
            <p className="percentage-text">{percentage}% Correct</p>

            <div className="results-actions">
              <button onClick={handleRestartQuiz} className="retry-btn">Try Again</button>
              <button onClick={onBack} className="back-btn">Back to Rounds</button>
            </div>

            <div className="performance-message">
              {percentage >= 70 && "Excellent work! You're well prepared! 🌟"}
              {percentage >= 50 && percentage < 70 && "Good job! Keep practicing! 📚"}
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
            {!isCodingRound && <span>Score: {score}/{answered.length}</span>}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="question-card">
          <div className="question-header">
            <span className="question-type-badge">{currentQuestion.type}</span>
            <span className="difficulty-badge">{currentQuestion.difficulty}</span>
          </div>

          {/* --- CONDITIONAL RENDERING --- */}
          {isHRRound ? (
            // HR QUESTIONS VIEW
            <div className="hr-question-view">
              <h2 className="round-description">{currentQuestion.description}</h2>

              {questions.map((q, index) => (
                <div key={index} className="hr-question-block">
                  <p className="hr-question"><strong>Q{index + 1}:</strong> {q.question}</p>
                  <div className="hr-explanation">
                    <strong>Answer:</strong>
                    <p>{q.answer}</p>
                  </div>
                </div>
              ))}

              <div className="hr-navigation">
                <button className="finish-btn" onClick={onBack}>✓ Finish HR Round</button>
              </div>
            </div>
          ) : isCodingRound ? (
            // CODING QUESTIONS VIEW
            <div className="coding-question-view">
              <h2 className="question-text">{currentQuestion.question}</h2>

              {currentQuestion.description && (
                <div className="coding-description">
                  <pre>{currentQuestion.description}</pre>
                </div>
              )}

              <button
                className="toggle-solution-btn"
                onClick={() => setShowSolution(!showSolution)}
              >
                {showSolution ? '🔼 Hide Solution' : '🔽 Show Solution'}
              </button>

              {showSolution && (
                <div className="coding-solution">
                  <h3>💡 Hint:</h3>
                  <div className="code-block">
                    <pre>{currentQuestion.codeSnippet}</pre>
                  </div>
                  {currentQuestion.explanation && (
                    <div className="solution-explanation">
                      <p><strong>Explanation:</strong> {currentQuestion.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="coding-navigation">
                {currentQuestionIndex > 0 && (
                  <button className="prev-btn" onClick={() => {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                    setShowSolution(false);
                  }}>← Previous</button>
                )}
                {currentQuestionIndex < questions.length - 1 && (
                  <button className="next-btn" onClick={() => {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setShowSolution(false);
                  }}>Next →</button>
                )}
                {currentQuestionIndex === questions.length - 1 && (
                  <button className="finish-btn" onClick={onBack}>✓ Finish Studying</button>
                )}
              </div>
            </div>
          ) : (
            // MCQ / Other Questions VIEW
            <>
              <h2 className="question-text">{currentQuestion.question}</h2>

              <div className="options-container">
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className={`option ${
                    selectedAnswer === index ? 'selected' : ''
                  } ${
                    showResult && index === currentQuestion.correctAnswer ? 'correct' : ''
                  } ${
                    showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer ? 'incorrect' : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}>
                    <span className="option-label">{String.fromCharCode(65 + index)}</span>
                    <span className="option-text">{option}</span>
                    {showResult && index === currentQuestion.correctAnswer && <span className="result-icon">✓</span>}
                    {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && <span className="result-icon">✗</span>}
                  </div>
                ))}
              </div>

              {showResult && (
                <div className={`result-feedback ${selectedAnswer === currentQuestion.correctAnswer ? 'correct' : 'incorrect'}`}>
                  <h3>{selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}</h3>
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
                  >Submit Answer</button>
                ) : (
                  <button className="next-btn" onClick={handleNextQuestion}>
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Practice;
