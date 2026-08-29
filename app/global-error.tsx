"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
        <p className="text-sm font-semibold text-[#0B3D6E]">500</p>
        <h1 className="mt-3 text-3xl font-bold">Something went wrong</h1>
        <button type="button" className="mt-6 rounded-md bg-[#0B3D6E] px-4 py-2 text-white" onClick={reset}>
          Try again
        </button>
      </body>
    </html>
  );
}
