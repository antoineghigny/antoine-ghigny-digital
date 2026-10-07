import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rema — Journal de rêves",
    short_name: "Rema",
    description: "Un journal de rêves par Antoine Ghigny.",
    start_url: "/fr",
    display: "browser",
    background_color: "#070809",
    theme_color: "#070809",
    icons: [{ src: "/icon.png", sizes: "256x256", type: "image/png" }],
  };
}
