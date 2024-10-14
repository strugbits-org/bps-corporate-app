/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  env: {
    DEBUG_LOGS: process.env.DEBUG_LOGS,
  },
};

export default nextConfig;
