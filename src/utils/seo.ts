import { Opportunity, Guide } from '../types';

/**
 * Updates document title and meta description dynamically for SPA navigation
 */
export function updatePageSeo(params: {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
}): void {
  if (typeof document === 'undefined') return;

  const fullTitle = `${params.title} — Opportunités Afrique`;
  document.title = fullTitle;

  // Description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', params.description);
  }

  // OG Title
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', fullTitle);
  }

  // OG Description
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', params.description);
  }

  // OG Type
  const ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) {
    ogType.setAttribute('content', params.ogType || 'website');
  }

  // Canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && params.canonicalPath) {
    const origin = window.location.origin;
    canonical.setAttribute('href', `${origin}${params.canonicalPath}`);
  }
}

/**
 * Injects or updates Schema.org JSON-LD structured data
 */
export function injectStructuredData(schemaData: Record<string, any>): void {
  if (typeof document === 'undefined') return;

  const SCRIPT_ID = 'structured-data-jsonld';
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  
  if (!script) {
    script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schemaData);
}

/**
 * Generates JobPosting Schema for employment & internship opportunities
 */
export function generateJobPostingSchema(opp: Opportunity): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: opp.title,
    description: `${opp.summary} — ${opp.description}`,
    identifier: {
      '@type': 'PropertyValue',
      name: opp.organization,
      value: opp.id
    },
    datePosted: opp.publishedAt,
    validThrough: `${opp.deadline}T23:59:59Z`,
    employmentType: opp.contractType.includes('CDI') ? 'FULL_TIME' : 'OTHER',
    hiringOrganization: {
      '@type': 'Organization',
      name: opp.organization,
      sameAs: opp.officialUrl
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: opp.city,
        addressCountry: opp.countryCode === 'PAN' ? 'AF' : opp.countryCode
      }
    },
    educationRequirements: opp.educationLevel,
    experienceRequirements: opp.experienceRequired,
    baseSalary: opp.salaryOrGrantRange ? {
      '@type': 'MonetaryAmount',
      currency: opp.countryCode === 'CD' ? 'CDF' : 'XOF',
      value: {
        '@type': 'QuantitativeValue',
        value: opp.salaryOrGrantRange,
        unitText: 'MONTH'
      }
    } : undefined
  };
}

/**
 * Generates Article Schema for practical guides
 */
export function generateGuideArticleSchema(guide: Guide): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
    datePublished: guide.publishedAt,
    author: {
      '@type': 'Organization',
      name: guide.author.name
    },
    publisher: {
      '@type': 'Organization',
      name: 'Opportunités Afrique',
      url: 'https://opportunites-afrique.com'
    }
  };
}

/**
 * Generates BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
