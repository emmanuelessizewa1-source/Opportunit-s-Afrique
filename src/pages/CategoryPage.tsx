import React, { useState } from 'react';
import { Opportunity, OpportunityCategory } from '../types';
import { CATEGORIES } from '../data/categories';
import { COUNTRIES } from '../data/countries';
import { OpportunityCard } from '../components/OpportunityCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdSlot } from '../components/AdSlot';
import { computeOpportunityStatus } from '../utils/storage';
import { ArrowRight, BookOpen, Filter } from 'lucide-react';

interface CategoryPageProps {
  categoryId: OpportunityCategory;
  opportunities: Opportunity[];
  bookmarks: string[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onShareOpportunity: (opp: Opportunity, e: React.MouseEvent) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onNavigate: (path: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  opportunities,
  bookmarks,
  onSelectOpportunity,
  onShareOpportunity,
  onToggleBookmark,
  onNavigate
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [showExpired, setShowExpired] = useState(false);

  const category = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];

  const matchingOpportunities = opportunities.filter((opp) => {
    if (opp.category !== categoryId) return false;
    if (selectedCountry && opp.countryCode !== selectedCountry) return false;
    const { status } = computeOpportunityStatus(opp.deadline);
    if (!showExpired && status === 'expired') return false;
    return true;
  });

  return (
    <div className="pb-16">
      <Breadcrumbs
        items={[
          { label: 'Catégories', path: '/opportunites' },
          { label: category.name }
        ]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
              Catégorie Officielle
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Quick country filter inside category */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Filtrer par pays :</span>
            <button
              onClick={() => setSelectedCountry('')}
              className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                selectedCountry === '' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Tous
            </button>
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                  selectedCountry === c.code
                    ? 'bg-cyan-500 text-slate-950 font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results bar */}
        <div className="flex items-center justify-between text-xs text-slate-600 bg-white border border-slate-200 rounded-xl px-4 py-3">
          <div>
            <strong>{matchingOpportunities.length} opportunité{matchingOpportunities.length > 1 ? 's' : ''}</strong> dans cette catégorie
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="catArchiveCheck"
              checked={showExpired}
              onChange={(e) => setShowExpired(e.target.checked)}
              className="w-3.5 h-3.5 text-cyan-600 rounded"
            />
            <label htmlFor="catArchiveCheck" className="text-slate-600 cursor-pointer">
              Afficher les archives expirées
            </label>
          </div>
        </div>

        {/* Opportunities Grid */}
        {matchingOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {matchingOpportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onSelect={onSelectOpportunity}
                onShare={onShareOpportunity}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={bookmarks.includes(opp.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-lg mx-auto space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">
              Aucune offre active pour ce filtre dans {category.name}
            </h3>
            <p className="text-xs text-slate-500">
              Sélectionnez un autre pays ou revenez consulter les publications vérifiées ultérieurement.
            </p>
            <button
              onClick={() => setSelectedCountry('')}
              className="px-3.5 py-1.5 bg-slate-900 text-cyan-400 font-semibold text-xs rounded-lg"
            >
              Voir tous les pays
            </button>
          </div>
        )}

        <AdSlot format="bottom_leaderboard" />
      </div>
    </div>
  );
};
