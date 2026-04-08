import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    remotePatterns:  [
      {
        protocol: 'https',
        hostname: 'ff126e1256bab3f51c5ea8f410b66835e85d31a746d8326e96f8543-apidata.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: "images-na.ssl-images-amazon.com",
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com'
      }
    ],
  }
};


export default nextConfig;
