import { useState } from "react";
import PageIcon from "./PageIcon";

const initialForm = {
  name: "",
  email: "",
  company: "",
  topic: "",
  priority: "normal",
  message: "",
  followUp: "",
  consent: false,
  updates: true,
};

const topicOptions = [
  ["", "Select a topic"],
  ["account", "Account & workspace"],
  ["billing", "Billing & subscription"],
  ["technical", "Technical support"],
  ["security", "Security or privacy"],
  ["feedback", "Product feedback"],
];

const contactFaqs = [
  ["When can I expect a reply?", "Most requests receive a human response within two business hours, Monday through Friday. Priority incidents are routed immediately."],
  ["Where can I report a security concern?", "Choose Security or privacy in the form. For urgent issues, include a safe reproduction outline and our security team will follow up."],
  ["Can I book an onboarding session?", "Absolutely. Tell us about your team and select a preferred follow-up date. We’ll send a few times that work."],
];

function FieldError({ error }) {
  if (!error) return null;
  return <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"><PageIcon name="info" size={13} />{error}</p>;
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attachment, setAttachment] = useState("");
  const [faqOpen, setFaqOpen] = useState(null);
  const [toast, setToast] = useState("");

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.topic) next.topic = "Choose the area you need help with.";
    if (form.message.trim().length < 20) next.message = "Please share at least 20 characters so we can help.";
    if (!form.consent) next.consent = "Please confirm that we may contact you about this request.";
    return next;
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      notify("A few details need your attention.");
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      notify("Your request has been received.");
    }, 1150);
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setAttachment("");
    setSubmitted(false);
  };

  return (
    <div id="contact-us-page" className="mx-auto w-full max-w-7xl space-y-8 pb-12">
      <section className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-violet-50 px-5 py-8 shadow-sm dark:border-cyan-900/50 dark:from-cyan-950/35 dark:via-slate-950 dark:to-violet-950/35 sm:px-8 sm:py-11">
        <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 left-1/3 h-40 w-40 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-cyan-700 shadow-sm dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300"><PageIcon name="message" size={14} />Friendly, human support</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Let’s solve it together.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">Send a question, report an issue, or tell us what you’re building. The Aster team is here to help you keep moving.</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400"><span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" />Average reply: 1h 42m</span><span className="inline-flex items-center gap-1.5"><PageIcon name="clock" size={14} />Mon–Fri, 9am–6pm IST</span></div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          {!submitted ? <>
            <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-5 dark:border-slate-800 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">Contact form</p><h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">Tell us what’s on your mind</h2></div><p className="text-xs text-slate-500 dark:text-slate-400"><span className="text-rose-500">*</span> Required fields</p></div>
            <form id="contact-support-form" noValidate onSubmit={submit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Your name <span className="text-rose-500">*</span><input id="contact-name-input" value={form.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} className={`mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-950 dark:text-white ${errors.name ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15" : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/20 dark:border-slate-700"}`} placeholder="Alex Morgan" /> <FieldError error={errors.name} /></label>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Work email <span className="text-rose-500">*</span><input id="contact-email-input" value={form.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} className={`mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-950 dark:text-white ${errors.email ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15" : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/20 dark:border-slate-700"}`} placeholder="alex@company.com" type="email" /> <FieldError error={errors.email} /></label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Company <span className="font-normal text-slate-400">(optional)</span><input id="contact-company-input" value={form.company} onChange={(event) => updateField("company", event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Acme Labs" /></label>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">What can we help with? <span className="text-rose-500">*</span><select id="contact-topic-select" value={form.topic} onChange={(event) => updateField("topic", event.target.value)} aria-invalid={Boolean(errors.topic)} className={`mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 dark:bg-slate-950 dark:text-white ${errors.topic ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15" : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/20 dark:border-slate-700"}`}>{topicOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><FieldError error={errors.topic} /></label>
              </div>
              <fieldset><legend className="text-sm font-semibold text-slate-700 dark:text-slate-200">How urgent is this?</legend><div className="mt-2 grid gap-2 sm:grid-cols-3">{[["low", "Low", "A question or idea"], ["normal", "Normal", "Something isn’t clear"], ["high", "High", "Blocking current work"]].map(([value, label, detail]) => <label key={value} className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition ${form.priority === value ? "border-violet-400 bg-violet-50 dark:border-violet-700 dark:bg-violet-950/45" : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"}`}><input id={`contact-priority-${value}`} type="radio" value={value} checked={form.priority === value} onChange={(event) => updateField("priority", event.target.value)} className="mt-0.5 h-4 w-4 border-slate-300 accent-violet-600" /><span><span className="block text-sm font-semibold text-slate-800 dark:text-white">{label}</span><span className="mt-0.5 block text-[11px] leading-4 text-slate-500 dark:text-slate-400">{detail}</span></span></label>)}</div></fieldset>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">How can we help? <span className="text-rose-500">*</span><textarea id="contact-message-textarea" value={form.message} onChange={(event) => updateField("message", event.target.value)} aria-invalid={Boolean(errors.message)} rows="5" className={`mt-1.5 w-full resize-y rounded-xl border bg-white px-3.5 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-950 dark:text-white ${errors.message ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15" : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/20 dark:border-slate-700"}`} placeholder="Include what you were trying to do, what happened, and any details that might help us investigate." /><span className="mt-1.5 flex justify-between text-xs text-slate-400"><span>{form.message.length}/1000</span><span>Minimum 20 characters</span></span><FieldError error={errors.message} /></label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Preferred follow-up <span className="font-normal text-slate-400">(optional)</span><input id="contact-follow-up-date" value={form.followUp} onChange={(event) => updateField("followUp", event.target.value)} type="date" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" /></label>
                <div id="contact-file-drop-zone" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); const file = event.dataTransfer.files?.[0]; setAttachment(file?.name || "Dropped attachment"); }} className="flex flex-col justify-end"><input id="contact-file-input" className="sr-only" type="file" onChange={(event) => setAttachment(event.target.files?.[0]?.name || "")} /><label htmlFor="contact-file-input" className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3.5 py-2.5 transition hover:border-violet-400 hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-violet-700 dark:hover:bg-violet-950/30"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm dark:bg-slate-800"><PageIcon name="upload" size={16} /></span><span className="min-w-0"><span className="block truncate text-sm font-semibold text-slate-700 dark:text-slate-200">{attachment || "Add a screenshot"}</span><span className="block text-[11px] text-slate-500 dark:text-slate-400">PNG, JPG, PDF up to 10MB</span></span></label></div>
              </div>
              <div className="space-y-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"><label className="flex cursor-pointer gap-3 text-sm text-slate-600 dark:text-slate-300"><input id="contact-consent-checkbox" checked={form.consent} onChange={(event) => updateField("consent", event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-violet-600" type="checkbox" /><span>I agree that Aster may contact me about this support request. <span className="text-rose-500">*</span><FieldError error={errors.consent} /></span></label><label className="flex cursor-pointer gap-3 text-sm text-slate-600 dark:text-slate-300"><input id="contact-updates-checkbox" checked={form.updates} onChange={(event) => updateField("updates", event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-violet-600" type="checkbox" /><span>Send me occasional product tips and updates. You can unsubscribe anytime.</span></label></div>
              <div className="flex flex-col-reverse justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:items-center"><p className="text-xs leading-5 text-slate-500 dark:text-slate-400">By sending this message, you agree to our <a href="#privacy" className="font-semibold text-violet-700 hover:underline dark:text-violet-300">Privacy Policy</a>.</p><button id="submit-contact-form-button" disabled={submitting} type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-wait disabled:opacity-70"><PageIcon className={submitting ? "animate-pulse" : ""} name={submitting ? "clock" : "send"} size={16} />{submitting ? "Sending request…" : "Send message"}</button></div>
            </form>
          </> : <div id="contact-submission-success" className="flex min-h-[600px] flex-col items-center justify-center py-10 text-center"><span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-sm dark:bg-emerald-950 dark:text-emerald-300"><PageIcon name="checkCircle" size={30} /></span><p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">Request received</p><h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Thanks, {form.name.split(" ")[0]}.</h2><p className="mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">We’ve created a support request and sent a confirmation to <strong className="font-semibold text-slate-700 dark:text-slate-200">{form.email}</strong>. A specialist will be in touch soon.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><button id="contact-new-request-button" type="button" onClick={resetForm} className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Submit another request</button><a id="contact-view-help-link" href="/help" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-700 dark:border-slate-700 dark:text-slate-200">Browse help center</a></div></div>}
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-lg"><div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-300"><PageIcon name="message" size={19} /></span><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Online now</span></div><h2 className="mt-5 text-lg font-semibold">Need a faster answer?</h2><p className="mt-2 text-sm leading-6 text-slate-300">Search the help center or start a live chat for quick workspace questions.</p><div className="mt-5 grid gap-2"><a id="contact-help-center-link" href="/help" className="inline-flex items-center justify-between rounded-xl bg-white/10 px-3.5 py-2.5 text-sm font-semibold transition hover:bg-white/15">Browse help center <PageIcon name="arrowRight" size={16} /></a><button id="contact-chat-simulation-button" type="button" onClick={() => notify("Live chat opened — an agent will be with you shortly.")} className="inline-flex items-center justify-between rounded-xl border border-white/15 px-3.5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10">Start live chat <PageIcon name="message" size={16} /></button></div></div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Other ways to reach us</p><div className="mt-4 space-y-4"><a id="contact-email-link" href="mailto:hello@nimbus.example" className="flex gap-3 text-sm group"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300"><PageIcon name="mail" size={17} /></span><span><span className="block font-semibold text-slate-800 group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-300">Email us</span><span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">hello@nimbus.example</span></span></a><a id="contact-phone-link" href="tel:+918012345678" className="flex gap-3 text-sm group"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300"><PageIcon name="message" size={17} /></span><span><span className="block font-semibold text-slate-800 group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-300">Call our team</span><span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">+91 80 1234 5678</span></span></a><div className="flex gap-3 text-sm"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"><PageIcon name="mapPin" size={17} /></span><span><span className="block font-semibold text-slate-800 dark:text-white">Bengaluru HQ</span><span className="mt-0.5 block text-xs leading-5 text-slate-500 dark:text-slate-400">42 Indiranagar, Bengaluru<br />Karnataka 560038</span></span></div></div></div>
          <div className="rounded-3xl border border-violet-100 bg-violet-50 p-5 dark:border-violet-900/60 dark:bg-violet-950/35"><p className="text-sm font-semibold text-violet-900 dark:text-violet-100">Enterprise support</p><p className="mt-1 text-xs leading-5 text-violet-700 dark:text-violet-300">Priority response, tailored onboarding, and a named success partner for your organization.</p><button id="contact-enterprise-button" type="button" onClick={() => { updateField("topic", "account"); updateField("message", "I’d like to learn more about enterprise support and onboarding."); document.getElementById("contact-support-form")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-violet-700 hover:text-violet-900 dark:text-violet-300"><PageIcon name="arrowRight" size={14} />Talk to sales</button></div>
        </aside>
      </section>

      <section id="contact-faq" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">Before you send</p><h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">A few frequently asked questions</h2></div><div className="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-200 px-4 dark:divide-slate-800 dark:border-slate-800">{contactFaqs.map(([question, answer], index) => <div key={question}><button id={`contact-faq-toggle-${index + 1}`} type="button" onClick={() => setFaqOpen(faqOpen === index ? null : index)} aria-expanded={faqOpen === index} className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-slate-800 dark:text-slate-100"><span>{question}</span><PageIcon className={`shrink-0 text-violet-600 transition ${faqOpen === index ? "rotate-180" : ""}`} name="chevronDown" size={17} /></button>{faqOpen === index && <p id={`contact-faq-content-${index + 1}`} className="-mt-1 max-w-3xl pb-4 text-sm leading-6 text-slate-500 dark:text-slate-400">{answer}</p>}</div>)}</div></section>

      {toast && <div id="contact-toast-notification" role="status" aria-live="polite" className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-xl"><PageIcon className="text-emerald-300" name="checkCircle" size={17} />{toast}<button type="button" onClick={() => setToast("")} aria-label="Dismiss notification" className="ml-auto text-slate-400 hover:text-white"><PageIcon name="close" size={16} /></button></div>}
    </div>
  );
}
