import { Opportunity, OpportunityStatus } from '../types';
import { INITIAL_OPPORTUNITIES } from '../data/mockOpportunities';

const STORAGE_KEY = 'opportunites_afrique_items_v1';
const BOOKMARKS_KEY = 'opportunites_afrique_bookmarks_v1';

/**
 * Returns opportunities stored in localStorage, or seeds with INITIAL_OPPORTUNITIES
 */
export function getStoredOpportunities(): Opportunity[] {
  if (typeof window === 'undefined') return INITIAL_OPPORTUNITIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_OPPORTUNITIES));
      return INITIAL_OPPORTUNITIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_OPPORTUNITIES;
  } catch (err) {
    console.error('Erreur lecture localStorage:', err);
    return INITIAL_OPPORTUNITIES;
  }
}

/**
 * Saves opportunities to localStorage
 */
export function saveOpportunities(items: Opportunity[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('opportunites_updated'));
  } catch (err) {
    console.error('Erreur sauvegarde localStorage:', err);
  }
}

/**
 * Adds a new opportunity to the store
 */
export function addOpportunity(newOpp: Omit<Opportunity, 'id' | 'viewsCount' | 'publishedAt'>): Opportunity {
  const current = getStoredOpportunities();
  const id = `opp-custom-${Date.now()}`;
  const now = new Date().toISOString().split('T')[0];
  
  const created: Opportunity = {
    ...newOpp,
    id,
    viewsCount: 1,
    publishedAt: now
  };

  const updated = [created, ...current];
  saveOpportunities(updated);
  return created;
}

/**
 * Updates an existing opportunity
 */
export function updateOpportunity(id: string, updates: Partial<Opportunity>): Opportunity | null {
  const current = getStoredOpportunities();
  const index = current.findIndex(item => item.id === id);
  if (index === -1) return null;

  const updatedItem = { ...current[index], ...updates };
  current[index] = updatedItem;
  saveOpportunities([...current]);
  return updatedItem;
}

/**
 * Resets storage to initial mock opportunities
 */
export function resetToDefaults(): void {
  saveOpportunities(INITIAL_OPPORTUNITIES);
}

/**
 * Exports current database as JSON string for backup/migration
 */
export function exportDatabaseJSON(): string {
  const current = getStoredOpportunities();
  return JSON.stringify(current, null, 2);
}

/**
 * Imports JSON database
 */
export function importDatabaseJSON(jsonString: string): { success: boolean; count?: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, error: 'Le fichier doit contenir un tableau d\'opportunités valide.' };
    }
    // Simple schema check
    const isValid = parsed.every(item => item.id && item.title && item.countryCode && item.category);
    if (!isValid) {
      return { success: false, error: 'Certaines annonces ne respectent pas le format requis.' };
    }
    saveOpportunities(parsed);
    return { success: true, count: parsed.length };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Erreur d\'analyse JSON.' };
  }
}

/**
 * Calculates current real-time status and days remaining
 */
export function computeOpportunityStatus(deadline: string, verificationDate?: string): {
  status: OpportunityStatus;
  daysRemaining: number;
  isOverdueVerification: boolean;
  statusLabel: string;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);

  const diffTime = deadlineDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Check verification date (> 45 days old is considered needing reverification)
  let isOverdueVerification = false;
  if (verificationDate) {
    const verif = new Date(verificationDate);
    const verifDiff = (today.getTime() - verif.getTime()) / (1000 * 60 * 60 * 24);
    if (verifDiff > 45) {
      isOverdueVerification = true;
    }
  }

  if (daysRemaining < 0) {
    return {
      status: 'expired',
      daysRemaining,
      isOverdueVerification,
      statusLabel: 'Expirée (Archivée)'
    };
  }

  if (daysRemaining <= 7) {
    return {
      status: 'expiring_soon',
      daysRemaining,
      isOverdueVerification,
      statusLabel: `Échéance proche (${daysRemaining} j restant${daysRemaining > 1 ? 's' : ''})`
    };
  }

  return {
    status: 'active',
    daysRemaining,
    isOverdueVerification,
    statusLabel: `${daysRemaining} jours restants`
  };
}

/**
 * Bookmarks management
 */
export function getBookmarks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(id: string): boolean {
  const current = getBookmarks();
  const exists = current.includes(id);
  const updated = exists ? current.filter(item => item !== id) : [...current, id];
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('bookmarks_updated'));
  } catch (err) {
    console.error(err);
  }
  return !exists;
}
