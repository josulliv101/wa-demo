/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/all",
      },
    ];
  },
};

export default nextConfig;
