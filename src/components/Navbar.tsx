import React, { useState } from 'react';
import { Menu, X, Shield, PlusCircle, Search, Bookmark, Globe } from 'lucide-react';
import { COUNTRIES } from '../data/countries';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  bookmarksCount: number;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  bookmarksCount,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setCountryDropdownOpen(false);
  };

  const navLinks = [
    { label: 'Toutes les offres', path: '/opportunites' },
    { label: 'Concours d\'État', path: '/categorie/concours' },
    { label: 'Bourses d\'études', path: '/categorie/bourse' },
    { label: 'Guides & Conseils', path: '/guides' },
    { label: 'FAQ', path: '/faq' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      {/* Top micro reassurance banner */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 text-xs py-1 px-4 text-center text-slate-300 flex items-center justify-center gap-2">
        <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span>Portail 100% gratuit & indépendant pour l'Afrique francophone · Ne versez aucun frais de dossier par Mobile Money</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action) */}
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single clean text element wordmark with stylized emblem */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            title="Retour à l'accueil"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              OA
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap block">
                Opportunités Afrique
              </span>
              <span className="text-[11px] text-cyan-400 font-medium tracking-wide block -mt-0.5">
                Emplois · Concours · Bourses
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 single-line clean navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-200">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`whitespace-nowrap transition-colors hover:text-cyan-400 ${
                    isActive ? 'text-cyan-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Country quick dropdown */}
            <div className="relative">
              <button
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                className="flex items-center gap-1.5 whitespace-nowrap text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Par pays</span>
              </button>

              {countryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    Marchés prioritaires
                  </div>
                  {COUNTRIES.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleNav(`/pays/${country.code.toLowerCase()}`)}
                      className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 hover:text-cyan-400 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Primary Action & Tools */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Bookmarks quick trigger */}
            <button
              onClick={() => handleNav('/favoris')}
              className="p-2 text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-slate-800 transition-colors relative"
              title="Mes opportunités enregistrées"
              aria-label="Opportunités enregistrées"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Admin / Data manager button */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shadow-sm"
              title="Gérer les données locales et ajouter une opportunité"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Gérer / Publier</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            <button
              onClick={() => handleNav('/')}
              className="w-full text-left px-3 py-2 text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 rounded-md"
            >
              Accueil
            </button>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className="w-full text-left px-3 py-2 text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 rounded-md"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('/a-propos')}
              className="w-full text-left px-3 py-2 text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 rounded-md"
            >
              À propos
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="w-full text-left px-3 py-2 text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 rounded-md"
            >
              Contact
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Explorer par pays
            </div>
            <div className="grid grid-cols-2 gap-1 px-1">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => handleNav(`/pays/${c.code.toLowerCase()}`)}
                  className="text-left px-2 py-1.5 text-xs text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded flex items-center gap-1.5"
                >
                  <span>{c.flag}</span>
                  <span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Gérer les annonces / Ajouter</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
