import React from 'react';
import { AUTHOR_PROFILES } from '../data/authorProfiles';
import { BookOpen, Award, CheckCircle2, Feather, Compass } from 'lucide-react';

export const HistoricalScholarsView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
          <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Biographical & Philosophical Spotlight</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-amber-100">
          Historical Teachers & Scholars
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explore the biographical background, core philosophies, and major works of Dr. B.R. Ambedkar, Gautama Buddha, Emperor Ashoka, and respected scholars.
        </p>
      </div>

      {/* Scholars Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {AUTHOR_PROFILES.map((profile) => (
          <div
            key={profile.name}
            className="bg-amber-50/90 dark:bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-amber-200/80 dark:border-slate-800 shadow-xl flex flex-col justify-between space-y-6"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 dark:bg-slate-800 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-slate-700">
                  {profile.era}
                </span>
                <span className="text-2xl">
                  {profile.name.includes('Ambedkar')
                    ? '📖'
                    : profile.name.includes('Ashoka')
                    ? '🏛️'
                    : profile.name.includes('Buddha')
                    ? '🍃'
                    : '☸️'}
                </span>
              </div>

              {/* Scholar Name & Title */}
              <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-amber-100">
                {profile.name}
              </h2>
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-400 mt-1">
                {profile.title}
              </p>

              {/* Bio Paragraph */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                {profile.bio}
              </p>

              {/* Core Philosophy Bullets */}
              <div className="mt-6 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Core Philosophical Principles</span>
                </h3>
                <ul className="space-y-1.5 pl-2 text-xs text-slate-700 dark:text-slate-300">
                  {profile.corePhilosophy.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Major Works Footer */}
            <div className="pt-4 border-t border-amber-200/60 dark:border-slate-800">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400 flex items-center space-x-1 mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Famous Works & Speeches</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {profile.keyWorks.map((work, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-amber-100/70 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-[11px] font-medium border border-amber-200/50 dark:border-slate-700"
                  >
                    {work}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
