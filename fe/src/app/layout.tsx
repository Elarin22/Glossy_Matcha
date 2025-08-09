import "@/styles/reset.scss";
import "@/styles/globals.scss";
import "@/styles/fonts.scss";
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
