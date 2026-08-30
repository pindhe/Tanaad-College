import net from "net";

const globalForDb = globalThis as unknown as {
  tanaadDbAvailable?: boolean;
  tanaadDbCheckedAt?: number;
};

const RECHECK_MS = 30_000;

function databaseHostPort(): { host: string; port: number } {
  try {
    const url = new URL(process.env.DATABASE_URL ?? "postgresql://localhost:5432");
    return {
      host: url.hostname || "localhost",
      port: Number(url.port || 5432),
    };
  } catch {
    return { host: "localhost", port: 5432 };
  }
}

function probePostgres(): Promise<boolean> {
  const { host, port } = databaseHostPort();

  return new Promise((resolve) => {
    const socket = net.connect({ host, port });
    const timer = setTimeout(() => {
      socket.destroy();
      resolve(false);
    }, 250);

    socket.once("connect", () => {
      clearTimeout(timer);
      socket.end();
      resolve(true);
    });

    socket.once("error", () => {
      clearTimeout(timer);
      socket.destroy();
      resolve(false);
    });
  });
}

export async function isDatabaseAvailable(): Promise<boolean> {
  const now = Date.now();
  if (
    typeof globalForDb.tanaadDbAvailable === "boolean" &&
    globalForDb.tanaadDbCheckedAt &&
    now - globalForDb.tanaadDbCheckedAt < RECHECK_MS
  ) {
    return globalForDb.tanaadDbAvailable;
  }

  const available = await probePostgres();
  globalForDb.tanaadDbAvailable = available;
  globalForDb.tanaadDbCheckedAt = now;
  return available;
}

export function markDatabaseUnavailable(): void {
  globalForDb.tanaadDbAvailable = false;
  globalForDb.tanaadCheckedAt = Date.now();
}
