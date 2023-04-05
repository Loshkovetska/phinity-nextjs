module.exports = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: false,
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: [
      'phinitytherapy.com',
      'https://phinitytherapy.com/admin/react',
      '188.114.97.13:443',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    config.optimization.minimize = false
    return config
  },
}
