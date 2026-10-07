import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/fr/mockup/", "/en/mockup/"] },
    sitemap: "https://antoineghigny.be/sitemap.xml",
  };
}
