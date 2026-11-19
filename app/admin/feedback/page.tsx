"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Highlight } from "@/components/ui/Highlight";
import FeedbackGate from "@/components/admin/FeedbackGate";
import FeedbackToolbar from "@/components/admin/FeedbackToolbar";
import FeedbackCard from "@/components/admin/FeedbackCard";
import { FeedbackItem, FilterTab } from "@/components/admin/types";

export default function AdminFeedbackPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const loadFeedbacks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/feedback");

      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to load feedbacks");
      }

      const data = await res.json();
      setFeedbacks(data.feedbacks || []);
      setIsAuthenticated(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error";
      setError(message);
    } finally {
      setLoading(false);
      setInitializing(false);
    }
  }, []);

  useEffect(() => {
    loadFeedbacks();
  }, [loadFeedbacks]);

  const handleLogin = async (email: string, pass: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed");
        return;
      }

      setIsAuthenticated(true);
      await loadFeedbacks();
    } catch {
      setError("Network error logging in");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      setIsAuthenticated(false);
      setFeedbacks([]);
      setActiveTab("all");
      setSearchQuery("");
      setError(null);
    }
  };

  const counts = useMemo(() => {
    let bugs = 0;
    let features = 0;
    let testimonials = 0;

    for (const f of feedbacks) {
      if (f.type === "bug") bugs++;
      else if (f.type === "feature") features++;
      else if (f.type === "testimonial") testimonials++;
    }

    return {
      total: feedbacks.length,
      bugs,
      features,
      testimonials,
    };
  }, [feedbacks]);

  const filteredFeedbacks = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return feedbacks.filter((item) => {
      const matchesTab = activeTab === "all" || item.type === activeTab;
      if (!query || !matchesTab) return matchesTab;

      return (
        item.message.toLowerCase().includes(query) ||
        (item.email && item.email.toLowerCase().includes(query)) ||
        (item.device_info && item.device_info.toLowerCase().includes(query))
      );
    });
  }, [feedbacks, activeTab, searchQuery]);

  if (initializing) {
    return (
      <section className="w-full min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-5 h-5 text-muted-foreground animate-spin" />
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <FeedbackGate
        onLogin={handleLogin}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <section className="w-full min-h-screen text-foreground">
      <div className="w-full max-w-6xl mx-auto px-6 py-6 sm:py-8 space-y-6">

        <div className="space-y-2 pb-5 border-b border-border">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            User Feedback
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Submissions received directly from the Lockout Android app.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-center gap-2.5 p-3.5 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <FeedbackToolbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={counts}
        />

        {filteredFeedbacks.length === 0 ? (
          <div className="p-16 text-center border border-dashed border-border rounded-2xl bg-muted">
            <p className="text-base font-semibold text-foreground">No submissions found</p>
            <p className="text-sm text-muted-foreground mt-1.5">
              {feedbacks.length === 0
                ? "No one has sent feedback through the app yet."
                : "No items match your active filter or search query."}
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFeedbacks.map((item) => (
              <FeedbackCard key={item.id} item={item} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}