"use client";

import { FormEvent, useState, useEffect } from "react";
import { siteConfig } from "@/lib/config";
import { Highlight } from "@/components/ui/Highlight";
import { CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from "lucide-react";

type FeedbackType = "bug" | "feature" | "testimonial";

interface FeedbackForm {
  type: FeedbackType;
  message: string;
  email: string;
  honeypot: string;
  device_info: string;
}

export default function FeedbackPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<FeedbackForm>({
    type: "bug",
    message: "",
    email: "",
    honeypot: "",
    device_info: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormData((prev) => ({
        ...prev,
        device_info: navigator.userAgent,
      }));
    }
  }, []);

  const handleChange = (field: keyof FeedbackForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedMessage = formData.message.trim();
    const trimmedEmail = formData.email.trim();

    if (trimmedMessage.length < 5) {
      setError("Please write at least 5 characters.");
      return;
    }

    if (trimmedMessage.length > 3000) {
      setError("Message cannot exceed 3000 characters.");
      return;
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address or leave it blank.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          message: trimmedMessage,
          email: trimmedEmail || null,
          device_info: formData.device_info || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const types: { id: FeedbackType; label: string }[] = [
    { id: "bug", label: "Bug report" },
    { id: "feature", label: "Feature idea" },
    { id: "testimonial", label: "Testimonial" },
  ];

  return (
    <section className="w-full min-h-[calc(100vh-80px)] bg-background text-foreground border-b border-border">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-28 sm:pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

          {/* Left Column: Direct, low-friction context */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10 py-1 lg:py-2">
            <div className="space-y-4 sm:space-y-5">
              <span className="text-sm font-medium text-primary">
                Feedback
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15] text-balance">
                Help shape what we <Highlight>build</Highlight> next
              </h1>

              <p className="text-[16px] sm:text-lg text-muted-foreground leading-relaxed text-balance">
                Lockout is an open-source, offline-first tool. Every note goes directly to the maintainer to guide bug fixes and future updates.
              </p>
            </div>

            <div className="pt-6 border-t border-border mt-auto">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Prefer public issues? View on GitHub</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Form (No Box) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="min-h-[420px] py-12 text-center flex flex-col items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5" />
                </div>

                <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-2">
                  Message received
                </h2>

                <p className="text-base text-muted-foreground max-w-sm leading-relaxed mb-6">
                  Thank you. Your feedback has been recorded.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData((prev) => ({
                      ...prev,
                      message: "",
                      email: "",
                    }));
                  }}
                  className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-background text-foreground text-sm font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-muted transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">

                {/* Feedback Type Selector */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">
                    Feedback Type
                  </label>

                  <div
                    role="radiogroup"
                    aria-label="Feedback type"
                    className="grid grid-cols-3 gap-2.5"
                  >
                    {types.map((item) => {
                      const isSelected = formData.type === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => handleChange("type", item.id)}
                          className={`h-11 px-3 text-xs sm:text-sm font-medium rounded-lg border transition-all cursor-pointer flex items-center justify-center text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${isSelected
                              ? "bg-foreground text-background border-foreground font-semibold shadow-sm"
                              : "bg-background border-zinc-300 dark:border-zinc-700 text-muted-foreground hover:text-foreground hover:border-zinc-400 dark:hover:border-zinc-600"
                            }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label
                      htmlFor="feedback-message"
                      className="text-sm font-medium text-foreground"
                    >
                      Message <span className="text-primary">*</span>
                    </label>
                    <span className="text-xs text-muted-foreground font-mono">
                      {formData.message.length > 0 && `${formData.message.length}/3000`}
                    </span>
                  </div>

                  <textarea
                    id="feedback-message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder={
                      formData.type === "bug"
                        ? "What happened, and how can we reproduce it?"
                        : formData.type === "feature"
                          ? "What would you like to see added or improved?"
                          : "How has Lockout helped your focus?"
                    }
                    className="w-full bg-background border border-zinc-300 dark:border-zinc-700 rounded-xl p-4 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all resize-y min-h-[160px]"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="feedback-email"
                    className="block text-sm font-medium text-foreground mb-2.5"
                  >
                    Email <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>

                  <input
                    id="feedback-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="name@example.com (if you'd like a reply)"
                    className="w-full h-12 bg-background border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all"
                  />
                </div>

                {/* Hidden Anti-Spam Field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => handleChange("honeypot", e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />

                {/* Error Notification */}
                {error && (
                  <div
                    role="alert"
                    className="flex items-center gap-2.5 p-3.5 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto min-w-[180px] h-12 px-8 rounded-lg bg-primary text-primary-foreground font-medium text-[15px] shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      "Send Feedback"
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}