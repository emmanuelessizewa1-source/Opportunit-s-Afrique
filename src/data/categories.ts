import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'emploi',
    name: 'Offres d\'emploi',
    shortName: 'Emplois',
    iconName: 'Briefcase',
    description: 'Postes en CDI, CDD et missions cadres dans les entreprises privées, multinationales et ONG en Afrique francophone.',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200'
  },
  {
    id: 'concours',
    name: 'Concours de la fonction publique',
    shortName: 'Concours d\'État',
    iconName: 'GraduationCap',
    description: 'Avis de concours directs, professionnels et militaires des ministères et grandes écoles d\'administration.',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  {
    id: 'stage',
    name: 'Stages et premiers emplois',
    shortName: 'Stages & Juniors',
    iconName: 'Sparkles',
    description: 'Stages professionnels, stages académiques de fin d\'études et opportunités tremplins pour jeunes diplômés.',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200'
  },
  {
    id: 'bourse',
    name: 'Bourses d\'études',
    shortName: 'Bourses',
    iconName: 'Award',
    description: 'Bourses d\'excellence, licences, masters, doctorats et aides de mobilité internationale pour étudiants africains.',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  {
    id: 'formation',
    name: 'Formations et certifications',
    shortName: 'Formations',
    iconName: 'BookOpen',
    description: 'Programmes certifiants, bootcamps numériques, perfectionnement professionnel et cours financés.',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200'
  },
  {
    id: 'appel_candidature',
    name: 'Appels à candidatures & Projets',
    shortName: 'Appels à projets',
    iconName: 'FileCheck',
    description: 'Subventions de recherche, résidences, incubateurs de startups, fonds d\'amorçage et consultances.',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200'
  }
];
