import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, AlertCircle, Bookmark, Inbox } from 'lucide-react';
import { Opportunity, FilterState } from '../types';
import { OpportunityCard } from '../components/OpportunityCard';
import { FiltersBar } from '../components/FiltersBar';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdSlot } from '../components/AdSlot';
import { computeOpportunityStatus } from '../utils/storage';

interface OpportunitiesPageProps {
  opportunities: Opportunity[];
  bookmarks: string[];
  initialFilters?: Partial<FilterState>;
  onSelectOpportunity: (opp: Opportunity) => void;
  onShareOpportunity: (opp: Opportunity, e: React.MouseEvent) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onNavigate: (path: string) => void;
}

export const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({
  opportunities,
  bookmarks,
  initialFilters,
  onSelectOpportunity,
  onShareOpportunity,
  onToggleBookmark,
  onNavigate
}) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialFilters?.searchQuery || '',
    country: initialFilters?.country || '',
    category: initialFilters?.category || '',
    educationLevel: initialFilters?.educationLevel || '',
    contractType: initialFilters?.contractType || '',
    deadlineFilter: initialFilters?.deadlineFilter || 'active_only',
    sortBy: initialFilters?.sortBy || 'recent'
  });

  // Filter & sort algorithm
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const { status } = computeOpportunityStatus(opp.deadline);

      // Deadline filter
      if (filters.deadlineFilter === 'active_only') {
        if (status === 'expired') return false;
      } else if (filters.deadlineFilter === 'expiring_soon') {
        if (status !== 'expiring_soon') return false;
      } else if (filters.deadlineFilter === 'expired') {
        if (status !== 'expired') return false;
      }

      // Country filter
      if (filters.country && opp.countryCode !== filters.country) {
        return false;
      }

      // Category filter
      if (filters.category && opp.category !== filters.category) {
        return false;
      }

      // Education Level
      if (filters.educationLevel && filters.educationLevel !== 'Tous niveaux') {
        if (opp.educationLevel !== filters.educationLevel) return false;
      }

      // Contract Type
      if (filters.contractType && opp.contractType !== filters.contractType) {
        return false;
      }

      // Keyword query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(q);
        const matchesOrg = opp.organization.toLowerCase().includes(q);
        const matchesCity = opp.city.toLowerCase().includes(q);
        const matchesCountry = opp.countryName.toLowerCase().includes(q);
        const matchesSummary = opp.summary.toLowerCase().includes(q);
        const matchesTags = opp.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesTitle && !matchesOrg && !matchesCity && !matchesCountry && !matchesSummary && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'recent') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      if (filters.sortBy === 'deadline_asc') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      if (filters.sortBy === 'views') {
        return b.viewsCount - a.viewsCount;
      }
      return 0;
    });
  }, [opportunities, filters]);

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      country: '',
      category: '',
      educationLevel: '',
      contractType: '',
      deadlineFilter: 'active_only',
      sortBy: 'recent'
    });
  };

  return (
    <div className="pb-16">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Toutes les opportunités' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Page Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Offres d'Emploi, Concours et Bourses
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Consultez les opportunités vérifiées au Togo, Bénin, Côte d'Ivoire, Sénégal, Cameroun, Burkina Faso et RDC. Filtrez par niveau d'études, type de contrat et échéance.
          </p>

          {/* Quick search input */}
          <div className="mt-6 max-w-xl flex items-center bg-white rounded-xl p-1.5 text-slate-900">
            <Search className="w-4 h-4 text-slate-400 ml-2 mr-2 shrink-0" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="Rechercher par mot-clé (métier, organisme, diplôme)..."
              className="w-full text-xs sm:text-sm focus:outline-none"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="text-xs text-slate-400 hover:text-slate-600 px-2"
              >
                Effacer
              </button>
            )}
          </div>
        </div>

        {/* Filters Bar */}
        <FiltersBar
          filters={filters}
          onChange={setFilters}
          totalResults={filteredOpportunities.length}
        />

        {/* Results grid or Empty State */}
        {filteredOpportunities.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredOpportunities.map((opp, idx) => (
                <React.Fragment key={opp.id}>
                  <OpportunityCard
                    opportunity={opp}
                    onSelect={onSelectOpportunity}
                    onShare={onShareOpportunity}
                    onToggleBookmark={onToggleBookmark}
                    isBookmarked={bookmarks.includes(opp.id)}
                  />
                  {/* Insert in-feed ad slot after 6th item */}
                  {idx === 5 && (
                    <div className="md:col-span-2 lg:col-span-3">
                      <AdSlot format="in_feed" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <AdSlot format="bottom_leaderboard" />
          </>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Aucune opportunité ne correspond à ces critères
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Essayez d'élargir votre recherche en sélectionnant « Tous les pays », en réinitialisant les filtres d'études ou en incluant les archives d'annonces expirées.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser tous les filtres</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
