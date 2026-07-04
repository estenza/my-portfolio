const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    qualities: [75, 95],
  },
};

module.exports = nextConfig;
