type Bucket = {
  count: number;
  resetAt: number;
};

const store = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  limit = 8,
  windowMs = 60_000,
): { success: boolean; remaining: number } {
  const now = Date.now();
  const current = store.get(key);

  if (!current || now > current.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { success: false, remaining: 0 };
  }

  current.count += 1;
  store.set(key, current);
  return { success: true, remaining: limit - current.count };
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
