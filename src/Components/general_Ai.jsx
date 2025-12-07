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
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [timeLeft, setTimeLeft] = useState(90);
  const [currentMockQuestion, setCurrentMockQuestion] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [aiGeneratedQuestions, setAiGeneratedQuestions] = useState([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [showInterviewStart, setShowInterviewStart] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  
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

  useEffect(() => {
    if (!window.pdfjsLib) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
      };
      document.body.appendChild(script);
    }

    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      recognitionInstance.maxAlternatives = 1;

      recognitionInstance.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript + ' ';
          } else {
            interim += transcript;
          }
        }

        if (final) {
          setFinalTranscript(prev => prev + final);
        }
        setInterimTranscript(interim);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          console.log('No speech detected, continuing...');
        }
      };

      recognitionInstance.onend = () => {
  console.log('Recognition ended, isRecording:', isRecording);
  // Don't restart if we're not recording anymore
};

      setRecognition(recognitionInstance);
      console.log('✅ Speech Recognition initialized');
    } else {
      console.warn('⚠️ Speech Recognition not supported in this browser');
    }
  }, []);

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('Resume upload started:', file.name);
    setIsGeneratingQuestions(true);

    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        let extractedText = '';

        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
          try {
            console.log('Processing PDF...');
            
            if (!window.pdfjsLib) {
              await new Promise((resolve, reject) => {
                let attempts = 0;
                const checkPdfJs = setInterval(() => {
                  attempts++;
                  if (window.pdfjsLib) {
                    clearInterval(checkPdfJs);
                    resolve();
                  } else if (attempts > 50) {
                    clearInterval(checkPdfJs);
                    reject(new Error('PDF.js failed to load'));
                  }
                }, 100);
              });
            }

            const typedarray = new Uint8Array(e.target.result);
            
            const loadingTask = window.pdfjsLib.getDocument({
              data: typedarray,
              cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
              cMapPacked: true,
            });
            
            const pdf = await loadingTask.promise;
            console.log(`PDF loaded: ${pdf.numPages} pages`);
            
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map(item => item.str).join(' ');
              extractedText += pageText + ' ';
            }
            
            extractedText = extractedText.replace(/\s+/g, ' ').trim();
            console.log(`Extracted text length: ${extractedText.length}`);
            
            if (extractedText.length === 0) {
              throw new Error('PDF contains no extractable text');
            }
            
          } catch (err) {
            console.error('PDF parsing error:', err);
            alert(`Unable to read PDF: ${err.message}\n\nPlease try:\n1. Uploading as .txt file\n2. Ensuring PDF is not scanned/image-based\n3. Using a different PDF`);
            setIsGeneratingQuestions(false);
            return;
          }
        } else {
          extractedText = e.target.result.trim();
          console.log('Text file loaded, length:', extractedText.length);
        }

        if (!extractedText || extractedText.trim().length < 50) {
          alert(`Resume too short (${extractedText.length} characters).\n\nPlease ensure your resume has sufficient content.`);
          setIsGeneratingQuestions(false);
          return;
        }

        console.log('Sending to backend...');
        setResumeText(extractedText);
        await generateQuestionsFromResume(extractedText);
      };

      reader.onerror = (error) => {
        console.error('File reader error:', error);
        alert('Error reading file. Please try again.');
        setIsGeneratingQuestions(false);
      };

      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error uploading resume: ' + err.message);
      setIsGeneratingQuestions(false);
    }
  };

  const generateQuestionsFromResume = async (resumeText) => {
    try {
      console.log('Generating questions with Groq AI...');
      
      const limitedResumeText = resumeText.substring(0, 4000);
      const API_URL = 'http://localhost:3001/api/generate-questions';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: limitedResumeText
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', response.status, errorText);
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.content || !data.content[0] || !data.content[0].text) {
        throw new Error('Invalid response from server');
      }
      
      let questionsText = data.content[0].text.trim();
      
      questionsText = questionsText.replace(/```json\s*/g, '');
      questionsText = questionsText.replace(/```\s*/g, '');
      questionsText = questionsText.replace(/^[^[]*/, '');
      questionsText = questionsText.replace(/[^\]]*$/, '');
      questionsText = questionsText.trim();
      
      console.log('Parsing questions...');
      const questions = JSON.parse(questionsText);
      
      if (!Array.isArray(questions) || questions.length < 10) {
        throw new Error('Invalid questions format or too few questions');
      }
      
      console.log(`✅ Generated ${questions.length} questions successfully!`);
      setAiGeneratedQuestions(questions);
      setResumeUploaded(true);
      setShowInterviewStart(true);
      setIsGeneratingQuestions(false);
      
    } catch (err) {
      console.error('Question generation error:', err);
      
      let errorMessage = `Failed to generate questions: ${err.message}\n\n`;
      
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage += 'Cannot connect to backend server.\n\n';
        errorMessage += 'Please ensure:\n';
        errorMessage += '1. Backend server is running (npm start in server folder)\n';
        errorMessage += '2. Server is running on http://localhost:3001\n';
        errorMessage += '3. Check terminal for any server errors';
      } else if (err.message.includes('status 500')) {
        errorMessage += ' Server error.\n\n';
        errorMessage += 'Please check:\n';
        errorMessage += '1. GROQ_API_KEY is set in .env file\n';
        errorMessage += '2. API key is valid\n';
        errorMessage += '3. Server terminal for error details';
      } else {
        errorMessage += 'Please check:\n';
        errorMessage += '1. Backend server is running\n';
        errorMessage += '2. Groq API key is correct in .env\n';
        errorMessage += '3. Resume has enough content';
      }
      
      alert(errorMessage);
      setIsGeneratingQuestions(false);
      setResumeUploaded(false);
    }
  };

  const getAutoRefinement = async (transcribedText) => {
    const currentQ = aiGeneratedQuestions[currentMockQuestion];
    
    setChatMessages([
      { role: 'assistant', content: 'Analyzing your answer and providing feedback...' }
    ]);

    try {
      console.log('Getting automatic AI refinement...');
      const API_URL = 'http://localhost:3001/api/refine-answer';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.q,
          answer: transcribedText,
          userRequest: "Please provide a refined, professional version of my answer with feedback on what I did well and what could be improved."
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', response.status, errorText);
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.content || !data.content[0] || !data.content[0].text) {
        throw new Error('Invalid response from server');
      }
      
      const refinedAnswer = data.content[0].text.trim();
      
      setChatMessages([
        { role: 'assistant', content: refinedAnswer }
      ]);
      
    } catch (err) {
      console.error('AI refinement error:', err);
      
      setChatMessages([
        { 
          role: 'assistant', 
          content: `I've transcribed your answer successfully! You can review it above and ask me specific questions about how to improve it.\n\nYour transcribed answer:\n"${transcribedText}"`
        }
      ]);
    }
  };

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Your browser does not support camera access. Please use a modern browser like Chrome, Firefox, or Edge.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      
      setIsRecording(true);
      setTimeLeft(90);
      setFinalTranscript('');
      setInterimTranscript('');
      
      // Small delay to ensure state updates before setting video
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(err => console.error('Play error:', err));
        }
      }, 100);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8,opus'
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };


      mediaRecorder.onstop = async () => {
  console.log('Recording stopped, chunks collected:', chunksRef.current.length);
  
  if (chunksRef.current.length === 0) {
    console.error('No data recorded!');
    alert('Recording failed - no data captured. Please try again.');
    setIsTranscribing(false);
    return;
  }
  
  const blob = new Blob(chunksRef.current, { type: 'video/webm' });
  console.log('Created blob, size:', blob.size, 'bytes');
  
  if (blob.size < 1000) {
    console.error('Blob too small:', blob.size);
    alert('Recording is too short or empty. Please try again.');
    setIsTranscribing(false);
    return;
  }
  
  const url = URL.createObjectURL(blob);
  setRecordedVideo(url);
  setRecordedBlob(blob);
  
  // Use the captured transcript from window object
  const transcribedText = window.capturedTranscript || '';
  console.log('Using captured transcript:', transcribedText.length, 'characters');
  
  if (transcribedText) {
    console.log(' Speech Recognition transcribed:', transcribedText.length, 'characters');
    setUserAnswer(transcribedText);
    setIsTranscribing(false);
    
    // Automatically get AI refinement
    await getAutoRefinement(transcribedText);
  } else {
    console.warn(' No speech detected during recording');
    setIsTranscribing(false);
    alert('No speech was detected. Please type your answer manually or try recording again.');
  }
  
  // Clear the captured transcript
  window.capturedTranscript = '';
};

      mediaRecorder.start(1000);
      console.log('MediaRecorder started');
      
      // Start speech recognition
      if (recognition) {
        try {
          recognition.start();
          console.log('✅ Speech Recognition started');
        } catch (e) {
          console.warn('Speech Recognition already started or error:', e);
        }
      } else {
        console.warn('⚠️ Speech Recognition not available - transcription will not work');
        alert('Speech recognition is not available in your browser. You can still record video, but you\'ll need to type your answer manually.');
      }
      
    } catch (err) {
      console.error('Camera error:', err);
      let errorMessage = 'Unable to access camera. ';
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage += 'Please allow camera and microphone permissions in your browser settings and try again.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage += 'No camera or microphone found. Please connect a camera and try again.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage += 'Camera is already in use by another application. Please close other apps using the camera.';
      } else {
        errorMessage += 'Error: ' + err.message;
      }
      
      alert(errorMessage);
    }
  };

  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      // Capture transcript BEFORE stopping recognition
      const capturedTranscript = finalTranscript.trim();
      console.log('Captured transcript before stop:', capturedTranscript);
      
      // Stop recognition first
      if (recognition) {
        recognition.stop();
      }
      
      // Stop recording
      mediaRecorderRef.current.stop();
      streamRef.current?.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsTranscribing(true);
      
      // Store the captured transcript in a ref or pass it directly
      window.capturedTranscript = capturedTranscript;
    }
  };

  const retakeVideo = () => {
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo);
    }
    setRecordedVideo(null);
    setRecordedBlob(null);
    setUserAnswer('');
    setChatMessages([]);
    setTimeLeft(90);
    setFinalTranscript('');
    setInterimTranscript('');
  };

  const replayVideo = () => {
    if (videoRef.current && recordedVideo) {
      videoRef.current.src = recordedVideo;
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  const submitVideo = () => {
    if (!userAnswer.trim()) {
      alert('Please wait for transcription to complete or type your answer manually!');
      return;
    }
    
    // Only send manual message if user has typed something in the chat input
    if (chatInput.trim()) {
      handleSendMessage();
    }
  };

  const goToNextQuestion = () => {
    if (currentMockQuestion < aiGeneratedQuestions.length - 1) {
      if (recordedVideo) {
        URL.revokeObjectURL(recordedVideo);
      }
      
      setCurrentMockQuestion(currentMockQuestion + 1);
      setRecordedVideo(null);
      setRecordedBlob(null);
      setUserAnswer('');
      setChatMessages([]);
      setIsRecording(false);
      setTimeLeft(90);
      setFinalTranscript('');
      setInterimTranscript('');
    } else {
      alert('Mock interview completed! Great job!');
      resetMockInterview();
    }
  };

  const resetMockInterview = () => {
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo);
    }
    
    setCurrentView('home');
    setCurrentMockQuestion(0);
    setRecordedVideo(null);
    setRecordedBlob(null);
    setUserAnswer('');
    setChatMessages([]);
    setIsRecording(false);
    setResumeUploaded(false);
    setResumeText('');
    setAiGeneratedQuestions([]);
    setShowInterviewStart(false);
    setTimeLeft(90);
    setFinalTranscript('');
    setInterimTranscript('');
  };

  const handleSendMessage = async () => {
    if (!userAnswer.trim()) {
      alert('Please type your answer in the text area above first!');
      return;
    }

    const currentQ = aiGeneratedQuestions[currentMockQuestion];
    const userMessage = chatInput.trim() || "Please provide a refined, professional version of my answer";
    
    const userMsg = { role: 'user', content: userMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setChatMessages(prev => [...prev, { role: 'assistant', content: 'Analyzing your answer...' }]);

    try {
      console.log('Refining answer with Groq AI...');
      const API_URL = 'http://localhost:3001/api/refine-answer';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.q,
          answer: userAnswer,
          userRequest: userMessage
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', response.status, errorText);
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.content || !data.content[0] || !data.content[0].text) {
        throw new Error('Invalid response from server');
      }
      
      const refinedAnswer = data.content[0].text.trim();
      
      setChatMessages(prev => {
        const filtered = prev.filter(msg => msg.content !== 'Analyzing your answer...');
        return [...filtered, { role: 'assistant', content: refinedAnswer }];
      });
      
    } catch (err) {
      console.error('AI refinement error:', err);
      
      let errorMessage = `Error: ${err.message}\n\n`;
      
      if (err.message.includes('Failed to fetch')) {
        errorMessage += 'Cannot connect to backend server. Please ensure the server is running on http://localhost:3001';
      } else {
        errorMessage += 'Your original answer is good! Keep practicing.';
      }
      
      setChatMessages(prev => {
        const filtered = prev.filter(msg => msg.content !== 'Analyzing your answer...');
        return [...filtered, { 
          role: 'assistant', 
          content: errorMessage
        }];
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
        <div style={styles.card} onClick={() => setCurrentView('general')} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)'} onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}>
          <h2 style={{...styles.heading3, color: '#2563eb'}}>General Section</h2>
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
          ← Back to Home 
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
    if (!resumeUploaded) {
      return (
        <div style={styles.pageContainer}>
          <button onClick={() => setCurrentView('home')} style={styles.backButton}>← Back</button>
          
          <div style={{maxWidth: '600px', margin: '0 auto', ...styles.card}}>
            <h2 style={{...styles.heading2, color: '#9333ea'}}>AI Mock Interview</h2>
            <div style={{marginBottom: '24px', color: '#374151'}}>
              <p style={{marginBottom: '16px'}}>Welcome to the AI-powered Mock Interview!</p>
              <p style={{marginBottom: '16px'}}>Please upload your resume (PDF or TXT format). The AI will analyze your skills, projects, and experience to generate personalized interview questions.</p>
              <ul style={{listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <li>Upload your resume to get started</li>
                <li>AI will generate personalized questions</li>
                <li>You'll have 90 seconds per question</li>
                <li>Get AI-powered feedback on your answers</li>
              </ul>
            </div>

            {isGeneratingQuestions ? (
              <div style={{textAlign: 'center', padding: '32px 0'}}>
                <p style={{color: '#9333ea', fontSize: '18px', marginBottom: '16px', fontWeight: 'bold'}}>🔍 Analyzing your resume...</p>
                <p style={{color: '#6b7280', fontSize: '14px'}}>This may take a few seconds...</p>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleResumeUpload}
                  style={{display: 'none'}}
                  id="resume-upload"
                />
                <label htmlFor="resume-upload">
                  <div
                    style={{
                      ...styles.button,
                      ...styles.buttonPurple,
                      width: '100%',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7e22ce'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#9333ea'}
                  >
                    📄 Upload Resume (PDF or TXT)
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (showInterviewStart) {
      return (
        <div style={styles.pageContainer}>
          <button onClick={resetMockInterview} style={styles.backButton}>← Back</button>
          
          <div style={{maxWidth: '600px', margin: '0 auto', ...styles.card}}>
            <h2 style={{...styles.heading2, color: '#9333ea'}}>Ready to Start!</h2>
            <div style={{marginBottom: '24px', color: '#374151'}}>
              <p style={{marginBottom: '16px'}}>Your personalized questions are ready! Here's what to expect:</p>
              <ul style={{listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <li>{aiGeneratedQuestions.length} questions based on your resume</li>
                <li>90 seconds per question</li>
                <li>Video recording of your answers</li>
                <li>AI-powered answer refinement</li>
              </ul>
            </div>
            <button 
              onClick={() => setShowInterviewStart(false)} 
              style={{...styles.button, ...styles.buttonPurple, width: '100%', justifyContent: 'center'}} 
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7e22ce'} 
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#9333ea'}
            >
              <Play size={20} /> Start Interview
            </button>
          </div>
        </div>
      );
    }

    const currentQ = aiGeneratedQuestions[currentMockQuestion];

    return (
      <div style={styles.pageContainer}>
        <button onClick={resetMockInterview} style={styles.backButton}>← Back</button>
        
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px'}}>
            <div style={styles.card}>
              <div style={{marginBottom: '16px'}}>
                <span style={{...styles.badge, ...(currentQ.type === 'technical' ? styles.badgeTechnical : styles.badgeHr)}}>
                  {currentQ.type.toUpperCase()}
                </span>
                <span style={{marginLeft: '16px', color: '#6b7280'}}>Question {currentMockQuestion + 1}/{aiGeneratedQuestions.length}</span>
              </div>
              <h3 style={{...styles.heading3, marginBottom: '16px'}}>{currentQ.q}</h3>
              
              <div style={styles.video}>
                {isRecording ? (
                  <video ref={videoRef} style={{width: '100%', height: '400px'}} autoPlay muted />
                ) : recordedVideo ? (
                  <video ref={videoRef} src={recordedVideo} style={{width: '100%', height: '400px'}} controls />
                ) : (
                  <div style={{width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280'}}>
                    Click "Start Recording" to begin
                  </div>
                )}
              </div>

              {isRecording && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={styles.timer}>
                      <Clock size={20} />
                      <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <button onClick={stopRecording} style={{...styles.button, ...styles.buttonDanger}} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dc2626'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ef4444'}>
                      <StopCircle size={20} /> Stop Recording
                    </button>
                  </div>
                  {(finalTranscript || interimTranscript) && (
                    <div style={{backgroundColor: '#f0fdf4', padding: '12px', borderRadius: '6px', border: '2px solid #10b981'}}>
                      <p style={{fontSize: '12px', fontWeight: 'bold', color: '#059669', marginBottom: '4px'}}>🎤 Live Transcription:</p>
                      <p style={{fontSize: '14px', color: '#374151'}}>
                        {finalTranscript}
                        <span style={{color: '#9ca3af'}}>{interimTranscript}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {recordedVideo && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  <button 
                    onClick={replayVideo} 
                    style={{...styles.button, ...styles.buttonPrimary, width: '100%', justifyContent: 'center'}} 
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'} 
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}
                  >
                    <Play size={20} /> Replay Video
                  </button>
                  <button 
                    onClick={retakeVideo} 
                    style={{...styles.button, ...styles.buttonWarning, width: '100%', justifyContent: 'center'}} 
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d97706'} 
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f59e0b'}
                  >
                    <RefreshCw size={20} /> Retake Answer
                  </button>
                  <button 
                    onClick={submitVideo}
                    style={{...styles.button, ...styles.buttonPurple, width: '100%', justifyContent: 'center'}}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7e22ce'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#9333ea'}
                  >
                    <Check size={20} /> Submit Answer
                  </button>
                  {chatMessages.length > 0 && (
                    <button 
                      onClick={goToNextQuestion}
                      style={{...styles.button, ...styles.buttonSuccess, width: '100%', justifyContent: 'center'}}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#059669'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#10b981'}
                    >
                      Next Question <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              )}

              {!isRecording && !recordedVideo && (
                <button 
                  onClick={startRecording}
                  style={{...styles.button, ...styles.buttonPurple, width: '100%', justifyContent: 'center'}}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7e22ce'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#9333ea'}
                >
                  <Play size={20} /> Start Recording
                </button>
              )}
            </div>

            <div style={styles.chatContainer}>
              <h3 style={{...styles.heading3, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px'}}>
                <MessageSquare /> AI Answer Refinement
              </h3>
              
              {!recordedVideo && (
                <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280'}}>
                  Record and submit your answer to get AI feedback
                </div>
              )}

              {recordedVideo && (
                <>
                  <div style={styles.chatMessages}>
                    {isTranscribing ? (
                      <div style={{color: '#9333ea', textAlign: 'center', padding: '32px 0'}}>
                        <p style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>🎤 Processing your answer...</p>
                        <p style={{fontSize: '14px', color: '#6b7280'}}>AI is analyzing your response</p>
                      </div>
                    ) : chatMessages.length === 0 ? (
                      <div style={{color: '#6b7280', textAlign: 'center', padding: '32px 0'}}>
                        <p style={{marginBottom: '8px'}}>Record your answer and get instant AI feedback!</p>
                        <p style={{fontSize: '14px'}}>💡 Tip: Speak clearly and naturally</p>
                      </div>
                    ) : (
                      chatMessages.map((msg, idx) => (
                        <div key={idx} style={msg.role === 'user' ? styles.chatUser : styles.chatAi}>
                          <p style={{fontWeight: '600', marginBottom: '4px'}}>{msg.role === 'user' ? 'You' : 'AI Coach'}</p>
                          <p style={{color: '#374151', whiteSpace: 'pre-wrap'}}>{msg.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Your transcribed answer will appear here..."
                      style={{...styles.textarea, height: '120px'}}
                      disabled={isTranscribing}
                    />
                    <div style={{display: 'flex', gap: '8px'}}>
                      <input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        placeholder="Ask for improvements..."
                        style={{...styles.input, flex: 1}}
                        disabled={isTranscribing}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!userAnswer.trim() || isTranscribing}
                        style={{
                          ...styles.button, 
                          ...styles.buttonPurple,
                          opacity: (!userAnswer.trim() || isTranscribing) ? 0.5 : 1,
                          cursor: (!userAnswer.trim() || isTranscribing) ? 'not-allowed' : 'pointer'
                        }}
                        onMouseEnter={e => (userAnswer.trim() && !isTranscribing) && (e.currentTarget.style.backgroundColor = '#7e22ce')}
                        onMouseLeave={e => (userAnswer.trim() && !isTranscribing) && (e.currentTarget.style.backgroundColor = '#9333ea')}
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
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