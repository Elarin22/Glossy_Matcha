import "@/styles/reset.scss";
import "@/styles/globals.scss";
import "@/styles/fonts.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
