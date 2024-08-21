/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "ship-strapi-next.onrender.com",
      },
    ],
  },
};

const emailJS_templateID = process.env.EMAILJS_TEMPLATE_ID;
const emailJS_publickKey = process.env.EMAILJS_PUBLIC_KEY;
const emailJS_serviceKey = process.env.EMAILJS_SEVICE_KEY;

export default nextConfig;
