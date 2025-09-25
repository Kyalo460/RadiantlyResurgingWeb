/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.SITE_URL || "https://radiantlyresurging.vercel.app",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  // Add specific pages
  additionalPaths: async config => [
    await config.transform(config, "/"),
    await config.transform(config, "/about"),
    await config.transform(config, "/contact"),
    await config.transform(config, "/store"),
    await config.transform(config, "/archive"),
    await config.transform(config, "/studio")
  ]
};
