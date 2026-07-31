import React, { useState, useEffect } from 'react';
import { QuoteItem, LanguageCode } from './types';
import { HISTORICAL_QUOTES } from './data/historicalQuotes';
import { Navbar } from './components/Navbar';
import { QuoteCard } from './components/QuoteCard';
import { AIReflectionModal } from './components/AIReflectionModal';
import { QuoteStudioModal } from './components/QuoteStudioModal';
import { AIGeneratorView } from './components/AIGeneratorView';
import { LibraryView } from './components/LibraryView';
import { CollectionsView } from './components/CollectionsView';
import { HistoricalScholarsView } from './components/HistoricalScholarsView';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'stage' | 'library' | 'ai' | 'favorites' | 'studio' | 'scholars'
  >('stage');

  const [allQuotes, setAllQuotes] = useState<QuoteItem[]>(HISTORICAL_QUOTES);
  const [currentQuote, setCurrentQuote] = useState<QuoteItem>(HISTORICAL_QUOTES[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [favorites, setFavorites] = useState<QuoteItem[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Modals
  const [reflectionQuote, setReflectionQuote] = useState<QuoteItem | null>(null);
  const [studioQuote, setStudioQuote] = useState<QuoteItem | null>(null);
  const [isGeneratingSimilar, setIsGeneratingSimilar] = useState<boolean>(false);

  // Load saved favorites & theme preference from localStorage
  useEffect(() => {
    const savedFavs = localStorage.getItem('dhamma_wisdom_favorites');
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
        console.error('Error loading favorites from storage', e);
      }
    }

    const savedTheme = localStorage.getItem('dhamma_wisdom_theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Sync Dark Mode state with document HTML class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dhamma_wisdom_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dhamma_wisdom_theme', 'light');
    }
  }, [darkMode]);

  // Persist Favorites
  const handleToggleFavorite = (quote: QuoteItem) => {
    let updated: QuoteItem[];
    if (favorites.some((q) => q.id === quote.id)) {
      updated = favorites.filter((q) => q.id !== quote.id);
    } else {
      updated = [quote, ...favorites];
    }
    setFavorites(updated);
    localStorage.setItem('dhamma_wisdom_favorites', JSON.stringify(updated));
  };

  const isFavorite = (id: string) => favorites.some((q) => q.id === id);

  // Handle New Random Quote
  const handleNextRandomQuote = () => {
    const remaining = allQuotes.filter((q) => q.id !== currentQuote.id);
    if (remaining.length === 0) return;
    const randomIndex = Math.floor(Math.random() * remaining.length);
    setCurrentQuote(remaining[randomIndex]);
  };

  // Handle Generate Similar AI Quote
  const handleGenerateSimilar = async (authorStyle: string, category: string) => {
    setIsGeneratingSimilar(true);
    try {
      const res = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorStyle,
          category,
          language: selectedLanguage,
        }),
      });

      if (!res.ok) throw new Error('API failed');

      const data = await res.json();
      if (data.quote) {
        setAllQuotes((prev) => [data.quote, ...prev]);
        setCurrentQuote(data.quote);
      }
    } catch (err) {
      console.error(err);
      alert('Could not generate similar quote. Please check your connection.');
    } finally {
      setIsGeneratingSimilar(false);
    }
  };

  // When a quote is generated in AI workbench
  const handleQuoteGeneratedFromAI = (newQuote: QuoteItem) => {
    setAllQuotes((prev) => [newQuote, ...prev]);
    setCurrentQuote(newQuote);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-slate-950 text-[#1A1A1A] dark:text-slate-100 transition-colors duration-300 font-sans flex flex-col justify-between selection:bg-amber-200 selection:text-amber-900 relative overflow-x-hidden">
      {/* Background ambient glows from Sleek Interface design */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#F4C430]/10 dark:bg-[#F4C430]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#1A237E]/5 dark:bg-[#1A237E]/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        favoritesCount={favorites.length}
      />

      {/* Main App Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        
        {/* Tab 1: Stage (Hero Daily Quote View) */}
        {activeTab === 'stage' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Stage Title */}
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1A237E]/10 text-[#1A237E] dark:bg-blue-950/80 dark:text-blue-300 text-xs font-bold uppercase tracking-widest border border-[#1A237E]/15 dark:border-blue-800">
                <span>Daily Wisdom & Inspiration</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-amber-100 tracking-tight">
                Wisdom of Equality, Dhamma & Knowledge
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Explore the eternal teachings of Dr. B.R. Ambedkar, Gautama Buddha, Emperor Ashoka & Buddhist scholars.
              </p>
            </div>

            {/* Central Hero Quote Card */}
            <QuoteCard
              quote={currentQuote}
              selectedLanguage={selectedLanguage}
              onNewQuote={handleNextRandomQuote}
              onGenerateSimilar={handleGenerateSimilar}
              isFavorite={isFavorite(currentQuote.id)}
              onToggleFavorite={handleToggleFavorite}
              onOpenReflection={(q) => setReflectionQuote(q)}
              onOpenStudio={(q) => setStudioQuote(q)}
              isGeneratingSimilar={isGeneratingSimilar}
            />
          </div>
        )}

        {/* Tab 2: Wisdom Library */}
        {activeTab === 'library' && (
          <LibraryView
            quotes={allQuotes}
            selectedLanguage={selectedLanguage}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
            onOpenReflection={(q) => setReflectionQuote(q)}
            onOpenStudio={(q) => setStudioQuote(q)}
          />
        )}

        {/* Tab 3: AI Workbench */}
        {activeTab === 'ai' && (
          <AIGeneratorView
            onQuoteGenerated={handleQuoteGeneratedFromAI}
            selectedLanguage={selectedLanguage}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
            onOpenReflection={(q) => setReflectionQuote(q)}
            onOpenStudio={(q) => setStudioQuote(q)}
          />
        )}

        {/* Tab 4: Saved Favorites */}
        {activeTab === 'favorites' && (
          <CollectionsView
            favorites={favorites}
            selectedLanguage={selectedLanguage}
            onRemoveFavorite={handleToggleFavorite}
            onOpenReflection={(q) => setReflectionQuote(q)}
            onOpenStudio={(q) => setStudioQuote(q)}
          />
        )}

        {/* Tab 5: Card Studio (Direct trigger) */}
        {activeTab === 'studio' && (
          <div className="space-y-6">
            <QuoteStudioModal
              quote={currentQuote}
              onClose={() => setActiveTab('stage')}
            />
          </div>
        )}

        {/* Tab 6: Historical Scholars Spotlight */}
        {activeTab === 'scholars' && <HistoricalScholarsView />}

      </main>

      {/* AI Deep Reflection Modal */}
      {reflectionQuote && (
        <AIReflectionModal
          quote={reflectionQuote}
          onClose={() => setReflectionQuote(null)}
        />
      )}

      {/* Card Customizer Studio Modal (when opened from quote card) */}
      {studioQuote && (
        <QuoteStudioModal
          quote={studioQuote}
          onClose={() => setStudioQuote(null)}
        />
      )}

      {/* Peaceful Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
