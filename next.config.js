/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    // Remove TypeScript-specific configurations
    // typescript: {
    //   ignoreBuildErrors: true,
    // },
    // eslint: {
    //   ignoreDuringBuilds: true,
    // },
}

module.exports = nextConfig
