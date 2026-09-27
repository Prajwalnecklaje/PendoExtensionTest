import { useMemo, useState } from "react";
import PageIcon from "./PageIcon";

function BrowserFrame({ children, label, accent = "violet", className = "", iframeProps = {} }) {
  const accents = {
    violet: "bg-violet-500",
    cyan: "bg-cyan-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
  };

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950 ${className}`}>
      <div className="flex h-10 items-center gap-2 border-b border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-900">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accents[accent]}`} />
          <span className="truncate">{label}</span>
        </div>
        <PageIcon className="text-slate-400" name="more" size={16} />
      </div>
      {children || <iframe className="block w-full border-0 bg-white" {...iframeProps} />}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">{eyebrow}</p>}
        <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h2>
        {description && <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}

const frameOptions = [
  { id: "origin", label: "Same-origin app", detail: "Interactive route from this deployment", icon: "layout", color: "violet" },
  { id: "public", label: "Public external content", detail: "OpenStreetMap embed, framed from a public host", icon: "globe", color: "cyan" },
  { id: "adaptive", label: "Adaptive card", detail: "A responsive embed with dynamic height", icon: "sliders", color: "amber" },
];

export default function EmbeddedContentPage() {
  const [frameVersion, setFrameVersion] = useState(1);
  const [toast, setToast] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [dropped, setDropped] = useState(false);
  const [config, setConfig] = useState({ layout: "responsive", sandbox: false, border: true, radius: 16 });

  const appEmbed = useMemo(
    () => `/embed-preview?source=workspace-dashboard&view=overview&v=${frameVersion}`,
    [frameVersion],
  );
  const compactEmbed = useMemo(
    () => `/embed-preview?source=compact-card&view=activity&v=${frameVersion}`,
    [frameVersion],
  );

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const reloadFrames = () => {
    setFrameVersion((current) => current + 1);
    setShowConfirm(false);
    notify("All same-origin embeds were refreshed.");
  };

  return (
    <div id="embedded-content-page" className="mx-auto w-full max-w-7xl space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-5 py-7 shadow-sm dark:border-violet-900/60 dark:from-violet-950/50 dark:via-slate-950 dark:to-cyan-950/30 sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute -right-12 -top-14 h-48 w-48 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur dark:border-violet-800 dark:bg-violet-950/60 dark:text-violet-300">
              <PageIcon name="layers" size={14} />
              Instrumented testing surface
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Embedded content lab</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
              A deliberately varied collection of framed experiences for testing load events, responsive behavior, cross-origin embeds, modal overlays, and route tracking.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              id="reload-embedded-content-button"
              type="button"
              onClick={() => setShowConfirm(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
            >
              <PageIcon name="sparkles" size={16} />
              Refresh app embeds
            </button>
            <a
              id="open-embed-preview-link"
              href="/embed-preview?source=standalone&view=overview"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-violet-700 dark:hover:text-violet-300"
            >
              Open preview
              <PageIcon name="external" size={15} />
            </a>
          </div>
        </div>
      </section>

      <section aria-label="Embed test scenarios" className="grid gap-4 md:grid-cols-3">
        {frameOptions.map((item) => (
          <button
            id={`embed-scenario-${item.id}`}
            key={item.id}
            type="button"
            onClick={() => document.getElementById(`embed-${item.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })}
            className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-700"
          >
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color === "cyan" ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300" : item.color === "amber" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" : "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"}`}>
              <PageIcon name={item.icon} size={19} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-900 dark:text-white">{item.label}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{item.detail}</span>
            </span>
            <PageIcon className="ml-auto mt-1 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-violet-500 dark:text-slate-600" name="arrowRight" size={16} />
          </button>
        ))}
      </section>

      <section id="embed-origin" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <SectionHeading
          eyebrow="Same application"
          title="Live workspace embed"
          description="This iframe loads a dedicated route from the same SPA, making it useful for validating nested navigation and same-origin events."
          action={<span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Same origin</span>}
        />
        <BrowserFrame label={`aster.local/embed-preview?source=workspace-dashboard&v=${frameVersion}`} className="shadow-md" iframeProps={{
          id: "iframe-same-origin-workspace",
          title: "Same application workspace preview",
          src: appEmbed,
          style: { height: 470 },
          loading: "eager",
        }} />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-950/70">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <PageIcon name="info" size={15} />
            <span>Frame revision <strong className="font-semibold text-slate-700 dark:text-slate-200">#{frameVersion}</strong> · route changes remain contained inside the preview.</span>
          </div>
          <button id="copy-app-iframe-url-button" type="button" onClick={() => { navigator.clipboard?.writeText(window.location.origin + appEmbed); notify("Same-origin iframe URL copied."); }} className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 transition hover:text-violet-900 dark:text-violet-300 dark:hover:text-violet-100">
            <PageIcon name="copy" size={14} />
            Copy URL
          </button>
        </div>
      </section>

      <section id="embed-public" className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400">Cross origin</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">Public external embed</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">A live OpenStreetMap frame provides a real public, cross-origin document in a compact side-by-side layout.</p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800"><dt className="text-slate-500 dark:text-slate-400">Origin</dt><dd className="font-medium text-slate-800 dark:text-slate-200">openstreetmap.org</dd></div>
            <div className="flex justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800"><dt className="text-slate-500 dark:text-slate-400">Viewport</dt><dd className="font-medium text-slate-800 dark:text-slate-200">4:3 landscape</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-slate-500 dark:text-slate-400">Purpose</dt><dd className="font-medium text-slate-800 dark:text-slate-200">Scroll + pointer tests</dd></div>
          </dl>
          <a id="external-iframe-source-link" href="https://www.openstreetmap.org" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-cyan-100">
            Visit source
            <PageIcon name="arrowUpRight" size={15} />
          </a>
        </div>
        <BrowserFrame label="https://www.openstreetmap.org/export/embed.html" accent="cyan" iframeProps={{
          id: "iframe-external-map",
          title: "External OpenStreetMap embed",
          src: "https://www.openstreetmap.org/export/embed.html?bbox=-0.1584%2C51.5066%2C-0.0914%2C51.5266&layer=mapnik",
          style: { minHeight: 350, height: "100%" },
          loading: "lazy",
          referrerPolicy: "no-referrer",
        }} />
      </section>

      <section id="embed-adaptive" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <SectionHeading
          eyebrow="Responsive behavior"
          title="Adaptive embed gallery"
          description="Each card preserves a different aspect ratio. Resize the browser or rotate a device to exercise responsive iframe layouts."
          action={<button id="open-iframe-modal-button" type="button" onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-950/60 dark:text-violet-300 dark:hover:bg-violet-950"><PageIcon name="play" size={15} />Open modal frame</button>}
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Responsive · 16:9</p>
            <BrowserFrame label="aster.local/embed-preview?source=compact-card" accent="amber" iframeProps={{
              id: "iframe-responsive-preview",
              title: "Responsive embedded dashboard card",
              src: compactEmbed,
              style: { aspectRatio: "16 / 9", height: "auto" },
              loading: "lazy",
            }} />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Two frames · nested grid</p>
            <div className="grid grid-cols-2 gap-3">
              <BrowserFrame label="compact/alpha" accent="violet" iframeProps={{
                id: "iframe-multiple-alpha",
                title: "Multiple iframe alpha preview",
                src: `/embed-preview?source=alpha&view=activity&v=${frameVersion}`,
                style: { aspectRatio: "4 / 5", height: "auto" },
                loading: "lazy",
              }} />
              <BrowserFrame label="compact/beta" accent="rose" iframeProps={{
                id: "iframe-multiple-beta",
                title: "Multiple iframe beta preview",
                src: `/embed-preview?source=beta&view=overview&v=${frameVersion}`,
                style: { aspectRatio: "4 / 5", height: "auto" },
                loading: "lazy",
              }} />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Iframe controls" className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <SectionHeading eyebrow="Control surface" title="Embed configuration" description="Controls are stateful on purpose and let automated tests target common form patterns." />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Layout preset
              <select id="iframe-layout-select" value={config.layout} onChange={(event) => setConfig({ ...config, layout: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                <option value="responsive">Responsive card</option>
                <option value="wide">Wide dashboard</option>
                <option value="portrait">Portrait panel</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Corner radius <span className="float-right text-violet-600 dark:text-violet-400">{config.radius}px</span>
              <input id="iframe-radius-slider" className="mt-3 w-full accent-violet-600" type="range" min="0" max="32" value={config.radius} onChange={(event) => setConfig({ ...config, radius: Number(event.target.value) })} />
            </label>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 transition hover:border-violet-300 dark:border-slate-700 dark:text-slate-200">
              <input id="iframe-sandbox-toggle" checked={config.sandbox} onChange={(event) => setConfig({ ...config, sandbox: event.target.checked })} className="h-4 w-4 rounded border-slate-300 accent-violet-600" type="checkbox" />
              <span><span className="block font-semibold">Sandbox mode</span><span className="text-xs text-slate-500 dark:text-slate-400">Record this setting</span></span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 transition hover:border-violet-300 dark:border-slate-700 dark:text-slate-200">
              <input id="iframe-border-toggle" checked={config.border} onChange={(event) => setConfig({ ...config, border: event.target.checked })} className="h-4 w-4 rounded border-slate-300 accent-violet-600" type="checkbox" />
              <span><span className="block font-semibold">Show border</span><span className="text-xs text-slate-500 dark:text-slate-400">Visual container toggle</span></span>
            </label>
          </div>
          <div id="iframe-config-preview" style={{ borderRadius: config.radius }} className={`mt-5 flex items-center justify-between gap-3 bg-slate-50 px-3.5 py-3 transition-all duration-200 dark:bg-slate-950 ${config.border ? "border border-violet-300 dark:border-violet-800" : "border border-transparent"}`}>
            <span className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm dark:bg-slate-800 dark:text-violet-300"><PageIcon name="layout" size={13} /></span>Active preview style</span>
            <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold capitalize text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">{config.layout} · {config.sandbox ? "sandboxed" : "open"}</span>
          </div>
          <button id="save-iframe-config-button" type="button" onClick={() => notify(`Saved ${config.layout} configuration.`)} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"><PageIcon name="check" size={16} />Save test configuration</button>
        </div>

        <div
          id="iframe-drop-zone"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => { event.preventDefault(); setDropped(true); notify("Embed payload dropped into the staging area."); }}
          className={`relative overflow-hidden rounded-3xl border border-dashed p-5 shadow-sm transition sm:p-6 ${dropped ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30" : "border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"}`}
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-300/20 blur-2xl" />
          <div className="relative flex h-full min-h-48 flex-col items-center justify-center text-center">
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${dropped ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300" : "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"}`}><PageIcon name={dropped ? "check" : "upload"} size={22} /></span>
            <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{dropped ? "Payload staged" : "Drop an embed payload"}</h3>
            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500 dark:text-slate-400">{dropped ? "Your event has been captured locally. Reset it to reproduce an empty state." : "Drag any file or text selection here to trigger a native drag-and-drop state."}</p>
            <button id="toggle-iframe-drop-state-button" type="button" onClick={() => setDropped((current) => !current)} className="mt-4 text-xs font-semibold text-violet-700 underline-offset-4 hover:underline dark:text-violet-300">{dropped ? "Reset staging area" : "Simulate successful drop"}</button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Conditional content</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">Embed event matrix</h2>
          </div>
          <button id="toggle-iframe-event-matrix-button" type="button" onClick={() => setShowMatrix((current) => !current)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-violet-700 dark:hover:text-violet-300"><PageIcon name={showMatrix ? "chevronDown" : "chevronRight"} size={16} />{showMatrix ? "Hide matrix" : "Reveal matrix"}</button>
        </div>
        {showMatrix && (
          <div id="iframe-event-matrix" className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-950 dark:text-slate-400"><tr><th className="px-4 py-3 font-semibold">Event</th><th className="px-4 py-3 font-semibold">Target</th><th className="px-4 py-3 font-semibold">Expected observation</th><th className="px-4 py-3 font-semibold">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[['load', 'Same-origin preview', 'Frame reaches interactive state', 'Ready'], ['resize', 'Responsive card', 'Width follows parent container', 'Ready'], ['pointer', 'External map', 'Scroll and pointer remain isolated', 'Ready'], ['dialog', 'Modal preview', 'Overlay traps visual focus', 'Manual']].map(([event, target, expected, status]) => (
                  <tr key={event} className="text-slate-600 dark:text-slate-300"><td className="px-4 py-3 font-mono text-xs text-violet-700 dark:text-violet-300">{event}</td><td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{target}</td><td className="px-4 py-3">{expected}</td><td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${status === 'Manual' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'}`}>{status}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showModal && (
        <div id="iframe-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="iframe-modal-title" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-auto rounded-3xl border border-white/20 bg-white p-4 shadow-2xl dark:bg-slate-900 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">Layered interaction</p><h2 id="iframe-modal-title" className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">Iframe in a modal</h2></div>
              <button id="close-iframe-modal-button" onClick={() => setShowModal(false)} type="button" aria-label="Close iframe modal" className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"><PageIcon name="close" size={20} /></button>
            </div>
            <BrowserFrame label="aster.local/embed-preview?source=modal" accent="rose" iframeProps={{
              id: "iframe-modal-preview",
              title: "Embedded preview inside a modal",
              src: `/embed-preview?source=modal&view=overview&v=${frameVersion}`,
              style: { height: "min(62vh, 540px)" },
              loading: "eager",
            }} />
          </div>
        </div>
      )}

      {showConfirm && (
        <div id="iframe-refresh-confirmation" role="alertdialog" aria-modal="true" aria-labelledby="iframe-refresh-title" className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"><PageIcon name="sparkles" size={21} /></span>
            <h2 id="iframe-refresh-title" className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">Refresh all app embeds?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">The same-origin previews will receive a new URL revision. External content remains untouched.</p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button id="cancel-iframe-refresh-button" type="button" onClick={() => setShowConfirm(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button><button id="confirm-iframe-refresh-button" type="button" onClick={reloadFrames} className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">Refresh embeds</button></div>
          </div>
        </div>
      )}

      {toast && <div id="iframe-toast-notification" role="status" aria-live="polite" className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-white"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><PageIcon name="check" size={15} /></span>{toast}<button type="button" onClick={() => setToast("")} aria-label="Dismiss notification" className="ml-auto text-slate-400 hover:text-slate-700 dark:hover:text-white"><PageIcon name="close" size={16} /></button></div>}
    </div>
  );
}
