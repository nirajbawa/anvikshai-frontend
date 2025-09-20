import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Heart, Sparkles, ArrowLeft, CheckCircle2, XCircle, Timer, Trophy } from 'lucide-react';
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
  { q: 'A junior asks for help while you’re busy. Best response?', options: ['Ignore till free', 'Set a time and help them', 'Tell them to Google it', 'Ask someone else to handle'], answer: 'Set a time and help them' },
];

const GK_QUESTIONS = [
  { q: 'Which company created React?', options: ['Google', 'Facebook', 'Microsoft', 'Apple'], answer: 'Facebook' },
  { q: 'Which is not a programming language?', options: ['Python', 'HTML', 'Java', 'C++'], answer: 'HTML' },
  { q: 'SQL is primarily used for?', options: ['Styling web pages', 'Querying databases', 'Server hosting', 'Image processing'], answer: 'Querying databases' },
];

const sections = [
  { key: 'iq', label: 'IQ', icon: Brain, color: '#22d3ee', data: IQ_QUESTIONS },
  { key: 'eq', label: 'EQ', icon: Heart, color: '#ec4899', data: EQ_QUESTIONS },
  { key: 'gk', label: 'GK', icon: Sparkles, color: '#a855f7', data: GK_QUESTIONS },
];

function AssessmentTests() {
  const [active, setActive] = useState('iq');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const activeSection = useMemo(() => sections.find((s) => s.key === active) || sections[0], [active]);

  const handleSelect = (secKey, idx, option) => {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [`${secKey}-${idx}`]: option }));
  };

  const submitAll = () => {
    setSubmitted(true);
  };

  // Compute static results
  const results = useMemo(() => {
    const scoreBy = { iq: 0, eq: 0, gk: 0 };
    sections.forEach((sec) => {
      sec.data.forEach((item, i) => {
        const key = `${sec.key}-${i}`;
        if (answers[key] === item.answer) scoreBy[sec.key] += 1;
      });
    });
    const totalBy = { iq: IQ_QUESTIONS.length, eq: EQ_QUESTIONS.length, gk: GK_QUESTIONS.length };

    const domainSuggestion = (() => {
      // Simple heuristic for prototype
      if (scoreBy.iq >= 2 && scoreBy.gk >= 2) return 'Software/Data oriented roles';
      if (scoreBy.eq >= 2) return 'Product/UX/Client-facing roles';
      return 'Explore foundational courses, then retake';
    })();

    try {
      if (submitted) {
        localStorage.setItem('assessmentResults', JSON.stringify({ scoreBy, totalBy, domainSuggestion, timestamp: Date.now() }));
      }
    } catch (e) { /* no-op */ }
    return { scoreBy, totalBy, domainSuggestion };
  }, [answers, submitted]);

  return (
    <div className="min-h-screen at-container relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/chatbot" className="inline-flex items-center text-white/80 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Chat
          </Link>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full at-glass text-white">
            <Timer className="w-5 h-5 text-cyan-300" />
            <span className="text-sm">Prototype • Static scoring</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`at-chip rounded-full px-4 py-2 text-white/80 hover:text-white ${active === s.key ? 'active' : ''}`}
              style={active === s.key ? { boxShadow: `0 0 24px ${s.color}44` } : {}}
            >
              <span className="inline-flex items-center gap-2"><s.icon className="w-4 h-4" /> {s.label} Test</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="at-glass rounded-3xl p-6 sm:p-8 text-white">
          <h1 className="text-2xl sm:text-3xl font-black mb-4">{activeSection.label} Test</h1>
          <p className="text-white/70 mb-6">Answer the following questions. Click Submit to see your prototype score and suggestion.</p>

          <div className="grid gap-4">
            {activeSection.data.map((item, i) => (
              <div key={i} className="at-card rounded-2xl p-4">
                <div className="font-semibold mb-3">Q{i + 1}. {item.q}</div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {item.options.map((opt) => {
                    const selected = answers[`${activeSection.key}-${i}`] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(activeSection.key, i, opt)}
                        className={`rounded-xl px-4 py-3 text-left border transition ${selected ? 'bg-white/20 border-white/40' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <div className="mt-3 text-sm inline-flex items-center gap-2">
                    {answers[`${activeSection.key}-${i}`] === item.answer ? (
                      <span className="text-emerald-400 inline-flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Correct</span>
                    ) : (
                      <span className="text-rose-400 inline-flex items-center gap-1"><XCircle className="w-4 h-4" /> Correct: {item.answer}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
            <button onClick={submitAll} className="at-btn-primary rounded-2xl px-6 py-3 font-semibold shadow-lg">Submit & View Results</button>
            {submitted && (
              <div className="at-card rounded-2xl p-4 inline-flex items-center gap-3">
                <Trophy className="w-5 h-5 text-yellow-300" />
                <div className="text-white/90">
                  <div>IQ: {results.scoreBy.iq}/{results.totalBy.iq} • EQ: {results.scoreBy.eq}/{results.totalBy.eq} • GK: {results.scoreBy.gk}/{results.totalBy.gk}</div>
                  <div className="text-white/70">Suggested Direction: <span className="text-cyan-300 font-semibold">{results.domainSuggestion}</span></div>
                </div>
              </div>
            )}
          </div>

          {submitted && (
            <div className="mt-6 flex justify-center">
              <button onClick={() => navigate('/dashboard')} className="at-btn-primary rounded-2xl px-6 py-3 font-semibold shadow-lg">
                Go to Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-6 text-center text-white/70">
          Prototype only. We can plug real adaptive tests and scoring later.
        </div>
      </div>
    </div>
  );
}

export default AssessmentTests;
