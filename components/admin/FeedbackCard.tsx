"use client";

import { useState } from "react";
import {
  Calendar,
  Mail,
  Smartphone,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FeedbackItem } from "./types";

interface FeedbackCardProps {
  item: FeedbackItem;
}

export default function FeedbackCard({ item }: FeedbackCardProps) {
  const [copied, setCopied] = useState(false);
  const [showDevice, setShowDevice] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(d);
    } catch {
      return dateString;
    }
  };

  const getLabel = () => {
    switch (item.type) {
      case "bug":
        return "Bug report";
      case "feature":
        return "Feature idea";
      case "testimonial":
        return "Testimonial";
      default:
        return item.type;
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-border bg-card space-y-4">
      {/* Top Bar: Badge, Date, and Copy */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="h-7 px-2.5 rounded-lg border border-border bg-muted text-foreground text-xs font-medium inline-flex items-center">
            {getLabel()}
          </span>

          <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(item.created_at)}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="h-8 px-2.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Message Body */}
      <p className="text-[15px] sm:text-base text-foreground leading-relaxed whitespace-pre-wrap font-normal">
        {item.message}
      </p>

      {/* Card Footer: Email & Device Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-border">
        {item.email ? (
          <a
            href={`mailto:${item.email}?subject=Lockout Feedback Follow-up`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground hover:underline transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{item.email}</span>
          </a>
        ) : (
          <span className="text-xs text-muted-foreground italic px-1">Anonymous submission</span>
        )}

        {item.device_info && (
          <div className="flex flex-col items-end">
            <button
              type="button"
              onClick={() => setShowDevice(!showDevice)}
              className="h-8 px-2.5 rounded-lg bg-background border border-border hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Device info</span>
              {showDevice ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {showDevice && (
              <div className="mt-2 p-3 rounded-xl border border-border bg-muted text-muted-foreground font-mono text-xs max-w-lg break-all text-left">
                {item.device_info}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
