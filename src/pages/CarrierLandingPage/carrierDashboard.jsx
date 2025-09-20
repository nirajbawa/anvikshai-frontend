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
import '../Assessments/AssessmentTests.css';

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

function NewDashboard() {
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

  return (
    <div className="min-h-screen at-container relative overflow-hidden">
      <header className="px-6 py-4 sticky top-0 z-10 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl blur opacity-60"></div>
              <div className="relative w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Your Career Dashboard</h1>
          </div>
          <button onClick={() => navigate('/dashboard')} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition"></div>
            <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20">
              Go to Dashboard <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Overview */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="at-glass rounded-2xl p-6 lg:col-span-2 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-cyan-300" />
                <h2 className="text-lg font-semibold">Profile Summary</h2>
              </div>
              {careerProfile ? (
                <div className="grid sm:grid-cols-2 gap-4 text-white/90">
                  <div>
                    <div className="text-sm text-white/60">Interest Area</div>
                    <div className="font-semibold">{careerProfile.interestArea || '—'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Key Strengths</div>
                    <div className="font-semibold">{(careerProfile.strengths || []).join(', ') || '—'}</div>
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <div className="text-sm text-white/60 mb-1">Suggested Paths</div>
                    <div className="flex flex-wrap gap-2">
                      {(careerProfile.suggestions || []).map((s) => (
                        <span key={s} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm">
                          <Sparkles className="h-4 w-4 text-cyan-300" /> {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-white/70">Complete the assessment to populate your profile.</div>
              )}
            </div>

            <div className="at-glass rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-yellow-300" />
                <h2 className="text-lg font-semibold">Results</h2>
              </div>
              {assessmentResults ? (
                <div className="space-y-2 text-sm text-white/90">
                  <div className="flex items-center justify-between"><span className="text-white/70">IQ</span><span className="font-semibold">{assessmentResults.scoreBy.iq}/{assessmentResults.totalBy.iq}</span></div>
                  <div className="flex items-center justify-between"><span className="text-white/70">EQ</span><span className="font-semibold">{assessmentResults.scoreBy.eq}/{assessmentResults.totalBy.eq}</span></div>
                  <div className="flex items-center justify-between"><span className="text-white/70">GK</span><span className="font-semibold">{assessmentResults.scoreBy.gk}/{assessmentResults.totalBy.gk}</span></div>
                  <div className="pt-2 text-white/80">Direction: <span className="font-semibold text-cyan-300">{assessmentResults.domainSuggestion}</span></div>
                </div>
              ) : (
                <div className="text-white/70">Take IQ/EQ/GK tests to view your results.</div>
              )}
            </div>
          </section>

          {/* Detailed Roadmap */}
          <section className="at-glass rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Map className="h-5 w-5 text-teal-300" />
              <h2 className="text-xl font-semibold">{roadmap.label}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-white/60 mb-1">Core Skills</div>
                <ul className="list-disc pl-6 text-white/90 space-y-1">
                  {roadmap.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <div className="text-sm text-white/60 mt-4 mb-1">Suggested Courses</div>
                <ul className="list-disc pl-6 text-white/90 space-y-1">
                  {roadmap.courses.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Portfolio Projects</div>
                <ul className="list-disc pl-6 text-white/90 space-y-1">
                  {roadmap.projects.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {roadmap.plan.map((phase) => (
                <div key={phase.title} className="rounded-xl at-card p-4">
                  <div className="flex items-center gap-2 mb-2"><Layers className="h-4 w-4 text-cyan-300" /><h3 className="font-semibold text-white">{phase.title}</h3></div>
                  <ul className="list-disc pl-6 text-white/90 space-y-1">
                    {phase.items.map((it) => (<li key={it}>{it}</li>))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Career Options + Trending */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="at-glass rounded-2xl p-6 lg:col-span-2 text-white">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-indigo-300" />
                <h2 className="text-lg font-semibold">Career Options You Can Choose</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {careerOptions.map((c) => (
                  <span key={c} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300" /> {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="at-glass rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-rose-300" />
                <h2 className="text-lg font-semibold">Trending Jobs</h2>
              </div>
              <ul className="space-y-3 text-sm text-white/90">
                {trending.map((t) => (
                  <li key={t.title} className="flex justify-between"><span>{t.title}</span><span className="font-semibold text-emerald-300">{t.level}</span></li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <button onClick={() => navigate('/dashboard/create-task')} className="at-btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-xl">
              Start Roadmap <ArrowRight className="h-4 w-4" />
            </button>
            <div className="text-white/70 text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" /> Save your progress and return anytime
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NewDashboard;
