import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Database, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  Info, 
  Server, 
  Globe, 
  Trash2,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Opportunity, OpportunityCategory, EducationLevel, ContractType } from '../types';
import { 
  getStoredOpportunities, 
  addOpportunity, 
  updateOpportunity, 
  resetToDefaults, 
  exportDatabaseJSON, 
  importDatabaseJSON 
} from '../utils/storage';
import { COUNTRIES } from '../data/countries';
import { CATEGORIES } from '../data/categories';

interface AdminManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const AdminManagerModal: React.FC<AdminManagerModalProps> = ({
  isOpen,
  onClose,
  onDataChanged
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'backup' | 'cms_guide'>('create');
  const [opportunities, setOpportunities] = useState<Opportunity[]>(getStoredOpportunities());
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New opportunity form state
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newCountry, setNewCountry] = useState<'TG' | 'BJ' | 'CI' | 'SN' | 'CM' | 'BF' | 'CD' | 'PAN'>('TG');
  const [newCity, setNewCity] = useState('Lomé');
  const [newCategory, setNewCategory] = useState<OpportunityCategory>('emploi');
  const [newContract, setNewContract] = useState<ContractType>('CDI');
  const [newEducation, setNewEducation] = useState<EducationLevel>('Licence (Bac+3)');
  const [newExperience, setNewExperience] = useState('1 à 2 ans');
  const [newDeadline, setNewDeadline] = useState('2026-11-30');
  const [newOfficialSource, setNewOfficialSource] = useState('');
  const [newOfficialUrl, setNewOfficialUrl] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newRequirements, setNewRequirements] = useState('');
  const [newDocuments, setNewDocuments] = useState('');
  const [newProcedure, setNewProcedure] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [isSampleListing, setIsSampleListing] = useState(true);

  if (!isOpen) return null;

  const refreshList = () => {
    setOpportunities(getStoredOpportunities());
    onDataChanged();
  };

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newOrg.trim() || !newOfficialSource.trim()) {
      showFeedback('error', 'Veuillez remplir au moins le titre, l\'organisme et la source officielle.');
      return;
    }

    const countryObj = COUNTRIES.find((c) => c.code === newCountry);
    const slug = newTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`;

    addOpportunity({
      slug,
      title: newTitle.trim(),
      organization: newOrg.trim(),
      countryCode: newCountry,
      countryName: countryObj ? countryObj.name : 'Afrique',
      city: newCity.trim(),
      category: newCategory,
      contractType: newContract,
      educationLevel: newEducation,
      experienceRequired: newExperience.trim(),
      deadline: newDeadline,
      verificationDate: new Date().toISOString().split('T')[0],
      isVerified: true,
      isSample: isSampleListing,
      officialSource: newOfficialSource.trim(),
      officialUrl: newOfficialUrl.trim() || 'https://opportunites-afrique.com',
      summary: newSummary.trim() || newTitle.trim(),
      description: newDescription.trim() || newTitle.trim(),
      requirements: newRequirements
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      documentsRequired: newDocuments
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      submissionProcedure: newProcedure.trim() || 'Consulter le portail officiel de l\'organisme.',
      salaryOrGrantRange: newSalary.trim(),
      tags: [newCategory, countryObj?.name || 'Afrique']
    });

    // Reset form
    setNewTitle('');
    setNewOrg('');
    setNewOfficialSource('');
    setNewOfficialUrl('');
    setNewSummary('');
    setNewDescription('');
    setNewRequirements('');
    setNewDocuments('');
    setNewProcedure('');
    setNewSalary('');

    refreshList();
    showFeedback('success', 'Nouvelle opportunité enregistrée avec succès dans le stockage local !');
    setActiveTab('list');
  };

  const handleMarkVerifiedToday = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    updateOpportunity(id, { verificationDate: today, isVerified: true });
    refreshList();
    showFeedback('success', `Opportunité mise à jour : vérification certifiée au ${today}.`);
  };

  const handleUpdateDeadline = (id: string, current: string) => {
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    const newDateStr = nextMonth.toISOString().split('T')[0];
    updateOpportunity(id, { deadline: newDateStr });
    refreshList();
    showFeedback('success', `Date limite prolongée au ${newDateStr}.`);
  };

  const handleExport = () => {
    const data = exportDatabaseJSON();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `opportunites_afrique_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showFeedback('success', 'Base de données exportée en fichier JSON.');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      const res = importDatabaseJSON(content);
      if (res.success) {
        refreshList();
        showFeedback('success', `${res.count} opportunités importées avec succès.`);
      } else {
        showFeedback('error', res.error || 'Erreur lors de l\'importation.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Voulez-vous réinitialiser toutes les annonces aux données par défaut du site ?')) {
      resetToDefaults();
      refreshList();
      showFeedback('success', 'Base locale réinitialisée aux annonces de démonstration initiales.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 text-slate-800">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-bold text-white">
                Gestionnaire des Opportunités (Contributeur)
              </h2>
              <span className="text-xs text-slate-400">
                Stockage local transparent · Import / Export · Guide de déploiement
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveTab('create')}
            className={`py-3 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'create'
                ? 'border-cyan-600 text-cyan-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            + Ajouter une opportunité
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`py-3 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'list'
                ? 'border-cyan-600 text-cyan-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Gérer la liste ({opportunities.length})
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`py-3 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'backup'
                ? 'border-cyan-600 text-cyan-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Sauvegarde & JSON
          </button>
          <button
            onClick={() => setActiveTab('cms_guide')}
            className={`py-3 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'cms_guide'
                ? 'border-cyan-600 text-cyan-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Architecture CMS & Domaine
          </button>
        </div>

        {/* Feedback message banner */}
        {message && (
          <div
            className={`px-6 py-2.5 text-xs font-medium flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-b border-rose-200'
            }`}
          >
            {message.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Tab Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* TAB 1: CREATE OPPORTUNITY */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3 text-cyan-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Conformément à la déontologie du site, indiquez toujours la source officielle (nom de l'institution et lien web authentifié). Si l'annonce est un test, laissez la case « Exemple de démonstration » cochée.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Intitulé de l'opportunité *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex: Concours Direct d'Entrée à l'École Nationale..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Organisme / Entreprise / Ministère *
                  </label>
                  <input
                    type="text"
                    required
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    placeholder="Ex: Ministère de l'Éducation Nationale"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pays</label>
                  <select
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ville</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Catégorie</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type de contrat</label>
                  <select
                    value={newContract}
                    onChange={(e) => setNewContract(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  >
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Fonction publique / Titularisation">Fonction publique</option>
                    <option value="Stage professionnel rémunéré">Stage rémunéré</option>
                    <option value="Stage académique">Stage académique</option>
                    <option value="Bourse complète (Exemption + Allocation)">Bourse complète</option>
                    <option value="Bourse partielle">Bourse partielle</option>
                    <option value="Formation diplômante">Formation diplômante</option>
                    <option value="Consultance / Prestation">Consultance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Niveau d'études</label>
                  <select
                    value={newEducation}
                    onChange={(e) => setNewEducation(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  >
                    <option value="Tous niveaux">Tous niveaux</option>
                    <option value="Sans diplôme requis">Sans diplôme requis</option>
                    <option value="BEPC / CAP">BEPC / CAP</option>
                    <option value="Bac">Bac</option>
                    <option value="Bac+2 (BTS, DUT)">Bac+2 (BTS, DUT)</option>
                    <option value="Licence (Bac+3)">Licence (Bac+3)</option>
                    <option value="Master / Ingénieur (Bac+5)">Master / Ingénieur (Bac+5)</option>
                    <option value="Doctorat / Ph.D">Doctorat / Ph.D</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date limite de dépôt *</label>
                  <input
                    type="date"
                    required
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Rémunération / Bourse</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    placeholder="Ex: Grille officielle ou 300 000 FCFA"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Source officielle *</label>
                  <input
                    type="text"
                    required
                    value={newOfficialSource}
                    onChange={(e) => setNewOfficialSource(e.target.value)}
                    placeholder="Ex: Journal Officiel n°14 / Arrêté n°2026-..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL de la source officielle</label>
                  <input
                    type="url"
                    value={newOfficialUrl}
                    onChange={(e) => setNewOfficialUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Résumé synthétique (1-2 phrases)</label>
                <textarea
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Bref résumé visible sur la carte d'aperçu..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Conditions & Profil (1 critère par ligne)</label>
                <textarea
                  rows={3}
                  value={newRequirements}
                  onChange={(e) => setNewRequirements(e.target.value)}
                  placeholder="Être âgé de 18 à 30 ans&#10;Être titulaire d'une Licence en Économie&#10;Casier judiciaire vierge"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="sampleCheck"
                  checked={isSampleListing}
                  onChange={(e) => setIsSampleListing(e.target.checked)}
                  className="w-4 h-4 text-cyan-600 rounded"
                />
                <label htmlFor="sampleCheck" className="text-slate-700 font-medium">
                  Marquer comme « EXEMPLE DE DÉMONSTRATION » (recommandé si l'offre n'est pas encore authentifiée)
                </label>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Enregistrer l'opportunité</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: LIST & EDIT */}
          {activeTab === 'list' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 flex items-center justify-between pb-2 border-b border-slate-200">
                <span>Total stocké : <strong>{opportunities.length} opportunités</strong></span>
                <span>Actions rapides pour modérateurs</span>
              </div>

              <div className="space-y-2">
                {opportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 truncate">
                        {opp.title}
                      </div>
                      <div className="text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{opp.countryName}</span>
                        <span>·</span>
                        <span>{opp.organization}</span>
                        <span>·</span>
                        <span>Limite : <strong>{opp.deadline}</strong></span>
                        {opp.isSample && (
                          <span className="text-amber-700 font-medium bg-amber-100/60 px-1.5 rounded">
                            Démo
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleMarkVerifiedToday(opp.id)}
                        className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md font-medium text-[11px] flex items-center gap-1 transition-colors"
                        title="Certifier que la source a été vérifiée aujourd'hui"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Vérifié auj.</span>
                      </button>

                      <button
                        onClick={() => handleUpdateDeadline(opp.id, opp.deadline)}
                        className="px-2.5 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 rounded-md font-medium text-[11px] flex items-center gap-1 transition-colors"
                        title="Repousser la date limite de 30 jours"
                      >
                        <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                        <span>+30 jours</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BACKUP & JSON */}
          {activeTab === 'backup' && (
            <div className="space-y-6 text-xs text-slate-700">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Download className="w-4 h-4 text-cyan-600" />
                  <span>Exporter la base de données (Backup JSON)</span>
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Téléchargez l'intégralité des annonces sous forme d'un fichier JSON structuré. Vous pourrez le restaurer à tout moment ou le transférer vers votre futur CMS / serveur.
                </p>
                <button
                  onClick={handleExport}
                  className="mt-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger le fichier .json</span>
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Upload className="w-4 h-4 text-cyan-600" />
                  <span>Importer un fichier de sauvegarde JSON</span>
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Sélectionnez un fichier JSON préalablement exporté pour recharger ou mettre à jour la collection d'annonces locales.
                </p>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImport}
                  className="mt-2 block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer"
                />
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-rose-900 text-sm flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>Réinitialiser les données aux valeurs d'usine</span>
                </h3>
                <p className="text-rose-700 leading-relaxed">
                  Restaure les 13 annonces d'exemples initiales (Togo, Bénin, Côte d'Ivoire, Sénégal, Cameroun, Burkina Faso, RDC) et efface les modifications locales.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Réinitialiser la base</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: ARCHITECTURE CMS & DOMAINE */}
          {activeTab === 'cms_guide' && (
            <div className="space-y-5 text-xs text-slate-700 leading-relaxed">
              <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-cyan-400">
                  <Server className="w-4 h-4" />
                  <span>Architecture & Limites du Mode Client</span>
                </div>
                <p className="text-slate-300">
                  Actuellement, pour garantir une vitesse maximale sans frais d'infrastructure ni identifiants obligatoires, les ajouts sont stockés dans le <code>localStorage</code> de votre navigateur.
                </p>
                <p className="text-slate-300">
                  Pour une production à l'échelle avec plusieurs administrateurs répartis en Afrique, vous pouvez brancher une API REST ou un CMS headless (ex: Directus, Strapi, ou Firebase Firestore). Le fichier <code className="text-cyan-300">src/utils/storage.ts</code> a été conçu pour être remplacé en quelques lignes par des appels <code>fetch('/api/opportunities')</code>.
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-600" />
                  <span>Comment connecter un domaine personnalisé (ex: opportunites-afrique.com) ?</span>
                </h3>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Achat du domaine :</strong> Enregistrez votre nom de domaine chez un registrar fiable (Namecheap, OVH, Cloudflare, etc.).
                  </li>
                  <li>
                    <strong>Hébergement Cloud :</strong> Sur Cloud Run, Vercel ou Netlify, ajoutez votre domaine personnalisé dans l'onglet « Domains / Domaines personnalisés ».
                  </li>
                  <li>
                    <strong>Configuration DNS :</strong> Chez votre registrar, ajoutez les enregistrements :
                    <ul className="list-disc pl-4 mt-1 font-mono text-[11px] text-slate-700">
                      <li>Type A : pointe vers l'adresse IP fournie par l'hébergeur</li>
                      <li>Type CNAME : <code>www</code> vers le domaine cible</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Certificat SSL :</strong> Le certificat HTTPS est automatiquement provisionné gratuitement (Let's Encrypt).
                  </li>
                  <li>
                    <strong>Google Search Console :</strong> Déposez la propriété dans Search Console et soumettez l'URL de votre sitemap (<code>https://votre-domaine.com/sitemap.xml</code>).
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
