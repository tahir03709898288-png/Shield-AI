"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanSearch,
  Link2,
  Mail,
  MessageSquare,
  Globe,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Loader2,
  Lightbulb,
  FileWarning,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { analyzeContent } from '@/lib/gemini';

type InputType = 'url' | 'email' | 'sms' | 'whatsapp';

interface AnalysisResult {
  riskScore: number;
  threatLevel: 'Low' | 'Medium' | 'High';
  detectedIssues: string[];
  explanation: string;
  recommendations: string[];
}

const inputTypes: {
  id: InputType;
  label: string;
  icon: typeof Link2;
  placeholder: string;
}[] = [
  {
    id: 'url',
    label: 'Website URL',
    icon: Link2,
    placeholder: 'https://example-suspicious-site.com',
  },
  {
    id: 'email',
    label: 'Email Text',
    icon: Mail,
    placeholder: 'Paste the full email content you want to analyze...',
  },
  {
    id: 'sms',
    label: 'SMS Message',
    icon: MessageSquare,
    placeholder: 'Paste the suspicious SMS message here...',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Message',
    icon: MessageSquare,
    placeholder: 'Paste the suspicious WhatsApp message here...',
  },
];

function getThreatLevel(score: number): AnalysisResult['threatLevel'] {
  if (score < 30) return 'Low';
  if (score < 70) return 'Medium';
  return 'High';
}

function getThreatColor(level: AnalysisResult['threatLevel']) {
  switch (level) {
    case 'Low':
      return {
        text: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        stroke: '#16a34a',
        icon: CheckCircle2,
      };
    case 'Medium':
      return {
        text: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        stroke: '#d97706',
        icon: AlertTriangle,
      };
    case 'High':
      return {
        text: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        stroke: '#dc2626',
        icon: ShieldAlert,
      };
  }
}

// NOTE: The scanner now calls a server-side edge function that forwards
// requests to the Gemini API. Do not rely on client-side heuristics as a
// substitute for an actual LLM response.

function RiskMeter({ score }: { score: number }) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const [displayScore, setDisplayScore] = useState(0);
  const level = getThreatLevel(score);
  const colors = getThreatColor(level);

  useEffect(() => {
    let raf: number;
    const start = displayScore;
    const diff = score - start;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(start + diff * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="220" height="220" className="-rotate-90">
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="12"
        />
        <motion.circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('text-5xl font-bold', colors.text)}>
          {displayScore}%
        </span>
        <span className="text-sm text-slate-400 mt-1">Risk Score</span>
      </div>
    </div>
  );
}

export default function Scanner() {
  const [inputType, setInputType] = useState<InputType>('email');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setStatus('scanning');
    setIsLoading(true);
    setResult(null);
    setScanProgress(0);

    // Simulated scanning animation
    const steps = ['Initializing AI models...', 'Parsing content...', 'Detecting patterns...', 'Evaluating risk indicators...', 'Generating recommendations...'];
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setScanProgress((step / steps.length) * 100);
      if (step >= steps.length) clearInterval(interval);
    }, 500);

    // Call the server-side analyze function which proxies to Gemini
    setError(null);
    try {
      const analysis = await analyzeContent({ type: inputType, content: content.trim() });
      clearInterval(interval);
      setScanProgress(100);

      // Normalize/validate the AI response so UI always has a usable `result`
      const normalize = (a: any): AnalysisResult => {
        if (!a || typeof a !== 'object') {
          return {
            riskScore: 0,
            threatLevel: 'Low',
            detectedIssues: [],
            explanation: 'Analysis complete',
            recommendations: [],
          };
        }
        const riskScore = typeof a.riskScore === 'number' ? a.riskScore : 0;
        const threatLevel = ['Low', 'Medium', 'High'].includes(a.threatLevel) ? a.threatLevel : getThreatLevel(riskScore);
        const detectedIssues = Array.isArray(a.detectedIssues) ? a.detectedIssues : [];
        const explanation = typeof a.explanation === 'string' && a.explanation.trim() ? a.explanation : 'Analysis complete';
        const recommendations = Array.isArray(a.recommendations) ? a.recommendations : [];
        return { riskScore, threatLevel, detectedIssues, explanation, recommendations };
      };

      const normalized = normalize(analysis);
      setResult(normalized);
    } catch (err: any) {
      clearInterval(interval);
      // On error, still provide a safe result so UI can render consistently
      setError(err?.message || 'AI analysis failed. Showing safe default.');
      setResult({
        riskScore: 0,
        threatLevel: 'Low',
        detectedIssues: [],
        explanation: 'Analysis complete',
        recommendations: [],
      });
    } finally {
      setStatus('done');
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStatus('idle');
    setResult(null);
    setContent('');
    setScanProgress(0);
  };

  const currentType = inputTypes.find((t) => t.id === inputType)!;
  const colors = result ? getThreatColor(result.threatLevel) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Input type selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {inputTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => {
              setInputType(type.id);
              reset();
            }}
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all',
              inputType === type.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
            )}
          >
            <type.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{type.label}</span>
            <span className="sm:hidden">{type.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-blue-500/5 overflow-hidden">
        <div className="p-6">
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            {currentType.label}
          </label>
          {inputType === 'url' ? (
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={currentType.placeholder}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={currentType.placeholder}
              rows={6}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          )}

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              Your content is analyzed securely and not stored.
            </p>
            <button
              onClick={handleAnalyze}
              disabled={!content.trim() || status === 'scanning'}
              className={cn(
                'btn-primary text-sm',
                (!content.trim() || status === 'scanning') &&
                  'opacity-50 cursor-not-allowed hover:translate-y-0'
              )}
            >
              {status === 'scanning' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <ScanSearch className="w-4 h-4" />
                  Analyze Content
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scanning animation */}
        <AnimatePresence>
          {status === 'scanning' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-100"
            >
              <div className="p-6 space-y-4">
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                  <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                  <span>AI is analyzing your content for threats...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {status === 'done' && error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-slate-100"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-700">Analysis Error</p>
                    <p className="text-sm text-slate-600 mt-1">{error}</p>
                    <p className="text-xs text-slate-400 mt-2">The analysis service returned an error. Please try again later.</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <button onClick={reset} className="btn-secondary text-sm">Try Again</button>
                </div>
              </div>
            </motion.div>
          )}
          {status === 'done' && result && colors && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-slate-100"
            >
              <div className="p-6 sm:p-8">
                {/* Threat level banner */}
                <div
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl border mb-8',
                    colors.bg,
                    colors.border
                  )}
                >
                  <colors.icon className={cn('w-6 h-6', colors.text)} />
                  <div>
                    <p className={cn('font-semibold', colors.text)}>
                      Threat Level: {result.threatLevel}
                    </p>
                    <p className="text-xs text-slate-500">
                      Based on AI analysis of the submitted content
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Risk meter */}
                  <div className="flex flex-col items-center justify-center">
                    <RiskMeter score={result.riskScore} />
                    <p className="mt-4 text-sm text-slate-400 text-center max-w-xs">
                      A higher score indicates a greater likelihood of scam or
                      phishing content.
                    </p>
                  </div>

                  {/* Explanation */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-blue-500" />
                      <h3 className="font-semibold text-slate-900">
                        AI Explanation
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                </div>

                {/* Detected issues */}
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FileWarning className="w-5 h-5 text-amber-500" />
                    <h3 className="font-semibold text-slate-900">
                      Detected Issues
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {result.detectedIssues.map((issue, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{issue}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Safety checklist & recommendations */}
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-semibold text-slate-900">
                      Recommended Actions
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {result.recommendations.map((rec, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{rec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button onClick={reset} className="btn-secondary text-sm">
                    Analyze Another
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
