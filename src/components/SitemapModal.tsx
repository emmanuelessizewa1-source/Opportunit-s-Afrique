import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Search } from 'lucide-react';
import { Opportunity } from '../types';
import { Guide } from '../types';
import { COUNTRIES } from '../data/countries';
import { CATEGORIES } from '../data/categories';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: Opportunity[];
  guides: Guide[];
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  opportunities,
  guides
}) => {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<'sitemap' | 'robots'>('sitemap');

  if (!isOpen) return null;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://opportunites-afrique.com';
  const today = new Date().toISOString().split('T')[0];

  const generateSitemapXml = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    const staticPages = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/opportunites', priority: '0.9', changefreq: 'daily' },
      { path: '/guides', priority: '0.8', changefreq: 'weekly' },
      { path: '/a-propos', priority: '0.5', changefreq: 'monthly' },
      { path: '/contact', priority: '0.5', changefreq: 'monthly' },
      { path: '/faq', priority: '0.6', changefreq: 'monthly' },
      { path: '/confidentialite', priority: '0.3', changefreq: 'yearly' },
      { path: '/mentions-legales', priority: '0.3', changefreq: 'yearly' },
    ];

    staticPages.forEach((p) => {
      xml += `  <url>\n    <loc>${baseUrl}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
    });

    // Categories
    CATEGORIES.forEach((cat) => {
      xml += `  <url>\n    <loc>${baseUrl}/categorie/${cat.id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // Countries
    COUNTRIES.forEach((c) => {
      xml += `  <url>\n    <loc>${baseUrl}/pays/${c.code.toLowerCase()}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // Guides
    guides.forEach((g) => {
      xml += `  <url>\n    <loc>${baseUrl}/guide/${g.slug}</loc>\n    <lastmod>${g.publishedAt}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    // Active opportunities
    opportunities.forEach((o) => {
      xml += `  <url>\n    <loc>${baseUrl}/opportunite/${o.slug}</loc>\n    <lastmod>${o.verificationDate || today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const robotsTxt = `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${baseUrl}/sitemap.xml`;

  const currentContent = activeView === 'sitemap' ? generateSitemapXml() : robotsTxt;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const filename = activeView === 'sitemap' ? 'sitemap.xml' : 'robots.txt';
    const type = activeView === 'sitemap' ? 'application/xml' : 'text/plain';
    const blob = new Blob([currentContent], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-bold text-white">
                SEO & Fichiers d'indexation pour Google Search Console
              </h2>
              <span className="text-xs text-slate-400">
                Sitemap XML dynamique et configuration robots.txt
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('sitemap')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeView === 'sitemap' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              sitemap.xml
            </button>
            <button
              onClick={() => setActiveView('robots')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeView === 'robots' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              robots.txt
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-cyan-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copié !' : 'Copier'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 rounded-lg font-semibold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger</span>
            </button>
          </div>
        </div>

        {/* Code display */}
        <div className="overflow-y-auto p-4 bg-slate-950 font-mono text-[11px] text-cyan-300 leading-relaxed max-h-[400px]">
          <pre className="whitespace-pre-wrap">{currentContent}</pre>
        </div>

        {/* SEO Note */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 text-xs text-slate-600">
          <div className="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-cyan-600" />
            <span>Comment soumettre à Google Search Console ?</span>
          </div>
          <p className="leading-relaxed">
            1. Connectez-vous sur <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-cyan-700 underline font-medium">Google Search Console</a>.<br />
            2. Validez la propriété de votre nom de domaine.<br />
            3. Dans le menu de gauche, cliquez sur <strong>Sitemaps</strong> et saisissez <code>sitemap.xml</code>.<br />
            4. Les moteurs indexeront automatiquement chaque concours, bourse, stage et guide de candidature.
          </p>
        </div>
      </div>
    </div>
  );
};
