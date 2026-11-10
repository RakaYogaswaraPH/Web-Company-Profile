import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    lang: "id",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0B0F19",
    theme_color: "#0B0F19",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
