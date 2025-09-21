import React, { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, User, Wand2, Brain } from 'lucide-react';
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
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  // Load sessions from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('chat_sessions');
      if (raw) setSessions(JSON.parse(raw));
    } catch (e) { /* no-op */ }
  }, []);

  const persistSessions = (next) => {
    try { localStorage.setItem('chat_sessions', JSON.stringify(next)); } catch (e) { /* no-op */ }
  };

  const startNewChat = () => {
    const id = Date.now();
    const newSession = { id, title: 'New Chat', timestamp: id, messages: [
      { role: 'assistant', content: formatQuestion(questionnaire[0]) },
    ] };
    const nextSessions = [{ id, title: 'New Chat', timestamp: id }, ...sessions];
    setSessions(nextSessions);
    persistSessions(nextSessions);
    setActiveSessionId(id);
    setMessages([{ role: 'assistant', content: "Hi! I'm your Career Assistant. Let's begin." }, { role: 'assistant', content: formatQuestion(questionnaire[0]) }]);
    setAnswers({ interestArea: '', strengths: [], workStyle: '', learningPref: '' });
    setStepIndex(0);
    setShowCTA(false);
  };

  const openSession = (id) => {
    // Prototype: just mark active. Real implementation would restore messages per session
    setActiveSessionId(id);
  };

  const sendUser = (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', content: text }]);
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

    // Prepare next action
    setTimeout(() => {
      // If more steps, ask next question
      if (stepIndex < questionnaire.length - 1) {
        const nextIndex = stepIndex + 1;
        const nextQ = questionnaire[nextIndex];
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: acknowledger(current?.key, text) },
          { role: 'assistant', content: formatQuestion(nextQ) },
        ]);
        setStepIndex(nextIndex);
        setIsTyping(false);
      } else {
        // Final summary and suggestions
        const summary = buildSummary({ ...updated });
        // Persist profile for dashboard (prototype)
        try {
          const area = updated.interestArea;
          const strengths = (updated.strengths || []).join(', ');
          const suggestions = suggestCareers(area || '', strengths || '');
          localStorage.setItem('careerProfile', JSON.stringify({
            interestArea: area,
            strengths: updated.strengths,
            workStyle: updated.workStyle,
            learningPref: updated.learningPref,
            suggestions,
            summary,
            timestamp: Date.now(),
          }));
        } catch (e) { /* no-op */ }
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: acknowledger(current?.key, text) },
          { role: 'assistant', content: summary },
        ]);
        setIsTyping(false);
        setShowCTA(true);
      }
    }, 600);
  };

  // Post-helpers: show the first question on mount to guide the user
  useEffect(() => {
    setMessages((m) => [
      ...m,
      { role: 'assistant', content: formatQuestion(questionnaire[0]) },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendUser(input);
  };

  // Helpers
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

    return `Here’s your quick summary:\n\n• Interest Area: ${area}\n• Key Strengths: ${strengths}\n• Work Style: ${style}\n• Learning Preference: ${learn}\n\nRecommended Paths: ${suggestions.join(', ')}\n\nNext 4-Week Plan:\n1) Foundations based on ${area}\n2) Build 1 mini project per week\n3) Share on GitHub/LinkedIn\n4) Mock interview + resume review\n\nWant a detailed roadmap or resources next?`;
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
            <button onClick={startNewChat} className="cb-btn-primary rounded-2xl px-4 py-2 font-semibold shadow-lg">Start Chat</button>
          </div>
        </div>

        {/* Layout: Sidebar + Chat */}
        <div className={`grid gap-4 ${showSidebarLocal ? 'md:grid-cols-[18rem_1fr]' : 'grid-cols-1'}`}>
          {/* Sidebar */}
          {showSidebarLocal && (
          <aside className="cb-glass rounded-2xl p-4 h-[70vh] md:h-[78vh] overflow-hidden flex flex-col">
            <div className="text-gray-700 font-semibold mb-3">Previous Chats</div>
            <div className="overflow-y-auto cb-scroll space-y-2">
              {sessions.length === 0 && (
                <div className="text-gray-500 text-sm">No previous chats</div>
              )}
              {sessions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => openSession(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 ${activeSessionId === s.id ? 'bg-gray-100' : ''}`}
                >
                  <div className="text-sm font-medium truncate">{s.title}</div>
                  <div className="text-xs text-gray-500">{new Date(s.timestamp).toLocaleString()}</div>
                </button>
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
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Wand2 className="w-5 h-5" />
              </div>
            </div>
            <button type="submit" className="cb-btn-primary rounded-2xl px-5 py-3 font-semibold shadow-lg flex items-center gap-2">
              <Send className="w-5 h-5" /> Send
            </button>
          </form>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => (onStartTests ? onStartTests() : navigate('/assessment-tests'))}
            className="cb-btn-primary rounded-2xl px-6 py-3 font-semibold shadow-lg inline-flex items-center gap-2"
          >
            <Brain className="w-5 h-5" /> Start EQ/IQ Tests
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default Chatbot;
