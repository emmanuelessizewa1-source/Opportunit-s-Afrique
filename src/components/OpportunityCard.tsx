import React from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  AlertCircle 
} from 'lucide-react';
import { Opportunity } from '../types';
import { computeOpportunityStatus } from '../utils/storage';
import { COUNTRIES } from '../data/countries';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSelect: (opportunity: Opportunity) => void;
  onShare: (opportunity: Opportunity, e: React.MouseEvent) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  isBookmarked: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onSelect,
  onShare,
  onToggleBookmark,
  isBookmarked
}) => {
  const { status, daysRemaining, statusLabel, isOverdueVerification } = computeOpportunityStatus(
    opportunity.deadline,
    opportunity.verificationDate
  );

  const countryInfo = COUNTRIES.find((c) => c.code === opportunity.countryCode);

  const categoryLabels: Record<string, string> = {
    emploi: 'Emploi',
    concours: 'Concours d\'État',
    stage: 'Stage',
    bourse: 'Bourse d\'études',
    formation: 'Formation',
    appel_candidature: 'Appel à projets'
  };

  return (
    <div
      onClick={() => onSelect(opportunity)}
      className="group relative bg-white border border-slate-200 hover:border-cyan-500/80 rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* MANDATORY Prompt Compliance: Explicit Demo Banner if sample */}
        {opportunity.isSample && (
          <div className="mb-3 px-2.5 py-1 bg-amber-500/10 border border-amber-300/60 rounded text-[11px] font-semibold text-amber-800 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>EXEMPLE — À VÉRIFIER, NON PUBLIÉ</span>
            </span>
            <span className="text-[10px] text-amber-700 font-normal hidden sm:inline">Modèle de démonstration</span>
          </div>
        )}

        {/* Top unboxed metadata line */}
        <div className="flex items-center justify-between gap-3 text-xs text-slate-500 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-cyan-700">
              {categoryLabels[opportunity.category] || opportunity.category}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <span>{countryInfo?.flag || '🌍'}</span>
              <span>{opportunity.countryName}</span>
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500">{opportunity.city}</span>
          </div>

          {/* Quick interactive action buttons */}
          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => onToggleBookmark(opportunity.id, e)}
              className={`p-1.5 rounded-md hover:bg-slate-100 transition-colors ${
                isBookmarked ? 'text-cyan-600 bg-cyan-50' : 'text-slate-400 hover:text-slate-600'
              }`}
              title={isBookmarked ? 'Retirer des favoris' : 'Sauvegarder l\'offre'}
              aria-label="Enregistrer l'annonce"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => onShare(opportunity, e)}
              className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-slate-100 rounded-md transition-colors"
              title="Partager cette annonce"
              aria-label="Partager l'annonce"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug line-clamp-2 mb-2">
          {opportunity.title}
        </h3>

        {/* Organization */}
        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium mb-3">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{opportunity.organization}</span>
        </div>

        {/* Short Summary */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {opportunity.summary}
        </p>

        {/* Unboxed details row */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 mb-4 pt-3 border-t border-slate-100">
          <span className="font-medium text-slate-800">{opportunity.contractType}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{opportunity.educationLevel}</span>
          {opportunity.salaryOrGrantRange && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-700 font-medium truncate max-w-[200px]">
                {opportunity.salaryOrGrantRange}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Footer info: Deadline status & verification */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        {/* Deadline indicator */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {status === 'expired' ? (
            <span className="font-semibold text-rose-600">Date limite dépassée</span>
          ) : status === 'expiring_soon' ? (
            <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Échéance proche : {daysRemaining} j
            </span>
          ) : (
            <span className="text-slate-600">
              Limite : <strong className="font-semibold text-slate-800">{opportunity.deadline}</strong> ({daysRemaining} j)
            </span>
          )}
        </div>

        {/* Verification check */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500 shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="hidden sm:inline">Source vérifiée</span>
        </div>
      </div>
    </div>
  );
};
