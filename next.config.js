/** @type {import('next').NextConfig} */
const getHost = () => process.env.FRONTHOST === undefined ? "localhost" : process.env.FRONTHOST;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://'+getHost()+':8085/:path*' // Proxy to Backend
            }
        ]
    },
    output: 'standalone'
}

module.exports = nextConfig
