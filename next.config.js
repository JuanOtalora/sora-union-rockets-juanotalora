/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['secure.gravatar.com', 'avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig
