import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Heart, Sparkles, ArrowLeft, CheckCircle2, XCircle, Timer, Trophy, Clock, Play } from 'lucide-react';
import './AssessmentTests.css';

// Static prototype question banks
const IQ_QUESTIONS = [
  { q: 'What comes next in the sequence: 2, 4, 8, 16, ?', options: ['20', '24', '32', '30'], answer: '32' },
  { q: 'If ALL = 27, and CAT = 24, then DOG = ?', options: ['22', '26', '28', '30'], answer: '26' },
  { q: 'Find the odd one out: Square, Triangle, Circle, Rectangle', options: ['Square', 'Triangle', 'Circle', 'Rectangle'], answer: 'Circle' },
];

const EQ_QUESTIONS = [
  { q: 'A teammate disagrees with you strongly. What do you do first?', options: ['Prove them wrong quickly', 'Listen to understand their point', 'Avoid the topic', 'Escalate to manager'], answer: 'Listen to understand their point' },
  { q: 'You made a mistake that impacted delivery. Your response?', options: ['Hide it and fix later', 'Own it and communicate next steps', 'Blame dependencies', 'Do nothing'], answer: 'Own it and communicate next steps' },
  { q: 'A junior asks for help while youre busy. Best response?', options: ['Ignore till free', 'Set a time and help them', 'Tell them to Google it', 'Ask someone else to handle'], answer: 'Set a time and help them' },
];

const sections = [
  { key: 'iq', label: 'IQ', icon: Brain, color: '#8b5cf6', data: IQ_QUESTIONS },
  { key: 'eq', label: 'EQ', icon: Heart, color: '#ec4899', data: EQ_QUESTIONS },
];

// Domain information that would come from chatbot analysis
const DOMAIN_INFO = {
  title: "Software Engineering",
  description: "Based on our conversation, you've shown strong interest in problem-solving and logical thinking. This domain requires good analytical skills and emotional intelligence to work effectively in teams.",
  skills: ["Problem Solving", "Algorithmic Thinking", "Team Collaboration", "Continuous Learning"],
  duration: "10 minutes" // Total test duration
};

function AssessmentTests() {
  const [active, setActive] = useState('iq');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [testStarted, setTestStarted] = useState(false);
  const navigate = useNavigate();

  const activeSection = useMemo(() => sections.find((s) => s.key === active) || sections[0], [active]);

  // Timer effect
  useEffect(() => {
    if (!testStarted || submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timer);
          setSubmitted(true); // Auto-submit when time runs out
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, submitted, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelect = (secKey, idx, option) => {
    if (submitted || timeLeft <= 0 || !testStarted) return;
    setAnswers((a) => ({ ...a, [`${secKey}-${idx}`]: option }));
  };

  const startTest = () => {
    setTestStarted(true);
  };

  const submitAll = () => {
    setSubmitted(true);
  };

  // Compute static results
  const results = useMemo(() => {
    const scoreBy = { iq: 0, eq: 0 };
    sections.forEach((sec) => {
      sec.data.forEach((item, i) => {
        const key = `${sec.key}-${i}`;
        if (answers[key] === item.answer) scoreBy[sec.key] += 1;
      });
    });
    const totalBy = { iq: IQ_QUESTIONS.length, eq: EQ_QUESTIONS.length };

    const domainSuggestion = (() => {
      // Simple heuristic for prototype
      if (scoreBy.iq >= 2 && scoreBy.eq >= 2) return 'Excellent fit for Software Engineering roles';
      if (scoreBy.iq >= 2) return 'Strong technical skills, consider improving collaboration';
      if (scoreBy.eq >= 2) return 'Great team skills, consider strengthening technical foundation';
      return 'Explore foundational courses and retake assessment';
    })();

    try {
      if (submitted) {
        localStorage.setItem('assessmentResults', JSON.stringify({ 
          scoreBy, 
          totalBy, 
          domainSuggestion, 
          domain: DOMAIN_INFO.title,
          timestamp: Date.now() 
        }));
      }
    } catch (e) { /* no-op */ }
    return { scoreBy, totalBy, domainSuggestion };
  }, [answers, submitted]);

  return (
    <div className="min-h-screen at-container relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard/chatbot" className="inline-flex items-center text-purple-700 hover:text-purple-900 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Chat
          </Link>
          {testStarted && (
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full at-glass text-purple-700">
              <Timer className="w-5 h-5 text-purple-600" />
              <span className="text-sm">Time Left: {formatTime(timeLeft)}</span>
            </div>
          )}
        </div>

        {/* Domain Information */}
        <div className="at-glass rounded-3xl p-6 mb-6 text-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-purple-800 mb-2">
                Assessment for: {DOMAIN_INFO.title}
              </h1>
              <p className="text-gray-600">{DOMAIN_INFO.description}</p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">Duration: {DOMAIN_INFO.duration}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DOMAIN_INFO.skills.map((skill, index) => (
              <div key={index} className="text-center px-3 py-2 rounded-lg bg-purple-50 border border-purple-200">
                <span className="text-purple-700 font-medium text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Test Button - Only show if test hasn't started */}
        {!testStarted && !submitted && (
          <div className="flex justify-center mb-8">
            <button 
              onClick={startTest}
              className="at-btn-primary rounded-2xl px-8 py-4 font-semibold shadow-lg text-white inline-flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <Play className="w-6 h-6" />
              Start Assessment Test
            </button>
          </div>
        )}

        {/* Test Content - Only show if test has started */}
        {testStarted && (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {sections.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActive(s.key)}
                  className={`at-chip rounded-full px-4 py-2 text-purple-700 hover:text-purple-900 ${active === s.key ? 'active' : ''}`}
                  style={active === s.key ? { boxShadow: `0 0 24px ${s.color}44` } : {}}
                  disabled={submitted || timeLeft <= 0}
                >
                  <span className="inline-flex items-center gap-2"><s.icon className="w-4 h-4" /> {s.label} Test</span>
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="at-glass rounded-3xl p-6 sm:p-8 text-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-black text-purple-800">{activeSection.label} Test</h2>
                {timeLeft <= 0 && !submitted && (
                  <span className="text-rose-600 font-semibold">Time's up! Please submit your answers.</span>
                )}
              </div>
              <p className="text-gray-600 mb-6">Answer the following questions. Click Submit to see your prototype score and suggestion.</p>

              <div className="grid gap-4">
                {activeSection.data.map((item, i) => (
                  <div key={i} className="at-card rounded-2xl p-4">
                    <div className="font-semibold mb-3 text-gray-800">Q{i + 1}. {item.q}</div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {item.options.map((opt) => {
                        const selected = answers[`${activeSection.key}-${i}`] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleSelect(activeSection.key, i, opt)}
                            disabled={submitted || timeLeft <= 0}
                            className={`rounded-xl px-4 py-3 text-left border transition ${
                              selected ? 'bg-purple-100 border-purple-400 text-purple-800' : 'bg-white border-purple-200 text-gray-700 hover:bg-purple-50'
                            } ${submitted || timeLeft <= 0 ? 'opacity-80 cursor-not-allowed' : ''}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {submitted && (
                      <div className="mt-3 text-sm inline-flex items-center gap-2">
                        {answers[`${activeSection.key}-${i}`] === item.answer ? (
                          <span className="text-emerald-600 inline-flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Correct</span>
                        ) : (
                          <span className="text-rose-600 inline-flex items-center gap-1"><XCircle className="w-4 h-4" /> Correct: {item.answer}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
                <button 
                  onClick={submitAll} 
                  disabled={submitted || (timeLeft > 0 && Object.keys(answers).length === 0)}
                  className="at-btn-primary rounded-2xl px-6 py-3 font-semibold shadow-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {timeLeft > 0 ? 'Submit & View Results' : 'View Results'}
                </button>
                {submitted && (
                  <div className="at-card rounded-2xl p-4 inline-flex items-center gap-3 bg-purple-50 border-purple-200">
                    <Trophy className="w-5 h-5 text-purple-600" />
                    <div className="text-gray-800">
                      <div>IQ: {results.scoreBy.iq}/{results.totalBy.iq} • EQ: {results.scoreBy.eq}/{results.totalBy.eq}</div>
                      <div className="text-gray-600">Suggested Direction: <span className="text-purple-700 font-semibold">{results.domainSuggestion}</span></div>
                    </div>
                  </div>
                )}
              </div>

              {submitted && (
                <div className="mt-6 flex justify-center">
                  <button onClick={() => navigate('/dashboard/newdashboard')} className="at-btn-primary rounded-2xl px-6 py-3 font-semibold shadow-lg text-white">
                    Go to Dashboard
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Instructions before test starts */}
        {!testStarted && !submitted && (
          <div className="at-glass rounded-3xl p-8 text-center mb-6">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Assessment Instructions</h3>
              <div className="grid gap-3 text-left text-gray-600 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Total duration: {DOMAIN_INFO.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>This test includes IQ and EQ sections</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Timer will start automatically when you begin</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>You can navigate between sections using tabs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Test will auto-submit when time expires</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">Click "Start Assessment Test" when you're ready to begin.</p>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-6 text-center text-gray-600">
          Prototype only. We can plug real adaptive tests and scoring later.
        </div>
      </div>
    </div>
  );
}

export default AssessmentTests;