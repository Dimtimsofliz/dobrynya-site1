import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://dobrynya-stroy.online";
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
