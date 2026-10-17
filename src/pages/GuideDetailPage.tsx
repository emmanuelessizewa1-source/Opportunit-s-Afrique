import React, { useState } from 'react';
import { Guide } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdSlot } from '../components/AdSlot';
import { 
  Clock, 
  User, 
  Calendar, 
  Share2, 
  CheckSquare, 
  AlertTriangle, 
  Lightbulb, 
  ArrowLeft, 
  Check, 
  Copy,
  MessageCircle
} from 'lucide-react';

interface GuideDetailPageProps {
  guide: Guide;
  allGuides: Guide[];
  onSelectGuide: (g: Guide) => void;
  onNavigate: (path: string) => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({
  guide,
  allGuides,
  onSelectGuide,
  onNavigate
}) => {
  const [copied, setCopied] = useState(false);

  const relatedGuides = allGuides.filter((g) => g.id !== guide.id).slice(0, 2);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const shareText = `${guide.title} — Guide pratique sur Opportunités Afrique : ${window.location.href}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="pb-16">
      <Breadcrumbs
        items={[
          { label: 'Guides de candidature', path: '/guides' },
          { label: guide.title }
        ]}
        onNavigate={onNavigate}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back link */}
        <button
          onClick={() => onNavigate('/guides')}
          className="text-xs font-semibold text-slate-500 hover:text-cyan-700 inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour à tous les guides</span>
        </button>

        {/* Article Header */}
        <header className="space-y-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md">
              {guide.category}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{guide.readTime}</span>
            </span>
            <span>·</span>
            <span>Publié le {guide.publishedAt}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {guide.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-cyan-400 font-bold flex items-center justify-center text-xs">
                OA
              </div>
              <div>
                <span className="font-semibold text-slate-800 block">{guide.author.name}</span>
                <span className="text-[11px] text-slate-400">{guide.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Partager sur WhatsApp</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-cyan-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Lien copié' : 'Copier'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Top Content Ad */}
        <AdSlot format="banner_top" />

        {/* Guide Sections */}
        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          {guide.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-2">
                {section.heading}
              </h2>

              <div className="space-y-3">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Callout box if present */}
              {section.callout && (
                <div
                  className={`rounded-2xl p-5 my-5 border ${
                    section.callout.type === 'checklist'
                      ? 'bg-slate-50 border-slate-300'
                      : section.callout.type === 'warning'
                      ? 'bg-amber-50 border-amber-300 text-amber-950'
                      : 'bg-cyan-50/60 border-cyan-200 text-cyan-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-3 text-slate-900">
                    {section.callout.type === 'checklist' && <CheckSquare className="w-4 h-4 text-cyan-700" />}
                    {section.callout.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-700" />}
                    {section.callout.type === 'tip' && <Lightbulb className="w-4 h-4 text-cyan-700" />}
                    <span>{section.callout.title}</span>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm">
                    {section.callout.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Bottom Ad */}
        <AdSlot format="in_feed" />

        {/* Related Guides */}
        <div className="border-t border-slate-200 pt-8 space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Poursuivre votre lecture
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedGuides.map((rg) => (
              <div
                key={rg.id}
                onClick={() => onSelectGuide(rg)}
                className="bg-slate-50 border border-slate-200 hover:border-cyan-500 rounded-xl p-4 cursor-pointer transition-all hover:bg-white group"
              >
                <div className="text-[11px] text-cyan-700 font-semibold mb-1">
                  {rg.category} · {rg.readTime}
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2">
                  {rg.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
