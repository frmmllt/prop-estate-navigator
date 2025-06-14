
export type UserActionType = "login" | "property_viewed" | "pdf_generated" | "template_used";

export interface UserLogEntry {
  timestamp: string; // ISO format
  userEmail: string;
  action: UserActionType;
  details?: Record<string, any>;
}

const LOG_STORAGE_KEY = "userActionLogs";

export function logUserAction(
  userEmail: string,
  action: UserActionType,
  details?: Record<string, any>
) {
  const entry: UserLogEntry = {
    timestamp: new Date().toISOString(),
    userEmail,
    action,
    details,
  };
  const logsRaw = localStorage.getItem(LOG_STORAGE_KEY);
  const logs: UserLogEntry[] = logsRaw ? JSON.parse(logsRaw) : [];
  logs.push(entry);
  localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
}

// API to fetch all logs (for future migration)
export function getUserLogs(): UserLogEntry[] {
  const logsRaw = localStorage.getItem(LOG_STORAGE_KEY);
  return logsRaw ? JSON.parse(logsRaw) : [];
}

export function clearUserLogs() {
  localStorage.removeItem(LOG_STORAGE_KEY);
}
