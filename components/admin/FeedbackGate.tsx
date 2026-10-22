"use client";

import { useState, FormEvent } from "react";
import { Highlight } from "@/components/ui/Highlight";
import { ThemeToggle } from "@/components/layout/Header";
import { Lock, Loader2, AlertCircle, ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { siteConfig } from "@/lib/config";

interface FeedbackGateProps {
  onLogin: (email: string, pass: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export default function FeedbackGate({ onLogin, loading, error }: FeedbackGateProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password || loading) return;
    onLogin(email.trim(), password);
  };

  return (
    <section className="w-full min-h-screen bg-background text-foreground border-b border-border flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto px-6 py-16 sm:py-24 space-y-8">

        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-3">
            <span className="text-sm font-medium text-primary block">
              Admin Access
            </span>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-tight text-balance">
              Review user <Highlight>feedback</Highlight>
            </h1>

            <p className="text-[15px] sm:text-base text-muted-foreground leading-relaxed text-balance">
              Sign in with your admin credentials to access the feedback dashboard.
            </p>
          </div>

          <ThemeToggle className="h-10 w-10 shrink-0 rounded-xl border border-border bg-muted hover:bg-card text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center cursor-pointer" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="username"
              autoFocus
              required
              className="w-full h-12 bg-background border border-border rounded-xl px-4 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoComplete="current-password"
                required
                className="w-full h-12 bg-background border border-border rounded-xl pl-4 pr-11 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              disabled={loading || !email.trim() || !password}
              className="w-full sm:w-auto min-w-[180px] h-12 px-8 rounded-lg bg-primary text-primary-foreground font-medium text-[15px] shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>
        </form>

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
