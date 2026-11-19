import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("admin_session")?.value;
        const isCookieValid = verifySessionToken(sessionToken);
        const adminKey = req.headers.get("x-admin-key");
        const isKeyValid = Boolean(process.env.ADMIN_KEY && adminKey === process.env.ADMIN_KEY);

        if (!isCookieValid && !isKeyValid) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const headers: Record<string, string> = {
            "Accept": "application/vnd.github+json",
            "User-Agent": "Lockout-Web",
        };

        if (process.env.GITHUB_TOKEN) {
            headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
        }

        const response = await fetch("https://api.github.com/repos/shubGupta10/focus-app/releases?per_page=100", {
            headers,
            next: { revalidate: 300 },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `GitHub API error: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        let totalDownloads = 0;

        const processedReleases = data.map((release: any) => {
            const apkAssets = (release.assets || []).filter((asset: any) =>
                asset.name && asset.name.toLowerCase().endsWith(".apk")
            );

            const releaseDownloads = apkAssets.reduce(
                (sum: number, asset: any) => sum + (asset.download_count || 0),
                0
            );

            totalDownloads += releaseDownloads;

            return {
                tag: release.tag_name,
                name: release.name || release.tag_name,
                publishedAt: release.published_at,
                isPrerelease: Boolean(release.prerelease),
                downloads: releaseDownloads,
                assets: apkAssets.map((asset: any) => ({
                    name: asset.name,
                    downloads: asset.download_count || 0,
                    sizeMb: (asset.size / (1024 * 1024)).toFixed(1),
                    downloadUrl: asset.browser_download_url,
                })),
            };
        });

        const releases = processedReleases.map((release: any) => ({
            ...release,
            percentage:
                totalDownloads > 0
                    ? Number(((release.downloads / totalDownloads) * 100).toFixed(1))
                    : 0,
        }));

        const latest = releases[0] || null;
        const latestRelease = latest
            ? {
                tag: latest.tag,
                name: latest.name,
                publishedAt: latest.publishedAt,
                downloads: latest.downloads,
            }
            : null;

        return NextResponse.json({
            totalDownloads,
            totalReleases: releases.length,
            latestRelease,
            releases,
        }, { status: 200 });
    } catch (error) {
        console.error("GET admin stats error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}