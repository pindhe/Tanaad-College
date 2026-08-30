import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/programs", destination: "/", permanent: false },
      { source: "/programs/:path*", destination: "/", permanent: false },
      { source: "/admissions", destination: "/contact", permanent: false },
      { source: "/apply", destination: "/contact", permanent: false },
      { source: "/application-status", destination: "/contact", permanent: false },
      { source: "/student-life", destination: "/", permanent: false },
      { source: "/news", destination: "/", permanent: false },
      { source: "/news/:path*", destination: "/", permanent: false },
      { source: "/events", destination: "/", permanent: false },
      { source: "/events/:path*", destination: "/", permanent: false },
      { source: "/search", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
