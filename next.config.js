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
});
