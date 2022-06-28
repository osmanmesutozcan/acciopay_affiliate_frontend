/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    IS_LOCAL: process.env.IS_LOCAL,
  },
  images: {
    domains: ["test.acciopay.panikka.studio", "acciopay_backend.test", "localhost", "staging.acciopay.sg", "api.staging.acciopay.sg"],
  },

  redirects() {
    return [
      {
        source: "/callback",
        destination: "/verification/callback",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
