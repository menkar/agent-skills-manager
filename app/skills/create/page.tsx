"use client";

import { useActionState } from "react";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import { createSkill } from "../../actions/skills";

const initialState = { message: "" };

export default function NewSkillPage() {
  const [state, formAction, pending] = useActionState(createSkill, initialState);

  return (
    <PageShell className="max-w-2xl">
      <div className="flex flex-col gap-8">

        {/* Header */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Create
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            New skill
          </h1>
          <p className="text-zinc-400">
            All fields are required. The skill will be available immediately.
          </p>
        </div>

        {/* Form card */}
        <form
          action={formAction}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:p-8"
        >
          <div className="flex flex-col gap-6">

            <div className="flex flex-col gap-1.5">
              <label htmlFor="skill-name" className="text-sm font-medium text-zinc-300">
                Name
              </label>
              <input
                id="skill-name"
                name="name"
                type="text"
                required
                autoComplete="off"
                placeholder="e.g. API Integration"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="skill-description" className="text-sm font-medium text-zinc-300">
                Description
              </label>
              <textarea
                id="skill-description"
                name="description"
                rows={4}
                required
                placeholder="What does this skill cover?"
                className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="skill-category" className="text-sm font-medium text-zinc-300">
                Category
              </label>
              <input
                id="skill-category"
                name="category"
                type="text"
                required
                autoComplete="off"
                placeholder="e.g. Backend, Design, DevOps"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {state?.message && (
              <p role="alert" aria-live="polite" className="text-sm text-red-400">
                {state.message}
              </p>
            )}

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:justify-end">
              <Link
                href="/skills"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white shadow transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending && (
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {pending ? "Creating…" : "Create skill"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
