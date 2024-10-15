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
    // CLIENT_API_KEY_WIX: process.env.CLIENT_API_KEY_WIX,
    // CLIENT_SITE_ID_WIX: process.env.CLIENT_SITE_ID_WIX,
  },
};

export default nextConfig;
