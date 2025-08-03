import Image from "next/image";
import ScrollNav from "@/components/Nav/ScrollNav";
import BrandIntro from "@/components/About/BrandIntro";
import BrandPhilosophy from "@/components/About/BrandPhilosophy";
import JejuMatcha from "@/components/About/JejuMatcha";
import BrandHistory from "@/components/About/BrandHistory";

export default function About() {
    const mainMenuItems = [
        { label: "브랜드 소개", href: "#brand-intro" },
        { label: "브랜드 철학", href: "#philosophy" },
        { label: "제주 유기농 말차", href: "#jeju-matcha" },
        { label: "연혁", href: "#history" },
    ];

    return (
        <main>
            <section className="main-banner">
                <h2 className="sr-only">브랜드 소개 페이지</h2>
                <Image
                    src="/images/about/main-banner.svg"
                    alt="브랜드 소개 매인 배너"
                    width={1920}
                    height={600}
                />
            </section>
            <ScrollNav menuItems={mainMenuItems} />
            <BrandIntro />
            <BrandPhilosophy />
            <JejuMatcha />
            <BrandHistory />
        </main>
    );
}
