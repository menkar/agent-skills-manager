import Link from "next/link";
import PageShell from "../components/PageShell";

export default function AboutPage() {
  return (
    <PageShell className="max-w-4xl">
      <div className="flex flex-col gap-10">

        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Product
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            About
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
            Agent Skills Manager is a focused workspace to list, browse, and
            create the capabilities your agents rely on.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "⚡",
              title: "Next.js 16",
              body: "App Router with server components, server actions, streaming, and suspense loading states.",
            },
            {
              icon: "🎨",
              title: "Dark-first design",
              body: "Tailwind CSS v4 dark: variant + DaisyUI v5 dark theme combined for a consistent dark experience.",
            },
            {
              icon: "📐",
              title: "Fully responsive",
              body: "Mobile-first layouts, collapsible navigation, and fluid grid systems that scale from 320 px to 4K.",
            },
            {
              icon: "🗄️",
              title: "Prisma ready",
              body: "Prisma + pg are included as dependencies so switching from in-memory storage to PostgreSQL is straightforward.",
            },
            {
              icon: "🔒",
              title: "Auth scaffold",
              body: "Login and register routes are in place and ready for a session or JWT implementation.",
            },
            {
              icon: "🛠️",
              title: "TypeScript strict",
              body: "Strict TypeScript throughout, zero ESLint errors, and strong types on all server actions.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow"
            >
              <div className="mb-3 text-2xl">{card.icon}</div>
              <h2 className="mb-1.5 font-semibold text-zinc-100">{card.title}</h2>
              <p className="text-sm leading-relaxed text-zinc-500">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/skills"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white shadow transition-colors hover:bg-indigo-500"
          >
            View skills
          </Link>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            Back home
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
