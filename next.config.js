/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "blackout-poetry-bucket.s3.eu-west-1.amazonaws.com",
      "uploads-ssl.webflow.com",
    ],
  },
  swcMinify: true,
};

module.exports = nextConfig;
