import type { MetadataRoute } from "next";
import { topics } from "@/lib/topics";
import { getAllProblems } from "@/lib/problems";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zerotodsa.online";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
  ];

  const topicPages = topics.map((t) => ({
    url: `${base}/learn/${t.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const practiceListPages = topics.map((t) => ({
    url: `${base}/practice/${t.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const examPages = topics.map((t) => ({
    url: `${base}/exam/${t.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const problemPages = getAllProblems().map((p) => ({
    url: `${base}/practice/${p.topicId}/${p.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...topicPages,
    ...practiceListPages,
    ...examPages,
    ...problemPages,
  ];
}
