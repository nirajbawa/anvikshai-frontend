import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  Sparkles,
  TrendingUp,
  Map,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
  Trophy,
} from 'lucide-react';

// Utility: build a detailed roadmap based on domain/suggestion
function useRoadmap(domain) {
  const d = (domain || '').toLowerCase();
  const common = [
    {
      title: 'Week 1: Foundations',
      items: [
        'Set up environment & Git/GitHub',
        'Revise core programming (DSA basics)',
        'Choose 1-2 learning resources to follow consistently',
      ],
    },
    {
      title: 'Week 2: Core Skills',
      items: [
        'Deep-dive into core tools for your domain',
        'Build mini-exercise daily (30–60 mins)',
        'Share learnings on LinkedIn for accountability',
      ],
    },
    {
      title: 'Week 3: Project Sprint',
      items: [
        'Build 1 portfolio-grade project end-to-end',
        'Write a README with problem, solution, stack, results',
        'Get brief feedback from a mentor/peer',
      ],
    },
    {
      title: 'Week 4: Portfolio + Interviews',
      items: [
        'Polish portfolio & add case study write-up',
        '1 mock interview + resume review',
        'Apply to 5 roles; iterate weekly',
      ],
    },
  ];

  if (/data|ml|ai|analyst|scientist/.test(d)) {
    return {
      label: 'Data/AI Roadmap',
      skills: ['Python', 'SQL', 'Pandas/NumPy', 'EDA', 'ML (sklearn)', 'Visualization'],
      projects: [
        'EDA on Indian jobs dataset (salary trends)',
        'ML classification (admission/churn prediction)',
        'Time-series or NLP mini project',
      ],
      plan: common,
      courses: ['Google Data Analytics', 'DataCamp SQL', 'fast.ai Practical Deep Learning'],
      roles: ['Data Analyst', 'ML Engineer', 'Data Scientist'],
    };
  }
  if (/full|front|back|software|developer|engineering/.test(d)) {
    return {
      label: 'Software/Full-Stack Roadmap',
      skills: ['HTML/CSS/JS', 'React', 'Node/Express', 'APIs', 'SQL/NoSQL', 'Testing'],
      projects: [
        'Full-stack CRUD app with auth',
        'API + frontend integration (public API)',
        'Deployment to Vercel/Render + CI',
      ],
      plan: common,
      courses: ['Meta Front-End Developer', 'The Odin Project', 'Fullstack Open'],
      roles: ['Frontend Dev', 'Backend Dev', 'Full-Stack Dev'],
    };
  }
  if (/design|ux|ui|product designer/.test(d)) {
    return {
      label: 'UI/UX Roadmap',
      skills: ['Design Thinking', 'Wireframing', 'Figma', 'Prototyping', 'Usability Testing'],
      projects: [
        'Redesign an app onboarding flow',
        'Case study: improve conversion for a landing page',
        'Design system basics in Figma',
      ],
      plan: common,
      courses: ['Google UX Design', 'DesignCourse UI', 'NN/g articles'],
      roles: ['UI/UX Designer', 'Product Designer'],
    };
  }
  if (/product|ba|business/.test(d)) {
    return {
      label: 'Product/Business Roadmap',
      skills: ['Market Research', 'PRD/Specs', 'Analytics', 'Roadmapping', 'Stakeholder mgmt'],
      projects: [
        'Write a PRD for a simple feature',
        'Analyze a product metric drop; propose experiment',
        'Competitive analysis for 3 apps',
      ],
      plan: common,
      courses: ['Product 101 by Reforge (articles)', 'Analytics fundamentals', 'Aha! tutorials'],
      roles: ['Product Manager', 'Business Analyst'],
    };
  }
  if (/security|cyber/.test(d)) {
    return {
      label: 'Cybersecurity Roadmap',
      skills: ['Networking Basics', 'Linux', 'OWASP Top 10', 'Burp Suite', 'SIEM basics'],
      projects: [
        'CTF practice (TryHackMe/HackTheBox)',
        'Vulnerability assessment mini report',
        'Set up a home lab and log analysis',
      ],
      plan: common,
      courses: ['TryHackMe learning paths', 'INE beginner tracks'],
      roles: ['Security Analyst', 'Security Engineer'],
    };
  }
  // Default
  return {
    label: 'Foundational Roadmap',
    skills: ['Problem Solving', 'Git/GitHub', 'Portfolio', 'Communication'],
    projects: ['1 guided project per week'],
    plan: common,
    courses: ['FreeCodeCamp', 'CS50x'],
    roles: ['Software Developer', 'Business Analyst'],
  };
}

function NewDashboard({ embedded = false }) {
  const navigate = useNavigate();
  const [careerProfile, setCareerProfile] = useState(null);
  const [assessmentResults, setAssessmentResults] = useState(null);

  useEffect(() => {
    try {
      const cp = localStorage.getItem('careerProfile');
      const ar = localStorage.getItem('assessmentResults');
      if (cp) setCareerProfile(JSON.parse(cp));
      if (ar) setAssessmentResults(JSON.parse(ar));
    } catch {}
  }, []);

  const chosenDomain = useMemo(() => {
    if (careerProfile?.suggestions?.length) return careerProfile.suggestions[0];
    if (assessmentResults?.domainSuggestion) return assessmentResults.domainSuggestion;
    return 'Software/Data oriented roles';
  }, [careerProfile, assessmentResults]);

  const roadmap = useRoadmap(chosenDomain);

  const trending = [
    { title: 'AI/ML Engineer', level: 'High Demand' },
    { title: 'Full-Stack Developer', level: 'High Demand' },
    { title: 'UI/UX Designer', level: 'Growing' },
    { title: 'Cybersecurity Analyst', level: 'High Demand' },
    { title: 'Data Analyst', level: 'Growing' },
  ];

  const careerOptions = roadmap.roles;

  const containerClass = embedded ? 'w-full' : 'min-h-screen at-container';
  const panelClass = embedded ? 'bg-white border border-gray-200 rounded-2xl p-6' : 'at-glass rounded-2xl p-6';

  return (
    <div className={containerClass}>
      {!embedded && (
        <header className="at-header">
          <div className="at-header-content">
            <div className="at-logo">
              <div className="at-logo-glow"></div>
              <div className="at-logo-icon">
                <Target className="at-logo-svg" />
              </div>
            </div>
            <h1 className="at-title">Your Career Dashboard</h1>
          </div>
        </header>
      )}

      <main className="at-main">
        <div className="at-content">
          {/* Overview */}
          <section className="at-section-grid">
            <div className={`at-panel-large ${panelClass}`}>
              <div className="at-panel-header">
                <Sparkles className="at-icon-purple" />
                <h2 className="at-panel-title">Profile Summary</h2>
              </div>
              {careerProfile ? (
                <div className="at-profile-grid">
                  <div>
                    <div className="at-label">Interest Area</div>
                    <div className="at-value">{careerProfile.interestArea || '—'}</div>
                  </div>
                  <div>
                    <div className="at-label">Key Strengths</div>
                    <div className="at-value">{(careerProfile.strengths || []).join(', ') || '—'}</div>
                  </div>
                  <div className="at-suggestions">
                    <div className="at-label">Suggested Paths</div>
                    <div className="at-tags">
                      {(careerProfile.suggestions || []).map((s) => (
                        <span key={s} className="at-tag">
                          <Sparkles className="at-tag-icon" /> {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="at-empty">Complete the assessment to populate your profile.</div>
              )}
            </div>

            <div className={`at-panel ${panelClass}`}>
              <div className="at-panel-header">
                <Trophy className="at-icon-gold" />
                <h2 className="at-panel-title">Results</h2>
              </div>
              {assessmentResults ? (
                <div className="at-results">
                  <div className="at-result-item">
                    <span className="at-result-label">IQ</span>
                    <span className="at-result-score">{assessmentResults.scoreBy.iq}/{assessmentResults.totalBy.iq}</span>
                  </div>
                  <div className="at-result-item">
                    <span className="at-result-label">EQ</span>
                    <span className="at-result-score">{assessmentResults.scoreBy.eq}/{assessmentResults.totalBy.eq}</span>
                  </div>
                  <div className="at-domain">
                    Direction: <span className="at-domain-value">{assessmentResults.domainSuggestion}</span>
                  </div>
                </div>
              ) : (
                <div className="at-empty">Take IQ/EQ/GK tests to view your results.</div>
              )}
            </div>
          </section>

          {/* Detailed Roadmap */}
          <section className={`at-panel ${panelClass}`}>
            <div className="at-panel-header">
              <Map className="at-icon-teal" />
              <h2 className="at-panel-title-large">{roadmap.label}</h2>
            </div>
            <div className="at-roadmap-grid">
              <div>
                <div className="at-subtitle">Core Skills</div>
                <ul className="at-list">
                  {roadmap.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <div className="at-subtitle">Suggested Courses</div>
                <ul className="at-list">
                  {roadmap.courses.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="at-subtitle">Portfolio Projects</div>
                <ul className="at-list">
                  {roadmap.projects.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="at-plan-section">
              <div className="at-subtitle">Learning Plan</div>
              <div className="at-plan-grid">
                {roadmap.plan.map((phase) => (
                  <div key={phase.title} className="at-phase-card">
                    <div className="at-phase-header">
                      <Layers className="at-icon-cyan" />
                      <h3 className="at-phase-title">{phase.title}</h3>
                    </div>
                    <ul className="at-phase-list">
                      {phase.items.map((it) => (<li key={it}>{it}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Career Options + Trending */}
          <section className="at-section-grid">
            <div className={`at-panel-large ${panelClass}`}>
              <div className="at-panel-header">
                <BookOpen className="at-icon-indigo" />
                <h2 className="at-panel-title">Career Options You Can Choose</h2>
              </div>
              <div className="at-career-tags">
                {careerOptions.map((c) => (
                  <span key={c} className="at-career-tag">
                    <CheckCircle2 className="at-career-icon" /> {c}
                  </span>
                ))}
              </div>
            </div>
            <div className={`at-panel ${panelClass}`}>
              <div className="at-panel-header">
                <TrendingUp className="at-icon-rose" />
                <h2 className="at-panel-title">Trending Jobs</h2>
              </div>
              <ul className="at-trending-list">
                {trending.map((t) => (
                  <li key={t.title} className="at-trending-item">
                    <span>{t.title}</span>
                    <span className={`at-trending-badge ${t.level === 'High Demand' ? 'at-high-demand' : 'at-growing'}`}>
                      {t.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="at-cta-section">
            {!embedded && (
              <button onClick={() => navigate('/dashboard/create-task')} className="at-primary-btn">
                Start Roadmap <ArrowRight className="at-btn-icon" />
              </button>
            )}
            <div className="at-save-notice">
              <Clock className="at-clock-icon" /> Save your progress and return anytime
            </div>
          </section>
        </div>
      </main>

      <style jsx>{`
        /* Purple & White Theme Styles */
        .at-container {
          background: linear-gradient(135deg, #f8f4ff 0%, #e6e0ff 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .at-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(138, 43, 226, 0.05) 0%, transparent 70%);
          animation: at-float 6s ease-in-out infinite;
        }

        .at-header {
          padding: 1rem 1.5rem;
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(138, 43, 226, 0.1);
          box-shadow: 0 4px 20px rgba(138, 43, 226, 0.08);
        }

        .at-header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .at-logo {
          position: relative;
        }

        .at-logo-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #8B5FBF 0%, #6A0DAD 100%);
          border-radius: 12px;
          opacity: 0.6;
          filter: blur(4px);
        }

        .at-logo-icon {
          position: relative;
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, #8B5FBF 0%, #6A0DAD 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
        }

        .at-logo-svg {
          width: 1.5rem;
          height: 1.5rem;
          color: white;
        }

        .at-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2D3748;
          margin: 0;
        }

        .at-main {
          padding: 1.5rem;
        }

        .at-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .at-section-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 1024px) {
          .at-section-grid {
            grid-template-columns: 2fr 1fr;
          }
        }

        .at-glass {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(138, 43, 226, 0.1);
          box-shadow: 
            0 8px 32px rgba(106, 13, 173, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }

        .at-glass:hover {
          box-shadow: 
            0 12px 40px rgba(106, 13, 173, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }

        .at-panel-large {
          grid-column: span 2;
        }

        .at-panel-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .at-panel-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #2D3748;
          margin: 0;
        }

        .at-panel-title-large {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2D3748;
          margin: 0;
        }

        .at-icon-purple { color: #8B5FBF; width: 1.25rem; height: 1.25rem; }
        .at-icon-gold { color: #D97706; width: 1.25rem; height: 1.25rem; }
        .at-icon-teal { color: #0D9488; width: 1.25rem; height: 1.25rem; }
        .at-icon-indigo { color: #4F46E5; width: 1.25rem; height: 1.25rem; }
        .at-icon-rose { color: #E11D48; width: 1.25rem; height: 1.25rem; }
        .at-icon-cyan { color: #0891B2; width: 1rem; height: 1rem; }

        .at-profile-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .at-profile-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .at-label {
          font-size: 0.875rem;
          color: #718096;
          margin-bottom: 0.25rem;
        }

        .at-value {
          font-weight: 600;
          color: #2D3748;
        }

        .at-suggestions {
          grid-column: span 2;
          margin-top: 0.5rem;
        }

        .at-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .at-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          background: rgba(139, 95, 191, 0.1);
          border: 1px solid rgba(139, 95, 191, 0.2);
          color: #6A0DAD;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .at-tag-icon {
          width: 1rem;
          height: 1rem;
          color: #8B5FBF;
        }

        .at-empty {
          color: #718096;
          font-style: italic;
        }

        .at-results {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .at-result-item {
          display: flex;
          justify-content: between;
          align-items: center;
          font-size: 0.875rem;
        }

        .at-result-label {
          color: #718096;
          flex: 1;
        }

        .at-result-score {
          font-weight: 600;
          color: #2D3748;
        }

        .at-domain {
          padding-top: 0.5rem;
          color: #4A5568;
          border-top: 1px solid rgba(138, 43, 226, 0.1);
        }

        .at-domain-value {
          font-weight: 600;
          color: #6A0DAD;
        }

        .at-roadmap-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .at-roadmap-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .at-subtitle {
          font-size: 0.875rem;
          color: #718096;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .at-list {
          list-style-type: disc;
          padding-left: 1.5rem;
          color: #4A5568;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .at-list li {
          line-height: 1.5;
        }

        .at-plan-section {
          margin-top: 1.5rem;
        }

        .at-plan-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .at-plan-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .at-phase-card {
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(138, 43, 226, 0.1);
          border-radius: 12px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .at-phase-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .at-phase-title {
          font-size: 1rem;
          font-weight: 600;
          color: #2D3748;
          margin: 0;
        }

        .at-phase-list {
          list-style-type: disc;
          padding-left: 1.5rem;
          color: #4A5568;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .at-career-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .at-career-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          background: rgba(139, 95, 191, 0.1);
          border: 1px solid rgba(139, 95, 191, 0.2);
          color: #2D3748;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .at-career-tag:hover {
          background: rgba(139, 95, 191, 0.2);
          transform: translateY(-1px);
        }

        .at-career-icon {
          width: 1rem;
          height: 1rem;
          color: #0891B2;
        }

        .at-trending-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .at-trending-item {
          display: flex;
          justify-content: between;
          align-items: center;
          font-size: 0.875rem;
          color: #4A5568;
        }

        .at-trending-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .at-high-demand {
          background: rgba(5, 150, 105, 0.1);
          color: #065F46;
        }

        .at-growing {
          background: rgba(217, 119, 6, 0.1);
          color: #92400E;
        }

        .at-cta-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: between;
          gap: 0.75rem;
        }

        @media (min-width: 640px) {
          .at-cta-section {
            flex-direction: row;
          }
        }

        .at-primary-btn {
          background: linear-gradient(135deg, #8B5FBF 0%, #6A0DAD 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
          cursor: pointer;
        }

        .at-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(138, 43, 226, 0.4);
        }

        .at-btn-icon {
          width: 1rem;
          height: 1rem;
        }

        .at-save-notice {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #718096;
          font-size: 0.875rem;
        }

        .at-clock-icon {
          width: 1rem;
          height: 1rem;
        }

        @keyframes at-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, -20px) rotate(180deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .at-main {
            padding: 1rem;
          }
          
          .at-content {
            gap: 1rem;
          }
          
          .at-section-grid {
            gap: 1rem;
          }
          
          .at-panel-large {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}

export default NewDashboard;