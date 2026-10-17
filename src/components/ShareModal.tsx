import React, { useState } from 'react';
import { X, Check, Copy, MessageCircle, Share2, Linkedin, Twitter, Mail } from 'lucide-react';
import { Opportunity } from '../types';

interface ShareModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ opportunity, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!opportunity) return null;

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/opportunite/${opportunity.slug}`
    : `https://opportunites-afrique.com/opportunite/${opportunity.slug}`;

  const shareText = `Opportunités Afrique — ${opportunity.title} (${opportunity.organization}, ${opportunity.countryName}) : ${shareUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: opportunity.title,
          text: `Découvrez cette opportunité vérifiée sur Opportunités Afrique : ${opportunity.title}`,
          url: shareUrl
        });
      } catch (err) {
        // User cancelled or unsupported
      }
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(`Opportunité : ${opportunity.title}`)}&body=${encodeURIComponent(shareText)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
            <Share2 className="w-4 h-4 text-cyan-600" />
            <span>Partager cette annonce</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-xs text-slate-600 mb-1 font-medium line-clamp-1">
            {opportunity.title}
          </p>
          <p className="text-[11px] text-slate-400 mb-4">
            Aidez vos proches ou votre réseau en partageant cette annonce vérifiée.
          </p>

          {/* Social share options */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold transition-colors border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-xl text-xs font-semibold transition-colors border border-blue-200"
            >
              <Linkedin className="w-4 h-4 text-blue-600" />
              <span>LinkedIn</span>
            </a>

            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors border border-slate-200"
            >
              <Twitter className="w-4 h-4 text-slate-700" />
              <span>X (Twitter)</span>
            </a>

            <a
              href={emailUrl}
              className="flex items-center justify-center gap-2 p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors border border-slate-200"
            >
              <Mail className="w-4 h-4 text-slate-700" />
              <span>Email</span>
            </a>
          </div>

          {/* Copy link input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Lien direct de l'annonce
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-700 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
