const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n.ts', {
  // ✅ Hide /en from URLs
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  webpack(config) {
    config.devtool = false;
    return config;
  }
};

module.exports = withNextIntl(nextConfig);
