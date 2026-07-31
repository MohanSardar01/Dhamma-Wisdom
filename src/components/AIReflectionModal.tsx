import React, { useEffect, useState } from 'react';
import { QuoteItem, AIReflection } from '../types';
import { X, Sparkles, BookOpen, Compass, Lightbulb, HelpCircle, CheckCircle, RefreshCw } from 'lucide-react';

interface AIReflectionModalProps {
  quote: QuoteItem | null;
  onClose: () => void;
}

export const AIReflectionModal: React.FC<AIReflectionModalProps> = ({ quote, onClose }) => {
  const [reflection, setReflection] = useState<AIReflection | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quote) {
      setReflection(null);
      return;
    }

    let isMounted = true;
    const fetchReflection = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/quotes/reflect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quoteText: quote.text,
            author: quote.author,
            category: quote.category,
            source: quote.source,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to load AI reflection');
        }

        const data = await res.json();
        if (isMounted) {
          if (data.reflection) {
            setReflection(data.reflection);
          } else {
            throw new Error('Invalid reflection payload');
          }
        }
      } catch (err: any) {
        if (isMounted) {
          console.error(err);
          setError(err.message || 'Error generating AI reflection');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchReflection();

    return () => {
      isMounted = false;
    };
  }, [quote]);

  if (!quote) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-amber-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-400 font-bold text-xs uppercase tracking-widest mb-2">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Gemini AI Wisdom & Deep Reflection</span>
        </div>

        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-amber-100 leading-snug">
          Philosophical Analysis & Daily Application
        </h2>

        {/* Selected Quote Preview */}
        <div className="my-4 p-4 bg-amber-100/60 dark:bg-slate-800/80 rounded-2xl border border-amber-200/80 dark:border-slate-700">
          <p className="font-serif text-sm sm:text-base italic text-slate-800 dark:text-amber-200">
            “{quote.text}”
          </p>
          <p className="text-xs font-semibold text-amber-900 dark:text-amber-400 mt-1">
            — {quote.author} ({quote.source})
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-amber-600 dark:text-amber-400 animate-spin" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Analyzing core teachings and historical context with Gemini AI...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300">
            Failed to load AI reflection. Please check your connection and try again.
          </div>
        )}

        {/* Generated Reflection Content */}
        {!loading && reflection && (
          <div className="space-y-5 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
            
            {/* Core Meaning */}
            <div className="p-4 bg-white dark:bg-slate-800/60 rounded-2xl border border-amber-200/60 dark:border-slate-700">
              <div className="flex items-center space-x-2 font-bold text-amber-900 dark:text-amber-300 mb-1.5">
                <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>1. Core Philosophical Lesson</span>
              </div>
              <p>{reflection.coreMeaning}</p>
            </div>

            {/* Historical Context */}
            <div className="p-4 bg-white dark:bg-slate-800/60 rounded-2xl border border-amber-200/60 dark:border-slate-700">
              <div className="flex items-center space-x-2 font-bold text-blue-900 dark:text-blue-300 mb-1.5">
                <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>2. Historical & Cultural Context</span>
              </div>
              <p>{reflection.historicalContext}</p>
            </div>

            {/* Modern Application */}
            <div className="p-4 bg-white dark:bg-slate-800/60 rounded-2xl border border-amber-200/60 dark:border-slate-700">
              <div className="flex items-center space-x-2 font-bold text-emerald-900 dark:text-emerald-300 mb-1.5">
                <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>3. Modern Application (Students & Professionals)</span>
              </div>
              <p>{reflection.modernApplication}</p>
            </div>

            {/* Key Takeaway */}
            <div className="p-4 bg-amber-100/80 dark:bg-amber-950/50 rounded-2xl border border-amber-300 dark:border-amber-800">
              <div className="flex items-center space-x-2 font-bold text-amber-900 dark:text-amber-300 mb-1">
                <CheckCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Key Takeaway</span>
              </div>
              <p className="font-serif font-semibold text-slate-900 dark:text-amber-100 text-base">
                “{reflection.keyTakeaway}”
              </p>
            </div>

            {/* Journaling Question */}
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center space-x-2 font-bold text-indigo-900 dark:text-indigo-300 mb-1">
                <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Self-Reflection Question for Meditation & Journaling</span>
              </div>
              <p className="italic text-indigo-950 dark:text-indigo-200">
                {reflection.reflectionPrompt}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
