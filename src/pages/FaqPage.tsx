import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQ_ITEMS } from '../data/faq';
import { ChevronDown, ChevronUp, HelpCircle, ShieldAlert } from 'lucide-react';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-01', 'faq-03']);

  const toggleItem = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: 'Foire Aux Questions' }]} onNavigate={onNavigate} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-3">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
            Questions Fréquentes
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Foire Aux Questions (FAQ)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Retrouvez les réponses claires sur le fonctionnement de la plateforme, la vérification des concours d'État et nos mesures de sécurité pour protéger les candidats.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {item.question}
                  </span>
                  <span className="p-1 text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra contact box */}
        <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-6 text-center space-y-3">
          <h3 className="font-bold text-cyan-950 text-base">
            Vous avez une question spécifique non mentionnée ?
          </h3>
          <p className="text-xs text-cyan-900 max-w-md mx-auto leading-relaxed">
            Notre équipe éditoriale répond gratuitement aux candidats et aux recruteurs.
          </p>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-bold rounded-lg transition-colors inline-block"
          >
            Poser une question via le formulaire →
          </button>
        </div>
      </div>
    </div>
  );
};
