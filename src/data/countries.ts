import { CountryInfo } from '../types';

export const COUNTRIES: CountryInfo[] = [
  {
    code: 'TG',
    name: 'Togo',
    flag: '🇹🇬',
    capital: 'Lomé',
    currency: 'Franc CFA (XOF)',
    officialLanguage: 'Français',
    popularSectors: ['Logistique portuaire & maritime', 'Agrobusiness & transformation', 'Microfinance & Banque', 'Télécoms & Numérique', 'Éducation'],
    officialJobAgencies: [
      { name: 'ANPE Togo', description: 'Agence Nationale Pour l\'Emploi du Togo' },
      { name: 'Ministère de la Fonction Publique', description: 'Portail des concours administratifs togolais' }
    ],
    description: 'Carrefour logistique de l\'Afrique de l\'Ouest grâce au Port Autonome de Lomé, le Togo offre un vivier dynamique de stages, concours d\'État et recrutements privés.'
  },
  {
    code: 'BJ',
    name: 'Bénin',
    flag: '🇧🇯',
    capital: 'Porto-Novo (Capitale) / Cotonou (Économique)',
    currency: 'Franc CFA (XOF)',
    officialLanguage: 'Français',
    popularSectors: ['Zone Industrielle de Glo-Djigbé (GDIZ)', 'Numérique & E-gouvernance', 'Tourisme & Patrimoine', 'Santé & Enseignement'],
    officialJobAgencies: [
      { name: 'ANPE Bénin', description: 'Agence Nationale Pour l\'Emploi (Portail Emploi Bénin)' },
      { name: 'Ministère du Travail et de la Fonction Publique (MTFP)', description: 'Organisation des concours directs et professionnels' }
    ],
    description: 'En pleine modernisation industrielle et numérique, le Bénin recrute intensément pour ses projets d\'infrastructure, l\'administration publique et les services.'
  },
  {
    code: 'CI',
    name: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    capital: 'Yamoussoukro / Abidjan',
    currency: 'Franc CFA (XOF)',
    officialLanguage: 'Français',
    popularSectors: ['Fintech & Banques', 'BTP & Génie Civil', 'Agroalimentaire (Cacao, Anacarde)', 'Distribution & Commerce de gros', 'Industries créatives'],
    officialJobAgencies: [
      { name: 'Agence Emploi Jeunes (AEJ)', description: 'Plateforme nationale d\'insertion professionnelle et stages' },
      { name: 'Ministère de la Fonction Publique de Côte d\'Ivoire', description: 'Concours administratifs et d\'entrée à l\'ENA' }
    ],
    description: 'Première puissance économique de l\'UEMOA, la Côte d\'Ivoire concentre les sièges régionaux de multinationales, d\'ONG internationales et d\'institutions financières.'
  },
  {
    code: 'SN',
    name: 'Sénégal',
    flag: '🇸🇳',
    capital: 'Dakar',
    currency: 'Franc CFA (XOF)',
    officialLanguage: 'Français',
    popularSectors: ['Énergies & Hydrocarbures (Pétrole, Gaz)', 'Hub Tech & Startups', 'Pêche & Agro-industrie', 'Santé & Enseignement supérieur'],
    officialJobAgencies: [
      { name: '3P / Pôle Emploi Sénégal', description: 'Dispositif national d\'accompagnement vers l\'insertion' },
      { name: 'Direction Générale de la Fonction Publique', description: 'Recrutements de la fonction publique sénégalaise' }
    ],
    description: 'Pôle d\'excellence universitaire et technologique ouest-africain, le Sénégal propose de nombreuses bourses de recherche et recrutements qualifiés.'
  },
  {
    code: 'CM',
    name: 'Cameroun',
    flag: '🇨🇲',
    capital: 'Yaoundé / Douala',
    currency: 'Franc CFA (XAF)',
    officialLanguage: 'Français & Anglais',
    popularSectors: ['Forêt & Bois', 'Télécoms & Fibre optique', 'Mines & Énergie', 'Commerce & Logistique CEMAC', 'Audit & Conseil'],
    officialJobAgencies: [
      { name: 'FNE Cameroun', description: 'Fonds National de l\'Emploi du Cameroun' },
      { name: 'MINFOPRA', description: 'Ministère de la Fonction Publique et de la Réforme Administrative' }
    ],
    description: 'Moteur économique de la zone CEMAC, le Cameroun offre d\'importantes opportunités dans les grandes entreprises industrielles et les concours d\'écoles nationales (ENAM, Polytechnique).'
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    flag: '🇧🇫',
    capital: 'Ouagadougou',
    currency: 'Franc CFA (XOF)',
    officialLanguage: 'Français',
    popularSectors: ['Mines (Or, substances précieuses)', 'Action humanitaire & Développement', 'Agriculture & Coton', 'Artisanat & Énergie solaire'],
    officialJobAgencies: [
      { name: 'ANPE Burkina Faso', description: 'Agence Nationale Pour l\'Emploi' },
      { name: 'e-Concours Burkina', description: 'Plateforme officielle d\'inscription aux concours de la fonction publique' }
    ],
    description: 'Reconnu pour la rigueur de sa jeunesse, le Burkina Faso propose des concours d\'État réguliers et des postes au sein d\'organisations humanitaires et de développement.'
  },
  {
    code: 'CD',
    name: 'RDC (Congo Kinshasa)',
    flag: '🇨🇩',
    capital: 'Kinshasa',
    currency: 'Franc Congolais (CDF)',
    officialLanguage: 'Français',
    popularSectors: ['Ressources minières (Cobalt, Cuivre)', 'Infrastructures & Énergie verte', 'Télécommunications', 'Organisations multilatérales & ONU (MONUSCO)', 'Santé publique'],
    officialJobAgencies: [
      { name: 'ONEM RDC', description: 'Office National de l\'Emploi de la République Démocratique du Congo' },
      { name: 'Ministère de la Fonction Publique RDC', description: 'Recrutement et régularisation des cadres de l\'État' }
    ],
    description: 'Plus grand pays francophone au monde par sa population, la RDC est un marché colossal en pleine effervescence pour les profils qualifiés et les organisations internationales.'
  },
  {
    code: 'PAN',
    name: 'Panafrique & Régional',
    flag: '🌍',
    capital: 'Multi-villes / Sièges régionaux',
    currency: 'Diverses devises (XOF, XAF, USD)',
    officialLanguage: 'Français & Multilingue',
    popularSectors: ['Institutions régionales (BAD, BOAD, UA, CEDEAO, CEMAC)', 'Bourses internationales', 'Programmes d\'échange universitaires', 'Télétravail continental'],
    officialJobAgencies: [
      { name: 'Banque Africaine de Développement (BAD)', description: 'Programmes jeunes professionnels et carrières' },
      { name: 'Union Africaine & Agences ONU Afrique', description: 'Bourses et postes régionaux' }
    ],
    description: 'Programmes transfrontaliers, bourses d\'études internationales (Europe, Asie, Amériques) et postes ouverts à tous les ressortissants des pays africains francophones.'
  }
];
