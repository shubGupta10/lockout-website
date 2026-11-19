"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
    Download,
    RefreshCw,
    AlertCircle,
    ExternalLink,
    Search,
} from "lucide-react";
import FeedbackGate from "@/components/admin/FeedbackGate";

interface ReleaseAsset {
    name: string;
    downloads: number;
    sizeMb: string;
    downloadUrl: string;
}

interface ReleaseItem {
    tag: string;
    name: string;
    publishedAt: string;
    isPrerelease: boolean;
    downloads: number;
    percentage: number;
    assets: ReleaseAsset[];
}

interface StatsData {
    totalDownloads: number;
    totalReleases: number;
    latestRelease: {
        tag: string;
        name: string;
        publishedAt: string;
        downloads: number;
    } | null;
    releases: ReleaseItem[];
}

function formatDate(dateStr: string) {
    if (!dateStr) return "—";
    try {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    } catch {
        return dateStr;
    }
}

export default function AdminStatsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterMode, setFilterMode] = useState<"all" | "stable" | "preview">("all");

    const loadStats = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/admin/stats");

            if (res.status === 401) {
                setIsAuthenticated(false);
                return;
            }

            if (!res.ok) {
                throw new Error("Failed to load download stats");
            }

            const data = await res.json();
            setStats(data);
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
        loadStats();
    }, [loadStats]);

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
            await loadStats();
        } catch {
            setError("Network error logging in");
        } finally {
            setLoading(false);
        }
    };

    const averagePerRelease = useMemo(() => {
        if (!stats || stats.totalReleases === 0) return 0;
        return Math.round(stats.totalDownloads / stats.totalReleases);
    }, [stats]);

    const filteredReleases = useMemo(() => {
        if (!stats) return [];
        const q = searchQuery.toLowerCase().trim();

        return stats.releases.filter((rel) => {
            if (filterMode === "stable" && rel.isPrerelease) return false;
            if (filterMode === "preview" && !rel.isPrerelease) return false;

            if (!q) return true;
            return (
                rel.tag.toLowerCase().includes(q) ||
                rel.name.toLowerCase().includes(q)
            );
        });
    }, [stats, searchQuery, filterMode]);

    if (initializing) {
        return (
            <section className="w-full min-h-[60vh] flex items-center justify-center">
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

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-border">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                            Download Stats
                        </h1>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                            GitHub release APK telemetry and lifetime metrics.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => loadStats()}
                        disabled={loading}
                        className="h-8 px-3 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-foreground transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer disabled:opacity-50"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                        <span>Refresh</span>
                    </button>
                </div>

                {error && (
                    <div
                        role="alert"
                        className="flex items-center gap-2.5 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs sm:text-sm"
                    >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 border border-border rounded-xl divide-y md:divide-y-0 md:divide-x divide-border bg-card">
                    <div className="p-4 sm:p-5">
                        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                            Total Downloads
                        </span>
                        <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mt-1 tabular-nums">
                            {stats?.totalDownloads.toLocaleString() ?? 0}
                        </div>
                    </div>

                    <div className="p-4 sm:p-5">
                        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                            Latest Version
                        </span>
                        <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mt-1 font-mono">
                            {stats?.latestRelease?.tag ?? "—"}
                        </div>
                    </div>

                    <div className="p-4 sm:p-5">
                        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                            Total Releases
                        </span>
                        <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mt-1 tabular-nums">
                            {stats?.totalReleases ?? 0}
                        </div>
                    </div>

                    <div className="p-4 sm:p-5">
                        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                            Avg / Release
                        </span>
                        <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mt-1 tabular-nums">
                            {averagePerRelease.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div className="relative w-full sm:w-72">
                        <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter by tag or title..."
                            className="w-full h-8 pl-8 pr-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-xs focus:outline-none focus:border-foreground transition-colors"
                        />
                    </div>

                    <div className="inline-flex items-center gap-1 text-xs self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => setFilterMode("all")}
                            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${filterMode === "all"
                                ? "bg-muted font-medium text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            All ({stats?.releases.length ?? 0})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterMode("stable")}
                            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${filterMode === "stable"
                                ? "bg-muted font-medium text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Stable
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterMode("preview")}
                            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${filterMode === "preview"
                                ? "bg-muted font-medium text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Prerelease
                        </button>
                    </div>
                </div>

                {filteredReleases.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-border rounded-xl bg-card">
                        <p className="text-sm font-medium text-foreground">No releases found</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stats?.releases.length === 0
                                ? "No release data available from GitHub."
                                : "No releases match your active filter."}
                        </p>
                    </div>
                ) : (
                    <div className="border border-border rounded-xl overflow-hidden bg-card">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/40 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                                        <th className="py-2.5 px-4 font-medium">Version</th>
                                        <th className="py-2.5 px-4 font-medium">Release Title</th>
                                        <th className="py-2.5 px-4 font-medium">Published</th>
                                        <th className="py-2.5 px-4 font-medium text-right">Downloads</th>
                                        <th className="py-2.5 px-4 font-medium">APK File</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredReleases.map((release, index) => {
                                        const isLatest = index === 0 && filterMode === "all" && !searchQuery;

                                        return (
                                            <tr key={release.tag} className="hover:bg-muted transition-colors">
                                                <td className="py-3 px-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-1.5">
                                                        <a
                                                            href={`https://github.com/shubGupta10/focus-app/releases/tag/${release.tag}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="font-mono text-xs font-medium text-foreground hover:underline inline-flex items-center gap-1"
                                                        >
                                                            <span>{release.tag}</span>
                                                        </a>
                                                        {isLatest && (
                                                            <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-muted text-foreground border border-border">
                                                                Latest
                                                            </span>
                                                        )}
                                                        {release.isPrerelease && (
                                                            <span className="text-[10px] font-medium px-1.5 py-0.2 rounded text-muted-foreground border border-border">
                                                                Pre
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="py-3 px-4 text-xs text-foreground max-w-xs truncate">
                                                    {release.name}
                                                </td>

                                                <td className="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">
                                                    {formatDate(release.publishedAt)}
                                                </td>

                                                <td className="py-3 px-4 text-xs font-semibold text-foreground text-right tabular-nums whitespace-nowrap">
                                                    {release.downloads.toLocaleString()}
                                                </td>

                                                <td className="py-3 px-4 whitespace-nowrap">
                                                    {release.assets.length > 0 ? (
                                                        <div className="flex items-center gap-2">
                                                            {release.assets.map((asset) => (
                                                                <a
                                                                    key={asset.name}
                                                                    href={asset.downloadUrl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-xs font-mono text-muted-foreground hover:text-foreground inline-flex items-center gap-1 hover:underline"
                                                                    title={`Download ${asset.name} (${asset.sizeMb} MB)`}
                                                                >
                                                                    <Download className="w-3 h-3 text-muted-foreground" />
                                                                    <span>{asset.name}</span>
                                                                    <span className="text-[11px] text-muted-foreground">({asset.sizeMb} MB)</span>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">—</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
