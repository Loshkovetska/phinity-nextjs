module.exports = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'phinitytherapy.com',
      'https://phinitytherapy.com/react',
      '188.114.97.13:443',
    ],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
