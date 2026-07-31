import React, { useState } from 'react';
import { QuoteAuthor, QuoteCategory, QuoteItem, LanguageCode } from '../types';
import { Sparkles, Send, RefreshCw, ShieldCheck, HelpCircle } from 'lucide-react';
import { QuoteCard } from './QuoteCard';

interface AIGeneratorViewProps {
  onQuoteGenerated: (newQuote: QuoteItem) => void;
  selectedLanguage: LanguageCode;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (quote: QuoteItem) => void;
  onOpenReflection: (quote: QuoteItem) => void;
  onOpenStudio: (quote: QuoteItem) => void;
}

export const AIGeneratorView: React.FC<AIGeneratorViewProps> = ({
  onQuoteGenerated,
  selectedLanguage,
  isFavorite,
  onToggleFavorite,
  onOpenReflection,
  onOpenStudio,
}) => {
  const [authorStyle, setAuthorStyle] = useState<QuoteAuthor>('Dr. B.R. Ambedkar');
  const [category, setCategory] = useState<QuoteCategory>('Education');
  const [contextPrompt, setContextPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedQuote, setGeneratedQuote] = useState<QuoteItem | null>(null);

  const authors: QuoteAuthor[] = [
    'Dr. B.R. Ambedkar',
    'Gautama Buddha',
    'Emperor Ashoka',
    'Nagarjuna',
    'Bodhidharma',
    'Shantideva',
    'Dalai Lama',
    'Thich Nhat Hanh',
    'Sant Kabir',
  ];

  const categories: QuoteCategory[] = [
    'Education',
    'Equality',
    'Knowledge',
    'Wisdom',
    'Compassion',
    'Mindfulness',
    'Democracy',
    'Constitution',
    'Leadership',
    'Justice',
    'Discipline',
    'Determination',
    'Self Growth',
    'Social Reform',
  ];

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorStyle,
          category,
          contextPrompt,
          language: selectedLanguage,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate quote from server');
      }

      const data = await res.json();
      if (data.quote) {
        setGeneratedQuote(data.quote);
        onQuoteGenerated(data.quote);
      } else {
        throw new Error('Invalid quote returned from server');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error generating AI quote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* View Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Server-Side Gemini AI Workbench</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-amber-100">
          AI Wisdom Generator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Craft inspirational, educational, and reflective wisdom in the philosophical style of great thinkers.
        </p>
      </div>

      {/* Safety & Authenticity Banner */}
      <div className="p-4 bg-amber-100/60 dark:bg-slate-800/80 rounded-2xl border border-amber-200 dark:border-slate-700 flex items-start space-x-3 text-xs text-slate-700 dark:text-slate-300">
        <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-slate-900 dark:text-amber-200">Authenticity & Safety Mandate</p>
          <p className="mt-0.5 leading-relaxed">
            AI-generated content is always explicitly tagged with <strong className="text-purple-700 dark:text-purple-300">“AI Inspired”</strong> and never attributed as authentic historical text. We maintain high historical accuracy and respect for all traditions.
          </p>
        </div>
      </div>

      {/* Form Controls */}
      <form onSubmit={handleGenerate} className="bg-amber-50/80 dark:bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-amber-200 dark:border-slate-800 shadow-lg space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Author Style */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Philosophical Author Style
            </label>
            <select
              value={authorStyle}
              onChange={(e) => setAuthorStyle(e.target.value as QuoteAuthor)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-slate-900 dark:text-amber-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {authors.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Wisdom Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as QuoteCategory)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-slate-900 dark:text-amber-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Custom Prompt Context */}
        <div>
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
            Target Focus or Current Situation (Optional)
          </label>
          <input
            type="text"
            value={contextPrompt}
            onChange={(e) => setContextPrompt(e.target.value)}
            placeholder="e.g. Preparing for exams, overcoming fear, standing for equality, mindful work..."
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-slate-900 dark:text-amber-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm shadow-xl transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Synthesizing Wisdom with Gemini AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Generate AI Inspired Quote</span>
            </>
          )}
        </button>

      </form>

      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-2xl text-xs text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {/* Generated Result Preview */}
      {generatedQuote && (
        <div className="pt-4 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 text-center">
            Generated AI Result
          </h2>
          <QuoteCard
            quote={generatedQuote}
            selectedLanguage={selectedLanguage}
            onNewQuote={() => handleGenerate()}
            onGenerateSimilar={(a, c) => handleGenerate()}
            isFavorite={isFavorite(generatedQuote.id)}
            onToggleFavorite={onToggleFavorite}
            onOpenReflection={onOpenReflection}
            onOpenStudio={onOpenStudio}
            isGeneratingSimilar={loading}
          />
        </div>
      )}

    </div>
  );
};
