import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Fil d'Ariane" className="py-3 px-4 max-w-7xl mx-auto w-full">
      <ol className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
        <li>
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-1 hover:text-cyan-700 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Accueil</span>
          </button>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              {isLast || !item.path ? (
                <span className="font-semibold text-slate-900 truncate max-w-[240px]">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(item.path!)}
                  className="hover:text-cyan-700 transition-colors truncate max-w-[180px]"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
