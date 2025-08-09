import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider messages={messages}>
            <Header locale={locale} />
            {children}
            <Footer />
        </NextIntlClientProvider>
    );
}
