import { useMemo, useState } from "react";
import PageIcon from "./PageIcon";

const activity = [
  { initials: "AM", name: "Avery Morgan", action: "moved the launch brief to", emphasis: "Ready for review", time: "8m", tone: "violet" },
  { initials: "JL", name: "Jordan Lee", action: "shared a new recording in", emphasis: "Research notes", time: "22m", tone: "cyan" },
  { initials: "RK", name: "Rina Kapoor", action: "completed", emphasis: "Mobile handoff", time: "1h", tone: "amber" },
];

function Avatar({ initials, tone = "violet" }) {
  const tones = {
    violet: "bg-violet-100 text-violet-700",
    cyan: "bg-cyan-100 text-cyan-700",
    amber: "bg-amber-100 text-amber-700",
  };
  return <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold ${tones[tone]}`}>{initials}</span>;
}

export default function EmbedPreviewPage() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const source = params.get("source") || "workspace";
  const initialView = params.get("view") === "activity" ? "activity" : "overview";
  const [tab, setTab] = useState(initialView);
  const [taskDone, setTaskDone] = useState(false);
  const [signal, setSignal] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const prettySource = source.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

  const sendSignal = () => {
    const payload = { type: "nimbus-embed-interaction", action: "quick-signal", source, timestamp: Date.now() };
    if (window.parent && window.parent !== window) window.parent.postMessage(payload, "*");
    setSignal("Signal sent to parent window");
    window.setTimeout(() => setSignal(""), 2500);
  };

  return (
    <main id="embedded-preview-page" className="min-h-screen bg-slate-50 p-3 font-sans text-slate-800 antialiased sm:p-4">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-3 py-2.5 sm:px-4">
          <a href="/dashboard" target="_top" className="flex min-w-0 items-center gap-2" aria-label="Open Aster workspace">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 text-[10px] font-black text-white shadow-sm">N</span>
            <span className="truncate text-xs font-bold tracking-tight text-slate-900">Aster <span className="font-medium text-slate-400">/ {prettySource}</span></span>
          </a>
          <div className="relative flex items-center gap-1.5">
            <button id="embed-preview-notification-button" type="button" onClick={sendSignal} className="relative rounded-lg p-1.5 text-slate-500 transition hover:bg-violet-50 hover:text-violet-700" aria-label="Send parent window signal"><PageIcon name="bell" size={15} /><span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" /></button>
            <button id="embed-preview-menu-button" type="button" onClick={() => setMenuOpen((current) => !current)} className="flex items-center gap-1 rounded-lg p-1 transition hover:bg-slate-100" aria-expanded={menuOpen}><Avatar initials="NP" /><PageIcon name="chevronDown" size={12} /></button>
            {menuOpen && <div id="embed-preview-profile-menu" className="absolute right-0 top-9 z-10 w-40 rounded-xl border border-slate-200 bg-white p-1.5 text-xs shadow-xl"><a className="flex items-center gap-2 rounded-lg px-2.5 py-2 font-medium text-slate-600 hover:bg-slate-50" href="/profile" target="_top"><PageIcon name="users" size={13} />View profile</a><a className="flex items-center gap-2 rounded-lg px-2.5 py-2 font-medium text-slate-600 hover:bg-slate-50" href="/settings" target="_top"><PageIcon name="settings" size={13} />Settings</a></div>}
          </div>
        </header>

        <div className="flex items-center gap-1 border-b border-slate-100 px-3 pt-2 sm:px-4">
          {[
            ["overview", "Overview"],
            ["activity", "Activity"],
          ].map(([key, label]) => (
            <button key={key} id={`embed-preview-tab-${key}`} onClick={() => setTab(key)} type="button" className={`border-b-2 px-2.5 py-2 text-[11px] font-semibold transition ${tab === key ? "border-violet-600 text-violet-700" : "border-transparent text-slate-400 hover:text-slate-700"}`}>{label}</button>
          ))}
          <span className="ml-auto pb-2 text-[10px] font-medium text-slate-400">Live preview</span>
        </div>

        {tab === "overview" ? (
          <div className="p-3 sm:p-4">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-700 via-violet-600 to-cyan-600 p-3.5 text-white sm:p-4">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-300/20 blur-2xl" />
              <p className="relative text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-100">Product pulse</p>
              <div className="relative mt-1.5 flex items-end justify-between gap-2"><div><h1 className="text-base font-bold tracking-tight sm:text-lg">Quarterly momentum</h1><p className="mt-1 max-w-xs text-[10px] leading-4 text-violet-100">Your team is moving through the final review cycle with a healthy delivery trend.</p></div><span className="rounded-lg bg-white/15 px-2 py-1 text-[10px] font-bold backdrop-blur">+18.4%</span></div>
              <div className="relative mt-3 flex h-9 items-end gap-1"><span className="h-3 flex-1 rounded-t bg-white/30" /><span className="h-5 flex-1 rounded-t bg-white/40" /><span className="h-4 flex-1 rounded-t bg-white/30" /><span className="h-7 flex-1 rounded-t bg-white/60" /><span className="h-6 flex-1 rounded-t bg-white/50" /><span className="h-9 flex-1 rounded-t bg-white" /><span className="h-8 flex-1 rounded-t bg-white/80" /></div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {[['82%', 'Delivery', 'text-violet-700 bg-violet-50'], ['24', 'Open tasks', 'text-cyan-700 bg-cyan-50'], ['4.8', 'Team pulse', 'text-amber-700 bg-amber-50']].map(([value, label, style]) => <div key={label} className={`rounded-xl p-2.5 ${style}`}><p className="text-sm font-bold leading-none">{value}</p><p className="mt-1 text-[9px] font-semibold opacity-70">{label}</p></div>)}
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-xl border border-slate-100 p-3">
                <div className="flex items-center justify-between"><p className="text-[11px] font-bold text-slate-800">Today’s focus</p><span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">On track</span></div>
                <button id="embed-preview-task-toggle" onClick={() => setTaskDone((current) => !current)} type="button" className="mt-2.5 flex w-full items-center gap-2 text-left"><span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${taskDone ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 bg-white"}`}>{taskDone && <PageIcon name="check" size={10} strokeWidth={3} />}</span><span className={`text-[10px] font-medium ${taskDone ? "text-slate-400 line-through" : "text-slate-600"}`}>Review launch messaging</span><span className="ml-auto text-[9px] text-slate-400">2:30 PM</span></button>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[76%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" /></div>
              </div>
              <button id="embed-preview-signal-button" type="button" onClick={sendSignal} className="rounded-xl border border-dashed border-violet-200 bg-violet-50 p-3 text-left transition hover:border-violet-400 hover:bg-violet-100"><span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm"><PageIcon name="send" size={12} /></span><p className="mt-2 text-[10px] font-bold text-violet-800">Post a signal</p><p className="mt-1 text-[9px] leading-3 text-violet-600">Send a postMessage event to the parent window.</p></button>
            </div>
          </div>
        ) : (
          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between"><div><p className="text-sm font-bold text-slate-900">Recent activity</p><p className="mt-0.5 text-[10px] text-slate-400">Events from the last 90 minutes</p></div><button id="embed-preview-filter-button" type="button" onClick={sendSignal} className="rounded-lg border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-600 hover:border-violet-300 hover:text-violet-700"><PageIcon className="mr-1 inline" name="filter" size={11} />Filter</button></div>
            <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-100 px-3">{activity.map((item) => <div key={item.name} className="flex items-center gap-2 py-2.5"><Avatar initials={item.initials} tone={item.tone} /><p className="min-w-0 flex-1 text-[10px] leading-4 text-slate-500"><strong className="font-bold text-slate-700">{item.name}</strong> {item.action} <strong className="font-semibold text-violet-700">{item.emphasis}</strong></p><span className="text-[9px] font-medium text-slate-400">{item.time}</span></div>)}</div>
            <button id="embed-preview-load-more-button" type="button" onClick={() => setSignal("No newer activity yet") } className="mt-3 w-full rounded-lg border border-slate-200 py-2 text-[10px] font-semibold text-slate-600 transition hover:border-violet-300 hover:text-violet-700">Load more activity</button>
          </div>
        )}
      </section>
      {signal && <div id="embed-preview-signal-toast" role="status" className="fixed bottom-3 right-3 z-20 flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-[10px] font-semibold text-white shadow-lg"><PageIcon name="checkCircle" size={13} />{signal}</div>}
    </main>
  );
}
