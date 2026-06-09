import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Indique explicitement la racine du workspace pour éviter l'avertissement
  // sur les lockfiles multiples (OneDrive + projet)
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
