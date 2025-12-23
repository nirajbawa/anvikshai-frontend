import React, { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, User, Wand2, Brain, History, Trash2 } from 'lucide-react';
import './Chatbot.css';
import { useNavigate } from 'react-router-dom';

const starterPrompts = [
  'Help me find the right career path',
  'Suggest careers based on my interests',
  'What skills should I learn for Data Science?',
  'Create a quick learning roadmap for me',
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
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  // Load sessions from localStorage and API
  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      // Load from localStorage first
      const raw = localStorage.getItem('chat_sessions');
      if (raw) {
        setSessions(JSON.parse(raw));
      }
      
      // Then load from API
      setIsLoadingHistory(true);
      const response = await fetch('/api/chat/history', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.documents && data.documents.length > 0) {
          // Convert API data to session format
          const apiSessions = data.documents.map(doc => ({
            id: doc._id,
            title: doc.messages.length > 0 
              ? doc.messages[0]?.content?.substring(0, 30) + '...' 
              : 'Chat Session',
            timestamp: new Date(doc.created_at).getTime(),
            window_id: doc.window_id,
            messageCount: doc.messages ? doc.messages.length : 0
          }));
          
          // Merge with local sessions
          setSessions(prev => [...apiSessions, ...prev]);
        }
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const persistSessions = (next) => {
    try { 
      localStorage.setItem('chat_sessions', JSON.stringify(next)); 
    } catch (e) { 
      console.error('Failed to persist sessions:', e);
    }
  };

  const startNewChat = () => {
    const id = Date.now().toString();
    const newSession = { 
      id, 
      title: 'New Chat', 
      timestamp: id, 
      messages: [
        { role: 'assistant', content: formatQuestion(questionnaire[0]) },
      ] 
    };
    const nextSessions = [{ id, title: 'New Chat', timestamp: id }, ...sessions];
    setSessions(nextSessions);
    persistSessions(nextSessions);
    setActiveSessionId(id);
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
      setActiveSessionId(session.id);
      
      // If it's an API session (has window_id), fetch from backend
      if (session.window_id) {
        const response = await fetch(`/api/chat/history/${session.window_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.messages) {
            setMessages(data.messages);
          }
        }
      } else {
        // Local session - restore from localStorage
        const localSessions = JSON.parse(localStorage.getItem('chat_sessions') || '[]');
        const localSession = localSessions.find(s => s.id === session.id);
        if (localSession && localSession.messages) {
          setMessages(localSession.messages);
        }
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const deleteSession = async (sessionId, isApiSession = false) => {
    try {
      if (isApiSession) {
        // Delete from API
        await fetch(`/api/chat/history/${sessionId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      
      // Remove from local state
      const updatedSessions = sessions.filter(s => s.id !== sessionId);
      setSessions(updatedSessions);
      
      // Remove from localStorage if it's a local session
      if (!isApiSession) {
        persistSessions(updatedSessions);
      }
      
      if (activeSessionId === sessionId) {
        setActiveSessionId(null);
        setMessages([{ role: 'assistant', content: "Select a chat or start a new one." }]);
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
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
      // Send message to backend
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          message: text,
          window_id: activeSessionId,
          current_step: stepIndex,
          answers: updated
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.response) {
          setMessages((m) => [
            ...m,
            { role: 'assistant', content: data.response }
          ]);
        }
        
        if (data.next_step !== undefined) {
          setStepIndex(data.next_step);
        }
        
        if (data.completed) {
          setShowCTA(true);
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Fallback to local processing
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

  useEffect(() => {
    // Show first question on mount
    setMessages((m) => [
      ...m,
      { role: 'assistant', content: formatQuestion(questionnaire[0]) },
    ]);
  }, []);

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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Career Chat</h1>
          <div className="flex items-center gap-2">
            {embedded && (
              <button
                onClick={() => {
                  const next = !showSidebarLocal;
                  setShowSidebarLocal(next);
                  onToggleSidebar && onToggleSidebar(next);
                }}
                className="rounded-2xl px-4 py-2 font-semibold shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50"
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
              <div className="text-gray-700 font-semibold mb-3 flex items-center justify-between">
                <span>Previous Chats</span>
                <History className="w-4 h-4" />
              </div>
              <div className="overflow-y-auto cb-scroll space-y-2">
                {isLoadingHistory && (
                  <div className="text-gray-500 text-sm">Loading history...</div>
                )}
                {!isLoadingHistory && sessions.length === 0 && (
                  <div className="text-gray-500 text-sm">No previous chats</div>
                )}
                {sessions.map((s) => (
                  <div key={s.id} className="group relative">
                    <button
                      onClick={() => openSession(s)}
                      className={`w-full text-left px-3 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 ${
                        activeSessionId === s.id ? 'bg-gray-100' : ''
                      }`}
                    >
                      <div className="text-sm font-medium truncate">{s.title}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(s.timestamp).toLocaleString()}
                        {s.messageCount && ` • ${s.messageCount} messages`}
                      </div>
                    </button>
                    <button
                      onClick={() => deleteSession(s.id, !!s.window_id)}
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-opacity"
                      title="Delete chat"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
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
                  <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === 'user' ? 'cb-msg-user' : 'cb-msg'}`}>
                    {m.content}
                  </div>
                  {m.role === 'user' && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 text-white flex items-center justify-center ml-3 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 text-white flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="cb-msg rounded-2xl px-4 py-3 text-sm text-gray-500 cb-typing">
                    <span>•</span> <span>•</span> <span>•</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-gray-200 grid grid-cols-[1fr_auto] gap-2">
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your response..."
                  className="w-full rounded-2xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 px-4 py-3 pr-10 focus:outline-none focus:border-purple-500"
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
        {showCTA && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => (onStartTests ? onStartTests() : navigate('/assessment-tests'))}
              className="cb-btn-primary rounded-2xl px-6 py-3 font-semibold shadow-lg inline-flex items-center gap-2"
            >
              <Brain className="w-5 h-5" /> Start EQ/IQ Tests
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;