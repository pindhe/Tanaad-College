import { isDatabaseAvailable, markDatabaseUnavailable } from "@/lib/db-status";

export async function safeQuery<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  if (!(await isDatabaseAvailable())) {
    return fallback;
  }

  try {
    return await query();
  } catch {
    markDatabaseUnavailable();
    return fallback;
  }
}
