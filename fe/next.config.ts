import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "127.0.0.1", `${process.env.NEXT_PUBLIC_API_URL}`],
    formats: ["image/webp", "image/avif"],
  },
};

export default withNextIntl(nextConfig);
