module.exports = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  dev: {
    baseUrl: "http://localhost:3000",
  },
  i18n: { locales: ["ja"], defaultLocale: "ja" },
};
