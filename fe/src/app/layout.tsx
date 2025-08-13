import "@/styles/reset.scss";
import "@/styles/globals.scss";
import "@/styles/fonts.scss";

export const metadata = {
  title: "Glossy Matcha",
  description: "글로시 말차, 최고의 프리미엄 말차를 만나보세요.",
  icons: {
    icon: "/images/favicon/favicon.ico",
  },
  keywords: [
    "말차",
    "프리미엄 말차",
    "글로시 말차",
    "녹차",
    "건강음료",
    "프리미엄",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Glossy Matcha",
    description: "글로시 말차, 최고의 프리미엄 말차를 만나보세요.",
    url: "https://glossymatcha.com",
    siteName: "Glossy Matcha",
    images: [
      {
        url: "/images/logo/logo-BI.png",
        width: 1200,
        height: 630,
        alt: "Glossy Matcha",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
