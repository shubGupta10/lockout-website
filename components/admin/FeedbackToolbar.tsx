"use client";

import { Search } from "lucide-react";
import { FilterTab } from "./types";

interface FeedbackToolbarProps {
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    total: number;
    bugs: number;
    features: number;
    testimonials: number;
  };
}

export default function FeedbackToolbar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  counts,
}: FeedbackToolbarProps) {
  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.total },
    { key: "bug", label: "Bug report", count: counts.bugs },
    { key: "feature", label: "Feature idea", count: counts.features },
    { key: "testimonial", label: "Testimonials", count: counts.testimonials },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
      {/* Segmented Filter Pills */}
      <div
        role="radiogroup"
        aria-label="Filter feedback"
        className="flex flex-wrap items-center gap-2"
      >
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onTabChange(tab.key)}
              className={`h-10 px-3.5 text-xs sm:text-sm font-medium rounded-xl border transition-all cursor-pointer flex items-center justify-center text-center ${isSelected
                ? "bg-foreground text-background font-semibold shadow-sm"
                : "bg-muted border-border text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
            >
              <span>{tab.label}</span>
              <span className="ml-1.5 text-xs font-mono opacity-70">
                ({tab.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search in messages or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 bg-muted border border-border rounded-xl pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:bg-background focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all"
        />
      </div>
    </div>
  );
}
