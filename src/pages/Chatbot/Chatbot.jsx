import React, { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, User, Wand2, Brain, History, Trash2, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Chatbot.css';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hook/useAxios';

const starterPrompts = [
  { label: 'Suggest careers based on my interests', icon: '🚀' },
  { label: 'How to transition into Data Science?', icon: '📊' },
  { label: 'What are the top skills for Web Dev?', icon: '💻' },
  { label: 'Help me discover my creative path', icon: '🎨' },
];

// Guided questionnaire steps to discover interests and strengths
const questionnaire = [
  {
    key: 'interestArea',
    question: 'Which areas interest you most?',
    options: ['Software Development', 'Data & AI', 'Design (UI/UX)', 'Product/Business', 'Marketing', 'Cybersecurity'],
  },
  {
    key: 'strengths',
    question: 'Pick your top strengths',
    options: ['Logical thinking', 'Creativity', 'Communication', 'Problem solving', 'Attention to detail', 'Leadership'],
    multi: true,
  },
  {
    key: 'workStyle',
    question: 'What working style suits you?',
    options: ['Independent', 'Team-oriented', 'Client-facing', 'Research-focused', 'Fast-paced startup', 'Structured corporate'],
  },
  {
    key: 'learningPref',
    question: 'How do you prefer learning?',
    options: ['Hands-on projects', 'Courses + Certifications', 'Reading/Docs', 'Mentorship'],
  },
];

function Chatbot({ embedded = false, showSidebar = true, onToggleSidebar, onStartTests }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your Career Assistant. Ready to begin?" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({ interestArea: '', strengths: [], workStyle: '', learningPref: '' });
  const [showCTA, setShowCTA] = useState(false);
  const [sessions, setSessions] = useState([]); // previous chats
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [showSidebarLocal, setShowSidebarLocal] = useState(showSidebar);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [generatedTests, setGeneratedTests] = useState([]); // from AI response

  // Inline Test States
  const [inlineAnswers, setInlineAnswers] = useState({});
  const [isGeneratingTest, setIsGeneratingTest] = useState(false);
  const [isSubmittingTest, setIsSubmittingTest] = useState(false);
  const [testScore, setTestScore] = useState(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const loadChatHistory = React.useCallback(async () => {
    try {
      setIsLoadingHistory(true);
      const response = await axiosInstance.get('/career/history');
      
      if (response.data && response.data.documents) {
        const data = response.data;
        const apiSessions = data.documents.map(doc => ({
          id: doc._id || doc.window_id,
          title: doc.messages && doc.messages.length > 0 
            ? doc.messages[0]?.content?.substring(0, 30) + (doc.messages[0]?.content?.length > 30 ? '...' : '')
            : 'Career Chat Session',
          timestamp: doc.created_at ? new Date(doc.created_at).getTime() : Date.now(),
          window_id: doc.window_id,
          messageCount: doc.messages ? doc.messages.length : 0,
          tests: doc.tests || []
        }));
        
        setSessions(apiSessions);
      }
    } catch (error) {
      console.error('Failed to load career chat history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [axiosInstance]);

  // Load sessions from API
  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  const startNewChat = () => {
    setActiveSessionId(null);
    setMessages([
      { role: 'assistant', content: "Hi! I'm your Career Assistant. Let's begin." }, 
      { role: 'assistant', content: formatQuestion(questionnaire[0]) }
    ]);
    setAnswers({ interestArea: '', strengths: [], workStyle: '', learningPref: '' });
    setStepIndex(0);
    setShowCTA(false);
  };

  const openSession = async (session) => {
    try {
      setIsLoadingHistory(true);
      const windowId = session.window_id || session.id;
      setActiveSessionId(windowId);
      
      const response = await axiosInstance.get(`/career/history/${windowId}`);
      
      if (response.data) {
        const data = response.data;
        let loadedMessages = [...(data.messages || [])];

        // Rebuild tests inline
        if (data.tests) {
          data.tests.forEach(test => {
             loadedMessages.push({
               role: 'assistant',
               type: 'test',
               content: "I've generated a custom EQ/IQ test based on our conversation. Let's see how you do!",
               testData: test
             });
          });
          setGeneratedTests(data.tests);
        }

        // Rebuild evaluations inline
        if (data.test_results && data.test_results.length > 0) {
           data.test_results.forEach(result => {
              loadedMessages.push({
                 role: 'assistant',
                 type: 'evaluation',
                 content: `You scored ${result.score} out of ${result.totalQuestions} (${result.percentage}%)!`,
                 resultData: result
              });
           });
           setTestScore(data.test_results[0]);
        } else {
           setTestScore(null);
        }

        // Rebuild feedback inline
        const feedbackExists = data.career_feedback && typeof data.career_feedback === 'object' && Object.keys(data.career_feedback).length > 0;
        
        if (feedbackExists) {
           loadedMessages.push({
              role: 'assistant',
              type: 'feedback',
              content: data.career_feedback
           });
        }

        setMessages(loadedMessages);

        if (data.test_results && data.test_results.length > 0 && !feedbackExists) {
           setTimeout(() => {
              handleGetFeedback(windowId);
           }, 800);
        }
      }
    } catch (error) {
      console.error('Failed to load career session:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      await axiosInstance.delete(`/career/history/${sessionId}`);
      
      // Remove from state only after successful API deletion
      setSessions(prev => prev.filter(s => (s.window_id || s.id) !== sessionId));
      
      if (activeSessionId === sessionId) {
        setActiveSessionId(null);
        setMessages([{ role: 'assistant', content: "Select a chat or start a new one." }]);
        setGeneratedTests([]);
      }
    } catch (error) {
      console.error('Failed to delete career session:', error);
    }
  };

  const sendUser = async (text) => {
    if (!text.trim()) return;
    
    const newMessage = { role: 'user', content: text };
    setMessages((m) => [...m, newMessage]);
    setInput('');
    setIsTyping(true);

    // Record answer for current step
    const current = questionnaire[stepIndex];
    let updated = { ...answers };
    if (current) {
      if (current.multi) {
        const parts = text.split(',').map((s) => s.trim()).filter(Boolean);
        updated[current.key] = Array.from(new Set([...(answers[current.key] || []), ...parts]));
      } else {
        updated[current.key] = text;
      }
      setAnswers(updated);
    }

    try {
      // Send message to career backend
      const windowId = activeSessionId || `session_${Date.now()}`;
      if (!activeSessionId) setActiveSessionId(windowId);
      
      const response = await axiosInstance.post(`/career/chat/${windowId}`, {
        content: text
      });

      if (response.data) {
        const data = response.data;
        const aiMessage = data.messsage || data.message; // handle potential typo 'messsage'
        
        if (aiMessage) {
          setMessages((m) => [
            ...m,
            { role: 'assistant', content: aiMessage }
          ]);
          
          // If a roadmap was created successfully, we might see it in the message field
          if (data.message === "Roadmap created successfully") {
            setShowCTA(true);
          }
        }
      }
    } catch (error) {
      console.error('Failed to send message to career bot:', error);
      // Fallback to local questionnaire processing
      setTimeout(() => {
        if (stepIndex < questionnaire.length - 1) {
          const nextIndex = stepIndex + 1;
          const nextQ = questionnaire[nextIndex];
          setMessages((m) => [
            ...m,
            { role: 'assistant', content: acknowledger(current?.key, text) },
            { role: 'assistant', content: formatQuestion(nextQ) },
          ]);
          setStepIndex(nextIndex);
        } else {
          const summary = buildSummary({ ...updated });
          setMessages((m) => [
            ...m,
            { role: 'assistant', content: acknowledger(current?.key, text) },
            { role: 'assistant', content: summary },
          ]);
          setShowCTA(true);
        }
        setIsTyping(false);
      }, 600);
    } finally {
      setIsTyping(false);
    }
  };

  const handleGenerateTest = async () => {
    setIsGeneratingTest(true);
    setShowCTA(false);
    try {
      const windowId = activeSessionId || `session_${Date.now()}`;
      if (!activeSessionId) setActiveSessionId(windowId);

      const response = await axiosInstance.post(`/career/generate-eq-iq-test/${windowId}`);
      if (response.data && response.data.eq_iq_plan) {
        const testData = response.data.eq_iq_plan;
        
        setMessages((m) => [
          ...m,
          { 
            role: 'assistant', 
            type: 'test', 
            content: "I've generated a custom EQ/IQ test based on our conversation. Let's see how you do!",
            testData: testData 
          }
        ]);
        setInlineAnswers({});
        setTestScore(null);
      }
    } catch (error) {
      console.error('Failed to generate test:', error);
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, I encountered an issue generating the test. Please try again.' }]);
      setShowCTA(true);
    } finally {
      setIsGeneratingTest(false);
    }
  };

  const handleInlineAnswerSelect = (questionId, option) => {
    setInlineAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitInlineTest = async (testId) => {
    setIsSubmittingTest(true);
    try {
      const formattedAnswers = Object.keys(inlineAnswers).map(qId => ({
        questionId: qId,
        selectedOption: inlineAnswers[qId]
      }));

      const windowId = activeSessionId;
      const response = await axiosInstance.post(`/career/evaluate-test/${windowId}/${testId}`, {
        answers: formattedAnswers
      });

      if (response.data) {
        const result = response.data;
        setTestScore(result);
        
        setMessages((m) => [
          ...m,
          { 
            role: 'assistant', 
            type: 'evaluation', 
            content: `You scored ${result.score} out of ${result.totalQuestions} (${result.percentage}%)!`,
            resultData: result
          }
        ]);

        handleGetFeedback(windowId);
      }
    } catch (error) {
      console.error('Failed to evaluate test:', error);
    } finally {
      setIsSubmittingTest(false);
    }
  };

  const handleGetFeedback = async (windowId) => {
    try {
      setMessages((m) => [...m, { role: 'assistant', type: 'loading_feedback', content: "Generating your personalized career blueprint..." }]);
      const response = await axiosInstance.post(`/career/career-feedback/${windowId}`);
      if (response.data) {
        setMessages((m) => [
          ...m.filter(msg => msg.type !== 'loading_feedback'),
          {
            role: 'assistant',
            type: 'feedback',
            content: response.data
          }
        ]);
      }
    } catch (error) {
       console.error("Failed to generate feedback", error);
       setMessages((m) => [...m.filter(msg => msg.type !== 'loading_feedback'), { role: 'assistant', content: 'There was an issue generating your feedback.' }]);
    }
  };

  useEffect(() => {
    // Show first question after a small delay only if it's a new session
    const timer = setTimeout(() => {
      if (messages.length === 1 && !activeSessionId) {
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: formatQuestion(questionnaire[0]) },
        ]);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeSessionId, messages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendUser(input);
  };

  // Helper functions (formatQuestion, acknowledger, buildSummary, suggestCareers) remain the same
  function formatQuestion(q) {
    if (!q) return '';
    if (!q.options) return q.question;
    const suffix = q.multi ? ' — you can pick multiple (comma-separated)' : '';
    return `${q.question}${suffix} (options: ${q.options.join(', ')})`;
  }

  const acknowledger = (key, text) => {
    if (!key) return 'Got it!';
    switch (key) {
      case 'interestArea':
        return `Great! ${text} sounds exciting.`;
      case 'strengths':
        return `Awesome strengths: ${text}.`;
      case 'workStyle':
        return `Noted. Work style: ${text}.`;
      case 'learningPref':
        return `Perfect—learning via ${text} works well.`;
      default:
        return 'Got it!';
    }
  };

  const buildSummary = (ans) => {
    const area = ans.interestArea || 'your chosen area';
    const strengths = (ans.strengths || []).join(', ') || 'your core strengths';
    const style = ans.workStyle || 'your preferred style';
    const learn = ans.learningPref || 'your learning preference';

    const suggestions = suggestCareers(area, strengths);

    return `Here's your quick summary:\n\n• Interest Area: ${area}\n• Key Strengths: ${strengths}\n• Work Style: ${style}\n• Learning Preference: ${learn}\n\nRecommended Paths: ${suggestions.join(', ')}\n\nNext 4-Week Plan:\n1) Foundations based on ${area}\n2) Build 1 mini project per week\n3) Share on GitHub/LinkedIn\n4) Mock interview + resume review\n\nWant a detailed roadmap or resources next?`;
  };

  const suggestCareers = (area, strengths) => {
    const s = (strengths || '').toLowerCase();
    if (/data|ai/i.test(area)) return ['Data Analyst', 'ML Engineer', 'Data Scientist'];
    if (/design|ux|ui/i.test(area)) return ['UI/UX Designer', 'Product Designer'];
    if (/product|business/i.test(area)) return ['Product Manager', 'Business Analyst'];
    if (/marketing/i.test(area)) return ['Digital Marketer', 'SEO Specialist', 'Content Strategist'];
    if (/security|cyber/i.test(area)) return ['Security Analyst', 'Security Engineer'];
    if (/software|dev|engineering/i.test(area)) {
      if (s.includes('creativ')) return ['Frontend Developer', 'Mobile Developer'];
      if (s.includes('logical') || s.includes('problem')) return ['Backend Developer', 'Full-Stack Developer'];
      return ['Full-Stack Developer', 'Backend Developer'];
    }
    return ['Software Developer', 'Business Analyst'];
  };

  return (
    <div className={`${embedded ? 'h-full' : 'min-h-screen'} cb-container`}>
      <div className={`${embedded ? 'w-full h-full px-4 py-4' : 'w-full px-4 sm:px-6 lg:px-10 py-6'}`}>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Career Chat</h1>
          <div className="flex items-center gap-2">
            {embedded && (
              <button
                onClick={() => {
                  const next = !showSidebarLocal;
                  setShowSidebarLocal(next);
                  onToggleSidebar && onToggleSidebar(next);
                }}
                className="rounded-2xl px-4 py-2 font-semibold shadow-sm border border-gray-200 dark:border-purple-900/40 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] dark:bg-[#121212]"
              >
                {showSidebarLocal ? 'Hide History' : 'Show History'}
              </button>
            )}
            <button onClick={startNewChat} className="cb-btn-primary rounded-2xl px-4 py-2 font-semibold shadow-lg">
              Start Chat
            </button>
          </div>
        </div>

        {/* Layout: Sidebar + Chat */}
        <div className={`grid gap-4 ${showSidebarLocal ? 'md:grid-cols-[18rem_1fr]' : 'grid-cols-1'}`}>
          {/* Sidebar */}
          {showSidebarLocal && (
            <aside className="cb-glass rounded-2xl p-4 h-[70vh] md:h-[78vh] overflow-hidden flex flex-col">
              <div className="text-gray-700 dark:text-gray-300 font-semibold mb-3 flex items-center justify-between">
                <span>Previous Chats</span>
                <History className="w-4 h-4" />
              </div>
              <div className="overflow-y-auto cb-scroll space-y-2 flex-grow">
                {isLoadingHistory && (
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Loading history...</div>
                )}
                {!isLoadingHistory && sessions.length === 0 && (
                  <div className="text-gray-500 dark:text-gray-400 text-sm">No previous chats</div>
                )}
                {sessions.map((s) => (
                  <div key={s.id} className="group relative">
                    <button
                      onClick={() => openSession(s)}
                      className={`w-full text-left px-3 py-2 rounded-xl border border-gray-200 dark:border-purple-900/40 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] ${
                        activeSessionId === (s.window_id || s.id) ? 'bg-gray-100 dark:bg-[#2a2a2a]' : ''
                      }`}
                    >
                      <div className="text-sm font-medium truncate">{s.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(s.timestamp).toLocaleString()}
                        {s.messageCount && ` • ${s.messageCount} messages`}
                      </div>
                    </button>
                    <button
                      onClick={() => deleteSession(s.window_id || s.id, !!s.window_id)}
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-opacity"
                      title="Delete chat"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {generatedTests.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-purple-900/40">
                  <div className="text-gray-700 dark:text-gray-300 font-semibold mb-3 flex items-center justify-between">
                    <span>Generated Tests</span>
                    <Brain className="w-4 h-4" />
                  </div>
                  <div className="space-y-2">
                    {generatedTests.map((test, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigate('/assessment-tests', { state: { customTest: test } })}
                        className="w-full text-left px-3 py-3 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 shrink-0" />
                        <div className="text-sm font-medium truncate">{test.domain} Test</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          )}

          {/* Chat window */}
          <div className={`cb-glass rounded-3xl grid grid-rows-[1fr_auto] ${embedded ? 'h-[70vh] md:h-[78vh]' : 'h-[70vh] md:h-[78vh]'} cb-glow`}>
            {/* Messages */}
            <div ref={listRef} className="cb-scroll overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'assistant' && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 text-white flex items-center justify-center mr-3 shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                  <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === 'user' ? 'cb-msg-user' : 'cb-msg cb-markdown'}`}>
                    {m.role === 'user' ? (
                      m.content
                    ) : m.type === 'test' ? (
                      <div>
                        <p className="mb-4 font-semibold text-purple-700 dark:text-purple-300">{m.content}</p>
                        
                        <div className="space-y-4 border border-purple-200 dark:border-purple-900/40 p-4 rounded-xl bg-white dark:bg-[#1a1a1a]">
                           <h3 className="font-bold text-lg text-purple-700 dark:text-purple-400">{m.testData.domain} Assessment</h3>
                           <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">{m.testData.description}</p>
                           
                           {m.testData.questions.map((q, qIndex) => (
                             <div key={q.questionId} className="space-y-2">
                               <p className="font-semibold text-gray-800 dark:text-gray-200">{qIndex + 1}. {q.question}</p>
                               <div className="grid sm:grid-cols-2 gap-2">
                                 {q.options.map(opt => {
                                   const isSelected = inlineAnswers[q.questionId] === opt;
                                   return (
                                     <button
                                       key={opt}
                                       onClick={() => !testScore && handleInlineAnswerSelect(q.questionId, opt)}
                                       disabled={!!testScore}
                                       className={`text-left px-3 py-2 border rounded-lg text-xs transition-colors ${
                                         isSelected 
                                           ? 'bg-purple-100 border-purple-400 dark:bg-purple-900/40 dark:border-purple-500' 
                                           : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                       }`}
                                     >
                                       {opt}
                                     </button>
                                   )
                                 })}
                               </div>
                             </div>
                           ))}

                           {!testScore && (
                             <button 
                               onClick={() => handleSubmitInlineTest(m.testData.testId)}
                               disabled={isSubmittingTest || Object.keys(inlineAnswers).length < m.testData.questions.length}
                               className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg disabled:opacity-50"
                             >
                               {isSubmittingTest ? 'Evaluating...' : 'Submit Answers'}
                             </button>
                           )}
                        </div>
                      </div>
                    ) : m.type === 'evaluation' ? (
                       <div className="font-medium text-emerald-600 dark:text-emerald-400 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                          {m.content}
                       </div>
                    ) : m.type === 'loading_feedback' ? (
                       <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="font-medium">{m.content}</span>
                       </div>
                    ) : m.type === 'feedback' ? (
                       <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/10 dark:to-transparent p-4 rounded-xl border border-purple-200 dark:border-purple-900/40 shadow-sm">
                          <h3 className="font-bold text-lg text-purple-700 dark:text-purple-400 mb-2">Your Career Blueprint</h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">{m.content.profile_summary}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-white dark:bg-[#121212] p-3 rounded-lg border border-purple-100 dark:border-gray-800">
                               <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Direction</p>
                               <p className="font-semibold text-gray-800 dark:text-gray-200 text-balance">{m.content.direction}</p>
                            </div>
                            <div className="bg-white dark:bg-[#121212] p-3 rounded-lg border border-purple-100 dark:border-gray-800">
                               <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Roadmap</p>
                               <p className="font-semibold text-gray-800 dark:text-gray-200 text-balance">{m.content.roadmap}</p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Core Skills to Build:</p>
                            <div className="flex flex-wrap gap-2">
                              {m.content.core_skills?.map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">{skill}</span>
                              ))}
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Suggested Courses:</p>
                            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                              {m.content.suggested_courses?.map((course, i) => (
                                <li key={i}>{course}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3 bg-purple-600/10 dark:bg-purple-500/10 rounded-lg italic text-sm text-purple-800 dark:text-purple-300">
                            "{m.content.motivational_message}"
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-purple-100 dark:border-purple-900/30 flex justify-end">
                            <button onClick={() => navigate('/dashboard')} className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
                              Return to Dashboard →
                            </button>
                          </div>
                       </div>
                    ) : (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    )}
                  </div>
                  {m.role === 'user' && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 text-white flex items-center justify-center ml-3 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}

              {messages.length <= 2 && (
                <div className="grid grid-cols-2 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {starterPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => sendUser(p.label)}
                      className="cb-prompt-chip group flex flex-col items-start p-4 text-left transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                    >
                      <span className="text-2xl mb-2 group-hover:bounce">{p.icon}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-tight">{p.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {isTyping && (
                <div className="flex justify-start items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 text-white flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="cb-msg rounded-2xl px-4 py-3 text-sm text-gray-500 dark:text-gray-400 cb-typing">
                    <span>•</span> <span>•</span> <span>•</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-gray-200 dark:border-purple-900/40 grid grid-cols-[1fr_auto] gap-2">
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your response..."
                  className="w-full rounded-2xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-purple-900/40 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 pr-10 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400"
                  disabled={isTyping}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Wand2 className="w-5 h-5" />
                </div>
              </div>
              <button 
                type="submit" 
                className="cb-btn-primary rounded-2xl px-5 py-3 font-semibold shadow-lg flex items-center gap-2"
                disabled={isTyping || !input.trim()}
              >
                <Send className="w-5 h-5" /> Send
              </button>
            </form>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
          <button
            onClick={handleGenerateTest}
            disabled={isGeneratingTest || messages.filter(m => m.role === 'user').length < 4}
            className={`rounded-2xl px-6 py-3 font-semibold shadow-lg inline-flex items-center gap-2 transition-all ${
              messages.filter(m => m.role === 'user').length >= 4 && !isGeneratingTest 
                ? 'cb-btn-primary hover:-translate-y-1' 
                : 'bg-gray-200 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-800 cursor-not-allowed'
            }`}
          >
            {isGeneratingTest ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />} 
            {isGeneratingTest ? 'Generating Test...' : 'Start EQ/IQ Tests'}
          </button>
          
          {messages.filter(m => m.role === 'user').length < 4 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
               Send {4 - messages.filter(m => m.role === 'user').length} more message(s) to unlock your personalized assessment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;