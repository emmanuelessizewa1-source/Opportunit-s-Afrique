import React from 'react';
import { COUNTRIES } from '../data/countries';
import { Opportunity } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArrowRight, MapPin, Building2, Coins } from 'lucide-react';

interface CountriesIndexPageProps {
  opportunities: Opportunity[];
  onNavigate: (path: string) => void;
}

export const CountriesIndexPage: React.FC<CountriesIndexPageProps> = ({
  opportunities,
  onNavigate
}) => {
  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: 'Répertoire par Pays' }]} onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-3">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
            Marchés Francophones Africains
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Répertoire des Pays & Agences Officielles
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Explorez les spécificités de l'emploi et des concours publics par pays. Chaque fiche recense les agences nationales pour l'emploi (ANPE, FNE, AEJ, ONEM) et les ministères de la fonction publique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COUNTRIES.map((country) => {
            const count = opportunities.filter((o) => o.countryCode === country.code).length;
            return (
              <div
                key={country.code}
                onClick={() => onNavigate(`/pays/${country.code.toLowerCase()}`)}
                className="bg-white border border-slate-200 hover:border-cyan-500 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                          {country.name}
                        </h2>
                        <span className="text-xs text-slate-500">
                          Capitale : {country.capital} · {country.currency}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 group-hover:bg-cyan-50 group-hover:text-cyan-800 px-3 py-1 rounded-full">
                      {count} offre{count > 1 ? 's' : ''}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {country.description}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <div className="font-semibold text-slate-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Agences officielles de l'emploi</span>
                    </div>
                    {country.officialJobAgencies.map((agency, i) => (
                      <div key={i} className="text-[11px] text-slate-600 truncate">
                        <strong className="text-slate-800">{agency.name}</strong> — {agency.description}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800 group-hover:text-cyan-700">
                  <span>Accéder aux opportunités au {country.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
