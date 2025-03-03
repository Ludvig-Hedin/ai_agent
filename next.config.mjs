/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com'],
  },
  
  // Disable static optimization to prevent build issues with custom components
  reactStrictMode: true,
  
  // Set environment variables
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  }
};

export default nextConfig; 