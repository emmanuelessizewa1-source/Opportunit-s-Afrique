import React from 'react';
import { ShieldCheck, Mail, AlertTriangle, FileText, ExternalLink } from 'lucide-react';
import { COUNTRIES } from '../data/countries';
import { CATEGORIES } from '../data/categories';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenSitemap: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSitemap }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm mt-auto">
      {/* High-priority anti-scam callout banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-base">
                Alerte Déontologie & Sécurité des Candidats
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed max-w-3xl">
                Opportunités Afrique rappelle avec fermeté qu'aucun recruteur officiel, entreprise sérieuse ou ministère d'État ne réclame de paiement ou de transfert Mobile Money (T-Money, Wave, Flooz, Orange Money, MTN...) pour déposer un dossier ou passer un entretien. Signalez immédiatement tout comportement suspect.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('/guide/comment-eviter-les-fausses-offres-d-emploi')}
            className="whitespace-nowrap px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold rounded-lg transition-colors border border-slate-700 shrink-0"
          >
            Lire le guide anti-arnaques →
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                OA
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Opportunités Afrique
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Plateforme indépendante de diffusion d'opportunités d'emploi, de concours de la fonction publique, de bourses d'études et de stages en Afrique francophone. Notre vocation est d'assurer la transparence et la vérifiabilité des avis officiels.
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Contenu vérifié auprès des sources institutionnelles</span>
            </div>
          </div>

          {/* Col 2: Catégories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Catégories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(`/categorie/${cat.id}`)}
                    className="hover:text-cyan-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Pays prioritaires */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Marchés prioritaires
            </h4>
            <ul className="space-y-2 text-xs">
              {COUNTRIES.slice(0, 7).map((c) => (
                <li key={c.code}>
                  <button
                    onClick={() => onNavigate(`/pays/${c.code.toLowerCase()}`)}
                    className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Informations & Guides */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Ressources & Légal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/guides')} className="hover:text-cyan-400 transition-colors">
                  Guides de candidature
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/a-propos')} className="hover:text-cyan-400 transition-colors">
                  À propos de la plateforme
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-cyan-400 transition-colors">
                  Contact & Proposer une offre
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/faq')} className="hover:text-cyan-400 transition-colors">
                  Foire Aux Questions (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/confidentialite')} className="hover:text-cyan-400 transition-colors">
                  Politique de confidentialité
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/mentions-legales')} className="hover:text-cyan-400 transition-colors">
                  Mentions légales
                </button>
              </li>
              <li>
                <button onClick={onOpenSitemap} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-cyan-400 font-medium">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Sitemap XML & SEO</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Opportunités Afrique. Tous droits réservés.
          </div>
          <div className="text-center sm:text-right text-[11px] text-slate-400">
            Plateforme non affiliée aux gouvernements cités · Les marques et logos appartiennent à leurs institutions respectives.
          </div>
        </div>
      </div>
    </footer>
  );
};
