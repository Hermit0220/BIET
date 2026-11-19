import React, { useEffect } from 'react';
import { Calendar, Clock, User, X } from 'lucide-react';
import { SmartImage } from '../ui/SmartImage';
import type { NewsArticle } from '../../data/site';

interface NewsArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onApplyClick: () => void;
}

export const NewsArticleModal: React.FC<NewsArticleModalProps> = ({
  article,
  onClose,
  onApplyClick,
}) => {
  useEffect(() => {
    if (!article) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 my-8">
        <div className="relative h-56 sm:h-64 bg-neutral-900">
          <SmartImage
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a39] via-[#001a39]/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#001428]/80 hover:bg-[#1a3b61]/80 border border-[#1a3b61]/40 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-5 left-6 right-6 space-y-2">
            <span className="px-2.5 py-1 rounded bg-[#fdc800] text-[#002147] text-[10px] font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <h2
              id="news-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-white leading-snug"
            >
              {article.title}
            </h2>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-4 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#002147]" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#002147]" />
            <span>{article.readTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#002147]" />
            <span>{article.author}</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 max-h-[55vh] overflow-y-auto space-y-4">
          {article.content.map((para, idx) => (
            <p key={idx} className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <div className="px-6 sm:px-8 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-[#002147] cursor-pointer"
          >
            Close Notice
          </button>
          <button
            onClick={() => {
              onClose();
              onApplyClick();
            }}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#002147] bg-[#fdc800] hover:bg-[#ffe066] rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            Apply to BIET
          </button>
        </div>
      </div>
    </div>
  );
};

