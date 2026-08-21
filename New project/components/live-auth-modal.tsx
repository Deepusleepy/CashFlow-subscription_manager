"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../lib/supabase";

export function LiveAuthModal({ email, onClose, onComplete, onSignOut }: { email: string | null; onClose: () => void; onComplete: () => void; onSignOut: () => void }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage("");
    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email: formEmail, password })
      : await supabase.auth.signUp({ email: formEmail, password });
    setBusy(false);
    if (result.error) { setMessage(result.error.message); return; }
    if (mode === "signup" && !result.data.session) { setMessage("Account created. Confirm your email, then sign in."); return; }
    onComplete();
  };

  return <div className="drawer-backdrop" role="presentation" onMouseDown={onClose}><section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" onMouseDown={event => event.stopPropagation()}>
    <button className="close-btn" onClick={onClose} aria-label="Close connection dialog"><X size={20}/></button>
    <p className="eyebrow">PRIVATE LIVE DATA</p><h2 id="auth-title">{email ? "Supabase is connected" : "Connect your CashFlow data"}</h2>
    {email ? <><p className="auth-copy">Signed in as <b>{email}</b>. CashFlow will read your own transaction rows and listen for realtime updates.</p><div className="drawer-actions"><button className="secondary-btn" onClick={async () => { await supabase?.auth.signOut(); onSignOut(); onClose(); }}>Sign out</button><button className="primary-btn" onClick={onClose}>Done</button></div></> : <>
      <p className="auth-copy">Create an account or sign in to use the secure Supabase transaction table. Demo data stays available until your account has live rows.</p>
      <form className="auth-form" onSubmit={submit}><label>Email<input type="email" autoComplete="email" required value={formEmail} onChange={event => setFormEmail(event.target.value)} /></label><label>Password<input type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={6} required value={password} onChange={event => setPassword(event.target.value)} /></label>{message && <p className="auth-message">{message}</p>}<button className="primary-btn auth-submit" disabled={busy}>{busy ? "Connecting…" : mode === "signin" ? "Sign in to Supabase" : "Create Supabase account"}</button></form><button className="auth-toggle" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }}>{mode === "signin" ? "Need an account? Create one" : "Already have an account? Sign in"}</button>
    </>}
  </section></div>;
}
