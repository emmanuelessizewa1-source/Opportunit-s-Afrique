import React from 'react';
import { Opportunity } from '../types';
import { OpportunityCard } from '../components/OpportunityCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Bookmark, Inbox, Search } from 'lucide-react';

interface BookmarksPageProps {
  opportunities: Opportunity[];
  bookmarks: string[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onShareOpportunity: (opp: Opportunity, e: React.MouseEvent) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onNavigate: (path: string) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  opportunities,
  bookmarks,
  onSelectOpportunity,
  onShareOpportunity,
  onToggleBookmark,
  onNavigate
}) => {
  const savedOpportunities = opportunities.filter((o) => bookmarks.includes(o.id));

  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: 'Mes opportunités sauvegardées' }]} onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <Bookmark className="w-4 h-4 fill-current" />
            <span>Espace Candidat</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Mes Annonces Sauvegardées ({savedOpportunities.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Retrouvez les offres d'emploi, concours et bourses que vous avez mis de côté pour préparer vos dossiers avant la date limite. Vos favoris restent sauvegardés dans votre navigateur.
          </p>
        </div>

        {savedOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedOpportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onSelect={onSelectOpportunity}
                onShare={onShareOpportunity}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={true}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Vous n'avez pas encore d'offres sauvegardées
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cliquez sur l'icône de signet (marque-page) sur n'importe quelle annonce pour l'enregistrer ici et surveiller l'approche de son échéance.
            </p>
            <button
              onClick={() => onNavigate('/opportunites')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Explorer les opportunités</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
