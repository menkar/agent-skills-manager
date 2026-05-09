"use client";

import Link from "next/link";

export default function CreateSkillError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="flex flex-col items-center gap-6 rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center shadow-xl">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-3xl">
          ⚠️
        </span>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Something went wrong
          </h2>
          <p className="max-w-sm text-sm text-zinc-400">{error.message}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white shadow transition-colors hover:bg-indigo-500"
          >
            Try again
          </button>
          <Link
            href="/skills"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            Back to skills
          </Link>
        </div>
      </div>
    </div>
  );
}
