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
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-semibold tracking-wide text-purple-700/80">Identified Domain</div>
          <h2 className="text-2xl font-black text-gray-900 leading-tight">{plan.domain}</h2>
          {plan.description && (
            <p className="mt-2 text-gray-600 text-sm max-w-3xl">{plan.description}</p>
          )}
          <div className="mt-2 text-xs text-gray-500">
            Test ID: <span className="font-medium text-gray-700">{plan.testId}</span> • Total Questions: {plan.total_questions}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 text-sm rounded-xl border ${remaining <= 60 ? 'border-rose-300 text-rose-700 bg-rose-50' : 'border-purple-200 text-purple-700 bg-purple-50'}`}>Time Left: {formatTime(remaining)}</div>
          <button onClick={onClose} className="px-3 py-1.5 text-sm rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50">Close</button>
          <button onClick={handleSubmit} className="px-4 py-2 text-sm rounded-xl bg-purple-600 text-white hover:bg-purple-700">Submit</button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-[width] duration-500"
          style={{ width: `${Math.max(0, (remaining / Math.max(1, durationSeconds)) * 100)}%` }}
        />
      </div>

      <div className="mt-6 grid gap-4">
        {(plan.questions || []).map((q) => (
          <div key={q.questionId} className="border border-gray-200 rounded-2xl p-4">
            <div className="font-semibold text-gray-900 mb-3">
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
                    className={`rounded-xl px-4 py-3 text-left border transition ${selected ? 'bg-purple-50 border-purple-300 text-purple-800' : 'bg-white hover:bg-gray-50'}`}
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
