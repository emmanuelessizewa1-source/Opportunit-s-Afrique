import React, { useState } from 'react';
import { Info, HelpCircle } from 'lucide-react';

interface AdSlotProps {
  format: 'banner_top' | 'sidebar_rectangle' | 'in_feed' | 'bottom_leaderboard';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ format, className = '' }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  // Specifications according to IAB standard advertising formats
  const config = {
    banner_top: {
      label: 'Bannière Haute — Format Leaderboard (728x90 / 320x50)',
      dimensions: 'w-full max-w-4xl min-h-[90px]',
      desc: 'Idéal pour Google AdSense, Adsterra Leaderboard ou sponsoring institutionnel direct.'
    },
    sidebar_rectangle: {
      label: 'Pavé Latéral — Format Medium Rectangle (300x250)',
      dimensions: 'w-full min-h-[250px]',
      desc: 'Emplacement premium visible lors du défilement des filtres et offres.'
    },
    in_feed: {
      label: 'Encart In-Feed — Intégration Éditoriale Partenaire',
      dimensions: 'w-full min-h-[110px]',
      desc: 'Emplacement naturel inséré entre les cartes d\'opportunités sans perturber la lecture.'
    },
    bottom_leaderboard: {
      label: 'Bannière Basse — Format Leaderboard de Clôture',
      dimensions: 'w-full max-w-4xl min-h-[90px]',
      desc: 'Monétisation de fin de consultation avant le pied de page.'
    }
  }[format];

  return (
    <div className={`my-6 ${className}`}>
      <div className="relative border border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-900/40 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all">
        {/* Anti-confusion disclaimer label as required by prompt */}
        <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>Espace Partenaire — Annonce Publicitaire</span>
          </span>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            title="Comment activer la monétisation réelle ?"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Configuration régie</span>
          </button>
        </div>

        {/* Slot visual container */}
        <div className={`flex flex-col items-center justify-center py-4 px-3 ${config.dimensions}`}>
          <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
            {config.label}
          </div>
          <p className="text-[11px] text-slate-400 max-w-md mt-1">
            Emplacement réservé aux régies autorisées (Google AdSense, Adsterra, partenariats directs d'écoles/entreprises).
          </p>
        </div>

        {/* Integration help info toggle */}
        {showExplanation && (
          <div className="w-full text-left bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 mt-2 space-y-1">
            <div className="font-semibold text-slate-800 dark:text-white flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-500" />
              <span>Guide d'activation pour le webmaster</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Pour activer vos vraies annonces : insérez simplement votre code d'encart fourni par Google AdSense ou Adsterra dans ce composant (<code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded text-cyan-600">src/components/AdSlot.tsx</code>). L'étiquette « Espace Partenaire » garantit la conformité avec les politiques strictes anti-tromperie des régies publicitaires.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
