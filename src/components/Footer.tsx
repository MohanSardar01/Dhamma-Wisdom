import React from 'react';
import { ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'stage' | 'library' | 'ai' | 'favorites' | 'studio' | 'scholars') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="mt-20 border-t border-amber-200/80 dark:border-slate-800 bg-amber-100/40 dark:bg-slate-950/80 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-xl font-bold text-slate-900 dark:text-amber-100">
              Dhamma Wisdom
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-300">
              धम्म प्रज्ञा
            </span>
          </div>
          <p className="leading-relaxed">
            An enterprise-grade inspirational application delivering authentic historical wisdom and AI-inspired reflections from Dr. Babasaheb Ambedkar, Gautama Buddha, Emperor Ashoka, and esteemed Buddhist scholars.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Strict Historical Accuracy & Transparency Guaranteed</span>
          </div>
        </div>

        {/* Core Principles */}
        <div className="md:col-span-4 space-y-2">
          <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-amber-200 text-xs">
            Core Philosophy
          </h4>
          <p className="leading-relaxed">
            Education • Social Democracy • Universal Equality • Compassion • Scientific Temper • Rational Thought • Human Dignity • Mindfulness • Ethical Leadership
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-2">
          <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-amber-200 text-xs">
            Quick Navigation
          </h4>
          <div className="flex flex-col space-y-1 font-medium">
            <button onClick={() => setActiveTab('stage')} className="text-left hover:text-amber-700 dark:hover:text-amber-300">
              Daily Wisdom Stage
            </button>
            <button onClick={() => setActiveTab('library')} className="text-left hover:text-amber-700 dark:hover:text-amber-300">
              Wisdom Library
            </button>
            <button onClick={() => setActiveTab('ai')} className="text-left hover:text-amber-700 dark:hover:text-amber-300">
              AI Generator Workbench
            </button>
            <button onClick={() => setActiveTab('scholars')} className="text-left hover:text-amber-700 dark:hover:text-amber-300">
              Historical Scholars
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-amber-200/50 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 space-y-2 sm:space-y-0">
        <div>
          © {new Date().getFullYear()} Dhamma Wisdom. Built with peace, reverence, and rational education.
        </div>
        <div className="flex items-center space-x-1">
          <span>“Educate, Agitate, Organize”</span>
          <span>— Dr. B.R. Ambedkar</span>
        </div>
      </div>
    </footer>
  );
};
