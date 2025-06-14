
export interface LetterHistoryEntry {
  date: string; // ISO
  templateId: string;
  templateName: string;
  userEmail: string;
  propertyId: string;
}

const KEY_PREFIX = "letterHistoryByProperty:";

function getStorageKey(propertyId: string) {
  return `${KEY_PREFIX}${propertyId}`;
}

// Add a new log for given property ID
export function logLetterGeneration(
  propertyId: string,
  templateId: string,
  templateName: string,
  userEmail: string
) {
  const entry: LetterHistoryEntry = {
    date: new Date().toISOString(),
    templateId,
    templateName,
    userEmail,
    propertyId,
  };
  const key = getStorageKey(propertyId);
  const prevLogs: LetterHistoryEntry[] = JSON.parse(localStorage.getItem(key) || "[]");
  prevLogs.push(entry);
  localStorage.setItem(key, JSON.stringify(prevLogs));
}

// Get logs for a specific property
export function getLetterHistory(propertyId: string): LetterHistoryEntry[] {
  const key = getStorageKey(propertyId);
  return JSON.parse(localStorage.getItem(key) || "[]");
}

// Get all history (admin use): { [propertyId]: LetterHistoryEntry[] }
export function getAllLetterHistory(): Record<string, LetterHistoryEntry[]> {
  const history: Record<string, LetterHistoryEntry[]> = {};
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(KEY_PREFIX)) {
      const propertyId = key.replace(KEY_PREFIX, "");
      try {
        const entries = JSON.parse(localStorage.getItem(key) || "[]");
        history[propertyId] = entries;
      } catch {
        // Ignore parse errors
      }
    }
  });
  return history;
}

// Remove all letter logs for a property (not exposed in UI for now)
export function clearLetterHistory(propertyId: string) {
  localStorage.removeItem(getStorageKey(propertyId));
}
