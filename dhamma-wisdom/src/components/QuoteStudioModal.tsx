import React, { useRef, useState } from 'react';
import { QuoteItem } from '../types';
import { X, Download, Image as ImageIcon, Palette, Type, Check, Sparkles, Printer } from 'lucide-react';
import { toPng } from 'html-to-image';

interface QuoteStudioModalProps {
  quote: QuoteItem | null;
  onClose: () => void;
}

export const QuoteStudioModal: React.FC<QuoteStudioModalProps> = ({ quote, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useState<'ivory' | 'gold' | 'blue' | 'slate' | 'emerald'>('ivory');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '9:16' | '16:9'>('1:1');
  const [fontStyle, setFontStyle] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [showEmblem, setShowEmblem] = useState<boolean>(true);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [downloading, setDownloading] = useState<boolean>(false);

  if (!quote) return null;

  // Theme Styling Classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'gold':
        return 'bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700 text-white';
      case 'blue':
        return 'bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white';
      case 'slate':
        return 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-amber-100';
      case 'emerald':
        return 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white';
      case 'ivory':
      default:
        return 'bg-gradient-to-br from-amber-50 via-orange-50/60 to-amber-100 text-slate-900 border border-amber-200';
    }
  };

  // Font Classes
  const getFontClasses = () => {
    switch (fontStyle) {
      case 'sans':
        return 'font-sans';
      case 'mono':
        return 'font-mono';
      case 'serif':
      default:
        return 'font-serif';
    }
  };

  // Aspect Ratio Dimensions
  const getAspectClasses = () => {
    switch (aspectRatio) {
      case '9:16':
        return 'w-[320px] h-[568px] sm:w-[360px] sm:h-[640px]';
      case '16:9':
        return 'w-[360px] h-[202px] sm:w-[500px] sm:h-[280px]';
      case '1:1':
      default:
        return 'w-[320px] h-[320px] sm:w-[420px] sm:h-[420px]';
    }
  };

  // Download Card as PNG Image
  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `dhamma-wisdom-${quote.author.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export card image:', err);
      alert('Could not export image directly. Please try taking a screenshot of the card.');
    } finally {
      setDownloading(false);
    }
  };

  // Handle Print PDF
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[95vh] my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Close Studio"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">
          <Palette className="w-4 h-4" />
          <span>Card Studio & Export Engine</span>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-amber-100 mb-6">
          Customize & Download Shareable Card
        </h2>

        {/* Grid Layout: Controls vs Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-5 text-sm">
            
            {/* Theme Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Card Theme
              </label>
              <div className="grid grid-cols-5 gap-2">
                <button
                  onClick={() => setTheme('ivory')}
                  className={`h-9 rounded-xl border-2 flex items-center justify-center bg-amber-50 text-slate-800 transition-all ${
                    theme === 'ivory' ? 'border-amber-600 scale-105 shadow-md' : 'border-amber-200'
                  }`}
                  title="Warm Ivory"
                >
                  {theme === 'ivory' && <Check className="w-4 h-4 text-amber-700" />}
                </button>

                <button
                  onClick={() => setTheme('gold')}
                  className={`h-9 rounded-xl border-2 flex items-center justify-center bg-amber-600 text-white transition-all ${
                    theme === 'gold' ? 'border-amber-900 scale-105 shadow-md' : 'border-amber-400'
                  }`}
                  title="Buddhist Saffron Gold"
                >
                  {theme === 'gold' && <Check className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setTheme('blue')}
                  className={`h-9 rounded-xl border-2 flex items-center justify-center bg-blue-950 text-white transition-all ${
                    theme === 'blue' ? 'border-amber-400 scale-105 shadow-md' : 'border-blue-800'
                  }`}
                  title="Ambedkar Royal Blue"
                >
                  {theme === 'blue' && <Check className="w-4 h-4 text-amber-300" />}
                </button>

                <button
                  onClick={() => setTheme('slate')}
                  className={`h-9 rounded-xl border-2 flex items-center justify-center bg-slate-900 text-amber-200 transition-all ${
                    theme === 'slate' ? 'border-amber-400 scale-105 shadow-md' : 'border-slate-700'
                  }`}
                  title="Ashoka Pillar Slate"
                >
                  {theme === 'slate' && <Check className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setTheme('emerald')}
                  className={`h-9 rounded-xl border-2 flex items-center justify-center bg-emerald-900 text-white transition-all ${
                    theme === 'emerald' ? 'border-emerald-400 scale-105 shadow-md' : 'border-emerald-800'
                  }`}
                  title="Bodhi Emerald Forest"
                >
                  {theme === 'emerald' && <Check className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Aspect Ratio Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Card Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setAspectRatio('1:1')}
                  className={`py-2 rounded-xl border font-medium text-xs transition-colors ${
                    aspectRatio === '1:1'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  1:1 Square (Post)
                </button>

                <button
                  onClick={() => setAspectRatio('9:16')}
                  className={`py-2 rounded-xl border font-medium text-xs transition-colors ${
                    aspectRatio === '9:16'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  9:16 Story
                </button>

                <button
                  onClick={() => setAspectRatio('16:9')}
                  className={`py-2 rounded-xl border font-medium text-xs transition-colors ${
                    aspectRatio === '16:9'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  16:9 Banner
                </button>
              </div>
            </div>

            {/* Font Style Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Typography
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFontStyle('serif')}
                  className={`py-2 rounded-xl border font-serif text-xs transition-colors ${
                    fontStyle === 'serif'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Classic Serif
                </button>

                <button
                  onClick={() => setFontStyle('sans')}
                  className={`py-2 rounded-xl border font-sans text-xs transition-colors ${
                    fontStyle === 'sans'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Modern Sans
                </button>

                <button
                  onClick={() => setFontStyle('mono')}
                  className={`py-2 rounded-xl border font-mono text-xs transition-colors ${
                    fontStyle === 'mono'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Monospace
                </button>
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Show Symbol / Emblem</span>
              <input
                type="checkbox"
                checked={showEmblem}
                onChange={(e) => setShowEmblem(e.target.checked)}
                className="w-4 h-4 accent-amber-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Show Brand Watermark</span>
              <input
                type="checkbox"
                checked={showWatermark}
                onChange={(e) => setShowWatermark(e.target.checked)}
                className="w-4 h-4 accent-amber-600 cursor-pointer"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadPNG}
                disabled={downloading}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'Rendering Image...' : 'Download HD PNG'}</span>
              </button>

              <button
                onClick={handlePrintPDF}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-amber-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-medium text-sm transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Card</span>
              </button>
            </div>

          </div>

          {/* Card Preview Column */}
          <div className="lg:col-span-7 flex items-center justify-center p-4 bg-slate-100/80 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 min-h-[360px] overflow-auto">
            
            <div
              ref={cardRef}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 select-none ${getThemeClasses()} ${getFontClasses()} ${getAspectClasses()}`}
            >
              {/* Header Symbol & Category */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest uppercase opacity-80 border-b border-current pb-0.5">
                  {quote.category}
                </span>

                {showEmblem && (
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-sm border border-white/20">
                    {quote.author.includes('Ambedkar') ? '📖' : quote.author.includes('Ashoka') ? '🏛️' : '🍃'}
                  </div>
                )}
              </div>

              {/* Main Quote */}
              <div className="my-auto py-2">
                <p className="text-base sm:text-xl font-medium leading-relaxed">
                  “{quote.text}”
                </p>
              </div>

              {/* Author & Source */}
              <div className="pt-3 border-t border-white/20 flex items-end justify-between">
                <div>
                  <h4 className="font-bold text-sm sm:text-base">{quote.author}</h4>
                  <p className="text-[10px] sm:text-xs opacity-75">{quote.source}</p>
                </div>

                {showWatermark && (
                  <div className="text-[10px] font-semibold tracking-wider opacity-60">
                    dhammawisdom.app
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
