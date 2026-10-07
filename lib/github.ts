import { siteConfig } from "./config";

export interface ReleaseData {
    version: string;
    downloadUrl: string;
    date: string;
}

const lockoutGithubUrl = "https://api.github.com/repos/shubGupta10/focus-app/releases/latest";

export const fetchReleaseVersion = async (): Promise<string> => {
    try {
        const response = await fetch(lockoutGithubUrl, {
            headers: {
                "Accept": "application/vnd.github+json",
                "User-Agent": "Lockout-Web"
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch latest release")
        }

        const data = await response.json();
        return data.tag_name || siteConfig.release.version;
    } catch (error) {
        console.error("Failed to fetch release version")
        return siteConfig.release.version;
    }
}

export const fetchReleaseData = async () => {
    try {
        const response = await fetch(lockoutGithubUrl, {
            headers: {
                "Accept": "application/vnd.github+json",
                "User-Agent": "Lockout-Web",
            },
            next: { revalidate: 3600 }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch latest release")
        }

        const data = await response.json();

        const apkAssets = data.assets?.find((asset: any) => asset.name.endsWith(".apk"));

        return {
            version: data.tag_name || siteConfig.release.version,
            downloadUrl: apkAssets.browser_download_url || siteConfig.release.apkUrl,
            date: data.published_at ? new Date(data.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                : siteConfig.release.date
        };
    } catch (error) {
        console.error("Failed to fetch release data", error);
        return {
            version: siteConfig.release.version,
            downloadUrl: siteConfig.release.apkUrl,
            date: siteConfig.release.date
        };
    }
}

export const fetchAllRelease = async () => {
    try {
        const response = await fetch("https://api.github.com/repos/shubGupta10/focus-app/releases?per_page=10", {
            headers: {
                "Accept": "application/vnd.github+json",
                "User-Agent": "Lockout-Web"
            },
            next: { revalidate: 3600 }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const releases = await response.json();
        return releases
    } catch (error) {
        console.error("Failed to fetch releases:", error);
    }
}