import { Guide } from '../types';

export const GUIDES: Guide[] = [
  {
    id: 'guide-01-cv-professionnel',
    slug: 'comment-preparer-un-cv-professionnel',
    title: 'Comment préparer un CV professionnel adapté au marché africain francophone',
    category: 'CV & Candidature',
    readTime: '6 min de lecture',
    publishedAt: '2026-10-01',
    excerpt: 'Structure claire, mise en valeur des résultats chiffrés, gestion de la photo et astuces pour passer avec succès les filtres des recruteurs.',
    sections: [
      {
        heading: '1. Les particularités du CV en Afrique francophone',
        content: [
          'En Afrique de l\'Ouest et du Centre (Togo, Côte d\'Ivoire, Sénégal, Bénin, Cameroun, RDC, Burkina Faso), les recruteurs apprécient un CV d\'une à deux pages maximum, sobre et directement orienté vers les compétences opérationnelles.',
          'Contrairement aux standards anglo-saxons stricts où la photo est proscrite pour éviter les biais, de nombreuses entreprises locales et cabinets de recrutement africains préfèrent encore voir une photo professionnelle, sobre et de face. Pour les multinationales ou les candidatures internationales (ONU, BAD, ONG mondiales), privilégiez au contraire un format anonymisé sans photo.'
        ]
      },
      {
        heading: '2. Les rubriques indispensables et leur ordonnancement',
        content: [
          '• En-tête : Nom complet, titre du poste visé (ex: "Auditeur Financier Junior — SYSCOHADA"), ville et pays de résidence, numéro de téléphone direct (avec indicatif pays, ex: +228, +225, +229, +221), adresse email professionnelle (évitez les pseudonymes d\'enfance), lien LinkedIn à jour.',
          '• Résumé professionnel (3 à 4 lignes) : Votre proposition de valeur, votre expérience clé et ce que vous apportez immédiatement à l\'organisation.',
          '• Expériences professionnelles (chronologie inversée) : Intitulé précis du poste, nom de l\'entreprise, période (mois/année), ville/pays, et surtout 3 à 5 réalisations concrètes chiffrées (ex: "Optimisation du taux de recouvrement de +18% en 6 mois").',
          '• Formation & Diplômes : Diplômes d\'État, établissements fréquentés, mentions éventuelles.',
          '• Compétences techniques & Outils : Logiciels maîtrisés, normes spécifiques (ex: SYSCOHADA, OHADA, ISO), langues parlées avec niveau réel.'
        ],
        callout: {
          type: 'checklist',
          title: 'Checklist avant envoi de votre CV',
          items: [
            'Nommez votre fichier de façon professionnelle : CV_Prenom_Nom_Poste.pdf',
            'Enregistrez TOUJOURS en format PDF pour figer la mise en page',
            'Relisez à l\'aide d\'un correcteur orthographique ou faites relire par un tiers',
            'Vérifiez que votre numéro de téléphone fonctionne et dispose d\'une messagerie vocale propre'
          ]
        }
      },
      {
        heading: '3. Les erreurs fatales à bannir',
        content: [
          'Ne mentionnez pas d\'informations superflues comme votre situation matrimoniale ou le nombre d\'enfants, sauf exigence légale explicite.',
          'Ne mentez jamais sur un diplôme ou une expérience : la vérification des références (background check) est devenue systématique chez les recruteurs sérieux en Afrique.'
        ]
      }
    ],
    author: {
      name: 'Comité Éditorial Opportunités Afrique',
      role: 'Consultants RH & Spécialistes en Insertion Professionnelle'
    },
    relatedCategories: ['emploi', 'stage']
  },
  {
    id: 'guide-02-lettre-motivation',
    slug: 'comment-rediger-une-lettre-de-motivation',
    title: 'Comment rédiger une lettre de motivation percutante qui déclenche l\'entretien',
    category: 'Lettre de Motivation',
    readTime: '7 min de lecture',
    publishedAt: '2026-10-03',
    excerpt: 'La structure gagnante en 4 temps (Vous - Moi - Nous - Action) pour capter immédiatement l\'attention d\'un responsable de recrutement.',
    sections: [
      {
        heading: '1. En finir avec les lettres types copiées-collées',
        content: [
          'La majorité des lettres de motivation reçues par les directions des ressources humaines commencent par la même formule générique : "J\'ai l\'honneur de solliciter de votre haute bienveillance...". Ces formules désuètes fatiguent les recruteurs et ne disent rien de votre valeur ajoutée.',
          'Une excellente lettre de motivation moderne est une argumentation commerciale de vos talents : elle explique pourquoi cette entreprise précise vous intéresse et comment vous allez résoudre ses défis concrets.'
        ]
      },
      {
        heading: '2. La formule "VOUS — MOI — NOUS"',
        content: [
          '• Paragraphe 1 (VOUS) : Montrez que vous connaissez l\'entreprise, son actualité, ses projets récents (ex: extension industrielle, lancement d\'un produit au Sénégal ou en Côte d\'Ivoire, obtention d\'un marché public).',
          '• Paragraphe 2 (MOI) : Présentez une ou deux réussites majeures de votre parcours qui prouvent votre capacité à exceller dans le poste.',
          '• Paragraphe 3 (NOUS) : Décrivez la synergie. Ce que vous allez accomplir ensemble dès les premiers mois de votre prise de fonction.',
          '• Conclusion & Appel à l\'action : Proposez poliment un échange téléphonique ou un entretien, avec une formule de politesse soignée et contemporaine.'
        ],
        callout: {
          type: 'tip',
          title: 'Conseil de recruteur',
          items: [
            'Limitez strictement votre lettre à une seule page (environ 300 à 350 mots).',
            'Personnalisez le destinataire : trouvez le nom du DRH ou du responsable du département sur LinkedIn.',
            'Adoptez un ton dynamique, respectueux mais affirmatif.'
          ]
        }
      }
    ],
    author: {
      name: 'Comité Éditorial Opportunités Afrique',
      role: 'Responsable Recrutement Afrique de l\'Ouest'
    },
    relatedCategories: ['emploi', 'stage', 'bourse']
  },
  {
    id: 'guide-03-postuler-efficacement',
    slug: 'comment-postuler-a-une-offre-d-emploi',
    title: 'Comment postuler efficacement à une offre d\'emploi et assurer un suivi gagnant',
    category: 'Méthodologie',
    readTime: '5 min de lecture',
    publishedAt: '2026-10-05',
    excerpt: 'De la lecture critique de l\'annonce jusqu\'à la relance téléphonique ou email : la méthode pas à pas pour maximiser vos chances.',
    sections: [
      {
        heading: '1. Décrypter l\'annonce et vérifier la source officielle',
        content: [
          'Avant de rédiger la moindre ligne, assurez-vous que l\'offre émane d\'un canal certifié (site institutionnel de l\'entreprise, portail officiel de l\'ANPE locale, compte LinkedIn vérifié).',
          'Repérez les mots-clés essentiels : compétences obligatoires ("Must-have") et compétences secondaires ("Nice-to-have"). Adaptez votre CV en reprenant naturellement ce vocabulaire professionnel.'
        ]
      },
      {
        heading: '2. Soigner l\'email d\'accompagnement',
        content: [
          'Ne laissez jamais le corps de votre message vide en envoyant seulement des pièces jointes. Rédigez un message court, courtois et structuré en rappelant la référence de l\'offre en objet (ex: "Candidature au poste de Comptable Junior — Réf. CJ-2026-TG").',
          'Assurez-vous que vos pièces jointes sont compressées et font moins de 2 Mo au total.'
        ]
      },
      {
        heading: '3. Quand et comment relancer le recruteur ?',
        content: [
          'Si vous n\'avez pas reçu de confirmation ou de retour après 10 à 14 jours ouvrés suivant la clôture des candidatures, envoyez un email de relance respectueux réaffirmant votre vif intérêt.',
          'Restez toujours courtois : une relance professionnelle montre votre motivation sans paraître insistant.'
        ]
      }
    ],
    author: {
      name: 'Comité Éditorial Opportunités Afrique',
      role: 'Coach Carrières & Insertion'
    },
    relatedCategories: ['emploi']
  },
  {
    id: 'guide-04-preparer-concours-administratif',
    slug: 'comment-se-preparer-a-un-concours-administratif',
    title: 'Comment se préparer et réussir un concours de la fonction publique',
    category: 'Concours d\'État',
    readTime: '8 min de lecture',
    publishedAt: '2026-10-07',
    excerpt: 'Stratégie de révision pour les concours directs et professionnels (ENA, Douanes, Police, Impôts, Santé, Éducation nationale).',
    sections: [
      {
        heading: '1. Comprendre la mécanique des concours d\'État',
        content: [
          'Un concours de la fonction publique ne s\'aborde pas comme un examen universitaire. À l\'examen, il suffit d\'obtenir 10/20 pour être admis ; au concours, seul le nombre de places budgétisées par le ministère des Finances compte. Il faut faire partie des meilleurs du contingent.',
          'Dans les pays comme la Côte d\'Ivoire, le Sénégal, le Bénin, le Cameroun ou le Togo, les épreuves se divisent généralement en phase d\'admissibilité (écrits) et phase d\'admission définitive (oraux ou tests physiques).'
        ]
      },
      {
        heading: '2. Les 3 piliers d\'une préparation réussie',
        content: [
          '• La culture générale & l\'actualité : Lisez quotidiennement la presse nationale et internationale. Maîtrisez les grands dossiers régionaux (CEDEAO, UEMOA, ZLECAF, transition énergétique, sécurité au Sahel).',
          '• La méthodologie de la dissertation et de la note de synthèse : Apprenez à structurer un plan en deux parties / deux sous-parties selon la tradition administrative francophone.',
          '• Les annales des sessions précédentes : Entraînez-vous dans les conditions réelles de temps (3 ou 4 heures d\'épreuve sans documents).'
        ],
        callout: {
          type: 'warning',
          title: 'Attention à la composition du dossier physique',
          items: [
            'Faites légaliser vos pièces bien avant la date limite pour éviter les files d\'attente en mairie.',
            'Vérifiez la concordance exacte de l\'orthographe de vos noms sur tous les documents.',
            'Ne confiez jamais votre dossier à un intermédiaire non agréé prétendant avoir des "entrées" au ministère.'
          ]
        }
      }
    ],
    author: {
      name: 'Comité Éditorial Opportunités Afrique',
      role: 'Ancien Membre de Jury de Concours Administratif'
    },
    relatedCategories: ['concours']
  },
  {
    id: 'guide-05-rechercher-bourse-etudes',
    slug: 'comment-rechercher-une-bourse-d-etudes',
    title: 'Guide complet pour rechercher et décrocher une bourse d\'études internationale',
    category: 'Bourses & Mobilité',
    readTime: '9 min de lecture',
    publishedAt: '2026-10-09',
    excerpt: 'Calendrier des grands programmes mondiaux (Campus France, DAAD, Chevening, bourses d\'excellence africaines) et montage du dossier.',
    sections: [
      {
        heading: '1. Anticiper le calendrier (J-12 mois)',
        content: [
          'L\'erreur la plus fréquente des étudiants africains est de chercher une bourse en juillet ou août pour une rentrée en septembre. Les grands programmes d\'excellence internationaux (Erasmus+, Bourses d\'excellence de l\'UEMOA, Eiffel, Chevening, DAAD, Bourses du gouvernement chinois ou marocain) ouvrent leurs appels à candidatures entre octobre et février pour la rentrée de l\'année suivante.',
          'Dès votre deuxième année de Licence ou de Master, préparez vos relevés de notes et prévoyez de passer les tests de langue si nécessaire (TOEFL, IELTS, TCF).'
        ]
      },
      {
        heading: '2. Rédiger un projet d\'études cohérent avec le développement de l\'Afrique',
        content: [
          'Les comités d\'attribution de bourses recherchent des candidats qui ont une vision claire de l\'impact de leur formation sur leur pays d\'origine. Montrez précisément comment les compétences que vous allez acquérir (en santé publique, agronomie, intelligence artificielle, gestion de l\'eau, droit minier) contribueront au tissu socio-économique national.',
          'Soignez les lettres de recommandation : choisissez des professeurs titulaires qui vous connaissent personnellement et peuvent attester de votre assiduité et de votre potentiel académique.'
        ]
      }
    ],
    author: {
      name: 'Comité Éditorial Opportunités Afrique',
      role: 'Spécialiste Bourses & Coopération Universitaire'
    },
    relatedCategories: ['bourse', 'formation']
  },
  {
    id: 'guide-06-eviter-fausses-offres-emploi',
    slug: 'comment-eviter-les-fausses-offres-d-emploi',
    title: 'Alerte Arnaques : Comment détecter et éviter les fausses offres d\'emploi en ligne',
    category: 'Sécurité & Prévention',
    readTime: '6 min de lecture',
    publishedAt: '2026-10-11',
    excerpt: 'Les signaux d\'alarme incontournables : transferts Mobile Money, adresses Gmail gratuites, promesses salariales irréalistes et faux badges.',
    sections: [
      {
        heading: '1. La règle d\'or absolue : JAMAIS d\'argent pour postuler',
        content: [
          'Opportunités Afrique rappelle avec force : **AUCUN recruteur sérieux, AUCUNE institution internationale (ONU, BAD, OMS), AUCUN ministère officiel ne demande d\'argent à un candidat pour le traitement de son dossier, pour l\'achat d\'un uniforme de stage ou pour réserver une place d\'entretien.**',
          'Si une personne ou une page Facebook / canal Telegram vous invite à faire un transfert Mobile Money (T-Money, Flooz, Wave, Orange Money, MTN Mobile Money, Airtel Money) pour valider votre candidature, il s\'agit à 100% d\'une escroquerie.'
        ],
        callout: {
          type: 'warning',
          title: 'Les 6 signaux d\'alerte d\'une arnaque de recrutement',
          items: [
            'L\'adresse email de contact est @gmail.com, @yahoo.fr ou @hotmail au lieu du domaine officiel de l\'entreprise.',
            'On vous demande de payer des "frais de dossier", "frais de badge" ou "frais d\'enregistrement au registre".',
            'Le salaire proposé est démesurément élevé par rapport au niveau d\'études ou d\'expérience requis.',
            'L\'offre vous est envoyée par message privé WhatsApp ou SMS sans que vous n\'ayez jamais postulé.',
            'On vous propose un visa de travail garanti ou un contrat à l\'étranger sous 48h sans aucun entretien préalable.',
            'Le recruteur exige la photo de votre carte bancaire ou des documents d\'identité intimes dès le premier contact.'
          ]
        }
      },
      {
        heading: '2. Que faire si vous repérez une fausse annonce ?',
        content: [
          '• Ne communiquez aucune pièce d\'identité sensible (carte d\'identité, passeport, relevé d\'identité bancaire).',
          '• Signalez immédiatement le faux profil ou le groupe sur la plateforme concernée.',
          '• Avertissez vos proches : les faux recruteurs exploitent souvent la précarité des jeunes diplômés en quête de premier emploi.'
        ]
      }
    ],
    author: {
      name: 'Comité Éditorial Opportunités Afrique',
      role: 'Cellule Veille & Sécurité de l\'Information'
    },
    relatedCategories: ['emploi', 'stage', 'concours']
  },
  {
    id: 'guide-07-preparer-un-entretien',
    slug: 'comment-preparer-un-entretien-d-embauche',
    title: 'Comment préparer et réussir un entretien d\'embauche : questions clés et posture',
    category: 'Entretiens',
    readTime: '7 min de lecture',
    publishedAt: '2026-10-13',
    excerpt: 'Présentation des 2 premières minutes, méthode STAR pour répondre aux questions comportementales et questions à poser au recruteur.',
    sections: [
      {
        heading: '1. Les 2 premières minutes : Le pitch "Parlez-moi de vous"',
        content: [
          'La question d\'ouverture est presque toujours : "Pouvez-vous vous présenter en quelques mots ?". Ne récitez pas chronologiquement votre CV depuis l\'école primaire.',
          'Structurez votre réponse en 3 temps : Qui êtes-vous aujourd\'hui professionnellement ? Quelles sont vos réalisations les plus marquantes ? Pourquoi ce poste spécifique est la suite logique de votre parcours ?'
        ]
      },
      {
        heading: '2. La méthode STAR pour valoriser vos réalisations',
        content: [
          'Pour chaque question sur votre expérience passée, répondez avec la méthode STAR :',
          '• S — Situation : Le contexte initial et le problème posé.',
          '• T — Tâche : Quel était votre rôle exact et votre objectif ?',
          '• A — Action : Quelles initiatives concrètes avez-vous prises pour débloquer la situation ?',
          '• R — Résultat : Quel a été l\'impact mesurable (chiffres, délais, économies, satisfaction client) ?'
        ]
      },
      {
        heading: '3. Les questions indispensables à poser en fin d\'entretien',
        content: [
          'Quand le recruteur vous demande "Avez-vous des questions ?", ne dites jamais "Non, tout est clair". C\'est votre opportunité de prouver votre engagement.',
          'Exemples de questions valorisantes : "Quels seront les objectifs prioritaires des 90 premiers jours à ce poste ?", "Comment l\'équipe mesure-t-elle le succès pour cette mission ?", "Quelle est la prochaine étape du processus de sélection ?"'
        ]
      }
    ],
    author: {
      name: 'Comité Éditorial Opportunités Afrique',
      role: 'Coach Carrières & Insertion'
    },
    relatedCategories: ['emploi', 'stage']
  }
];
