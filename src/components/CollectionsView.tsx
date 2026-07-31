import React, { useState } from 'react';
import { QuoteItem, LanguageCode, QuoteCollection } from '../types';
import { Bookmark, FolderPlus, Trash2, Download, Heart, Lightbulb, Volume2, Share2, BookOpen } from 'lucide-react';
import { speakQuote } from '../lib/audio';

interface CollectionsViewProps {
  favorites: QuoteItem[];
  selectedLanguage: LanguageCode;
  onRemoveFavorite: (quote: QuoteItem) => void;
  onOpenReflection: (quote: QuoteItem) => void;
  onOpenStudio: (quote: QuoteItem) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  favorites,
  selectedLanguage,
  onRemoveFavorite,
  onOpenReflection,
  onOpenStudio,
}) => {
  const [collections, setCollections] = useState<QuoteCollection[]>([
    {
      id: 'default-1',
      name: 'UPSC & Civil Services Focus',
      description: 'Constitutional morality, democracy, leadership, and public ethics.',
      quoteIds: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'default-2',
      name: 'Daily Mindful Morning',
      description: 'Mindfulness, peace, loving-kindness, and mental clarity.',
      quoteIds: [],
      createdAt: new Date().toISOString(),
    },
  ]);

  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Create new collection folder
  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    const newCol: QuoteCollection = {
      id: `col-${Date.now()}`,
      name: newCollectionName.trim(),
      description: newCollectionDesc.trim() || 'Custom wisdom collection.',
      quoteIds: [],
      createdAt: new Date().toISOString(),
    };

    setCollections([...collections, newCol]);
    setNewCollectionName('');
    setNewCollectionDesc('');
    setShowAddForm(false);
  };

  // Export Favorites JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favorites, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dhamma-wisdom-bookmarks-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-amber-100 flex items-center space-x-3">
            <Bookmark className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            <span>Saved Favorites & Collections</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            You have saved {favorites.length} inspirational teaching{favorites.length === 1 ? '' : 's'}.
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportJSON}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-100/80 dark:bg-slate-800 text-slate-800 dark:text-amber-200 text-xs font-semibold hover:bg-amber-200 border border-amber-200 dark:border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-amber-600" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <FolderPlus className="w-4 h-4" />
              <span>New Folder</span>
            </button>
          </div>
        )}
      </div>

      {/* New Collection Form */}
      {showAddForm && (
        <form onSubmit={handleCreateCollection} className="p-5 bg-amber-50 dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-slate-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
            Create Custom Collection Folder
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Collection Title (e.g. Daily Meditation)"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-xs focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Short Description (e.g. Focus quotes for studies)"
              value={newCollectionDesc}
              onChange={(e) => setNewCollectionDesc(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-xs focus:outline-none"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold"
            >
              Create Folder
            </button>
          </div>
        </form>
      )}

      {/* Empty Favorites State */}
      {favorites.length === 0 && (
        <div className="py-20 text-center bg-amber-50/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-amber-300 dark:border-slate-800 p-8 space-y-3">
          <Bookmark className="w-12 h-12 text-amber-500/40 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-amber-100">
            No saved quotes yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            When exploring teachings on the Daily Wisdom stage or Library, click the heart icon to save your favorite wisdom quotes here.
          </p>
        </div>
      )}

      {/* Favorites Grid */}
      {favorites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((quote) => (
            <div
              key={quote.id}
              className="bg-amber-50/80 dark:bg-slate-900/80 p-6 rounded-3xl border border-amber-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-200/60 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    {quote.category}
                  </span>

                  <button
                    onClick={() => onRemoveFavorite(quote)}
                    className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="font-serif text-lg text-slate-900 dark:text-amber-100 leading-relaxed my-3">
                  “{quote.translations?.[selectedLanguage] || quote.text}”
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-amber-200/60 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-amber-200">
                    {quote.author}
                  </h4>
                  <p className="text-[11px] text-slate-500 italic">{quote.source}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => speakQuote(quote.translations?.[selectedLanguage] || quote.text, selectedLanguage)}
                    className="p-2 rounded-lg bg-amber-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-200"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenReflection(quote)}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-100 dark:bg-slate-800 text-amber-900 dark:text-amber-300 text-xs font-semibold hover:bg-amber-200"
                  >
                    AI Reflect
                  </button>

                  <button
                    onClick={() => onOpenStudio(quote)}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold"
                  >
                    Card
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
