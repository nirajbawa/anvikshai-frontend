import React, { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, User, ArrowLeft, Wand2, Lightbulb, Brain, BookOpen } from 'lucide-react';
import './Chatbot.css';
import { Link, useNavigate } from 'react-router-dom';

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

function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Namaste! I'm your Career Assistant. I'll ask a few quick questions to discover your interests and strengths, then suggest paths and a mini-roadmap. Shall we begin?" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({ interestArea: '', strengths: [], workStyle: '', learningPref: '' });
  const [showCTA, setShowCTA] = useState(false);
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

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
    <div className="min-h-screen cb-container relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        <div className="absolute top-1/3 -right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Link>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full cb-glass cb-glow text-white">
            <Sparkles className="w-5 h-5 text-cyan-300" />
            <span className="text-sm">Prototype • Static responses</span>
          </div>
        </div>

        {/* Hero panel */}
        <div className="cb-glass cb-glow rounded-3xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white">Career Assessment Chat</h1>
              <p className="text-white/70">Answer a few quick questions. I\'ll suggest paths, skills and a mini-roadmap.</p>
            </div>
          </div>

          {/* Show quick options for current question if available */}
          <div className="flex flex-wrap gap-2">
            {(questionnaire[stepIndex]?.options || starterPrompts).map((p, i) => (
              <button
                key={i}
                onClick={() => sendUser(p)}
                className="cb-badge text-white/85 px-3 py-2 rounded-full text-sm hover:text-white hover:brightness-110"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="cb-glass rounded-3xl grid grid-rows-[1fr_auto] h-[60vh] sm:h-[65vh] cb-glow">
          {/* Messages */}
          <div ref={listRef} className="cb-scroll overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center mr-3 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                )}
                <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed text-white ${m.role === 'user' ? 'cb-msg-user' : 'cb-msg'}`}>
                  {m.content}
                </div>
                {m.role === 'user' && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center ml-3 shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="cb-msg rounded-2xl px-4 py-3 text-sm text-white/80 cb-typing">
                  <span>•</span> <span>•</span> <span>•</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-white/10 grid grid-cols-[1fr_auto] gap-2">
            <div className="relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your response..."
                className="w-full rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 px-4 py-3 pr-10 focus:outline-none focus:border-cyan-400"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                <Wand2 className="w-5 h-5" />
              </div>
            </div>
            <button type="submit" className="cb-btn-primary rounded-2xl px-5 py-3 font-semibold shadow-lg flex items-center gap-2">
              <Send className="w-5 h-5" /> Send
            </button>
          </form>
        </div>

        {showCTA && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate('/assessment-tests')}
              className="cb-btn-primary rounded-2xl px-6 py-3 font-semibold shadow-lg"
            >
              Proceed to IQ/EQ Tests
            </button>
          </div>
        )}

        {/* Tips */}
        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          <div className="cb-glass rounded-2xl p-4 text-white/80 text-sm flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-yellow-300" />
            You can click a suggested prompt to auto-fill the chat.
          </div>
          <div className="cb-glass rounded-2xl p-4 text-white/80 text-sm flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-cyan-300" />
            This is a prototype. Responses are static, just for demo.
          </div>
          <div className="cb-glass rounded-2xl p-4 text-white/80 text-sm flex items-center gap-3">
            <Brain className="w-5 h-5 text-purple-300" />
            We can later plug real AI and scoring logic here.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
