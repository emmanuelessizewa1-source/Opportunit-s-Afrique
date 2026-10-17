export type OpportunityCategory =
  | 'emploi'
  | 'concours'
  | 'stage'
  | 'bourse'
  | 'formation'
  | 'appel_candidature';

export type OpportunityStatus = 'active' | 'expiring_soon' | 'expired' | 'under_review';

export type EducationLevel =
  | 'Tous niveaux'
  | 'Sans diplôme requis'
  | 'BEPC / CAP'
  | 'Bac'
  | 'Bac+2 (BTS, DUT)'
  | 'Licence (Bac+3)'
  | 'Master / Ingénieur (Bac+5)'
  | 'Doctorat / Ph.D';

export type ContractType =
  | 'CDI'
  | 'CDD'
  | 'Fonction publique / Titularisation'
  | 'Stage professionnel rémunéré'
  | 'Stage académique'
  | 'Bourse complète (Exemption + Allocation)'
  | 'Bourse partielle'
  | 'Formation diplômante'
  | 'Consultance / Prestation';

export interface Opportunity {
  id: string;
  slug: string;
  title: string;
  organization: string;
  organizationLogoText?: string;
  countryCode: 'TG' | 'BJ' | 'CI' | 'SN' | 'CM' | 'BF' | 'CD' | 'PAN';
  countryName: string;
  city: string;
  category: OpportunityCategory;
  contractType: ContractType;
  educationLevel: EducationLevel;
  experienceRequired: string;
  deadline: string; // ISO format: YYYY-MM-DD
  verificationDate: string; // ISO format
  isVerified: boolean;
  isSample: boolean; // MANDATORY: true for demo listings ("EXEMPLE — À VÉRIFIER, NON PUBLIÉ")
  officialSource: string;
  officialUrl: string;
  summary: string;
  description: string;
  requirements: string[];
  documentsRequired: string[];
  submissionProcedure: string;
  contactEmail?: string;
  salaryOrGrantRange?: string;
  viewsCount: number;
  publishedAt: string;
  tags: string[];
  featured?: boolean;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedAt: string;
  excerpt: string;
  sections: {
    heading: string;
    content: string[];
    callout?: {
      type: 'tip' | 'warning' | 'checklist';
      title: string;
      items: string[];
    };
  }[];
  author: {
    name: string;
    role: string;
  };
  relatedCategories?: OpportunityCategory[];
}

export interface CountryInfo {
  code: 'TG' | 'BJ' | 'CI' | 'SN' | 'CM' | 'BF' | 'CD' | 'PAN';
  name: string;
  flag: string;
  capital: string;
  currency: string;
  officialLanguage: string;
  popularSectors: string[];
  officialJobAgencies: {
    name: string;
    description: string;
  }[];
  description: string;
}

export interface CategoryInfo {
  id: OpportunityCategory;
  name: string;
  shortName: string;
  iconName: string;
  description: string;
  badgeColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'candidature' | 'concours' | 'bourses' | 'securite';
}

export interface FilterState {
  searchQuery: string;
  country: string;
  category: string;
  educationLevel: string;
  contractType: string;
  deadlineFilter: 'all' | 'active_only' | 'expiring_soon' | 'expired';
  sortBy: 'recent' | 'deadline_asc' | 'views';
}
