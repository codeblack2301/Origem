import type { NextConfig } from "next";

// Em produção/dev o browser só fala com a API "como se fosse local": o web
// faz proxy de /api/* para o apps/api (Fastify). Cookies httpOnly seguem no
// mesmo origin, evitando CORS/terceiras partes.
const apiUrl = process.env.API_INTERNAL_URL ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;