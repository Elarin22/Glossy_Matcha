// Next.js 미들웨어 - 언어 감지 및 리다이렉트
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ko", "en"],
  defaultLocale: "ko",
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)", "/"],
};
