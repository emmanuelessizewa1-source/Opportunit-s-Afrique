import React from 'react';
import { Home, Search, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 py-20">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-slate-200 rounded-2xl p-8 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-cyan-50 text-cyan-600 font-extrabold text-2xl flex items-center justify-center mx-auto">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-slate-900">
            Page introuvable
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            L'opportunité ou l'article que vous recherchez a peut-être expiré, a été déplacé ou n'existe plus dans notre base.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </button>

          <button
            onClick={() => onNavigate('/opportunites')}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Rechercher une offre</span>
          </button>
        </div>
      </div>
    </div>
  );
};
