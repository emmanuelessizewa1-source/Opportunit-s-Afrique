import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Lock } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: 'Politique de Confidentialité' }]} onNavigate={onNavigate} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-3">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
            Données Personnelles
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Politique de Confidentialité & Protection des Candidats
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Opportunités Afrique applique le principe de minimisation stricte : nous ne collectons aucune pièce d'identité ni coordonnées bancaires de nos visiteurs.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Aucune collecte de dossiers sensibles</h2>
            <p>
              Contrairement aux plateformes frauduleuses, <strong>Opportunités Afrique ne vous demandera JAMAIS d'uploader votre passeport, carte d'identité, bulletin de salaire ou numéro de compte bancaire</strong> sur ce site. Les postulations s'effectuent exclusivement auprès des plateformes officielles des ministères ou des directions des ressources humaines légitimes indiquées dans chaque fiche.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-4">
            <h2 className="text-base font-bold text-slate-900">2. Stockage local des préférences (localStorage)</h2>
            <p>
              Vos favoris et vos paramètres de recherche sont enregistrés localement sur votre terminal (dans le <code>localStorage</code> de votre navigateur web). Aucune donnée nominative de navigation n'est transmise ou vendue à des courtiers en données (data brokers).
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-4">
            <h2 className="text-base font-bold text-slate-900">3. Cookies et Régies Publicitaires</h2>
            <p>
              Le site peut afficher des espaces publicitaires gérés par des régies tierces autorisées (telles que Google AdSense ou partenaires certifiés). Ces prestataires peuvent utiliser des témoins de connexion (cookies) standards pour diffuser des annonces adaptées à votre zone géographique. Vous pouvez à tout moment configurer votre navigateur pour bloquer les cookies publicitaires.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-4">
            <h2 className="text-base font-bold text-slate-900">4. Formulaire de contact</h2>
            <p>
              Les données renseignées lors d'une prise de contact ou d'un signalement d'arnaque (nom, email, contenu du message) sont uniquement utilisées pour vous répondre et sont conservées pendant une durée maximale de 12 mois avant purge.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
