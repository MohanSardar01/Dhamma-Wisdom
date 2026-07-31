import React, { useState, useMemo } from 'react';
import { QuoteItem, LanguageCode, QuoteAuthor, QuoteCategory } from '../types';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Sparkles, 
  Grid, 
  List, 
  Heart, 
  Copy, 
  Check, 
  Volume2, 
  Lightbulb, 
  Palette,
  BookOpen
} from 'lucide-react';
import { speakQuote } from '../lib/audio';

interface LibraryViewProps {
  quotes: QuoteItem[];
  selectedLanguage: LanguageCode;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (quote: QuoteItem) => void;
  onOpenReflection: (quote: QuoteItem) => void;
  onOpenStudio: (quote: QuoteItem) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  quotes,
  selectedLanguage,
  isFavorite,
  onToggleFavorite,
  onOpenReflection,
  onOpenStudio,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [verificationFilter, setVerificationFilter] = useState<'all' | 'verified' | 'ai'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique authors & categories
  const authors = useMemo(() => {
    const list = Array.from(new Set(quotes.map((q) => q.author)));
    return list.sort();
  }, [quotes]);

  const categories = useMemo(() => {
    const list = Array.from(new Set(quotes.map((q) => q.category)));
    return list.sort();
  }, [quotes]);

  // Filtered quotes list
  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const matchSearch =
        q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchAuthor = selectedAuthor === 'all' || q.author === selectedAuthor;
      const matchCategory = selectedCategory === 'all' || q.category === selectedCategory;
      const matchVerification =
        verificationFilter === 'all' ||
        (verificationFilter === 'verified' && q.isVerified) ||
        (verificationFilter === 'ai' && !q.isVerified);

      return matchSearch && matchAuthor && matchCategory && matchVerification;
    });
  }, [quotes, searchTerm, selectedAuthor, selectedCategory, verificationFilter]);

  const handleCopy = (quote: QuoteItem) => {
    const text = `"${quote.translations?.[selectedLanguage] || quote.text}" — ${quote.author} (${quote.source})`;
    navigator.clipboard.writeText(text);
    setCopiedId(quote.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-amber-100">
            Wisdom Library
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explore {filteredQuotes.length} inspirational teachings from Dr. B.R. Ambedkar, Gautama Buddha & Buddhist philosophers.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-1 bg-amber-100/80 dark:bg-slate-800 p-1 rounded-xl border border-amber-200 dark:border-slate-700 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
            }`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search & Filter Controls Matrix */}
      <div className="bg-amber-50/90 dark:bg-slate-900/90 p-5 rounded-3xl border border-amber-200 dark:border-slate-800 shadow-md space-y-4">
        
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by quote keyword, author name, or book source..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-slate-900 dark:text-amber-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Author Filter */}
          <div>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none"
            >
              <option value="all">All Authors</option>
              {authors.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Verification Status Filter */}
          <div>
            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none"
            >
              <option value="all">All Quotes (Verified + AI)</option>
              <option value="verified">Verified Historical Only</option>
              <option value="ai">AI Inspired Only</option>
            </select>
          </div>

        </div>

      </div>

      {/* Empty Search Result */}
      {filteredQuotes.length === 0 && (
        <div className="py-16 text-center bg-amber-50/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-amber-300 dark:border-slate-800 p-8">
          <BookOpen className="w-12 h-12 text-amber-500/50 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-amber-200">
            No matching teachings found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
            Try adjusting your search terms or clearing author/category filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedAuthor('all');
              setSelectedCategory('all');
              setVerificationFilter('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-amber-50/80 dark:bg-slate-900/80 p-6 rounded-3xl border border-amber-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-200/60 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800">
                    {quote.category}
                  </span>

                  {quote.isVerified ? (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-purple-700 dark:text-purple-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Inspired</span>
                    </span>
                  )}
                </div>

                <p className="font-serif text-lg text-slate-900 dark:text-amber-100 leading-relaxed my-2">
                  “{quote.translations?.[selectedLanguage] || quote.text}”
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-amber-200/60 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-amber-200">
                      {quote.author}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      {quote.source}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => speakQuote(quote.translations?.[selectedLanguage] || quote.text, selectedLanguage)}
                    className="p-2 rounded-lg bg-amber-100/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-200 transition-colors"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenReflection(quote)}
                    className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-amber-100/60 dark:bg-slate-800 text-amber-900 dark:text-amber-300 text-xs font-semibold hover:bg-amber-200 transition-colors"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>AI Reflection</span>
                  </button>

                  <button
                    onClick={() => onOpenStudio(quote)}
                    className="p-2 rounded-lg bg-amber-100/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-200 transition-colors"
                    title="Studio"
                  >
                    <Palette className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleCopy(quote)}
                    className="p-2 rounded-lg bg-amber-100/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-200 transition-colors"
                    title="Copy"
                  >
                    {copiedId === quote.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => onToggleFavorite(quote)}
                    className={`p-2 rounded-lg transition-colors ${
                      isFavorite(quote.id)
                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400'
                        : 'bg-amber-100/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                    title="Favorite"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFavorite(quote.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              className="p-4 bg-amber-50/80 dark:bg-slate-900/80 rounded-2xl border border-amber-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-amber-200">
                    {quote.author}
                  </span>
                  <span className="text-xs text-amber-800 dark:text-amber-400 bg-amber-100/80 dark:bg-slate-800 px-2 py-0.5 rounded-full font-medium">
                    {quote.category}
                  </span>
                  {quote.isVerified ? (
                    <span className="text-[10px] text-emerald-700 font-semibold">Verified</span>
                  ) : (
                    <span className="text-[10px] text-purple-700 font-semibold">AI Inspired</span>
                  )}
                </div>
                <p className="font-serif text-sm sm:text-base text-slate-800 dark:text-amber-100">
                  “{quote.translations?.[selectedLanguage] || quote.text}”
                </p>
                <p className="text-xs text-slate-500 italic">{quote.source}</p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => onOpenReflection(quote)}
                  className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-slate-800 text-amber-900 dark:text-amber-300 text-xs font-bold hover:bg-amber-200"
                >
                  Reflect
                </button>
                <button
                  onClick={() => onToggleFavorite(quote)}
                  className={`p-2 rounded-xl border ${
                    isFavorite(quote.id)
                      ? 'bg-rose-100 text-rose-600 border-rose-300'
                      : 'bg-amber-100 dark:bg-slate-800 border-amber-200 dark:border-slate-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(quote.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
