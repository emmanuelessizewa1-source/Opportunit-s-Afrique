import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Share2, 
  Bookmark, 
  AlertTriangle, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Coins, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Opportunity } from '../types';
import { computeOpportunityStatus } from '../utils/storage';
import { COUNTRIES } from '../data/countries';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  onShare: (opportunity: Opportunity) => void;
  onToggleBookmark: (id: string) => void;
  isBookmarked: boolean;
  onSelectCountry?: (countryCode: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
  onShare,
  onToggleBookmark,
  isBookmarked,
  onSelectCountry,
  onSelectCategory
}) => {
  const [showRedirectWarning, setShowRedirectWarning] = useState(false);

  if (!opportunity) return null;

  const { status, daysRemaining, statusLabel, isOverdueVerification } = computeOpportunityStatus(
    opportunity.deadline,
    opportunity.verificationDate
  );

  const countryInfo = COUNTRIES.find((c) => c.code === opportunity.countryCode);

  const handleExternalApply = () => {
    // Direct or warned external navigation to official link
    window.open(opportunity.officialUrl, '_blank', 'noopener,noreferrer');
    setShowRedirectWarning(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 text-slate-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-opp-title"
      >
        {/* Top bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="font-semibold text-cyan-400 uppercase tracking-wider">
              {opportunity.category}
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="flex items-center gap-1 text-white">
              <span>{countryInfo?.flag}</span>
              <span>{opportunity.countryName}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(opportunity.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
              title="Enregistrer"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onShare(opportunity)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
              title="Partager l'offre"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* MANDATORY PROMPT COMPLIANCE: DEMO SAMPLE WARNING BANNER */}
          {opportunity.isSample && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 text-amber-900">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold tracking-tight">
                    EXEMPLE — À VÉRIFIER, NON PUBLIÉ
                  </h4>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                    Cette opportunité est un exemple de démonstration technique et pédagogique pour illustrer le fonctionnement de la plateforme. Ne la considérez pas comme un recrutement ouvert actuellement. Les liens et coordonnées ci-dessous sont des repères démonstratifs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Verification warning if overdue */}
          {isOverdueVerification && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-rose-900 flex items-center gap-2.5 text-xs">
              <Clock className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                <strong>Avertissement :</strong> La date de dernière vérification de cette annonce ({opportunity.verificationDate}) remonte à plus de 45 jours. Veuillez vérifier son statut sur le portail officiel de l'organisme.
              </span>
            </div>
          )}

          {/* Expired warning */}
          {status === 'expired' && (
            <div className="bg-slate-100 border border-slate-300 rounded-xl p-3.5 text-slate-800 flex items-center gap-3 text-xs">
              <Clock className="w-5 h-5 text-slate-500 shrink-0" />
              <div>
                <strong className="font-semibold text-slate-900">Annonce archivée / Échéance dépassée :</strong> La date limite de candidature était le {opportunity.deadline}. Les dépôts ne sont plus acceptés par l'organisme.
              </div>
            </div>
          )}

          {/* Main Title & Organization */}
          <div>
            <h2 id="modal-opp-title" className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {opportunity.title}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-700 font-medium">
              <Building2 className="w-4 h-4 text-cyan-600 shrink-0" />
              <span>{opportunity.organization}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1 text-slate-500 font-normal">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {opportunity.city}, {opportunity.countryName}
              </span>
            </div>
          </div>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
            <div>
              <div className="text-slate-400 font-medium mb-1">Type de contrat</div>
              <div className="font-semibold text-slate-900">{opportunity.contractType}</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium mb-1">Niveau d'études</div>
              <div className="font-semibold text-slate-900">{opportunity.educationLevel}</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium mb-1">Expérience</div>
              <div className="font-semibold text-slate-900">{opportunity.experienceRequired}</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium mb-1">Date limite de dépôt</div>
              <div className={`font-semibold ${status === 'expired' ? 'text-rose-600' : 'text-slate-900'}`}>
                {opportunity.deadline}
              </div>
            </div>
            <div>
              <div className="text-slate-400 font-medium mb-1">Dernière vérification</div>
              <div className="font-semibold text-slate-900">{opportunity.verificationDate}</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium mb-1">Rémunération / Bourse</div>
              <div className="font-semibold text-slate-900 truncate">
                {opportunity.salaryOrGrantRange || 'Non spécifié / Grille officielle'}
              </div>
            </div>
          </div>

          {/* Anti-Scam Security Notice */}
          <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-4 text-xs text-cyan-950 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-cyan-900 mb-0.5">
                Rappel de Sécurité Anti-Arnaque
              </div>
              <p className="leading-relaxed text-cyan-900">
                Ne versez <strong>JAMAIS</strong> de frais par Mobile Money (T-Money, Wave, Flooz, Orange Money, MTN...) pour un concours, une bourse ou un recrutement. Les dépôts officiels s'effectuent sans intermédiaires informels.
              </p>
            </div>
          </div>

          {/* Description / Summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Présentation du poste / de l'opportunité
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {opportunity.description}
            </p>
          </div>

          {/* Requirements */}
          {opportunity.requirements && opportunity.requirements.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Conditions d'éligibilité & Profil recherché
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {opportunity.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-2 shrink-0"></span>
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Documents */}
          {opportunity.documentsRequired && opportunity.documentsRequired.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Composition du dossier de candidature
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {opportunity.documentsRequired.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submission Procedure & Source */}
          <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Procédure de dépôt & Source officielle
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {opportunity.submissionProcedure}
            </p>
            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-600">
              <div>
                Source certifiée : <strong>{opportunity.officialSource}</strong>
              </div>
              <div className="text-[11px] text-slate-400">
                Vérifié le {opportunity.verificationDate}
              </div>
            </div>
          </div>
        </div>

        {/* Modal footer with official action */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            {status === 'expired' ? (
              <span className="text-rose-600 font-semibold">Candidatures closes</span>
            ) : (
              <span>Date limite : <strong>{opportunity.deadline}</strong> ({statusLabel})</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={handleExternalApply}
              className="w-1/2 sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
            >
              <span>Consulter la source officielle</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
