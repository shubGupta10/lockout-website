"use client";

import { useState, useEffect } from "react";
import { fetchReleaseVersion } from "@/lib/github";
import { siteConfig } from "@/lib/config";



export default function GithubReleaseVersion({ prefix = " " }: { prefix?: string }) {
  const [version, setVersion] = useState<string>(siteConfig.release.version);

  useEffect(() => {
    const loadVersion = async () => {
      const v = await fetchReleaseVersion();
      if (v) setVersion(v);
    };

    loadVersion();
  }, []);

  return <span className="ml-1.5">{prefix}{version}</span>;
}

