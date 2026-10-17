import React from 'react';
import { Guide } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdSlot } from '../components/AdSlot';
import { BookOpen, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface GuidesPageProps {
  guides: Guide[];
  onSelectGuide: (guide: Guide) => void;
  onNavigate: (path: string) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({
  guides,
  onSelectGuide,
  onNavigate
}) => {
  return (
    <div className="pb-16">
      <Breadcrumbs
        items={[{ label: 'Guides de candidature & Conseils' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full text-xs text-cyan-400 font-medium mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Rédaction experte · Marché africain francophone</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Guides Pratiques & Conseils Carrière
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Des dossiers complets, méthodologiques et pragmatiques pour vous aider à réussir vos candidatures d'emploi, concours de la fonction publique, bourses et entretiens de recrutement.
            </p>
          </div>
        </div>

        {/* Guides List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, idx) => (
            <div
              key={guide.id}
              onClick={() => onSelectGuide(guide)}
              className="bg-white border border-slate-200 hover:border-cyan-500 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md">
                    {guide.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{guide.readTime}</span>
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors mb-3 leading-snug">
                  {guide.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800 group-hover:text-cyan-700">
                <span>Lire le guide complet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <AdSlot format="bottom_leaderboard" />
      </div>
    </div>
  );
};
