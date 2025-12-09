import React, { useState, useRef, useEffect } from 'react';
import { Play, Video, RefreshCw, Check, X, Menu, ChevronRight, MessageSquare, Send, StopCircle, Clock, Upload, BarChart2, Code, Users, Brain, Search, FileText, Award, TrendingUp, Shield, Globe, Sparkles, Home, Briefcase, Mic } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  // In your styles object, update the sidebar style:
sidebar: {
 background: 'linear-gradient(135deg, #0b3b68ff 0%, #11345fff 50%, #0f2f60ff 100%)',
  color: 'white', // White text for contrast
//  background: '#2d3748',
//   color: '#ffffff',
  transition: 'width 0.3s',
  overflow: 'hidden',
  borderRight: 'none', // Remove border since gradient is visible
  boxShadow: '0 4px 20px rgba(14, 165, 233, 0.3)' // Add subtle shadow
},

  sidebarOpen: { width: '250px' },
  sidebarClosed: { width: '0' },
  sidebarContent: { 
    padding: '20px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarLogo: { 
  fontSize: '20px', 
  fontWeight: '700', 
  marginBottom: '32px',
  color: 'white', // Change to white
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px 16px',
  backgroundColor: 'rgba(255, 255, 255, 0.15)', // Semi-transparent white
  borderRadius: '10px',
  backdropFilter: 'blur(10px)' // Optional frosted glass effect
},
  nav: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '8px',
    flex: 1
  },
  
// Optional: Update navButton for better visibility
navButton: {
  width: '100%',
  textAlign: 'left',
  padding: '14px 18px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'rgba(255, 255, 255, 0.9)', // Light white text
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontSize: '15px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  marginBottom: '4px'
},
navButtonActive: {
  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
  color: 'white',
  fontWeight: '600',
  borderLeft: '4px solid white',
  backdropFilter: 'blur(10px)' // Optional frosted glass effect
},

// Optional: Update userSection for better contrast
userSection: {
  padding: '16px',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)', // Light border
  marginTop: 'auto',
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent
  borderRadius: '10px',
  backdropFilter: 'blur(10px)' // Optional frosted glass effect
},
  userName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '4px'
  },
  userEmail: {
    fontSize: '13px',
    color: '#d5dae3ff'
  },
  mainContent: { 
    flex: 1, 
    overflowY: 'auto',
    backgroundColor: '#ffffff'
  },
  menuButton: {
    padding: '10px 14px',
    backgroundColor: '#ffffff',
    color: '#374151',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'all 0.2s'
  },
  pageContainer: { 
    padding: '24px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  heading1: { 
    fontSize: '32px', 
    fontWeight: '700', 
    marginBottom: '16px',
    color: '#111827',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  heading2: { 
    fontSize: '28px', 
    fontWeight: '700', 
    marginBottom: '20px',
    color: '#111827'
  },
  heading3: { 
    fontSize: '20px', 
    fontWeight: '600', 
    marginBottom: '12px',
    color: '#111827'
  },
  subheading: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '28px',
    maxWidth: '600px',
    lineHeight: '1.6'
  },
  grid: { 
    display: 'grid', 
    gap: '24px', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
    transition: 'all 0.3s ease',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  },
  cardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06)'
  },
  cardIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    fontSize: '24px'
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
    color: '#2563eb',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '15px',
    fontWeight: '500',
    padding: '10px 0'
  },
  categoryCard: {
    padding: '28px 24px',
    borderRadius: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  questionCard: {
    backgroundColor: '#ffffff',
    padding: '36px',
    borderRadius: '14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    maxWidth: '800px',
    margin: '0 auto',
    border: '1px solid #e5e7eb'
  },
  badge: {
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  badgeEasy: { 
    backgroundColor: '#d1fae5', 
    color: '#065f46' 
  },
  badgeMedium: { 
    backgroundColor: '#fef3c7', 
    color: '#92400e' 
  },
  badgeHard: { 
    backgroundColor: '#fee2e2', 
    color: '#991b1b' 
  },
  badgeTechnical: { 
    backgroundColor: '#dbeafe', 
    color: '#1e40af' 
  },
  badgeHr: { 
    backgroundColor: '#f3e8ff', 
    color: '#6b21a8' 
  },
  optionButton: {
    width: '100%',
    padding: '18px 24px',
    textAlign: 'left',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '12px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#374151'
  },
  optionSelected: { 
    borderColor: '#2563eb', 
    backgroundColor: '#eff6ff',
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)' 
  },
  optionCorrect: { 
    borderColor: '#10b981', 
    backgroundColor: '#f0fdf4',
    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' 
  },
  optionWrong: { 
    borderColor: '#ef4444', 
    backgroundColor: '#fef2f2',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)' 
  },
  button: {
    padding: '14px 28px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    minWidth: '160px'
  },
  buttonPrimary: { 
    backgroundColor: '#2563eb', 
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' 
  },
  buttonSuccess: { 
    backgroundColor: '#10b981', 
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' 
  },
  buttonDanger: { 
    backgroundColor: '#ef4444', 
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)' 
  },
  buttonWarning: { 
    backgroundColor: '#f59e0b', 
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)' 
  },
  buttonPurple: { 
    backgroundColor: '#9333ea', 
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(147, 51, 234, 0.2)' 
  },
  buttonGray: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db'
  },
  explanation: {
    backgroundColor: '#f8fafc',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '28px',
    borderLeft: '4px solid #2563eb'
  },
  video: {
    width: '100%',
    backgroundColor: '#111827',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '24px',
    position: 'relative'
  },
  chatContainer: {
    backgroundColor: '#ffffff',
    padding: '28px',
    borderRadius: '14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    height: '600px',
    border: '1px solid #e5e7eb'
  },
  chatMessages: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingRight: '8px'
  },
  chatUser: { 
    backgroundColor: '#dbeafe', 
    padding: '16px 20px', 
    borderRadius: '16px', 
    marginLeft: '40px',
    borderBottomRightRadius: '4px',
    maxWidth: '80%',
    alignSelf: 'flex-end'
  },
  chatAi: { 
    backgroundColor: '#f3f4f6', 
    padding: '16px 20px', 
    borderRadius: '16px', 
    marginRight: '40px',
    borderBottomLeftRadius: '4px',
    maxWidth: '80%',
    alignSelf: 'flex-start'
  },
  input: {
    padding: '14px 18px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '16px',
    width: '100%',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s'
  },
  textarea: {
    padding: '14px 18px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '16px',
    width: '100%',
    resize: 'none',
    fontFamily: 'inherit',
    backgroundColor: '#ffffff',
    minHeight: '120px',
    transition: 'all 0.2s'
  },
  timer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#ef4444',
    fontSize: '22px',
    fontWeight: '700',
    padding: '12px 20px',
    backgroundColor: '#fef2f2',
    borderRadius: '10px'
  },
  uploadArea: {
    border: '2px dashed #d1d5db',
    borderRadius: '14px',
    padding: '48px',
    textAlign: 'center',
    backgroundColor: '#f9fafb',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginBottom: '32px'
  },
  uploadAreaHover: {
    borderColor: '#9333ea',
    backgroundColor: '#faf5ff'
  },
  companyLogo: {
    width: '64px',
    height: '64px',
    borderRadius: '14px',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: '700',
    color: '#2563eb',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  statCard: {
    padding: '24px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827'
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280'
  },
  companyQuestionCard: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease'
  },
  pageContainer: {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f6f9fc 0%, #f0f4f8 100%)',
  },
  headerSection: {
    marginBottom: '3rem',
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#4b5563',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  backIcon: {
    fontSize: '1.25rem',
  },
  titleContainer: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  heading2: {
    fontSize: '2.75rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.75rem',
    letterSpacing: '-0.025em',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#6b7280',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '4px solid #e5e7eb',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '1.5rem',
    fontSize: '1.125rem',
    color: '#6b7280',
    fontWeight: '500',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.75rem',
    padding: '1rem',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '1.75rem',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #f3f4f6',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.25rem',
  },
  companyIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    flexShrink: 0,
  },
  heading3: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  tagContainer: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  tag: {
    padding: '0.25rem 0.75rem',
    background: '#f0f9ff',
    color: '#0369a1',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  cardDescription: {
    color: '#6b7280',
    fontSize: '1rem',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
    flexGrow: 1,
  },
  cardFooter: {
    borderTop: '1px solid #f3f4f6',
    paddingTop: '1.25rem',
    marginTop: 'auto',
  },
  ctaText: {
    color: '#6366f1',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  cardHoverEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
    transform: 'scaleX(0)',
    transition: 'transform 0.4s ease',
    transformOrigin: 'left',
  }
};

const GeneralAI = ({ user, onLogout, onCompanySelect }) => {
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
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyQuestions, setCompanyQuestions] = useState({});

  // Add company-specific questions data
  const companyQuestionsData = {
    'Google': [
      { 
        q: 'How would you design Google Search?', 
        type: 'system-design', 
        difficulty: 'hard',
        category: 'Design',
        hint: 'Consider scalability, indexing, ranking algorithms, and distributed systems',
        explanation: 'Focus on distributed systems, MapReduce, ranking algorithms (PageRank), indexing strategies, and scalability considerations for billions of queries daily.'
      },
      { 
        q: 'Explain MapReduce concept', 
        type: 'technical', 
        difficulty: 'medium',
        category: 'Algorithms',
        hint: 'Think about distributed processing, map and reduce phases',
        explanation: 'MapReduce is a programming model for processing large datasets with a distributed algorithm on a cluster. The "map" function processes key-value pairs to generate intermediate pairs, and "reduce" function merges all intermediate values associated with the same key.'
      },
      { 
        q: 'What is PageRank algorithm?', 
        type: 'technical', 
        difficulty: 'hard',
        category: 'Algorithms',
        hint: 'Consider web page ranking based on links',
        explanation: 'PageRank is an algorithm used by Google Search to rank web pages. It works by counting the number and quality of links to a page to determine a rough estimate of the website\'s importance. The underlying assumption is that more important websites are likely to receive more links from other websites.'
      }
    ],
    'Meta': [
      { 
        q: 'Design Facebook News Feed', 
        type: 'system-design', 
        difficulty: 'hard',
        category: 'Design',
        hint: 'Consider content ranking, real-time updates, and scalability',
        explanation: 'Focus on content ranking algorithms, real-time updates, distributed databases, caching strategies, and handling billions of users with personalized content delivery.'
      },
      { 
        q: 'How would you detect fake accounts?', 
        type: 'behavioral', 
        difficulty: 'medium',
        category: 'Analytics',
        hint: 'Think about pattern recognition and machine learning',
        explanation: 'Use machine learning algorithms to detect patterns, analyze user behavior, check for bot-like activity, verify email/phone patterns, and implement CAPTCHA challenges for suspicious activities.'
      },
      { 
        q: 'Explain React component lifecycle', 
        type: 'technical', 
        difficulty: 'medium',
        category: 'Frontend',
        hint: 'Think about component mounting, updating, and unmounting',
        explanation: 'React class components have lifecycle methods: constructor, render, componentDidMount, componentDidUpdate, componentWillUnmount. Functional components use useEffect hook to handle lifecycle events with dependency arrays.'
      }
    ],
    'Amazon': [
      { 
        q: 'Design an e-commerce recommendation system', 
        type: 'system-design', 
        difficulty: 'hard',
        category: 'Design',
        hint: 'Consider collaborative filtering and content-based filtering',
        explanation: 'Combine collaborative filtering (user-item interactions), content-based filtering (item features), and hybrid approaches. Use machine learning models, real-time processing, and A/B testing for continuous improvement.'
      },
      { 
        q: 'Explain AWS S3 architecture', 
        type: 'technical', 
        difficulty: 'medium',
        category: 'Cloud',
        hint: 'Think about object storage, buckets, and availability',
        explanation: 'Amazon S3 is object storage built to store and retrieve any amount of data. It uses buckets (containers), objects (files), keys (unique identifiers), and provides 99.999999999% durability with multiple Availability Zones.'
      },
      { 
        q: 'What is Amazon Leadership Principle?', 
        type: 'behavioral', 
        difficulty: 'easy',
        category: 'Culture',
        hint: 'Think about customer obsession and ownership',
        explanation: 'Amazon has 16 Leadership Principles including Customer Obsession, Ownership, Invent and Simplify, Are Right A Lot, Hire and Develop the Best, Insist on Highest Standards, Think Big, Bias for Action, Frugality, Earn Trust, Dive Deep, Have Backbone, Deliver Results, and more.'
      }
    ],
    'Apple': [
      { 
        q: 'Design iOS notification system', 
        type: 'system-design', 
        difficulty: 'hard',
        category: 'Design',
        hint: 'Consider push notifications, local notifications, and user preferences',
        explanation: 'Design APNs (Apple Push Notification service), local notification scheduling, notification grouping, notification actions, silent notifications, and user notification preferences management across devices.'
      },
      { 
        q: 'Explain Swift memory management', 
        type: 'technical', 
        difficulty: 'medium',
        category: 'iOS',
        hint: 'Think about ARC (Automatic Reference Counting)',
        explanation: 'Swift uses Automatic Reference Counting (ARC) to track and manage app memory. It automatically frees up memory when instances are no longer needed. Use weak and unowned references to prevent strong reference cycles.'
      },
      { 
        q: 'How do you ensure app privacy?', 
        type: 'behavioral', 
        difficulty: 'medium',
        category: 'Security',
        hint: 'Think about data minimization and user consent',
        explanation: 'Implement data minimization, obtain explicit user consent, anonymize data where possible, use secure data storage, implement proper authentication, and comply with privacy regulations like GDPR and Apple\'s App Store guidelines.'
      }
    ],
    'Microsoft': [
      { 
        q: 'Design Azure load balancer', 
        type: 'system-design', 
        difficulty: 'hard',
        category: 'Cloud',
        hint: 'Consider traffic distribution and health checks',
        explanation: 'Design for traffic distribution across VMs, health probes for backend instances, session persistence, SSL termination, autoscaling integration, and global load balancing across regions.'
      },
      { 
        q: 'Explain .NET garbage collection', 
        type: 'technical', 
        difficulty: 'medium',
        category: 'Backend',
        hint: 'Think about generations and collection phases',
        explanation: '.NET uses generational garbage collection with 3 generations (0, 1, 2). It performs marking (identifying live objects), relocating (updating references), and compacting. Uses concurrent and background GC for server applications.'
      },
      { 
        q: 'How would you handle legacy code?', 
        type: 'behavioral', 
        difficulty: 'medium',
        category: 'Process',
        hint: 'Think about refactoring and testing strategies',
        explanation: 'Start with comprehensive testing, create a safety net with unit tests, refactor incrementally, document current behavior, prioritize high-risk areas, and ensure backward compatibility during transitions.'
      }
    ]
  };

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

  // const codingQuestions = [
  //   { q: 'Reverse a string', hint: 'Convert to array first', exp: 'str.split("").reverse().join("")', diff: 'easy' },
  //   { q: 'Find largest element in array', hint: 'Use Math.max or iterate', exp: 'Math.max(...arr) or loop comparing', diff: 'easy' },
  //   { q: 'Check if number is prime', hint: 'Check divisibility to sqrt(n)', exp: 'Check divisions from 2 to √n', diff: 'easy' },
  //   { q: 'Check if string is palindrome', hint: 'Clean and compare with reverse', exp: 'Remove non-alphanumeric, compare with reverse', diff: 'medium' },
  //   { q: 'Factorial using recursion', hint: 'Base case: n<=1 returns 1', exp: 'if(n<=1) return 1; return n*factorial(n-1)', diff: 'medium' },
  //   { q: 'Remove duplicates from array', hint: 'Use Set data structure', exp: '[...new Set(arr)]', diff: 'medium' },
  //   { q: 'Find nth Fibonacci number', hint: 'Use iteration not recursion', exp: 'Use two variables tracking prev values', diff: 'hard' },
  //   { q: 'Merge two sorted arrays', hint: 'Two pointer technique', exp: 'Compare elements from both arrays', diff: 'hard' }
  // ];

  const codingQuestions = [
  { 
    q: 'Reverse a string', 
    hint: 'Convert to array first', 
    exp: `def reverseString(s):
    return s[::-1]

# Alternative using loop:
def reverseString(s):
    result = ""
    for char in s:
        result = char + result
    return result`, 
    diff: 'easy' 
  },
  { 
    q: 'Find largest element in array', 
    hint: 'Use Math.max or iterate', 
    exp: `def findLargest(arr):
    if not arr:
        return None
    
    largest = arr[0]
    for num in arr:
        if num > largest:
            largest = num
    return largest

# Alternative: return max(arr)`, 
    diff: 'easy' 
  },
  { 
    q: 'Check if number is prime', 
    hint: 'Check divisibility to sqrt(n)', 
    exp: `def isPrime(n):
    if n < 2:
        return False
    
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    
    return True`, 
    diff: 'easy' 
  },
  { 
    q: 'Check if a string is palindrome', 
    hint: 'Clean and compare with reverse', 
    exp: `def isPalindrome(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    
    return True

# Alternative: return s == s[::-1]`, 
    diff: 'medium' 
  },
  { 
    q: 'Factorial using recursion', 
    hint: 'Base case: n<=1 returns 1', 
    exp: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Iterative approach:
def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result`, 
    diff: 'medium' 
  },
  { 
    q: 'Remove duplicates from array', 
    hint: 'Use Set data structure', 
    exp: `def removeDuplicates(arr):
    return list(set(arr))

# To preserve order:
def removeDuplicates(arr):
    seen = set()
    result = []
    for item in arr:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result`, 
    diff: 'medium' 
  },
  { 
    q: 'Find nth Fibonacci number', 
    hint: 'Use iteration not recursion', 
    exp: `def fibonacci(n):
    if n <= 1:
        return n
    
    a, b = 0, 1
    for i in range(2, n + 1):
        a, b = b, a + b
    
    return b

# Recursive (less efficient):
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`, 
    diff: 'hard' 
  },
  { 
    q: 'Merge two sorted arrays', 
    hint: 'Two pointer technique', 
    exp: `def mergeSortedArrays(arr1, arr2):
    result = []
    i, j = 0, 0
    
    while i < len(arr1) and j < len(arr2):
        if arr1[i] < arr2[j]:
            result.append(arr1[i])
            i += 1
        else:
            result.append(arr2[j])
            j += 1
    
    # Add remaining elements
    result.extend(arr1[i:])
    result.extend(arr2[j:])
    
    return result`, 
    diff: 'hard' 
  }
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

    // Initialize Speech Recognition - RESTORED ORIGINAL LOGIC
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
    setFinalTranscript(prev => {
      const updated = prev + final;
      console.log('📝 Final transcript updated:', updated.length, 'chars');
      return updated;
    });
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

      // RESTORED ORIGINAL MEDIA RECORDER ONSTOP LOGIC
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
      
      // Start speech recognition - RESTORED ORIGINAL LOGIC
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
    // Capture transcript BEFORE stopping anything
    const capturedTranscript = (finalTranscript + ' ' + interimTranscript).trim();
    console.log('🎤 Captured transcript before stop:', capturedTranscript.length, 'chars');
    
    // Store in window object so it persists
    window.capturedTranscript = capturedTranscript;
    
    // Now stop recognition
    if (recognition) {
      try {
        recognition.stop();
        console.log('✅ Recognition stopped');
      } catch (e) {
        console.warn('Recognition stop error:', e);
      }
    }
    
    // Stop recording
    mediaRecorderRef.current.stop();
    streamRef.current?.getTracks().forEach(track => track.stop());
    setIsRecording(false);
    setIsTranscribing(true);
    
    console.log('🎬 Recording stopped, transcript saved');
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Render company questions page
  const renderCompanyQuestions = () => {
    const questions = companyQuestionsData[selectedCompany.name] || [];

    return (
      <div style={styles.pageContainer}>
        <button 
          onClick={() => setSelectedCompany(null)} 
          style={styles.backButton}
        >
          <ChevronRight size={16} style={{transform: 'rotate(180deg)'}} />
          Back to Companies
        </button>
        
        <div style={{
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h1 style={styles.heading2}>{selectedCompany.name} Interview Questions</h1>
          <p style={styles.subheading}>
            Practice these curated questions to prepare for your {selectedCompany.name} interview.
            Each question includes hints and detailed explanations.
          </p>
        </div>

        {questions.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 40px',
            color: '#6b7280',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <Search size={48} style={{marginBottom: '20px', opacity: 0.5}} />
            <p style={{fontSize: '18px', marginBottom: '8px', color: '#374151'}}>No questions available yet</p>
            <p style={{fontSize: '14px'}}>Check back soon for {selectedCompany.name} specific questions</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {questions.map((question, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.companyQuestionCard,
                  borderLeft: `4px solid ${
                    question.difficulty === 'easy' ? '#10b981' :
                    question.difficulty === 'medium' ? '#f59e0b' :
                    '#ef4444'
                  }`
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <span style={{
                      ...styles.badge,
                      ...(question.difficulty === 'easy' ? styles.badgeEasy : 
                           question.difficulty === 'medium' ? styles.badgeMedium : 
                           styles.badgeHard)
                    }}>
                      {question.difficulty}
                    </span>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: question.type === 'technical' ? '#dbeafe' : 
                                      question.type === 'system-design' ? '#fef3c7' : 
                                      '#f0fdf4',
                      color: question.type === 'technical' ? '#1e40af' : 
                             question.type === 'system-design' ? '#92400e' : 
                             '#065f46',
                      marginLeft: '10px'
                    }}>
                      {question.type}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6b7280',
                    backgroundColor: '#f3f4f6',
                    padding: '4px 12px',
                    borderRadius: '12px'
                  }}>
                    {question.category}
                  </span>
                </div>
                
                <h3 style={{...styles.heading3, marginBottom: '16px', fontSize: '18px'}}>
                  {question.q}
                </h3>
                
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  borderLeft: '3px solid #d1d5db'
                }}>
                  <p style={{fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#4b5563'}}>💡 Hint:</p>
                  <p style={{fontSize: '14px', color: '#6b7280', lineHeight: '1.5'}}>{question.hint}</p>
                </div>
                
                <div style={{
                  backgroundColor: '#f0fdf4',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  border: '1px solid #d1fae5',
                  display: 'none' // Hidden by default, can be toggled
                }} id={`explanation-${index}`}>
                  <p style={{fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#065f46'}}>📚 Explanation:</p>
                  <p style={{fontSize: '14px', color: '#374151', lineHeight: '1.6'}}>{question.explanation}</p>
                </div>
                
                <div style={{display: 'flex', gap: '12px'}}>
                  <button 
                    style={{
                      ...styles.button,
                      ...styles.buttonGray,
                      padding: '10px 20px',
                      fontSize: '14px',
                      flex: 1
                    }}
                    onClick={() => {
                      const explanationEl = document.getElementById(`explanation-${index}`);
                      if (explanationEl) {
                        explanationEl.style.display = explanationEl.style.display === 'none' ? 'block' : 'none';
                      }
                    }}
                  >
                    Show Explanation
                  </button>
                  <button 
                    style={{
                      ...styles.button,
                      ...styles.buttonPrimary,
                      padding: '10px 20px',
                      fontSize: '14px',
                      flex: 1
                    }}
                    onClick={() => {
                      // You can add functionality to practice this question
                      alert(`Practice question: ${question.q}`);
                    }}
                  >
                    Practice This
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderHome = () => (
    <div style={styles.pageContainer}>
      {/* Dashboard Header */}
      <div style={{
        marginBottom: '40px',
        paddingBottom: '24px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h1 style={styles.heading1}>Prepare for your dream interview</h1>
        <p style={styles.subheading}>
          Access curated resources, AI-powered tools, and personalized practice sessions 
          to ace your next interview.
        </p>
      </div>

      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={styles.statCard}>
          <div style={{
            ...styles.cardIcon,
            backgroundColor: '#dbeafe',
            color: '#2563eb'
          }}>
            <Brain size={24} />
          </div>
          <div>
            <div style={styles.statValue}>150+</div>
            <div style={styles.statLabel}>Practice Questions</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{
            ...styles.cardIcon,
            backgroundColor: '#f0fdf4',
            color: '#10b981'
          }}>
            <Video size={24} />
          </div>
          <div>
            <div style={styles.statValue}>24/7</div>
            <div style={styles.statLabel}>AI Mock Interviews</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{
            ...styles.cardIcon,
            backgroundColor: '#fef3c7',
            color: '#f59e0b'
          }}>
            <Award size={24} />
          </div>
          <div>
            <div style={styles.statValue}>5+</div>
            <div style={styles.statLabel}>Mock Tests</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{
            ...styles.cardIcon,
            backgroundColor: '#f3e8ff',
            color: '#9333ea'
          }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={styles.statValue}>3+</div>
            <div style={styles.statLabel}>Companies Covered</div>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div style={styles.grid}>
        <div 
          style={styles.card} 
          onClick={() => setCurrentView('general')}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#dbeafe';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <div style={{
            ...styles.cardIcon,
            backgroundColor: '#dbeafe',
            color: '#2563eb',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
          }}>
            <BarChart2 size={28} />
          </div>
          <h2 style={styles.heading3}>General Section</h2>
          <p style={{color: '#6b7280', marginBottom: '24px', lineHeight: '1.6'}}>
            Master quantitative reasoning, technical concepts, coding challenges, and HR questions.
          </p>
          <button 
            style={{
              ...styles.button,
              ...styles.buttonPrimary,
              padding: '12px 24px',
              fontSize: '14px',
              width: '100%'
            }}
          >
            Start Practice
          </button>
        </div>

        <div 
          style={styles.card} 
          onClick={() => setCurrentView('company')}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#d1fae5';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <div style={{
            ...styles.cardIcon,
            backgroundColor: '#f0fdf4',
            color: '#10b981',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
          }}>
            <Globe size={28} />
          </div>
          <h2 style={styles.heading3}>Company Specific</h2>
          <p style={{color: '#6b7280', marginBottom: '24px', lineHeight: '1.6'}}>
            Research specific companies, explore interview processes, and get tailored advice.
          </p>
          <button 
            style={{
              ...styles.button,
              ...styles.buttonSuccess,
              padding: '12px 24px',
              fontSize: '14px',
              width: '100%'
            }}
          >
            Explore Companies
          </button>
        </div>

        <div 
          style={styles.card} 
          onClick={() => setCurrentView('mock')}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#f3e8ff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <div style={{
            ...styles.cardIcon,
            backgroundColor: '#f3e8ff',
            color: '#9333ea',
            boxShadow: '0 4px 12px rgba(147, 51, 234, 0.2)'
          }}>
            <Sparkles size={28} />
          </div>
          <h2 style={styles.heading3}>AI Mock Interview</h2>
          <p style={{color: '#6b7280', marginBottom: '24px', lineHeight: '1.6'}}>
            Practice your responses with an AI interviewer and get real-time feedback.
          </p>
          <button 
            style={{
              ...styles.button,
              ...styles.buttonPurple,
              padding: '12px 24px',
              fontSize: '14px',
              width: '100%'
            }}
          >
            Begin Mock Interview
          </button>
        </div>
      </div>
    </div>
  );

  const renderGeneral = () => (
    <div style={styles.pageContainer}>
      <button 
        onClick={() => setCurrentView('home')} 
        style={styles.backButton}
      >
        <ChevronRight size={16} style={{transform: 'rotate(180deg)'}} />
        Back to Dashboard
      </button>
      
      <h1 style={styles.heading2}>General Section</h1>
      <p style={styles.subheading}>
        Master quantitative reasoning, logical problem-solving, and core technical concepts 
        with our comprehensive practice modules.
      </p>

      <div style={styles.grid}>
        <div 
          style={styles.categoryCard}
          onClick={() => {setSelectedCategory('aptitude'); setCurrentView('questions');}}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#dbeafe';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <div style={{
            ...styles.cardIcon,
            backgroundColor: '#dbeafe',
            color: '#2563eb',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
          }}>
            <BarChart2 size={28} />
          </div>
          <h3 style={styles.heading3}>Aptitude</h3>
          <p style={{color: '#6b7280', marginBottom: '16px', textAlign: 'center'}}>
            Master quantitative reasoning and logical problem-solving for various assessments.
          </p>
          <button 
            style={{
              ...styles.button,
              ...styles.buttonPrimary,
              padding: '12px 24px',
              fontSize: '14px',
              marginTop: '8px'
            }}
          >
            Start Practice
          </button>
        </div>

        <div 
          style={styles.categoryCard}
          onClick={() => {setSelectedCategory('technical'); setCurrentView('questions');}}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#f0fdf4';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <div style={{
            ...styles.cardIcon,
            backgroundColor: '#f0fdf4',
            color: '#10b981',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
          }}>
            <Code size={28} />
          </div>
          <h3 style={styles.heading3}>Technical</h3>
          <p style={{color: '#6b7280', marginBottom: '16px', textAlign: 'center'}}>
            Brush up on core concepts in your field with in-depth quizzes and resources.
          </p>
          <button 
            style={{
              ...styles.button,
              ...styles.buttonSuccess,
              padding: '12px 24px',
              fontSize: '14px',
              marginTop: '8px'
            }}
          >
            Explore Topics
          </button>
        </div>

        <div 
          style={styles.categoryCard}
          onClick={() => {setSelectedCategory('coding'); setCurrentView('questions');}}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#fef3c7';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <div style={{
            ...styles.cardIcon,
            backgroundColor: '#fef3c7',
            color: '#f59e0b',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
          }}>
            <FileText size={28} />
          </div>
          <h3 style={styles.heading3}>Coding</h3>
          <p style={{color: '#6b7280', marginBottom: '16px', textAlign: 'center'}}>
            Practice data structures, algorithms, and system design problems in a real coding environment.
          </p>
          <button 
            style={{
              ...styles.button,
              ...styles.buttonWarning,
              padding: '12px 24px',
              fontSize: '14px',
              marginTop: '8px'
            }}
          >
            Solve Challenges
          </button>
        </div>

        <div 
          style={styles.categoryCard}
          onClick={() => {setSelectedCategory('hr'); setCurrentView('questions');}}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#f3e8ff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <div style={{
            ...styles.cardIcon,
            backgroundColor: '#f3e8ff',
            color: '#9333ea',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(147, 51, 234, 0.2)'
          }}>
            <Users size={28} />
          </div>
          <h3 style={styles.heading3}>HR Round</h3>
          <p style={{color: '#6b7280', marginBottom: '16px', textAlign: 'center'}}>
            Prepare for behavioral and situational interview questions with mock interviews and tips.
          </p>
          <button 
            style={{
              ...styles.button,
              ...styles.buttonPurple,
              padding: '12px 24px',
              fontSize: '14px',
              marginTop: '8px'
            }}
          >
            Review Questions
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuestions = () => {
    const questions = selectedCategory === 'aptitude' ? aptitudeQuestions :
                     selectedCategory === 'technical' ? technicalQuestions :
                     selectedCategory === 'coding' ? codingQuestions : hrQuestions;
    const current = questions[currentQuestion];

    // if (selectedCategory === 'coding') {
    //   return (
    //     <div style={styles.pageContainer}>
    //       <button onClick={() => {setCurrentView('general'); setSelectedCategory(null);}} style={styles.backButton}>
    //         <ChevronRight size={16} style={{transform: 'rotate(180deg)'}} />
    //         Back to Categories
    //       </button>
    //       <div style={styles.questionCard}>
    //         <div style={{marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    //           <div>
    //             <span style={{...styles.badge, ...(current.diff === 'easy' ? styles.badgeEasy : current.diff === 'medium' ? styles.badgeMedium : styles.badgeHard)}}>
    //               {current.diff}
    //             </span>
    //             <span style={{marginLeft: '16px', color: '#6b7280'}}>Question {currentQuestion + 1} of {questions.length}</span>
    //           </div>
    //           <div style={{color: '#2563eb', fontWeight: '600'}}>
    //             Score: {score}/{questions.length}
    //           </div>
    //         </div>
    //         <h2 style={styles.heading3}>{current.q}</h2>
    //         <div style={{backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '24px', borderLeft: '4px solid #f59e0b'}}>
    //           <p style={{fontSize: '14px', color: '#374151', fontWeight: '600', marginBottom: '8px'}}>💡 Hint:</p>
    //           <p style={{fontSize: '16px', color: '#4b5563'}}>{current.hint}</p>
    //         </div>
    //         <div style={styles.explanation}>
    //           <p style={{fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#2563eb'}}>Explanation:</p>
    //           <p style={{fontSize: '16px', color: '#374151', lineHeight: '1.6'}}>{current.exp}</p>
    //         </div>
    //         <button onClick={nextQuestion} style={{...styles.button, ...styles.buttonPrimary}}>
    //           {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Practice'}
    //         </button>
    //       </div>
    //     </div>
    //   );
    // }

    if (selectedCategory === 'coding') {
  return (
    <div style={styles.pageContainer}>
      <button onClick={() => {setCurrentView('general'); setSelectedCategory(null);}} style={styles.backButton}>
        <ChevronRight size={16} style={{transform: 'rotate(180deg)'}} />
        Back to Categories
      </button>
      <div style={styles.questionCard}>
        <div style={{marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <span style={{...styles.badge, ...(current.diff === 'easy' ? styles.badgeEasy : current.diff === 'medium' ? styles.badgeMedium : styles.badgeHard)}}>
              {current.diff}
            </span>
            <span style={{marginLeft: '16px', color: '#6b7280'}}>Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          <div style={{color: '#2563eb', fontWeight: '600'}}>
            Score: {score}/{questions.length}
          </div>
        </div>
        
        <h2 style={styles.heading3}>{current.q}</h2>
        
        {/* Hint Section */}
        <div style={{backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '24px', borderLeft: '4px solid #f59e0b'}}>
          <p style={{fontSize: '14px', color: '#374151', fontWeight: '600', marginBottom: '8px'}}>💡 Hint:</p>
          <p style={{fontSize: '16px', color: '#4b5563'}}>{current.hint}</p>
        </div>
        
        {/* Solution Code Block */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '24px',
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#e2e8f0',
          overflowX: 'auto'
        }}>
          <p style={{fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#fbbf24'}}>💡 Hint:</p>
          <pre style={{margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
            <code style={{color: '#e2e8f0'}}>{current.exp}</code>
          </pre>
        </div>
        
        <button onClick={nextQuestion} style={{...styles.button, ...styles.buttonPrimary}}>
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Practice'}
        </button>
      </div>
    </div>
  );
}

    if (selectedCategory === 'hr') {
      return (
        <div style={styles.pageContainer}>
          <button onClick={() => {setCurrentView('general'); setSelectedCategory(null);}} style={styles.backButton}>
            <ChevronRight size={16} style={{transform: 'rotate(180deg)'}} />
            Back to Categories
          </button>
          <div style={styles.questionCard}>
            <div style={{marginBottom: '24px'}}>
              <span style={{color: '#6b7280'}}>HR Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            <h2 style={styles.heading3}>{current.q}</h2>
            <div style={{backgroundColor: '#f0fdf4', padding: '28px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #d1fae5'}}>
              <p style={{fontWeight: '600', marginBottom: '12px', color: '#065f46', fontSize: '14px'}}>📝 Sample Answer:</p>
              <p style={{color: '#374151', lineHeight: '1.7', fontSize: '16px'}}>{current.ans}</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <button onClick={nextQuestion} style={{...styles.button, ...styles.buttonPrimary}}>
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete HR Practice'}
              </button>
              <span style={{color: '#6b7280', fontSize: '14px'}}>
                Take your time to practice this answer
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.pageContainer}>
        <button onClick={() => {setCurrentView('general'); setSelectedCategory(null);}} style={styles.backButton}>
          <ChevronRight size={16} style={{transform: 'rotate(180deg)'}} />
          Back to Categories
        </button>
        <div style={styles.questionCard}>
          <div style={{marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <span style={{...styles.badge, ...(current.diff === 'easy' ? styles.badgeEasy : current.diff === 'medium' ? styles.badgeMedium : styles.badgeHard)}}>
                {current.diff}
              </span>
              <span style={{marginLeft: '16px', color: '#6b7280'}}>Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            <div style={{color: '#2563eb', fontWeight: '600', fontSize: '18px'}}>
              Score: {score}/{questions.length}
            </div>
          </div>
          <h2 style={{...styles.heading3, marginBottom: '32px', fontSize: '22px', lineHeight: '1.4'}}>{current.q}</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px'}}>
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
                  onMouseEnter={e => !showExplanation && (e.currentTarget.style.borderColor = '#2563eb')}
                  onMouseLeave={e => {
                    if (!showExplanation && selectedAnswer !== idx) {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }
                  }}
                >
                  <span style={{marginRight: '12px', fontWeight: '600', color: '#6b7280'}}>
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt}
                  {showExplanation && idx === current.ans && <Check style={{float: 'right', color: '#10b981'}} size={20} />}
                  {showExplanation && idx === selectedAnswer && idx !== current.ans && <X style={{float: 'right', color: '#ef4444'}} size={20} />}
                </button>
              );
            })}
          </div>
          {showExplanation && (
            <>
              <div style={styles.explanation}>
                <p style={{fontWeight: '600', marginBottom: '12px', color: '#2563eb', fontSize: '14px'}}>📚 Explanation:</p>
                <p style={{fontSize: '16px', color: '#374151', lineHeight: '1.6'}}>{current.exp}</p>
              </div>
              <button onClick={nextQuestion} style={{...styles.button, ...styles.buttonPrimary}}>
                {currentQuestion < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderMockInterview = () => {
    if (!resumeUploaded) {
      return (
        <div style={styles.pageContainer}>
          <button onClick={() => setCurrentView('home')} style={styles.backButton}>
            <ChevronRight size={16} style={{transform: 'rotate(180deg)'}} />
            Back to Dashboard
          </button>
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            ...styles.card,
            textAlign: 'center'
          }}>
            <div style={{
              ...styles.cardIcon,
              backgroundColor: '#f3e8ff',
              color: '#9333ea',
              margin: '0 auto 24px auto',
              width: '64px',
              height: '64px'
            }}>
              <Sparkles size={32} />
            </div>
            
            <h2 style={{...styles.heading2, color: '#9333ea', marginBottom: '16px'}}>
              Ace Your Next Interview with AI Mock Interviews
            </h2>
            
            <p style={{...styles.subheading, margin: '0 auto 32px auto', maxWidth: '600px'}}>
              Upload your resume to get personalized questions and real-time feedback from our advanced AI
            </p>

            {isGeneratingQuestions ? (
              <div style={{textAlign: 'center', padding: '48px 0'}}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '3px solid #e5e7eb',
                  borderTopColor: '#9333ea',
                  borderRadius: '50%',
                  margin: '0 auto 24px auto',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <p style={{color: '#9333ea', fontSize: '18px', fontWeight: '600', marginBottom: '8px'}}>
                  🔍 Analyzing your resume...
                </p>
                <p style={{color: '#6b7280', fontSize: '14px'}}>
                  Generating personalized questions based on your experience and skills
                </p>
              </div>
            ) : (
              <>
                <div style={{marginBottom: '40px'}}>
                  <h3 style={{...styles.heading3, marginBottom: '24px', color: '#374151'}}>Step 1: Upload Your Resume</h3>
                  <div 
                    style={styles.uploadArea}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#9333ea'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#d1d5db'}
                  >
                    <div style={{
                      ...styles.cardIcon,
                      backgroundColor: '#f3e8ff',
                      color: '#9333ea',
                      margin: '0 auto 20px auto',
                      width: '56px',
                      height: '56px'
                    }}>
                      <Upload size={24} />
                    </div>
                    <p style={{fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#374151'}}>
                      Drag & Drop your resume here or browse files
                    </p>
                    <p style={{color: '#6b7280', marginBottom: '24px', fontSize: '14px'}}>
                      Accepted formats: PDF, DOCX
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.txt,.docx"
                      onChange={handleResumeUpload}
                      style={{display: 'none'}}
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload">
                      <div
                        style={{
                          ...styles.button,
                          ...styles.buttonPurple,
                          display: 'inline-flex',
                          cursor: 'pointer',
                          padding: '12px 32px'
                        }}
                      >
                        Browse Files
                      </div>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }

    if (showInterviewStart) {
      return (
        <div style={styles.pageContainer}>
          <button onClick={resetMockInterview} style={styles.backButton}>
            <ChevronRight size={16} style={{transform: 'rotate(180deg)'}} />
            Back
          </button>
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            ...styles.card,
            textAlign: 'center'
          }}>
            <div style={{
              ...styles.cardIcon,
              backgroundColor: '#d1fae5',
              color: '#10b981',
              margin: '0 auto 24px auto',
              width: '64px',
              height: '64px'
            }}>
              <Check size={32} />
            </div>
            
            <h2 style={{...styles.heading2, color: '#10b981', marginBottom: '16px'}}>
              Resume Uploaded Successfully!
            </h2>
            
            <p style={{color: '#6b7280', marginBottom: '32px', fontSize: '16px'}}>
              Your resume has been analyzed. We've generated {aiGeneratedQuestions.length} personalized questions based on your experience.
            </p>

            <div style={{
              backgroundColor: '#f8fafc',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '32px',
              border: '1px solid #e5e7eb',
              textAlign: 'left'
            }}>
              <h3 style={{...styles.heading3, marginBottom: '16px', color: '#374151'}}>📋 Interview Overview</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <li style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#dbeafe',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{fontSize: '12px', fontWeight: '600', color: '#2563eb'}}>{aiGeneratedQuestions.length}</span>
                  </div>
                  <span style={{color: '#374151'}}>Personalized questions</span>
                </li>
                <li style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Clock size={16} style={{color: '#f59e0b'}} />
                  </div>
                  <span style={{color: '#374151'}}>90 seconds per question</span>
                </li>
                <li style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MessageSquare size={16} style={{color: '#10b981'}} />
                  </div>
                  <span style={{color: '#374151'}}>Real-time AI feedback</span>
                </li>
              </ul>
            </div>

            <div style={{display: 'flex', gap: '16px', justifyContent: 'center'}}>
              <button 
                onClick={resetMockInterview}
                style={{
                  ...styles.button,
                  ...styles.buttonGray,
                  padding: '14px 28px'
                }}
              >
                Change Resume
              </button>
              <button 
                onClick={() => setShowInterviewStart(false)}
                style={{
                  ...styles.button,
                  ...styles.buttonPurple,
                  padding: '14px 28px'
                }}
              >
                <Play size={20} /> Start Interview
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentQ = aiGeneratedQuestions[currentMockQuestion];

    return (
      <div style={styles.pageContainer}>
        <button onClick={resetMockInterview} style={styles.backButton}>
          <ChevronRight size={16} style={{transform: 'rotate(180deg)'}} />
          End Interview
        </button>
        
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            alignItems: 'start'
          }}>
            {/* Left Column - Question and Video */}
            <div style={styles.card}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <div>
                  <h3 style={{...styles.heading3, marginBottom: '8px'}}>AI Interview Session</h3>
                  <p style={{color: '#6b7280', fontSize: '14px'}}>
                    Session timer: <span style={{fontFamily: 'monospace', fontWeight: '600'}}>00:00:{timeLeft.toString().padStart(2, '0')}</span>
                  </p>
                </div>
                <div style={{
                  ...styles.badge,
                  ...(currentQ.type === 'technical' ? styles.badgeTechnical : styles.badgeHr),
                  fontSize: '11px'
                }}>
                  {currentQ.type.toUpperCase()}
                </div>
              </div>

              <div style={{marginBottom: '24px'}}>
                <p style={{color: '#6b7280', fontSize: '14px', marginBottom: '8px'}}>Question {currentMockQuestion + 1} of {aiGeneratedQuestions.length}</p>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827',
                  lineHeight: '1.5',
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  borderLeft: '4px solid #9333ea'
                }}>
                  {currentQ.q}
                </h4>
              </div>

              <div style={styles.video}>
                {isRecording ? (
                  <video 
                    ref={videoRef} 
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover'
                    }} 
                    autoPlay 
                    muted 
                  />
                ) : recordedVideo ? (
                  <video 
                    ref={videoRef} 
                    src={recordedVideo} 
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover'
                    }} 
                    controls 
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    backgroundColor: '#111827'
                  }}>
                    <Video size={48} style={{marginBottom: '16px', opacity: 0.5}} />
                    <p style={{fontSize: '16px', fontWeight: '500'}}>Click "Start Recording" to begin</p>
                    <p style={{fontSize: '14px', opacity: 0.7, marginTop: '8px'}}>Your response will be recorded here</p>
                  </div>
                )}
              </div>

              {isRecording && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  border: '2px solid #fee2e2'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <div style={styles.timer}>
                      <Clock size={20} />
                      <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <button 
                      onClick={stopRecording}
                      style={{
                        ...styles.button,
                        ...styles.buttonDanger,
                        padding: '10px 20px',
                        fontSize: '14px'
                      }}
                    >
                      <StopCircle size={18} /> Stop Recording
                    </button>
                  </div>
                  
                  {(finalTranscript || interimTranscript) && (
                    <div style={{
                      backgroundColor: '#ffffff',
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1px solid #d1fae5'
                    }}>
                      <p style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#059669',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Mic size={14} /> Live Transcription
                      </p>
                      <p style={{fontSize: '14px', color: '#374151', lineHeight: '1.5'}}>
                        {finalTranscript}
                        <span style={{color: '#9ca3af'}}>{interimTranscript}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {recordedVideo ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '12px'
                }}>
                  <button 
                    onClick={replayVideo}
                    style={{
                      ...styles.button,
                      ...styles.buttonPrimary,
                      width: '100%'
                    }}
                  >
                    <Play size={18} /> Replay
                  </button>
                  <button 
                    onClick={retakeVideo}
                    style={{
                      ...styles.button,
                      ...styles.buttonWarning,
                      width: '100%'
                    }}
                  >
                    <RefreshCw size={18} /> Retake
                  </button>
                  <button 
                    onClick={submitVideo}
                    style={{
                      ...styles.button,
                      ...styles.buttonSuccess,
                      width: '100%'
                    }}
                  >
                    <Check size={18} /> Submit
                  </button>
                  <button 
                    onClick={goToNextQuestion}
                    style={{
                      ...styles.button,
                      ...styles.buttonPurple,
                      width: '100%'
                    }}
                  >
                    Next Question <ChevronRight size={18} />
                  </button>
                </div>
              ) : (
                !isRecording && (
                  <button 
                    onClick={startRecording}
                    style={{
                      ...styles.button,
                      ...styles.buttonPurple,
                      width: '100%',
                      padding: '16px',
                      fontSize: '16px'
                    }}
                  >
                    <Play size={20} /> Start Recording (90 seconds)
                  </button>
                )
              )}
            </div>

            {/* Right Column - Chat and Feedback */}
            <div style={styles.chatContainer}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <h3 style={{...styles.heading3, display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <MessageSquare size={20} /> AI Feedback & Refinement
                </h3>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  backgroundColor: '#f3f4f6',
                  padding: '4px 12px',
                  borderRadius: '12px'
                }}>
                  Live
                </span>
              </div>
              
              {!recordedVideo && !isRecording && (
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  textAlign: 'center',
                  padding: '40px'
                }}>
                  <MessageSquare size={48} style={{marginBottom: '16px', opacity: 0.5}} />
                  <p style={{fontSize: '16px', fontWeight: '500', marginBottom: '8px', color: '#374151'}}>
                    Record your answer to get AI feedback
                  </p>
                  <p style={{fontSize: '14px', color: '#6b7280'}}>
                    Your transcribed answer will appear here with suggestions for improvement
                  </p>
                </div>
              )}

              {(recordedVideo || isRecording) && (
                <>
                  <div style={styles.chatMessages}>
                    {isTranscribing ? (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                        color: '#9333ea'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          border: '3px solid #e5e7eb',
                          borderTopColor: '#9333ea',
                          borderRadius: '50%',
                          marginBottom: '16px',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        <p style={{fontWeight: '600', marginBottom: '8px'}}>Processing your answer...</p>
                        <p style={{fontSize: '14px', color: '#6b7280'}}>AI is analyzing your response</p>
                      </div>
                    ) : chatMessages.length === 0 ? (
                      <div style={{
                        backgroundColor: '#f0fdf4',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid #d1fae5',
                        marginBottom: '16px'
                      }}>
                        <p style={{fontWeight: '600', color: '#065f46', marginBottom: '8px', fontSize: '14px'}}>
                          💡 Tips for a great answer:
                        </p>
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}>
                          <li style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px'}}>
                            <div style={{
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#d1fae5',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#065f46'
                            }}>1</div>
                            Speak clearly and confidently
                          </li>
                          <li style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px'}}>
                            <div style={{
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#d1fae5',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#065f46'
                            }}>2</div>
                            Structure your answer (Situation, Action, Result)
                          </li>
                          <li style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px'}}>
                            <div style={{
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#d1fae5',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#065f46'
                            }}>3</div>
                            Include specific examples and metrics
                          </li>
                        </ul>
                      </div>
                    ) : (
                      chatMessages.map((msg, idx) => (
                        <div key={idx} style={msg.role === 'user' ? styles.chatUser : styles.chatAi}>
                          <p style={{
                            fontWeight: '600',
                            marginBottom: '6px',
                            fontSize: '12px',
                            color: msg.role === 'user' ? '#1e40af' : '#374151'
                          }}>
                            {msg.role === 'user' ? 'You' : 'AI Coach'}
                          </p>
                          <p style={{
                            color: '#374151',
                            whiteSpace: 'pre-wrap',
                            lineHeight: '1.6',
                            fontSize: '14px'
                          }}>
                            {msg.content}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Your answer will appear here after recording. You can also type directly..."
                      style={{
                        ...styles.textarea,
                        height: '100px',
                        backgroundColor: '#f8fafc'
                      }}
                      disabled={isTranscribing}
                    />
                    <div style={{display: 'flex', gap: '12px'}}>
                      <input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        placeholder="Ask for specific improvements or feedback..."
                        style={styles.input}
                        disabled={isTranscribing}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!userAnswer.trim() || isTranscribing}
                        style={{
                          ...styles.button,
                          ...styles.buttonPurple,
                          padding: '16px 24px',
                          opacity: (!userAnswer.trim() || isTranscribing) ? 0.5 : 1,
                          cursor: (!userAnswer.trim() || isTranscribing) ? 'not-allowed' : 'pointer'
                        }}
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
    <div style={styles.headerSection}>
      <button 
        onClick={() => setCurrentView('home')} 
        style={styles.backButton}
      >
        <span style={styles.backIcon}>←</span> Back to Dashboard
      </button>
      <div style={styles.titleContainer}>
        <h1 style={styles.heading2}>Company-Specific Preparation</h1>
        <p style={styles.subtitle}>Select a company to practice tailored interview questions</p>
      </div>
    </div>

    {companies.length === 0 ? (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading companies...</p>
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
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={styles.cardHeader}>
              <div style={styles.companyIcon}>
                {company.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 style={styles.heading3}>{company.name}</h3>
                <div style={styles.tagContainer}>
                  <span style={styles.tag}>Technical</span>
                  <span style={styles.tag}>Behavioral</span>
                </div>
              </div>
            </div>
            <p style={styles.cardDescription}>
              Practice questions specific to {company.name} interviews
            </p>
            <div style={styles.cardFooter}>
              <span style={styles.ctaText}>
                Start Practicing →
              </span>
            </div>
            <div style={styles.cardHoverEffect}></div>
          </div>
        ))}
      </div>
    )}
  </div>
);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={{
        ...styles.sidebar,
        ...(sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed)
      }}>
        <div style={styles.sidebarContent}>
          <div style={styles.sidebarLogo}>
            <Shield size={24} />
            <span>Career Companion</span>
          </div>
          
          <nav style={styles.nav}>
            <button
              onClick={() => setCurrentView('home')}
              style={{
                ...styles.navButton,
                ...(currentView === 'home' ? styles.navButtonActive : {})
              }}
            >
              <Home size={20} style={{color: currentView === 'home' ? '#0369a1' : '#4b5563'}} />
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('general')}
              style={{
                ...styles.navButton,
                ...(currentView === 'general' ? styles.navButtonActive : {})
              }}
            >
              <BarChart2 size={20} style={{color: currentView === 'general' ? '#0369a1' : '#4b5563'}} />
              Interview Prep
            </button>
            <button
              onClick={() => setCurrentView('company')}
              style={{
                ...styles.navButton,
                ...(currentView === 'company' ? styles.navButtonActive : {})
              }}
            >
              <Briefcase size={20} style={{color: currentView === 'company' ? '#0369a1' : '#4b5563'}} />
              Company Specific
            </button>
            <button
              onClick={() => setCurrentView('mock')}
              style={{
                ...styles.navButton,
                ...(currentView === 'mock' ? styles.navButtonActive : {})
              }}
            >
              <Video size={20} style={{color: currentView === 'mock' ? '#0369a1' : '#4b5563'}} />
              AI Mock Interview
            </button>
          </nav>

          {/* User Section */}
          <div style={styles.userSection}>
            <div style={styles.userName}>
              {user.displayName || 'User'}
            </div>
            <div style={styles.userEmail}>
              {user.email || 'user@example.com'}
            </div>
            <button
              onClick={handleLogout}
              style={{
                ...styles.button,
                ...styles.buttonDanger,
                marginTop: '16px',
                padding: '10px 16px',
                fontSize: '14px',
                width: '100%'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Top Navigation */}
        <div style={{
          padding: '16px 24px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={styles.menuButton}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            <Menu size={20} />
          </button>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <span style={{
              fontSize: '14px',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#10b981',
                borderRadius: '50%'
              }}></span>
              Online
            </span>
          </div>
        </div>
        
        {/* Render Current View */}
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