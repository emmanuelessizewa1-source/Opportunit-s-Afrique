import React, { useState, useEffect } from 'react';
import { Opportunity, Guide, FilterState, OpportunityCategory } from './types';
import { getStoredOpportunities, getBookmarks, toggleBookmark } from './utils/storage';
import { GUIDES } from './data/guides';
import { COUNTRIES } from './data/countries';
import { CATEGORIES } from './data/categories';
import { updatePageSeo, injectStructuredData, generateJobPostingSchema, generateGuideArticleSchema } from './utils/seo';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OpportunityDetailModal } from './components/OpportunityDetailModal';
import { ShareModal } from './components/ShareModal';
import { AdminManagerModal } from './components/AdminManagerModal';
import { SitemapModal } from './components/SitemapModal';

// Pages
import { HomePage } from './pages/HomePage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { CategoryPage } from './pages/CategoryPage';
import { CountryPage } from './pages/CountryPage';
import { CountriesIndexPage } from './pages/CountriesIndexPage';
import { GuidesPage } from './pages/GuidesPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>(getStoredOpportunities);
  const [bookmarks, setBookmarks] = useState<string[]>(getBookmarks);

  // Modal states
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [shareOpportunity, setShareOpportunity] = useState<Opportunity | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  // Listen to popstate for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to storage update events
  useEffect(() => {
    const handleStorageUpdate = () => {
      setOpportunities(getStoredOpportunities());
    };
    const handleBookmarksUpdate = () => {
      setBookmarks(getBookmarks());
    };

    window.addEventListener('opportunites_updated', handleStorageUpdate);
    window.addEventListener('bookmarks_updated', handleBookmarksUpdate);
    return () => {
      window.removeEventListener('opportunites_updated', handleStorageUpdate);
      window.removeEventListener('bookmarks_updated', handleBookmarksUpdate);
    };
  }, []);

  // Navigate function with pushState
  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPath(path);
  };

  // Sync opportunity slug URL if open
  useEffect(() => {
    if (currentPath.startsWith('/opportunite/')) {
      const slug = currentPath.replace('/opportunite/', '').split('?')[0];
      const match = opportunities.find((o) => o.slug === slug);
      if (match) {
        setSelectedOpportunity(match);
      }
    }
  }, [currentPath, opportunities]);

  // SEO synchronizer on route change
  useEffect(() => {
    if (currentPath === '/') {
      updatePageSeo({
        title: 'Opportunités Afrique — Emplois, Concours, Stages et Bourses',
        description: 'Portail d\'emplois, concours de la fonction publique, bourses d\'études et stages vérifiés au Togo, Bénin, Côte d\'Ivoire, Sénégal, Cameroun, RDC et Burkina Faso.',
        canonicalPath: '/'
      });
    } else if (currentPath.startsWith('/opportunite/')) {
      const slug = currentPath.replace('/opportunite/', '');
      const opp = opportunities.find((o) => o.slug === slug);
      if (opp) {
        updatePageSeo({
          title: `${opp.title} (${opp.organization}, ${opp.countryName})`,
          description: opp.summary,
          canonicalPath: `/opportunite/${opp.slug}`
        });
        injectStructuredData(generateJobPostingSchema(opp));
      }
    } else if (currentPath.startsWith('/guide/')) {
      const slug = currentPath.replace('/guide/', '');
      const guide = GUIDES.find((g) => g.slug === slug);
      if (guide) {
        updatePageSeo({
          title: guide.title,
          description: guide.excerpt,
          canonicalPath: `/guide/${guide.slug}`,
          ogType: 'article'
        });
        injectStructuredData(generateGuideArticleSchema(guide));
      }
    } else if (currentPath.startsWith('/categorie/')) {
      const catId = currentPath.replace('/categorie/', '') as OpportunityCategory;
      const cat = CATEGORIES.find((c) => c.id === catId);
      if (cat) {
        updatePageSeo({
          title: `${cat.name} vérifiés en Afrique Francophone`,
          description: cat.description,
          canonicalPath: `/categorie/${cat.id}`
        });
      }
    } else if (currentPath.startsWith('/pays/')) {
      const code = currentPath.replace('/pays/', '').toLowerCase();
      const country = COUNTRIES.find((c) => c.code.toLowerCase() === code);
      if (country) {
        updatePageSeo({
          title: `Emplois, Concours et Bourses au ${country.name} (${country.flag})`,
          description: `Consultez les concours administratifs, offres d'emploi privées et stages vérifiés au ${country.name}.`,
          canonicalPath: `/pays/${country.code.toLowerCase()}`
        });
      }
    } else if (currentPath === '/guides') {
      updatePageSeo({
        title: '7 Guides Pratiques de Candidature en Afrique',
        description: 'CV conforme, lettre de motivation percutante, préparation aux concours administratifs et détection des arnaques.',
        canonicalPath: '/guides'
      });
    } else if (currentPath === '/opportunites') {
      updatePageSeo({
        title: 'Toutes les Offres d\'Emploi et Concours Vérifiés',
        description: 'Recherchez et filtrez parmi les opportunités d\'emploi, concours d\'État et bourses en Afrique francophone.',
        canonicalPath: '/opportunites'
      });
    }
  }, [currentPath, opportunities]);

  const handleSelectOpportunity = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    // Optionally update URL to shareable link
    window.history.pushState({}, '', `/opportunite/${opp.slug}`);
    setCurrentPath(`/opportunite/${opp.slug}`);
  };

  const handleCloseDetailModal = () => {
    setSelectedOpportunity(null);
    if (currentPath.startsWith('/opportunite/')) {
      navigate('/opportunites');
    }
  };

  const handleShareOpportunity = (opp: Opportunity, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShareOpportunity(opp);
  };

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    toggleBookmark(id);
  };

  // Route Resolver
  const renderCurrentPage = () => {
    // 1. Home
    if (currentPath === '/') {
      return (
        <HomePage
          opportunities={opportunities}
          guides={GUIDES}
          bookmarks={bookmarks}
          onSelectOpportunity={handleSelectOpportunity}
          onShareOpportunity={handleShareOpportunity}
          onToggleBookmark={handleToggleBookmark}
          onNavigate={navigate}
        />
      );
    }

    // 2. All Opportunities (/opportunites)
    if (currentPath.startsWith('/opportunites')) {
      // Check for query params (e.g. ?pays=TG&cat=concours)
      let initialFilters: Partial<FilterState> = {};
      if (typeof window !== 'undefined' && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('q')) initialFilters.searchQuery = params.get('q') || '';
        if (params.get('pays')) initialFilters.country = params.get('pays') || '';
        if (params.get('cat')) initialFilters.category = params.get('cat') || '';
        if (params.get('echeance') === 'proche') initialFilters.deadlineFilter = 'expiring_soon';
      }

      return (
        <OpportunitiesPage
          opportunities={opportunities}
          bookmarks={bookmarks}
          initialFilters={initialFilters}
          onSelectOpportunity={handleSelectOpportunity}
          onShareOpportunity={handleShareOpportunity}
          onToggleBookmark={handleToggleBookmark}
          onNavigate={navigate}
        />
      );
    }

    // 3. Direct Opportunity View (/opportunite/:slug)
    if (currentPath.startsWith('/opportunite/')) {
      const slug = currentPath.replace('/opportunite/', '').split('?')[0];
      const opp = opportunities.find((o) => o.slug === slug);
      if (opp) {
        return (
          <OpportunitiesPage
            opportunities={opportunities}
            bookmarks={bookmarks}
            onSelectOpportunity={handleSelectOpportunity}
            onShareOpportunity={handleShareOpportunity}
            onToggleBookmark={handleToggleBookmark}
            onNavigate={navigate}
          />
        );
      }
      return <NotFoundPage onNavigate={navigate} />;
    }

    // 4. Category Page (/categorie/:id)
    if (currentPath.startsWith('/categorie/')) {
      const catId = currentPath.replace('/categorie/', '').split('?')[0] as OpportunityCategory;
      const catExists = CATEGORIES.some((c) => c.id === catId);
      if (catExists) {
        return (
          <CategoryPage
            categoryId={catId}
            opportunities={opportunities}
            bookmarks={bookmarks}
            onSelectOpportunity={handleSelectOpportunity}
            onShareOpportunity={handleShareOpportunity}
            onToggleBookmark={handleToggleBookmark}
            onNavigate={navigate}
          />
        );
      }
      return <NotFoundPage onNavigate={navigate} />;
    }

    // 5. Country Page (/pays/:code) or Index (/pays)
    if (currentPath === '/pays') {
      return (
        <CountriesIndexPage
          opportunities={opportunities}
          onNavigate={navigate}
        />
      );
    }
    if (currentPath.startsWith('/pays/')) {
      const code = currentPath.replace('/pays/', '').split('?')[0];
      const countryExists = COUNTRIES.some((c) => c.code.toLowerCase() === code.toLowerCase());
      if (countryExists) {
        return (
          <CountryPage
            countryCode={code}
            opportunities={opportunities}
            bookmarks={bookmarks}
            onSelectOpportunity={handleSelectOpportunity}
            onShareOpportunity={handleShareOpportunity}
            onToggleBookmark={handleToggleBookmark}
            onNavigate={navigate}
          />
        );
      }
      return <NotFoundPage onNavigate={navigate} />;
    }

    // 6. Guides Index (/guides) & Single Guide (/guide/:slug)
    if (currentPath === '/guides') {
      return (
        <GuidesPage
          guides={GUIDES}
          onSelectGuide={(g) => navigate(`/guide/${g.slug}`)}
          onNavigate={navigate}
        />
      );
    }
    if (currentPath.startsWith('/guide/')) {
      const slug = currentPath.replace('/guide/', '').split('?')[0];
      const guide = GUIDES.find((g) => g.slug === slug);
      if (guide) {
        return (
          <GuideDetailPage
            guide={guide}
            allGuides={GUIDES}
            onSelectGuide={(g) => navigate(`/guide/${g.slug}`)}
            onNavigate={navigate}
          />
        );
      }
      return <NotFoundPage onNavigate={navigate} />;
    }

    // 7. Bookmarks / Saved Offers (/favoris)
    if (currentPath === '/favoris') {
      return (
        <BookmarksPage
          opportunities={opportunities}
          bookmarks={bookmarks}
          onSelectOpportunity={handleSelectOpportunity}
          onShareOpportunity={handleShareOpportunity}
          onToggleBookmark={handleToggleBookmark}
          onNavigate={navigate}
        />
      );
    }

    // 8. Editorial & Legal Pages
    if (currentPath === '/a-propos') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (currentPath === '/faq') {
      return <FaqPage onNavigate={navigate} />;
    }
    if (currentPath === '/confidentialite') {
      return <PrivacyPage onNavigate={navigate} />;
    }
    if (currentPath === '/mentions-legales') {
      return <TermsPage onNavigate={navigate} />;
    }

    // Default 404
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white">
      {/* Navbar with Top Bar Contract */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        bookmarksCount={bookmarks.length}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer with Anti-Scam Notice & SEO Sitemap Link */}
      <Footer
        onNavigate={navigate}
        onOpenSitemap={() => setIsSitemapOpen(true)}
      />

      {/* Detail Modal for Opportunity */}
      {selectedOpportunity && (
        <OpportunityDetailModal
          opportunity={selectedOpportunity}
          onClose={handleCloseDetailModal}
          onShare={handleShareOpportunity}
          onToggleBookmark={(id) => handleToggleBookmark(id)}
          isBookmarked={bookmarks.includes(selectedOpportunity.id)}
          onSelectCountry={(code) => {
            handleCloseDetailModal();
            navigate(`/pays/${code.toLowerCase()}`);
          }}
          onSelectCategory={(catId) => {
            handleCloseDetailModal();
            navigate(`/categorie/${catId}`);
          }}
        />
      )}

      {/* Share Modal */}
      {shareOpportunity && (
        <ShareModal
          opportunity={shareOpportunity}
          onClose={() => setShareOpportunity(null)}
        />
      )}

      {/* Local Admin & Data Manager Modal */}
      <AdminManagerModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onDataChanged={() => setOpportunities(getStoredOpportunities())}
      />

      {/* XML Sitemap & Google Search Console Modal */}
      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
        opportunities={opportunities}
        guides={GUIDES}
      />
    </div>
  );
}
