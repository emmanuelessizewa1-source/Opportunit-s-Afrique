import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: 'Mentions Légales' }]} onNavigate={onNavigate} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-3">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
            Cadre Réglementaire
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Mentions Légales & Charte de Publication
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Informations relatives à l'éditeur du service, à la propriété intellectuelle et aux conditions générales d'utilisation.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Éditeur de la plateforme</h2>
            <p>
              Le site <strong>Opportunités Afrique</strong> est une publication numérique indépendante consacrée à l'information sur l'emploi, les concours d'État et les bourses d'études en Afrique francophone (Togo, Bénin, Côte d'Ivoire, Sénégal, Cameroun, Burkina Faso, RDC).
            </p>
            <p>
              Contact de la rédaction : <code>contact@opportunites-afrique.com</code>
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-4">
            <h2 className="text-base font-bold text-slate-900">2. Absence d'affiliation gouvernementale</h2>
            <p>
              Opportunités Afrique n'est ni un organe officiel de l'État togolais, béninois, ivoirien, sénégalais, camerounais, burkinabè ou congolais, ni une administration publique. Les avis de concours et les textes officiels sont cités dans le respect du droit à l'information du public. Les candidats sont invités à se référer aux textes législatifs et réglementaires publiés aux Journaux Officiels respectifs.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-4">
            <h2 className="text-base font-bold text-slate-900">3. Propriété intellectuelle</h2>
            <p>
              Les guides de candidature, synthèses méthodologiques, infographies et textes originaux produits par notre comité éditorial sont protégés par le droit d'auteur. Toute reproduction totale ou partielle sans mention expresse de la source « Opportunités Afrique » avec lien hypertexte actif est interdite. Les dénominations d'organismes tiers (ex: OTR, GDIZ, ENAM, INFAS, UEMOA, etc.) demeurent la propriété exclusive de leurs détenteurs respectifs.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-4">
            <h2 className="text-base font-bold text-slate-900">4. Exonération de responsabilité</h2>
            <p>
              Opportunités Afrique s'efforce de vérifier l'exactitude des dates limites et des coordonnées mentionnées. Cependant, un organisme recruteur ou un ministère peut modifier unilatéralement un calendrier ou annuler une session de concours. Opportunités Afrique ne saurait être tenue pour responsable des décisions de sélection prises par les jurys ou les recruteurs.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
