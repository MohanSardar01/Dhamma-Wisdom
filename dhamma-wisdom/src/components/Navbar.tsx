import React from 'react';
import { 
  Sparkles, 
  Bookmark, 
  BookOpen, 
  Palette, 
  Users, 
  Sun, 
  Moon, 
  Compass,
  Scroll,
  Languages
} from 'lucide-react';
import { LanguageCode } from '../types';

interface NavbarProps {
  activeTab: 'stage' | 'library' | 'ai' | 'favorites' | 'studio' | 'scholars';
  setActiveTab: (tab: 'stage' | 'library' | 'ai' | 'favorites' | 'studio' | 'scholars') => void;
  selectedLanguage: LanguageCode;
  setSelectedLanguage: (lang: LanguageCode) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  darkMode,
  setDarkMode,
  favoritesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-amber-50/80 dark:bg-slate-900/80 border-b border-amber-200/50 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setActiveTab('stage')} 
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-600 via-blue-900 to-amber-700 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-amber-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400">
                {/* Wheel of Dhamma / Ashoka Chakra representation */}
                <svg className="w-6 h-6 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-amber-100">
                  Dhamma Wisdom
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                  प्रज्ञा
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                Dr. B.R. Ambedkar • Gautama Buddha • Historical Wisdom
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 bg-amber-100/50 dark:bg-slate-800/60 p-1 rounded-full border border-amber-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setActiveTab('stage')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'stage'
                  ? 'bg-amber-600 text-white shadow-sm dark:bg-amber-500'
                  : 'text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-300'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Daily Wisdom</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'library'
                  ? 'bg-amber-600 text-white shadow-sm dark:bg-amber-500'
                  : 'text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Library</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'ai'
                  ? 'bg-amber-600 text-white shadow-sm dark:bg-amber-500'
                  : 'text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300 dark:text-amber-200" />
              <span>AI Generator</span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'favorites'
                  ? 'bg-amber-600 text-white shadow-sm dark:bg-amber-500'
                  : 'text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-300'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved ({favoritesCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'studio'
                  ? 'bg-amber-600 text-white shadow-sm dark:bg-amber-500'
                  : 'text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-300'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('scholars')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'scholars'
                  ? 'bg-amber-600 text-white shadow-sm dark:bg-amber-500'
                  : 'text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-300'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Scholars</span>
            </button>
          </nav>

          {/* Right Utilities (Language & Theme) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Selector */}
            <div className="relative flex items-center bg-amber-100/80 dark:bg-slate-800 rounded-lg px-2 py-1 border border-amber-300/60 dark:border-slate-700">
              <Languages className="w-4 h-4 text-amber-700 dark:text-amber-400 mr-1.5 hidden sm:block" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-1"
                aria-label="Select Language"
              >
                <option value="en" className="dark:bg-slate-900">English</option>
                <option value="hi" className="dark:bg-slate-900">हिंदी (Hindi)</option>
                <option value="mr" className="dark:bg-slate-900">मराठी (Marathi)</option>
                <option value="pa" className="dark:bg-slate-900">ਪਾਲੀ (Pali)</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-amber-100/80 dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-slate-700 transition-colors border border-amber-300/60 dark:border-slate-700"
              title="Toggle Dark/Light Mode"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-amber-200/50 dark:border-slate-800 no-scrollbar space-x-1">
          <button
            onClick={() => setActiveTab('stage')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              activeTab === 'stage' ? 'bg-amber-600 text-white' : 'text-slate-700 dark:text-slate-300 bg-amber-100/50 dark:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Daily</span>
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              activeTab === 'library' ? 'bg-amber-600 text-white' : 'text-slate-700 dark:text-slate-300 bg-amber-100/50 dark:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Library</span>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              activeTab === 'ai' ? 'bg-amber-600 text-white' : 'text-slate-700 dark:text-slate-300 bg-amber-100/50 dark:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Workbench</span>
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              activeTab === 'favorites' ? 'bg-amber-600 text-white' : 'text-slate-700 dark:text-slate-300 bg-amber-100/50 dark:bg-slate-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({favoritesCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              activeTab === 'studio' ? 'bg-amber-600 text-white' : 'text-slate-700 dark:text-slate-300 bg-amber-100/50 dark:bg-slate-800'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Studio</span>
          </button>
          <button
            onClick={() => setActiveTab('scholars')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              activeTab === 'scholars' ? 'bg-amber-600 text-white' : 'text-slate-700 dark:text-slate-300 bg-amber-100/50 dark:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Scholars</span>
          </button>
        </div>

      </div>
    </header>
  );
};
