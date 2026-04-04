import React, { useEffect, useRef, useState } from "react";

function EQIQTestPanel({ plan, onSubmit, onClose, durationSeconds = 600 }) {
  const [answers, setAnswers] = useState({});
  const [remaining, setRemaining] = useState(durationSeconds);
  const hasSubmittedRef = useRef(false);

  if (!plan) return null;

  const handleSelect = (qid, option) => {
    setAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const handleSubmit = () => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    onSubmit && onSubmit({ testId: plan.testId, answers });
  };

  // Countdown timer
  useEffect(() => {
    setRemaining(durationSeconds);
    hasSubmittedRef.current = false;
    const tick = () => {
      setRemaining((prev) => {
        if (prev <= 1) {
          // Auto-submit on expiry
          setTimeout(() => handleSubmit(), 0);
          return 0;
        }
        return prev - 1;
      });
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [durationSeconds, plan?.testId]);

  const formatTime = (s) => {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-semibold tracking-wide text-purple-700/80 dark:text-purple-400/80 transition-colors">Identified Domain</div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight transition-colors">{plan.domain}</h2>
          {plan.description && (
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm max-w-3xl transition-colors">{plan.description}</p>
          )}
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 transition-colors">
            Test ID: <span className="font-medium text-gray-700 dark:text-gray-300">{plan.testId}</span> • Total Questions: {plan.total_questions}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 text-sm rounded-xl border transition-colors ${remaining <= 60 ? 'border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30' : 'border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30'}`}>Time Left: {formatTime(remaining)}</div>
          <button onClick={onClose} className="px-3 py-1.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Close</button>
          <button onClick={handleSubmit} className="px-4 py-2 text-sm rounded-xl bg-purple-600 text-white hover:bg-purple-700 dark:hover:bg-purple-500 transition-colors">Submit</button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden transition-colors">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-[width] duration-500"
          style={{ width: `${Math.max(0, (remaining / Math.max(1, durationSeconds)) * 100)}%` }}
        />
      </div>

      <div className="mt-6 grid gap-4">
        {(plan.questions || []).map((q) => (
          <div key={q.questionId} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-4 transition-colors">
            <div className="font-semibold text-gray-900 dark:text-white mb-3 transition-colors">
              {q.question}
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {(q.options || []).map((opt) => {
                const selected = answers[q.questionId] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(q.questionId, opt)}
                    className={`rounded-xl px-4 py-3 text-left border transition-all ${selected ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-600 text-purple-800 dark:text-purple-300' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200'}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EQIQTestPanel;
