import  Footer  from '@/components/Footer/Footer'; 

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body>{children}
                <Footer />
            </body>
        </html>
    );
}