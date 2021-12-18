const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa:
    process.env.NODE_ENV == 'production'
      ? {
          dest: 'public',
          runtimeCaching,
        }
      : false,
  reactStrictMode: true,
  distDir: 'build',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
});
