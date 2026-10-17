import React from 'react';
import { Filter, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { FilterState, OpportunityCategory, EducationLevel, ContractType } from '../types';
import { COUNTRIES } from '../data/countries';
import { CATEGORIES } from '../data/categories';

interface FiltersBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalResults: number;
}

const EDUCATION_LEVELS: EducationLevel[] = [
  'Tous niveaux',
  'Sans diplôme requis',
  'BEPC / CAP',
  'Bac',
  'Bac+2 (BTS, DUT)',
  'Licence (Bac+3)',
  'Master / Ingénieur (Bac+5)',
  'Doctorat / Ph.D'
];

const CONTRACT_TYPES: ContractType[] = [
  'CDI',
  'CDD',
  'Fonction publique / Titularisation',
  'Stage professionnel rémunéré',
  'Stage académique',
  'Bourse complète (Exemption + Allocation)',
  'Bourse partielle',
  'Formation diplômante',
  'Consultance / Prestation'
];

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  onChange,
  totalResults
}) => {
  const hasActiveFilters = Boolean(
    filters.searchQuery ||
    filters.country ||
    filters.category ||
    filters.educationLevel ||
    filters.contractType ||
    filters.deadlineFilter !== 'active_only'
  );

  const handleReset = () => {
    onChange({
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
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs mb-6 space-y-4">
      {/* Top row: Results count + Sort + Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
          <SlidersHorizontal className="w-4 h-4 text-cyan-600" />
          <span>
            {totalResults} opportunité{totalResults > 1 ? 's' : ''} trouvée{totalResults > 1 ? 's' : ''}
          </span>
          {filters.deadlineFilter === 'active_only' && (
            <span className="text-[11px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Actives uniquement
            </span>
          )}
          {filters.deadlineFilter === 'expired' && (
            <span className="text-[11px] font-normal text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
              Archives expirées
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
          <label className="text-slate-500 font-medium whitespace-nowrap">Trier par :</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="recent">Plus récentes d'abord</option>
            <option value="deadline_asc">Date limite la plus proche</option>
            <option value="views">Les plus consultées</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-slate-500 hover:text-rose-600 transition-colors pl-2 border-l border-slate-200"
              title="Réinitialiser tous les filtres"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Effacer</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
        {/* Country */}
        <div>
          <label className="block text-slate-500 font-medium mb-1">Pays</label>
          <select
            value={filters.country}
            onChange={(e) => onChange({ ...filters, country: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer font-medium"
          >
            <option value="">Tous les pays</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-slate-500 font-medium mb-1">Catégorie</label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer font-medium"
          >
            <option value="">Toutes les catégories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Education level */}
        <div>
          <label className="block text-slate-500 font-medium mb-1">Niveau d'études</label>
          <select
            value={filters.educationLevel}
            onChange={(e) => onChange({ ...filters, educationLevel: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer font-medium"
          >
            <option value="">Tous les niveaux</option>
            {EDUCATION_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Contract Type */}
        <div>
          <label className="block text-slate-500 font-medium mb-1">Type de contrat</label>
          <select
            value={filters.contractType}
            onChange={(e) => onChange({ ...filters, contractType: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer font-medium"
          >
            <option value="">Tous les types</option>
            {CONTRACT_TYPES.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
        </div>

        {/* Deadline Status Filter */}
        <div>
          <label className="block text-slate-500 font-medium mb-1">Statut d'échéance</label>
          <select
            value={filters.deadlineFilter}
            onChange={(e) => onChange({ ...filters, deadlineFilter: e.target.value as any })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer font-medium"
          >
            <option value="active_only">Annonces actives (par défaut)</option>
            <option value="expiring_soon">Échéance proche (&lt; 7 jours)</option>
            <option value="all">Toutes (Actives + Expirées)</option>
            <option value="expired">Archives expirées uniquement</option>
          </select>
        </div>
      </div>
    </div>
  );
};
