module.exports = {
  siteUrl: process.env.SITE_URL || 'https://phinitytherapy.com/',
  generateRobotsTxt: true, // (optional)
  // REST CODE READ DOCS  ...
  robotsTxtOptions: {
    policies: [
      {
        disallow: ['/clear'],
      },
    ],
  },
}
