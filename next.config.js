/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Para imágenes de perfil de Google
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
