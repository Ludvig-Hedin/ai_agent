/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/ai_agent' : '',
  trailingSlash: true,
  
  // Disable static optimization to prevent build issues with custom components
  reactStrictMode: true,
  
  env: {
    // Provide public variables here to prevent URL construction issues
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === 'production' ? '/ai_agent' : '',
  }
};

export default nextConfig; 