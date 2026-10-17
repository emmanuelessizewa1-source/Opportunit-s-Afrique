import React, { useState } from 'react';
import { Opportunity } from '../types';
import { COUNTRIES } from '../data/countries';
import { OpportunityCard } from '../components/OpportunityCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdSlot } from '../components/AdSlot';
import { computeOpportunityStatus } from '../utils/storage';
import { Building2, ExternalLink, MapPin, Globe, Briefcase } from 'lucide-react';

interface CountryPageProps {
  countryCode: string;
  opportunities: Opportunity[];
  bookmarks: string[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onShareOpportunity: (opp: Opportunity, e: React.MouseEvent) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onNavigate: (path: string) => void;
}

export const CountryPage: React.FC<CountryPageProps> = ({
  countryCode,
  opportunities,
  bookmarks,
  onSelectOpportunity,
  onShareOpportunity,
  onToggleBookmark,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showExpired, setShowExpired] = useState(false);

  const country = COUNTRIES.find((c) => c.code.toLowerCase() === countryCode.toLowerCase()) || COUNTRIES[0];

  const countryOpportunities = opportunities.filter((opp) => {
    if (opp.countryCode !== country.code) return false;
    if (selectedCategory && opp.category !== selectedCategory) return false;
    const { status } = computeOpportunityStatus(opp.deadline);
    if (!showExpired && status === 'expired') return false;
    return true;
  });

  return (
    <div className="pb-16">
      <Breadcrumbs
        items={[
          { label: 'Pays', path: '/pays' },
          { label: `${country.flag} ${country.name}` }
        ]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Country Marquee Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl sm:text-5xl">{country.flag}</span>
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
                  Marché de l'emploi & Concours
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Opportunités au {country.name}
                </h1>
                <p className="text-xs text-slate-300 mt-1">
                  Capitale : {country.capital} · Monnaie : {country.currency}
                </p>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs sm:text-right shrink-0">
              <span className="text-slate-400 block text-[11px]">Offres disponibles</span>
              <strong className="text-xl font-bold text-cyan-400">{countryOpportunities.length}</strong>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl pt-2 border-t border-slate-800">
            {country.description}
          </p>

          {/* Popular sectors & official agencies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs">
            {/* Sectors */}
            <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-800">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                <span>Secteurs porteurs au {country.name}</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {country.popularSectors.map((sector, i) => (
                  <span key={i} className="bg-slate-700/60 text-slate-300 px-2.5 py-1 rounded-md text-[11px]">
                    {sector}
                  </span>
                ))}
              </div>
            </div>

            {/* Official agencies */}
            <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-800">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Organismes publics de référence</span>
              </h4>
              <div className="space-y-1.5 text-[11px]">
                {country.officialJobAgencies.map((agency, i) => (
                  <div key={i} className="text-slate-300">
                    <strong className="text-cyan-300">{agency.name}</strong> : {agency.description}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results filter & list */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 bg-white border border-slate-200 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-800">Filtrer par type :</span>
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                selectedCategory === '' ? 'bg-slate-900 text-cyan-400' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setSelectedCategory('emploi')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                selectedCategory === 'emploi' ? 'bg-slate-900 text-cyan-400' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Emplois
            </button>
            <button
              onClick={() => setSelectedCategory('concours')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                selectedCategory === 'concours' ? 'bg-slate-900 text-cyan-400' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Concours d'État
            </button>
            <button
              onClick={() => setSelectedCategory('stage')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                selectedCategory === 'stage' ? 'bg-slate-900 text-cyan-400' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Stages
            </button>
            <button
              onClick={() => setSelectedCategory('bourse')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                selectedCategory === 'bourse' ? 'bg-slate-900 text-cyan-400' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Bourses
            </button>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <input
              type="checkbox"
              id="countryExpired"
              checked={showExpired}
              onChange={(e) => setShowExpired(e.target.checked)}
              className="w-3.5 h-3.5 text-cyan-600 rounded"
            />
            <label htmlFor="countryExpired" className="text-slate-600 cursor-pointer">
              Inclure les archives
            </label>
          </div>
        </div>

        {/* Opportunities Grid */}
        {countryOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {countryOpportunities.map((opp) => (
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
              Aucune offre disponible actuellement pour cette sélection au {country.name}
            </h3>
            <p className="text-xs text-slate-500">
              Réinitialisez le filtre de catégorie ou revenez prochainement. Les avis officiels sont mis à jour quotidiennement.
            </p>
            <button
              onClick={() => setSelectedCategory('')}
              className="px-3.5 py-1.5 bg-slate-900 text-cyan-400 font-semibold text-xs rounded-lg"
            >
              Voir toutes les catégories au {country.name}
            </button>
          </div>
        )}

        <AdSlot format="bottom_leaderboard" />
      </div>
    </div>
  );
};
