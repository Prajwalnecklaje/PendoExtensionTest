import { useState } from "react";
import PageIcon from "./PageIcon";

export default function NotFoundPage() {
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const requestedPath = typeof window === "undefined" ? "/unknown" : `${window.location.pathname}${window.location.search}${window.location.hash}`;

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) {
      setMessage("Try searching for a project, guide, or page name.");
      return;
    }
    window.location.assign(`/help?search=${encodeURIComponent(query)}`);
  };

  return (
    <main id="not-found-page" className="relative flex min-h-[calc(100vh-7rem)] items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_10%,rgba(139,92,246,.14),transparent_22%),radial-gradient(circle_at_88%_84%,rgba(34,211,238,.13),transparent_23%)]" />
      <div className="pointer-events-none absolute left-[8%] top-[15%] -z-10 h-28 w-28 rounded-full border border-violet-200/60 dark:border-violet-900/30" />
      <div className="pointer-events-none absolute bottom-[12%] right-[10%] -z-10 h-20 w-20 rotate-12 rounded-2xl border border-cyan-200/70 dark:border-cyan-900/40" />
      <section className="w-full max-w-3xl text-center">
        <div className="relative mx-auto flex h-36 w-52 items-center justify-center sm:h-40 sm:w-64">
          <span className="absolute left-0 top-5 h-20 w-20 rounded-3xl bg-gradient-to-br from-violet-500 to-violet-700 opacity-95 shadow-xl shadow-violet-500/20" />
          <span className="absolute right-1 top-0 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 opacity-90 shadow-xl shadow-cyan-500/20" />
          <span className="relative text-7xl font-black tracking-[-0.12em] text-slate-950 drop-shadow-sm dark:text-white sm:text-8xl">404</span>
          <span className="absolute bottom-0 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-2xl border border-slate-200 bg-white text-violet-600 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-violet-300"><PageIcon name="search" size={19} /></span>
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Wrong turn, no harm done</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">This page wandered off.</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400">The link may be old, the route may have moved, or this is simply a page we haven’t built yet. Let’s get you somewhere useful.</p>

        <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-950"><span className="h-2 w-2 rounded-full bg-rose-400" /><span className="h-2 w-2 rounded-full bg-amber-400" /><span className="h-2 w-2 rounded-full bg-emerald-400" /><span className="ml-2 min-w-0 truncate font-mono text-[11px] text-slate-500 dark:text-slate-400">GET {requestedPath}</span><span className="ml-auto rounded-md bg-rose-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-rose-600 dark:bg-rose-950 dark:text-rose-300">404</span></div>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a id="not-found-home-link" href="/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-violet-700"><PageIcon name="sparkles" size={16} />Take me home</a>
          <button id="not-found-back-button" type="button" onClick={() => window.history.length > 1 ? window.history.back() : window.location.assign("/")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-violet-700 dark:hover:text-violet-300"><PageIcon name="arrowRight" className="rotate-180" size={16} />Go back</button>
        </div>

        <form id="not-found-search-form" onSubmit={handleSearch} className="mx-auto mt-7 flex max-w-md gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <label className="sr-only" htmlFor="not-found-search-input">Search Aster</label>
          <div className="flex min-w-0 flex-1 items-center gap-2 px-2"><PageIcon name="search" className="shrink-0 text-slate-400" size={17} /><input id="not-found-search-input" value={search} onChange={(event) => setSearch(event.target.value)} className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-white" placeholder="Search the help center" /></div>
          <button id="not-found-search-button" type="submit" className="rounded-xl bg-slate-950 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950">Search</button>
        </form>
        {message && <p id="not-found-search-message" role="status" className="mt-3 text-xs font-medium text-violet-700 dark:text-violet-300">{message}</p>}

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
          {[['/dashboard', 'Dashboard', 'View your team’s latest work', 'layout'], ['/projects', 'Projects', 'Find a project or create a new one', 'layers'], ['/help', 'Help center', 'Guides, answers, and support', 'circleHelp']].map(([href, title, detail, icon]) => <a id={`not-found-suggestion-${title.toLowerCase().replace(/\s/g, "-")}`} key={title} href={href} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-700"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-violet-100 group-hover:text-violet-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-violet-950 dark:group-hover:text-violet-300"><PageIcon name={icon} size={17} /></span><span className="mt-3 flex items-center justify-between gap-2 text-sm font-semibold text-slate-900 dark:text-white">{title}<PageIcon className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-violet-500 dark:text-slate-600" name="arrowRight" size={15} /></span><span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{detail}</span></a>)}
        </div>

        <div className="mt-7">
          <button id="not-found-diagnostics-toggle" type="button" onClick={() => setShowDiagnostics((current) => !current)} aria-expanded={showDiagnostics} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-violet-700 dark:text-slate-400 dark:hover:text-violet-300"><PageIcon name="terminal" size={15} />{showDiagnostics ? "Hide route details" : "Show route details"}<PageIcon className={showDiagnostics ? "rotate-180 transition" : "transition"} name="chevronDown" size={14} /></button>
          {showDiagnostics && <div id="not-found-diagnostics-panel" className="mx-auto mt-3 max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-left shadow-lg dark:border-slate-700"><div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5"><span className="h-2 w-2 rounded-full bg-emerald-400" /><span className="font-mono text-[10px] font-medium text-slate-400">route-diagnostics.log</span></div><pre className="overflow-x-auto p-4 text-left font-mono text-[11px] leading-6 text-slate-300">{`status: 404 Not Found\nrequested_path: ${requestedPath}\nrouter_mode: SPA fallback active\nnext_action: choose a destination above`}</pre></div>}
        </div>
      </section>
    </main>
  );
}
