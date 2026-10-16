"use client";

import { useState, FormEvent } from "react";
import { Highlight } from "@/components/ui/Highlight";
import { ThemeToggle } from "@/components/layout/Header";
import { Lock, Loader2, AlertCircle, ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { siteConfig } from "@/lib/config";

interface FeedbackGateProps {
  onUnlock: (key: string) => void;
  loading: boolean;
  error: string | null;
}

export default function FeedbackGate({ onUnlock, loading, error }: FeedbackGateProps) {
  const [key, setKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed || loading) return;
    onUnlock(trimmed);
  };

  return (
    <section className="w-full min-h-screen bg-background text-foreground border-b border-border flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto px-6 py-16 sm:py-24 space-y-8">

        {/* Top Header with Theme Toggle */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-3">
            <span className="text-sm font-medium text-primary block">
              Admin Access
            </span>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-tight text-balance">
              Review user <Highlight>feedback</Highlight>
            </h1>

            <p className="text-[15px] sm:text-base text-muted-foreground leading-relaxed text-balance">
              Monitor incoming bug reports, feature ideas, and experience notes sent directly from the Lockout Android app.
            </p>
          </div>

          <ThemeToggle className="h-10 w-10 shrink-0 rounded-xl border border-border bg-muted hover:bg-card text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center cursor-pointer" />
        </div>

        {/* Unlock Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <label
              htmlFor="admin-key"
              className="block text-sm font-medium text-foreground mb-2.5"
            >
              Master Secret Key <span className="text-primary">*</span>
            </label>

            <div className="relative">
              <input
                id="admin-key"
                type={showKey ? "text" : "password"}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter ADMIN_KEY from .env"
                autoComplete="current-password"
                autoFocus
                required
                className="w-full h-12 bg-background border border-border rounded-xl pl-4 pr-11 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all"
              />
              <button
                type="button"
                onClick={() => setShowKey((prev) => !prev)}
                aria-label={showKey ? "Hide secret key" : "Show secret key"}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg cursor-pointer"
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-center gap-2.5 p-3.5 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !key.trim()}
              className="w-full sm:w-auto min-w-[180px] h-12 px-8 rounded-lg bg-primary text-primary-foreground font-medium text-[15px] shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Unlock Dashboard</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* GitHub Footer Link */}
        <div className="pt-6 border-t border-border">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>View project repository on GitHub</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
}