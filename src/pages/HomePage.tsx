import React from 'react';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  Briefcase, 
  Award, 
  BookOpen, 
  FileCheck, 
  CheckCircle2, 
  TrendingUp, 
  Building 
} from 'lucide-react';
import { Opportunity, Guide } from '../types';
import { HeroSearch } from '../components/HeroSearch';
import { OpportunityCard } from '../components/OpportunityCard';
import { AdSlot } from '../components/AdSlot';
import { COUNTRIES } from '../data/countries';
import { CATEGORIES } from '../data/categories';
import { computeOpportunityStatus } from '../utils/storage';

interface HomePageProps {
  opportunities: Opportunity[];
  guides: Guide[];
  bookmarks: string[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onShareOpportunity: (opp: Opportunity, e: React.MouseEvent) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  opportunities,
  guides,
  bookmarks,
  onSelectOpportunity,
  onShareOpportunity,
  onToggleBookmark,
  onNavigate
}) => {
  // Only active or expiring soon for homepage
  const activeOpportunities = opportunities.filter((o) => {
    const { status } = computeOpportunityStatus(o.deadline);
    return status !== 'expired';
  });

  // Recent 6
  const recentOpportunities = [...activeOpportunities]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

  // Expiring soon (< 7 days)
  const expiringSoon = activeOpportunities
    .filter((o) => {
      const { status } = computeOpportunityStatus(o.deadline);
      return status === 'expiring_soon';
    })
    .slice(0, 3);

  // Civil service competitions
  const civilServiceExams = activeOpportunities
    .filter((o) => o.category === 'concours')
    .slice(0, 3);

  // Icon mapper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-cyan-600" />;
      case 'Award': return <Award className="w-5 h-5 text-amber-600" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-indigo-600" />;
      default: return <FileCheck className="w-5 h-5 text-teal-600" />;
    }
  };

  const handleHeroSearch = (query: string, country: string, category: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (country) params.set('pays', country);
    if (category) params.set('cat', category);
    onNavigate(`/opportunites?${params.toString()}`);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Search */}
      <HeroSearch onSearch={handleHeroSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Top Advertising Placement */}
        <AdSlot format="banner_top" />

        {/* 2. Priority Countries Quick Directory */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Marchés & Pays Prioritaires
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explorez les opportunités adaptées à votre législation nationale et aux agences publiques de l'emploi.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/pays')}
              className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Voir tous les pays</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {COUNTRIES.map((c) => {
              const count = opportunities.filter((o) => o.countryCode === c.code).length;
              return (
                <button
                  key={c.code}
                  onClick={() => onNavigate(`/pays/${c.code.toLowerCase()}`)}
                  className="bg-white border border-slate-200 hover:border-cyan-500 rounded-xl p-3 text-center transition-all hover:shadow-xs group flex flex-col items-center justify-center"
                >
                  <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{c.flag}</span>
                  <span className="text-xs font-bold text-slate-900 block truncate max-w-full">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    {count} offre{count > 1 ? 's' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Expiring Soon (< 7 days) Urgency Section */}
        {expiringSoon.length > 0 && (
          <section className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500 text-white rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    Dates limites proches (&lt; 7 jours)
                  </h2>
                  <p className="text-xs text-amber-900 font-medium">
                    Ne manquez pas ces opportunités dont la clôture des candidatures est imminente.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('/opportunites?echeance=proche')}
                className="hidden sm:flex text-xs font-bold text-amber-900 hover:text-amber-950 items-center gap-1"
              >
                <span>Toutes les urgences</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {expiringSoon.map((opp) => (
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
          </section>
        )}

        {/* 4. Core Categories Bento Grid */}
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Explorez par Catégorie d'Opportunité
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Filtrage thématique selon votre projet académique ou professionnel.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => {
              const count = opportunities.filter((o) => o.category === cat.id).length;
              return (
                <div
                  key={cat.id}
                  onClick={() => onNavigate(`/categorie/${cat.id}`)}
                  className="bg-white border border-slate-200 hover:border-cyan-500 rounded-xl p-5 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 bg-slate-50 rounded-lg group-hover:bg-cyan-50 transition-colors">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <span className="text-xs font-semibold text-slate-400 group-hover:text-cyan-700">
                        {count} annonce{count > 1 ? 's' : ''}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors mb-1.5">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-cyan-700">
                    <span>Accéder aux annonces</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* In-feed Editorial Ad Placement */}
        <AdSlot format="in_feed" />

        {/* 5. Recent Verified Opportunities */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sources Institutionnelles Authentifiées</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Dernières Opportunités Vérifiées
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/opportunites')}
              className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Consulter l'ensemble ({activeOpportunities.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentOpportunities.map((opp) => (
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
        </section>

        {/* 6. Civil Service Public Competitions Spotlight */}
        {civilServiceExams.length > 0 && (
          <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                  Fonction Publique & Écoles Nationales
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Concours d'État & Titularisation
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Arrêtés ministériels, avis d'ouverture d'épreuves (Douanes, Magistrature, Santé, Enseignement) au Togo, Cameroun, Côte d'Ivoire, Bénin, Sénégal.
                </p>
              </div>
              <button
                onClick={() => onNavigate('/categorie/concours')}
                className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                Voir tous les concours →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {civilServiceExams.map((opp) => (
                <div 
                  key={opp.id}
                  onClick={() => onSelectOpportunity(opp)}
                  className="bg-slate-800/90 border border-slate-700 hover:border-cyan-400 rounded-xl p-4 cursor-pointer transition-all hover:bg-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>{opp.countryName}</span>
                      <span>Limite : {opp.deadline}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm line-clamp-2 mb-2">
                      {opp.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                      {opp.summary}
                    </p>
                  </div>
                  <div className="text-[11px] text-cyan-400 font-semibold flex items-center justify-between pt-2 border-t border-slate-700/80">
                    <span>{opp.organization}</span>
                    <span>Consulter →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Practical Editorial Guides Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-cyan-700 uppercase tracking-wider block mb-1">
                Conseils & Méthodologie
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Guides Pratiques de Candidature
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Rédigés pour vous donner les clés de succès sur les spécificités du marché africain francophone.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/guides')}
              className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Tous les 7 guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {guides.slice(0, 3).map((guide) => (
              <div
                key={guide.id}
                onClick={() => onNavigate(`/guide/${guide.slug}`)}
                className="bg-white border border-slate-200 hover:border-cyan-500 rounded-xl p-5 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-cyan-700">{guide.category}</span>
                    <span>{guide.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors mb-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {guide.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-800 group-hover:text-cyan-700 flex items-center justify-between">
                  <span>Lire l'article complet</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Leaderboard Ad */}
        <AdSlot format="bottom_leaderboard" />
      </div>
    </div>
  );
};
