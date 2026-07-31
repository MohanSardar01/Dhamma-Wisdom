import React, { useState } from 'react';
import { 
  QuoteItem, 
  LanguageCode 
} from '../types';
import { 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Share2, 
  Lightbulb, 
  Download, 
  RefreshCw,
  BookOpen,
  Send,
  MessageCircle,
  Twitter,
  Linkedin,
  Facebook
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakQuote, stopSpeaking } from '../lib/audio';

interface QuoteCardProps {
  quote: QuoteItem;
  selectedLanguage: LanguageCode;
  onNewQuote: () => void;
  onGenerateSimilar: (authorStyle: string, category: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (quote: QuoteItem) => void;
  onOpenReflection: (quote: QuoteItem) => void;
  onOpenStudio: (quote: QuoteItem) => void;
  isGeneratingSimilar?: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  selectedLanguage,
  onNewQuote,
  onGenerateSimilar,
  isFavorite,
  onToggleFavorite,
  onOpenReflection,
  onOpenStudio,
  isGeneratingSimilar = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeLang, setActiveLang] = useState<LanguageCode>(selectedLanguage);

  // Sync active language if user changes header language
  React.useEffect(() => {
    setActiveLang(selectedLanguage);
  }, [selectedLanguage]);

  // Determine displayed text based on selected language
  const displayText = quote.translations?.[activeLang] || quote.text;

  // Handle Copy
  const handleCopy = () => {
    const fullText = `"${displayText}"\n— ${quote.author} (${quote.source})\n\nVia Dhamma Wisdom (dhammawisdom.app)`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Favorite Toggle with Confetti Effect
  const handleFavoriteClick = (e: React.MouseEvent) => {
    if (!isFavorite) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x, y },
        colors: ['#D97706', '#1E3A8A', '#059669', '#F59E0B']
      });
    }
    onToggleFavorite(quote);
  };

  // Handle Audio Play
  const handleAudioToggle = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      speakQuote(
        displayText,
        activeLang,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  // Social Share Handlers
  const shareText = encodeURIComponent(`"${displayText}" — ${quote.author}`);
  const shareUrl = encodeURIComponent(window.location.href);

  const shareWhatsApp = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const shareTelegram = `https://t.me/share/url?url=${shareUrl}&text=${shareText}`;

  // Avatar Icon Selector
  const getAuthorSymbol = (author: string) => {
    if (author.includes('Ambedkar')) {
      return (
        <span className="text-xl" title="Constitution & Wisdom">
          📖
        </span>
      );
    }
    if (author.includes('Ashoka')) {
      return (
        <span className="text-xl" title="Ashoka Pillar / Dhamma">
          🏛️
        </span>
      );
    }
    if (author.includes('Buddha') || author.includes('Thich') || author.includes('Chah')) {
      return (
        <span className="text-xl" title="Bodhi Leaf & Awakening">
          🍃
        </span>
      );
    }
    return (
      <span className="text-xl" title="Wheel of Dhamma">
        ☸️
      </span>
    );
  };

  return (
    <div className="relative max-w-4xl mx-auto w-full">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-blue-600/10 to-amber-600/20 rounded-3xl blur-xl opacity-75 dark:opacity-40 pointer-events-none"></div>

      {/* Main Container Card */}
      <div id="quote-card-container" className="relative bg-amber-50/90 dark:bg-slate-900/90 backdrop-blur-xl border border-amber-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300">
        
        {/* Header Badges & Category */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 border-b border-amber-200/60 dark:border-slate-800/80 pb-4">
          
          <div className="flex items-center space-x-2">
            {/* Category Tag */}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-200/60 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800">
              {quote.category}
            </span>

            {/* Verification Status Badge */}
            {quote.isVerified ? (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Historical Quote</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-300/60 dark:border-purple-800">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>AI Inspired</span>
              </span>
            )}
          </div>

          {/* Quick Language Switcher Pills */}
          <div className="flex items-center space-x-1 bg-amber-100/60 dark:bg-slate-800 p-1 rounded-lg border border-amber-200/60 dark:border-slate-700">
            <button
              onClick={() => setActiveLang('en')}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                activeLang === 'en'
                  ? 'bg-amber-600 text-white dark:bg-amber-500'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-amber-200'
              }`}
            >
              EN
            </button>
            {quote.translations?.hi && (
              <button
                onClick={() => setActiveLang('hi')}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                  activeLang === 'hi'
                    ? 'bg-amber-600 text-white dark:bg-amber-500'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-amber-200'
                }`}
              >
                हिन्दी
              </button>
            )}
            {quote.translations?.mr && (
              <button
                onClick={() => setActiveLang('mr')}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                  activeLang === 'mr'
                    ? 'bg-amber-600 text-white dark:bg-amber-500'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-amber-200'
                }`}
              >
                मराठी
              </button>
            )}
            {quote.translations?.pa && (
              <button
                onClick={() => setActiveLang('pa')}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                  activeLang === 'pa'
                    ? 'bg-amber-600 text-white dark:bg-amber-500'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-amber-200'
                }`}
              >
                ਪਾਲੀ
              </button>
            )}
          </div>

        </div>

        {/* Main Display Quote Text */}
        <div className="my-4 sm:my-6">
          <span className="font-serif text-5xl sm:text-6xl text-amber-500/30 dark:text-amber-400/20 leading-none select-none block -mb-4">
            “
          </span>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-amber-50 leading-relaxed font-normal tracking-tight px-2">
            {displayText}
          </p>
          <span className="font-serif text-5xl sm:text-6xl text-amber-500/30 dark:text-amber-400/20 leading-none select-none block text-right -mt-4">
            ”
          </span>
        </div>

        {/* Author Details & Source Citation */}
        <div className="mt-6 pt-6 border-t border-amber-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-full bg-amber-200/80 dark:bg-slate-800 flex items-center justify-center border border-amber-300 dark:border-slate-700 shadow-sm shrink-0">
              {getAuthorSymbol(quote.author)}
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-amber-200">
                {quote.author}
              </h3>
              <p className="text-xs sm:text-sm text-amber-900/80 dark:text-amber-400 font-medium">
                {quote.authorTitle}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right bg-amber-100/40 dark:bg-slate-800/40 p-2.5 rounded-xl border border-amber-200/50 dark:border-slate-800">
            <div className="flex items-center sm:justify-end space-x-1 text-xs text-amber-800 dark:text-amber-400 font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Source Citation</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium italic mt-0.5">
              {quote.source}
            </p>
          </div>
        </div>

        {/* Historical Context Note if available */}
        {quote.historicalNote && (
          <div className="mt-4 p-3.5 bg-amber-100/50 dark:bg-slate-800/60 rounded-xl border border-amber-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-amber-900 dark:text-amber-300 mr-1">Historical Context:</span>
            {quote.historicalNote}
          </div>
        )}

        {/* AI Disclaimer if AI Inspired */}
        {quote.aiDisclaimer && (
          <div className="mt-3 text-[11px] text-purple-700 dark:text-purple-300 italic flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-purple-500" />
            <span>{quote.aiDisclaimer}</span>
          </div>
        )}

        {/* Action Controls Toolbar */}
        <div className="mt-8 pt-6 border-t border-amber-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          
          {/* Primary Generation Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onNewQuote}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>New Quote</span>
            </button>

            <button
              onClick={() => onGenerateSimilar(quote.author, quote.category)}
              disabled={isGeneratingSimilar}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-medium text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{isGeneratingSimilar ? 'Generating AI Quote...' : 'Generate Similar'}</span>
            </button>
          </div>

          {/* Secondary Utilities (Favorite, Copy, Audio, AI Reflect, Studio, Share) */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Listen Audio */}
            <button
              onClick={handleAudioToggle}
              className={`p-2.5 rounded-xl transition-colors border ${
                isPlayingAudio 
                  ? 'bg-amber-600 text-white border-amber-600 animate-pulse'
                  : 'bg-amber-100/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-200 dark:hover:bg-slate-700 border-amber-200 dark:border-slate-700'
              }`}
              title="Listen to Quote (Speech Audio)"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* AI Wisdom Reflection */}
            <button
              onClick={() => onOpenReflection(quote)}
              className="flex items-center space-x-1 px-3 py-2.5 rounded-xl bg-amber-100/80 dark:bg-slate-800 text-slate-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-slate-700 border border-amber-200 dark:border-slate-700 text-xs sm:text-sm font-medium transition-colors"
              title="Get Deep AI Reflection & Daily Application"
            >
              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">AI Reflection</span>
            </button>

            {/* Favorite Bookmark */}
            <button
              onClick={handleFavoriteClick}
              className={`p-2.5 rounded-xl transition-colors border ${
                isFavorite 
                  ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800' 
                  : 'bg-amber-100/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-200 dark:hover:bg-slate-700 border-amber-200 dark:border-slate-700'
              }`}
              title={isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-rose-600' : ''}`} />
            </button>

            {/* Studio / Custom Card Download */}
            <button
              onClick={() => onOpenStudio(quote)}
              className="p-2.5 rounded-xl bg-amber-100/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-200 dark:hover:bg-slate-700 border border-amber-200 dark:border-slate-700 transition-colors"
              title="Card Studio & Image Download"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Copy Text */}
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-amber-100/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-200 dark:hover:bg-slate-700 border border-amber-200 dark:border-slate-700 transition-colors"
              title="Copy Quote Text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Share Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2.5 rounded-xl bg-amber-100/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-200 dark:hover:bg-slate-700 border border-amber-200 dark:border-slate-700 transition-colors"
                title="Share Quote"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Share Dropdown */}
              {showShareMenu && (
                <div className="absolute right-0 bottom-12 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-amber-200 dark:border-slate-700 p-2 z-50 animate-in fade-in slide-in-from-bottom-2">
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1">SHARE TO</div>
                  
                  <a
                    href={shareWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={shareTwitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950/50 rounded-lg transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-sky-500" />
                    <span>X (Twitter)</span>
                  </a>

                  <a
                    href={shareTelegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4 text-blue-500" />
                    <span>Telegram</span>
                  </a>

                  <a
                    href={shareLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-700" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={shareFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-indigo-600" />
                    <span>Facebook</span>
                  </a>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
