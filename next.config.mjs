/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [
        'lh3.googleusercontent.com',
        'avatars.githubusercontent.com',
        // Adicione outros domínios conforme necessário
      ],
    },
  };

export default nextConfig;
