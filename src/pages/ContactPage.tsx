import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Mail, Send, CheckCircle2, ShieldAlert, Building2, HelpCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subjectType, setSubjectType] = useState('propose_offer');
  const [country, setCountry] = useState('Togo');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Simulation of clean validated submission
    setSubmitted(true);
  };

  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: 'Contact & Soumission' }]} onNavigate={onNavigate} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-3">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
            Échange Direct
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Contactez notre Équipe Éditoriale
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Vous souhaitez proposer un recrutement officiel, signaler une offre suspecte ou poser une question à nos conseillers carrières ? Écrivez-nous.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Votre message a bien été transmis !
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Merci de votre confiance. Notre cellule de vérification examinera votre demande dans un délai de 24 à 48 heures ouvrées.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-4 py-2 bg-slate-900 text-cyan-400 text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Objet de votre message *
                  </label>
                  <select
                    value={subjectType}
                    onChange={(e) => setSubjectType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-cyan-500 font-medium cursor-pointer"
                  >
                    <option value="propose_offer">Proposer la publication d'une offre officielle</option>
                    <option value="report_scam">Signaler une annonce suspecte ou tentative d'arnaque</option>
                    <option value="feedback">Question générale ou suggestion d'amélioration</option>
                    <option value="partnership">Partenariat institutionnel ou sponsoring</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Votre nom ou nom de l'organisme *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Direction RH Entreprise / Jean Dupont"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Adresse email professionnelle *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@entreprise.com ou nom@domaine.org"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Pays concerné
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Togo">Togo 🇹🇬</option>
                    <option value="Bénin">Bénin 🇧🇯</option>
                    <option value="Côte d'Ivoire">Côte d'Ivoire 🇨🇮</option>
                    <option value="Sénégal">Sénégal 🇸🇳</option>
                    <option value="Cameroun">Cameroun 🇨🇲</option>
                    <option value="Burkina Faso">Burkina Faso 🇧🇫</option>
                    <option value="RDC">RDC (Congo) 🇨🇩</option>
                    <option value="Régional">Panafrique / Régional 🌍</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Votre message ou détails de l'opportunité *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Précisez votre demande, le lien de l'arrêté ministériel ou du communiqué officiel..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-cyan-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmettre ma demande</span>
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4 text-xs text-slate-700">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-600" />
                <span>Pour les Recruteurs</span>
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs">
                Vous représentez une entreprise, une agence d'emploi, un ministère ou une ONG ? La publication de vos avis de recrutement authentifiés est gratuite après validation manuelle par nos équipes.
              </p>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-3">
              <h3 className="font-bold text-rose-900 text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Cellule Anti-Fraude</span>
              </h3>
              <p className="text-rose-900 leading-relaxed text-xs">
                Si vous avez repéré un individu ou une page réclamant de l'argent par Mobile Money au nom d'un organisme réputé, transmettez-nous les captures d'écran et numéros de téléphone concernés pour mise en garde publique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
