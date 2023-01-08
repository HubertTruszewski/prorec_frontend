/** @type {import('next').NextConfig} */
const backendHost = process.env.BACKENDHOST === undefined ? "localhost" : process.env.BACKENDHOST;
const backendPort = process.env.BACKENDPORT === undefined ? "8085" : process.env.BACKENDPORT;

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://' + backendHost + ':' + backendPort + '/:path*' // Proxy to Backend
            }
        ]
    },
    output: 'standalone'
}

module.exports = nextConfig
