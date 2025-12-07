import React, { useState, useRef, useEffect } from 'react';
import { Play, Video, RefreshCw, Check, X, Menu, ChevronRight, MessageSquare, Send, StopCircle, Clock } from 'lucide-react';

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f3f4f6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  sidebar: {
    backgroundColor: '#1f2937',
    color: 'white',
    transition: 'width 0.3s',
    overflow: 'hidden'
  },
  sidebarOpen: { width: '256px' },
  sidebarClosed: { width: '0' },
  sidebarContent: { padding: '16px' },
  sidebarTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' },
  nav: { display: 'flex', flexDirection: 'column', gap: '8px' },
  navButton: {
    width: '100%',
    textAlign: 'left',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  mainContent: { flex: 1, overflowY: 'auto' },
  menuButton: {
    padding: '8px',
    backgroundColor: '#1f2937',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '16px'
  },
  pageContainer: { padding: '32px' },
  heading1: { fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', color: '#1f2937' },
  heading2: { fontSize: '30px', fontWeight: 'bold', marginBottom: '32px' },
  heading3: { fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' },
  grid: { display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' },
  card: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s'
  },
  backButton: {
    marginBottom: '24px',
    color: '#2563eb',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '16px'
  },
  categoryCard: {
    padding: '24px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  questionCard: {
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '0 auto'
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    display: 'inline-block'
  },
  badgeEasy: { backgroundColor: '#bbf7d0' },
  badgeMedium: { backgroundColor: '#fef08a' },
  badgeHard: { backgroundColor: '#fecaca' },
  badgeTechnical: { backgroundColor: '#bfdbfe' },
  badgeHr: { backgroundColor: '#bbf7d0' },
  optionButton: {
    width: '100%',
    padding: '16px',
    textAlign: 'left',
    borderRadius: '6px',
    border: '2px solid #d1d5db',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '12px'
  },
  optionSelected: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
  optionCorrect: { borderColor: '#10b981', backgroundColor: '#f0fdf4' },
  optionWrong: { borderColor: '#ef4444', backgroundColor: '#fef2f2' },
  button: {
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  },
  buttonPrimary: { backgroundColor: '#2563eb', color: 'white' },
  buttonSuccess: { backgroundColor: '#10b981', color: 'white' },
  buttonDanger: { backgroundColor: '#ef4444', color: 'white' },
  buttonWarning: { backgroundColor: '#f59e0b', color: 'white' },
  buttonPurple: { backgroundColor: '#9333ea', color: 'white' },
  explanation: {
    backgroundColor: '#eff6ff',
    padding: '16px',
    borderRadius: '6px',
    marginBottom: '24px'
  },
  video: {
    width: '100%',
    backgroundColor: 'black',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '16px'
  },
  chatContainer: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '600px'
  },
  chatMessages: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  chatUser: { backgroundColor: '#dbeafe', padding: '12px', borderRadius: '8px', marginLeft: '16px' },
  chatAi: { backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px', marginRight: '16px' },
  input: {
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    width: '100%'
  },
  textarea: {
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    width: '100%',
    resize: 'none',
    fontFamily: 'inherit'
  },
  timer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#ef4444',
    fontSize: '20px',
    fontWeight: 'bold'
  }
};

const GeneralAI = ({ user, onBack, onCompanySelect }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [companies, setCompanies] = useState([]);
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [timeLeft, setTimeLeft] = useState(90);
  const [currentMockQuestion, setCurrentMockQuestion] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  const aptitudeQuestions = [
    { q: 'If a train travels 120 km in 2 hours, what is average speed?', opts: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'], ans: 1, exp: 'Speed = Distance/Time = 120/2 = 60 km/h', diff: 'easy' },
    { q: 'What is 15% of 200?', opts: ['25', '30', '35', '40'], ans: 1, exp: '15% of 200 = (15/100) × 200 = 30', diff: 'easy' },
    { q: 'Profit % if bought at $80, sold at $100?', opts: ['20%', '25%', '30%', '15%'], ans: 1, exp: 'Profit = 20. Profit% = (20/80)×100 = 25%', diff: 'easy' },
    { q: '5 workers finish task in 12 days. 3 workers take?', opts: ['15 days', '18 days', '20 days', '24 days'], ans: 2, exp: 'Work = 60 worker-days. 60/3 = 20 days', diff: 'medium' },
    { q: 'Boys:Girls = 3:2, 45 students. How many boys?', opts: ['25', '27', '30', '18'], ans: 1, exp: 'Boys = (3/5)×45 = 27', diff: 'medium' },
    { q: 'Money doubles in 8 years. When will it triple?', opts: ['12 years', '16 years', '20 years', '24 years'], ans: 1, exp: 'Rate = 12.5%. Triple needs 16 years', diff: 'medium' },
    { q: 'Three pipes fill tank in 6,8,12 hrs. Together?', opts: ['2.4 hrs', '2.67 hrs', '3 hrs', '3.5 hrs'], ans: 1, exp: 'Combined rate = 3/8 per hour. Time = 8/3 = 2.67 hrs', diff: 'hard' },
    { q: 'Train crosses 300m platform in 30s, pole in 15s. Train length?', opts: ['250m', '300m', '350m', '400m'], ans: 1, exp: 'Speed = L/15. (L+300)/30 = L/15. L = 300m', diff: 'hard' }
  ];

  const technicalQuestions = [
    { q: 'What does OOP stand for?', opts: ['Object-Oriented Programming', 'Objective Operational Process', 'Open Operation Protocol', 'Object Operation Process'], ans: 0, exp: 'OOP is Object-Oriented Programming paradigm', diff: 'easy' },
    { q: 'Which data structure uses LIFO?', opts: ['Queue', 'Stack', 'Array', 'Linked List'], ans: 1, exp: 'Stack uses Last In First Out principle', diff: 'easy' },
    { q: 'Time complexity of binary search?', opts: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], ans: 1, exp: 'Binary search divides space in half each step', diff: 'easy' },
    { q: 'What is polymorphism?', opts: ['Multiple forms', 'Data hiding', 'Code reuse', 'Memory allocation'], ans: 0, exp: 'Polymorphism enables multiple forms of same entity', diff: 'medium' },
    { q: 'Best average sorting complexity?', opts: ['Bubble Sort', 'Merge Sort', 'Selection Sort', 'Insertion Sort'], ans: 1, exp: 'Merge Sort has O(n log n) average complexity', diff: 'medium' },
    { q: 'What is deadlock in OS?', opts: ['CPU overload', 'Memory leak', 'Circular wait', 'Disk failure'], ans: 2, exp: 'Deadlock is circular wait for resources', diff: 'medium' },
    { q: 'Space complexity of merge sort?', opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], ans: 2, exp: 'Merge sort needs O(n) extra space', diff: 'hard' },
    { q: 'Detect cycle in linked list efficiently?', opts: ['Two pointers', 'Hash table', 'Recursion', 'Stack'], ans: 0, exp: "Floyd's algorithm uses two pointers at different speeds", diff: 'hard' }
  ];

  const codingQuestions = [
    { q: 'Reverse a string', hint: 'Convert to array first', exp: 'str.split("").reverse().join("")', diff: 'easy' },
    { q: 'Find largest element in array', hint: 'Use Math.max or iterate', exp: 'Math.max(...arr) or loop comparing', diff: 'easy' },
    { q: 'Check if number is prime', hint: 'Check divisibility to sqrt(n)', exp: 'Check divisions from 2 to √n', diff: 'easy' },
    { q: 'Check if string is palindrome', hint: 'Clean and compare with reverse', exp: 'Remove non-alphanumeric, compare with reverse', diff: 'medium' },
    { q: 'Factorial using recursion', hint: 'Base case: n<=1 returns 1', exp: 'if(n<=1) return 1; return n*factorial(n-1)', diff: 'medium' },
    { q: 'Remove duplicates from array', hint: 'Use Set data structure', exp: '[...new Set(arr)]', diff: 'medium' },
    { q: 'Find nth Fibonacci number', hint: 'Use iteration not recursion', exp: 'Use two variables tracking prev values', diff: 'hard' },
    { q: 'Merge two sorted arrays', hint: 'Two pointer technique', exp: 'Compare elements from both arrays', diff: 'hard' }
  ];

  const hrQuestions = [
    { q: 'Tell me about yourself', ans: 'I am a dedicated professional with strong technical skills and problem-solving abilities. I have experience in software development and am passionate about learning new technologies. I work well in teams and thrive in challenging environments.' },
    { q: 'What are your strengths?', ans: 'My key strengths include analytical thinking, adaptability, and strong communication skills. I excel at breaking down complex problems and finding efficient solutions. I am also a quick learner who can adapt to new technologies and methodologies.' },
    { q: 'What are your weaknesses?', ans: 'I sometimes focus too much on perfecting details, which can slow me down. However, I have learned to balance quality with deadlines by prioritizing tasks and knowing when good enough is sufficient while maintaining high standards.' },
    { q: 'Why should we hire you?', ans: 'I bring a combination of technical expertise, problem-solving skills, and enthusiasm to learn. I am committed to delivering quality work and contributing to team success. My adaptability and willingness to take on challenges make me a valuable asset.' },
    { q: 'Where do you see yourself in 5 years?', ans: 'In five years, I see myself as a senior professional in my field, having gained deep expertise and contributed to significant projects. I aim to take on leadership responsibilities while continuing to develop my technical skills and mentor junior team members.' },
    { q: 'Why do you want to work here?', ans: 'I am impressed by your company culture, innovative projects, and commitment to employee growth. The opportunity to work with cutting-edge technologies and talented professionals aligns perfectly with my career goals and passion for continuous learning.' },
    { q: 'Describe a challenging situation', ans: 'In a previous project, we faced tight deadlines with changing requirements. I collaborated with the team to prioritize features, communicated transparently with stakeholders, and worked extra hours when needed. We successfully delivered the project on time.' },
    { q: 'How do you handle pressure?', ans: 'I handle pressure by staying organized, breaking tasks into manageable parts, and maintaining clear communication. I prioritize effectively, stay focused on solutions rather than problems, and use stress as motivation to perform at my best while maintaining work-life balance.' }
  ];

  const mockInterviewQuestions = [
    { type: 'technical', q: 'Explain the difference between a stack and a queue' },
    { type: 'technical', q: 'What is the time complexity of searching in a binary search tree?' },
    { type: 'technical', q: 'Explain how garbage collection works in programming languages' },
    { type: 'technical', q: 'What is the difference between SQL and NoSQL databases?' },
    { type: 'technical', q: 'Explain what an API is and why it is important' },
    { type: 'technical', q: 'What is the purpose of using version control systems like Git?' },
    { type: 'technical', q: 'Explain the concept of object-oriented programming' },
    { type: 'technical', q: 'What is the difference between synchronous and asynchronous programming?' },
    { type: 'technical', q: 'Explain what REST API is and its principles' },
    { type: 'technical', q: 'What are the main principles of SOLID in software design?' },
    { type: 'hr', q: 'Tell me about yourself and your background' },
    { type: 'hr', q: 'Why are you interested in this position?' },
    { type: 'hr', q: 'Describe a time when you faced a difficult challenge at work' },
    { type: 'hr', q: 'How do you prioritize tasks when working on multiple projects?' },
    { type: 'hr', q: 'What motivates you in your professional life?' },
    { type: 'hr', q: 'How do you handle constructive criticism?' },
    { type: 'hr', q: 'Describe your ideal work environment' },
    { type: 'hr', q: 'What are your salary expectations?' },
    { type: 'hr', q: 'How do you stay updated with industry trends?' },
    { type: 'hr', q: 'Do you have any questions for us?' }
  ];

  // Fetch companies from Firebase
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { db } = await import('../firebase');
        const { collection, getDocs } = await import('firebase/firestore');
        const companiesCollection = collection(db, 'companies');
        const companiesSnapshot = await getDocs(companiesCollection);
        const companiesList = companiesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCompanies(companiesList);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    
    fetchCompanies();
  }, []);

  useEffect(() => {
    let timer;
    if (isRecording && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, timeLeft]);

  const startRecording = async () => {
    try {
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Your browser does not support camera access. Please use a modern browser like Chrome, Firefox, or Edge.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTimeLeft(90);
    } catch (err) {
      console.error('Camera error:', err);
      let errorMessage = 'Unable to access camera. ';
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage += 'Please allow camera and microphone permissions in your browser settings and try again.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage += 'No camera or microphone found. Please connect a camera and try again.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage += 'Camera is already in use by another application. Please close other apps using the camera.';
      } else if (err.name === 'OverconstrainedError') {
        errorMessage += 'Camera does not support the required settings.';
      } else if (err.name === 'SecurityError') {
        errorMessage += 'Camera access blocked due to security settings. Please use HTTPS or localhost.';
      } else {
        errorMessage += 'Error: ' + err.message;
      }
      
      alert(errorMessage);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      streamRef.current?.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const retakeVideo = () => {
    setRecordedVideo(null);
    setUserAnswer('');
    setChatMessages([]);
  };

  const handleSendMessage = async () => {
    // Check if user has entered their answer
    if (!userAnswer.trim()) {
      alert('Please type your answer in the text area above first!');
      return;
    }

    // Use chatInput if provided, otherwise use default request
    const userMessage = chatInput.trim() || "Please provide a refined version of my answer";
    
    const userMsg = { role: 'user', content: userMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Add loading message
    setChatMessages(prev => [...prev, { role: 'assistant', content: 'Analyzing your answer...' }]);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are an interview coach. The candidate was asked: "${mockInterviewQuestions[currentMockQuestion].q}"

Their answer was: "${userAnswer}"

User request: "${userMessage}"

Provide a refined, improved version of their answer that:
1. Is more structured and professional
2. Highlights key points clearly
3. Is 4-5 sentences long
4. Maintains the candidate's core message but enhances it

Provide ONLY the refined answer, no preamble or explanations.`
          }]
        })
      });

      const data = await response.json();
      const refinedAnswer = data.content[0].text;
      
      // Remove loading message and add real response
      setChatMessages(prev => {
        const filtered = prev.filter(msg => msg.content !== 'Analyzing your answer...');
        return [...filtered, { role: 'assistant', content: refinedAnswer }];
      });
    } catch (err) {
      console.error('AI Error:', err);
      setChatMessages(prev => {
        const filtered = prev.filter(msg => msg.content !== 'Analyzing your answer...');
        return [...filtered, { role: 'assistant', content: 'Error getting refined answer. Please check your connection and try again.' }];
      });
    }
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const questions = selectedCategory === 'aptitude' ? aptitudeQuestions :
                     selectedCategory === 'technical' ? technicalQuestions : [];
    
    if (index === questions[currentQuestion].ans) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    const questions = selectedCategory === 'aptitude' ? aptitudeQuestions :
                     selectedCategory === 'technical' ? technicalQuestions :
                     selectedCategory === 'coding' ? codingQuestions : hrQuestions;
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      alert(`Quiz completed! Score: ${score}/${questions.length}`);
      setCurrentView('home');
      setSelectedCategory(null);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  const renderHome = () => (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading1}>Interview Preparation Platform</h1>
      <div style={styles.grid}>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer" onClick={() => setCurrentView('general')}>
          <h2 style={{...styles.heading3, color: '#2563eb'}}>General Practice</h2>
          <p style={{color: '#6b7280'}}>Practice aptitude, technical, coding, and HR questions</p>
        </div>
        <div style={styles.card} onClick={() => setCurrentView('company')} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)'} onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}>
          <h2 style={{...styles.heading3, color: '#10b981'}}>Company-Specific</h2>
          <p style={{color: '#6b7280'}}>Prepare for your saved companies with targeted questions</p>
        </div>
        <div style={styles.card} onClick={() => setCurrentView('mock')} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)'} onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}>
          <h2 style={{...styles.heading3, color: '#9333ea'}}>AI Mock Interview</h2>
          <p style={{color: '#6b7280'}}>Practice with AI-powered video interviews and get instant feedback</p>
        </div>
      </div>
      {onBack && (
        <button 
          onClick={onBack} 
          style={{...styles.button, ...styles.buttonPrimary, marginTop: '24px'}}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}
        >
          ← Back to Companies
        </button>
      )}
    </div>
  );

  const renderGeneral = () => (
    <div style={styles.pageContainer}>
      <button onClick={() => setCurrentView('home')} style={styles.backButton}>← Back</button>
      <h1 style={styles.heading2}>General Practice</h1>
      <div style={styles.grid}>
        <div style={{...styles.categoryCard, backgroundColor: '#dbeafe'}} onClick={() => {setSelectedCategory('aptitude'); setCurrentView('questions');}} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#bfdbfe'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#dbeafe'}>
          <h3 style={styles.heading3}>Aptitude</h3>
          <p style={{color: '#374151'}}>8 questions</p>
        </div>
        <div style={{...styles.categoryCard, backgroundColor: '#d1fae5'}} onClick={() => {setSelectedCategory('technical'); setCurrentView('questions');}} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a7f3d0'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d1fae5'}>
          <h3 style={styles.heading3}>Technical</h3>
          <p style={{color: '#374151'}}>8 questions</p>
        </div>
        <div style={{...styles.categoryCard, backgroundColor: '#fef3c7'}} onClick={() => {setSelectedCategory('coding'); setCurrentView('questions');}} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fde68a'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fef3c7'}>
          <h3 style={styles.heading3}>Coding</h3>
          <p style={{color: '#374151'}}>8 challenges</p>
        </div>
        <div style={{...styles.categoryCard, backgroundColor: '#e9d5ff'}} onClick={() => {setSelectedCategory('hr'); setCurrentView('questions');}} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d8b4fe'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e9d5ff'}>
          <h3 style={styles.heading3}>HR Round</h3>
          <p style={{color: '#374151'}}>8 questions</p>
        </div>
      </div>
    </div>
  );

  const renderQuestions = () => {
    const questions = selectedCategory === 'aptitude' ? aptitudeQuestions :
                     selectedCategory === 'technical' ? technicalQuestions :
                     selectedCategory === 'coding' ? codingQuestions : hrQuestions;
    const current = questions[currentQuestion];

    if (selectedCategory === 'coding') {
      return (
        <div style={styles.pageContainer}>
          <button onClick={() => {setCurrentView('general'); setSelectedCategory(null);}} style={styles.backButton}>← Back</button>
          <div style={styles.questionCard}>
            <div style={{marginBottom: '24px'}}>
              <span style={{...styles.badge, ...(current.diff === 'easy' ? styles.badgeEasy : current.diff === 'medium' ? styles.badgeMedium : styles.badgeHard)}}>
                {current.diff}
              </span>
              <span style={{marginLeft: '16px', color: '#6b7280'}}>Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            <h2 style={styles.heading3}>{current.q}</h2>
            <div style={{backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '6px', marginBottom: '16px'}}>
              <p style={{fontSize: '14px', color: '#374151'}}><strong>Hint:</strong> {current.hint}</p>
            </div>
            <div style={{...styles.explanation, marginBottom: '24px'}}>
              <p style={{fontSize: '14px'}}><strong>Explanation:</strong> {current.exp}</p>
            </div>
            <button onClick={nextQuestion} style={{...styles.button, ...styles.buttonPrimary}} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish'}
            </button>
          </div>
        </div>
      );
    }

    if (selectedCategory === 'hr') {
      return (
        <div style={styles.pageContainer}>
          <button onClick={() => {setCurrentView('general'); setSelectedCategory(null);}} style={styles.backButton}>← Back</button>
          <div style={styles.questionCard}>
            <div style={{marginBottom: '24px'}}>
              <span style={{color: '#6b7280'}}>Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            <h2 style={styles.heading3}>{current.q}</h2>
            <div style={{backgroundColor: '#f0fdf4', padding: '24px', borderRadius: '6px', marginBottom: '24px'}}>
              <p style={{fontWeight: '600', marginBottom: '8px'}}>Sample Answer:</p>
              <p style={{color: '#374151', lineHeight: '1.6'}}>{current.ans}</p>
            </div>
            <button onClick={nextQuestion} style={{...styles.button, ...styles.buttonPrimary}} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.pageContainer}>
        <button onClick={() => {setCurrentView('general'); setSelectedCategory(null);}} style={styles.backButton}>← Back</button>
        <div style={styles.questionCard}>
          <div style={{marginBottom: '24px'}}>
            <span style={{...styles.badge, ...(current.diff === 'easy' ? styles.badgeEasy : current.diff === 'medium' ? styles.badgeMedium : styles.badgeHard)}}>
              {current.diff}
            </span>
            <span style={{marginLeft: '16px', color: '#6b7280'}}>Question {currentQuestion + 1} of {questions.length}</span>
            <span style={{marginLeft: '16px', color: '#6b7280'}}>Score: {score}/{questions.length}</span>
          </div>
          <h2 style={{...styles.heading3, marginBottom: '24px'}}>{current.q}</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px'}}>
            {current.opts.map((opt, idx) => {
              let optionStyle = {...styles.optionButton};
              if (showExplanation && idx === current.ans) {
                optionStyle = {...optionStyle, ...styles.optionCorrect};
              } else if (showExplanation && idx === selectedAnswer && idx !== current.ans) {
                optionStyle = {...optionStyle, ...styles.optionWrong};
              } else if (selectedAnswer === idx) {
                optionStyle = {...optionStyle, ...styles.optionSelected};
              }
              
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showExplanation}
                  style={optionStyle}
                  onMouseEnter={e => !showExplanation && (e.currentTarget.style.borderColor = '#3b82f6')}
                  onMouseLeave={e => {
                    if (!showExplanation && selectedAnswer !== idx) {
                      e.currentTarget.style.borderColor = '#d1d5db';
                    }
                  }}
                >
                  {opt}
                  {showExplanation && idx === current.ans && <Check style={{display: 'inline', marginLeft: '8px', color: '#10b981'}} size={20} />}
                  {showExplanation && idx === selectedAnswer && idx !== current.ans && <X style={{display: 'inline', marginLeft: '8px', color: '#ef4444'}} size={20} />}
                </button>
              );
            })}
          </div>
          {showExplanation && (
            <div style={styles.explanation}>
              <p style={{fontWeight: '600', marginBottom: '8px'}}>Explanation:</p>
              <p>{current.exp}</p>
            </div>
          )}
          {showExplanation && (
            <button onClick={nextQuestion} style={{...styles.button, ...styles.buttonPrimary}} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish'}
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderMockInterview = () => {
    const currentQ = mockInterviewQuestions[currentMockQuestion];

    return (
      <div style={styles.pageContainer}>
        <button onClick={() => {setCurrentView('home'); setCurrentMockQuestion(0); setRecordedVideo(null);}} style={styles.backButton}>← Back</button>
        
        {currentMockQuestion === 0 && !isRecording && !recordedVideo && (
          <div style={{maxWidth: '600px', margin: '0 auto', ...styles.card}}>
            <h2 style={{...styles.heading2, color: '#9333ea'}}>AI Mock Interview</h2>
            <div style={{marginBottom: '24px', color: '#374151'}}>
              <p style={{marginBottom: '16px'}}>Welcome to the AI Mock Interview! Here's how it works:</p>
              <ul style={{listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <li>You will be presented with 20 interview questions (10 technical + 10 HR)</li>
                <li>Click "Start" to begin recording your answer</li>
                <li>You have 1 minute 30 seconds to answer each question</li>
                <li>After recording, you can replay your answer or retake it</li>
                <li>Use the AI chat assistant to get a refined version of your answer</li>
              </ul>
            </div>
            <button onClick={startRecording} style={{...styles.button, ...styles.buttonPurple}} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7e22ce'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#9333ea'}>
              <Play size={20} /> Start Interview
            </button>
          </div>
        )}

        {(isRecording || recordedVideo) && (
          <div style={{maxWidth: '1200px', margin: '0 auto'}}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px'}}>
              <div style={styles.card}>
                <div style={{marginBottom: '16px'}}>
                  <span style={{...styles.badge, ...(currentQ.type === 'technical' ? styles.badgeTechnical : styles.badgeHr)}}>
                    {currentQ.type.toUpperCase()}
                  </span>
                  <span style={{marginLeft: '16px', color: '#6b7280'}}>Question {currentMockQuestion + 1}/20</span>
                </div>
                <h3 style={{...styles.heading3, marginBottom: '16px'}}>{currentQ.q}</h3>
                
                <div style={styles.video}>
                  {!recordedVideo ? (
                    <video ref={videoRef} style={{width: '100%'}} autoPlay muted />
                  ) : (
                    <video src={recordedVideo} style={{width: '100%'}} controls />
                  )}
                </div>

                {isRecording && (
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
                    <div style={styles.timer}>
                      <Clock size={20} />
                      <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <button onClick={stopRecording} style={{...styles.button, ...styles.buttonDanger}} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dc2626'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ef4444'}>
                      <StopCircle size={20} /> Stop
                    </button>
                  </div>
                )}

                {recordedVideo && (
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    <button onClick={retakeVideo} style={{...styles.button, ...styles.buttonWarning, width: '100%', justifyContent: 'center'}} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d97706'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f59e0b'}>
                      <RefreshCw size={20} /> Retake
                    </button>
                    <button 
                      onClick={() => {
                        if (currentMockQuestion < mockInterviewQuestions.length - 1) {
                          setCurrentMockQuestion(currentMockQuestion + 1);
                          setRecordedVideo(null);
                          setUserAnswer('');
                          setChatMessages([]);
                        } else {
                          alert('Mock interview completed!');
                          setCurrentView('home');
                          setCurrentMockQuestion(0);
                        }
                      }}
                      style={{...styles.button, ...styles.buttonSuccess, width: '100%', justifyContent: 'center'}}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#059669'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#10b981'}
                    >
                      Next Question →
                    </button>
                  </div>
                )}
              </div>

              <div style={styles.chatContainer}>
                <h3 style={{...styles.heading3, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px'}}>
                  <MessageSquare /> AI Answer Refinement
                </h3>
                
                {!recordedVideo && (
                  <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280'}}>
                    Complete your recording to get AI feedback
                  </div>
                )}

                {recordedVideo && (
                  <>
                    <div style={styles.chatMessages}>
                      {chatMessages.length === 0 && (
                        <div style={{color: '#6b7280', textAlign: 'center', padding: '32px 0'}}>
                          Type your answer in the box below, and I'll provide a refined version!
                        </div>
                      )}
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} style={msg.role === 'user' ? styles.chatUser : styles.chatAi}>
                          <p style={{fontWeight: '600', marginBottom: '4px'}}>{msg.role === 'user' ? 'You' : 'AI Coach'}</p>
                          <p style={{color: '#374151'}}>{msg.content}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                      <textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        style={{...styles.textarea, height: '96px'}}
                      />
                      <div style={{display: 'flex', gap: '8px'}}>
                        <input
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Ask for refined answer..."
                          style={{...styles.input, flex: 1}}
                        />
                        <button
                          onClick={handleSendMessage}
                          style={{...styles.button, ...styles.buttonPurple}}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7e22ce'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#9333ea'}
                        >
                          <Send size={20} /> Send
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCompany = () => (
    <div style={styles.pageContainer}>
      <button onClick={() => setCurrentView('home')} style={styles.backButton}>← Back</button>
      <h1 style={styles.heading2}>Company-Specific Preparation</h1>
      {companies.length === 0 ? (
        <div style={{textAlign: 'center', padding: '40px', color: '#6b7280'}}>
          <p>Loading companies...</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {companies.map(company => (
            <div 
              key={company.id} 
              style={styles.card} 
              onClick={() => {
                if (onCompanySelect) {
                  onCompanySelect(company);
                }
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)'} 
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
            >
              <h3 style={styles.heading3}>{company.name}</h3>
              <p style={{color: '#6b7280'}}>Practice questions specific to {company.name} interviews</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={{...styles.sidebar, ...(sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed)}}>
        <div style={styles.sidebarContent}>
          <h2 style={styles.sidebarTitle}>Interview Prep</h2>
          <nav style={styles.nav}>
            <button
              onClick={() => setCurrentView('home')}
              style={styles.navButton}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#374151'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              🏠 Home
            </button>
            <button
              onClick={() => setCurrentView('general')}
              style={styles.navButton}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#374151'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              📚 General
            </button>
            <button
              onClick={() => setCurrentView('company')}
              style={styles.navButton}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#374151'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              🏢 Company-Specific
            </button>
            <button
              onClick={() => setCurrentView('mock')}
              style={styles.navButton}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#374151'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              🎥 AI Mock Interview
            </button>
          </nav>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={{padding: '16px'}}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={styles.menuButton}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#374151'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1f2937'}
          >
            <Menu size={24} />
          </button>
        </div>
        
        {currentView === 'home' && renderHome()}
        {currentView === 'general' && renderGeneral()}
        {currentView === 'questions' && renderQuestions()}
        {currentView === 'mock' && renderMockInterview()}
        {currentView === 'company' && renderCompany()}
      </div>
    </div>
  );
};

export default GeneralAI;