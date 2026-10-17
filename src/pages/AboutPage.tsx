import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Shield, CheckCircle, Target, Users, AlertTriangle } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: 'À propos' }]} onNavigate={onNavigate} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-3">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
            Notre Mission
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            À Propos de « Opportunités Afrique »
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Un portail indépendant, transparent et gratuit pour démocratiser l'accès aux opportunités professionnelles, concours publics et bourses d'études en Afrique francophone.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-600" />
              <span>Pourquoi cette plateforme ?</span>
            </h2>
            <p>
              En Afrique francophone (notamment au Togo, au Bénin, en Côte d'Ivoire, au Sénégal, au Cameroun, au Burkina Faso et en RDC), la recherche d'emploi et de concours officiels est trop souvent entravée par la désinformation, les rumeurs non fondées sur les réseaux sociaux et la prolifération de fausses annonces extorquant des frais de dossier aux jeunes diplômés.
            </p>
            <p>
              <strong>Opportunités Afrique</strong> a été créée pour rétablir la confiance en appliquant une règle de vérification stricte : chaque annonce publiée doit être traçable jusqu'à son arrêté ministériel, son communiqué officiel ou le portail carrières certifié de l'organisme recruteur.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span>Nos engagements déontologiques</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>100% Gratuit pour les candidats</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Aucun paiement, abonnement ou frais d'inscription n'est exigé des candidats pour consulter les offres et guides.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Zéro fabrication d'avis</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Nous ne créons jamais de fausses dates limites ni de salaires fictifs. Les démos techniques sont toujours étiquetées comme exemples.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Transparence des sources</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Chaque publication mentionne l'institution d'origine et redirige vers le lien officiel de l'organisme.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Protection contre les escroqueries</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Nous rappelons systématiquement qu'aucun recruteur officiel ne réclame de versement par Mobile Money.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-600" />
              <span>Qui sommes-nous ?</span>
            </h2>
            <p>
              Notre équipe rassemble des spécialistes du recrutement en Afrique de l'Ouest et du Centre, des juristes familiers des concours de la fonction publique et des développeurs passionnés par l'inclusion socio-économique des jeunes sur le continent.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
