import React, { useState } from 'react';
import { Search, MapPin, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { COUNTRIES } from '../data/countries';
import { CATEGORIES } from '../data/categories';

interface HeroSearchProps {
  onSearch: (query: string, country: string, category: string) => void;
  initialQuery?: string;
  initialCountry?: string;
  initialCategory?: string;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearch,
  initialQuery = '',
  initialCountry = '',
  initialCategory = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, selectedCountry, '');
  };

  const handleQuickCategory = (catId: string) => {
    onSearch(query, selectedCountry, catId);
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Subtle decorative background pattern */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" 
      />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {/* Reassuring badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-800/90 border border-slate-700/80 rounded-full text-xs text-slate-300">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Portail vérifié · Togo, Bénin, Côte d'Ivoire, Sénégal, Cameroun, Burkina Faso, RDC</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Trouvez votre prochain <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">emploi</span>,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">concours</span> ou{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">bourse</span> en Afrique
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Accédez aux avis de recrutement d'entreprises, arrêtés de concours administratifs et bourses internationales vérifiés. Aucune arnaque, aucun faux frais.
        </p>

        {/* Main Search Bar Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto text-slate-800 border border-slate-200"
        >
          {/* Keyword input */}
          <div className="flex-1 flex items-center gap-3 px-3 w-full py-1">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Métier, diplôme, mot-clé (ex: Comptable, Douane, Master, Informatique)..."
              className="w-full text-sm placeholder:text-slate-400 focus:outline-none text-slate-900 font-medium"
            />
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-200"></div>

          {/* Country selector */}
          <div className="flex items-center gap-2 px-3 w-full md:w-64 py-1">
            <MapPin className="w-4 h-4 text-cyan-600 shrink-0" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="">Tous les pays d'Afrique</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold text-sm rounded-xl transition-colors whitespace-nowrap shadow-sm flex items-center justify-center gap-2 shrink-0"
          >
            <span>Rechercher</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Category Tabs / Pills */}
        <div className="pt-4 flex items-center justify-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-medium">Recherches rapides :</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleQuickCategory(cat.id)}
              className="px-3 py-1 bg-slate-800/80 hover:bg-slate-700 hover:text-cyan-300 text-slate-300 rounded-lg text-xs font-medium transition-colors border border-slate-700/60"
            >
              {cat.shortName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
