import Image from "next/image";
import ScrollNav from "@/components/Nav/ScrollNav";
import BrandIntro from "@/components/About/BrandIntro";
import BrandPhilosophy from "@/components/About/BrandPhilosophy";
import JejuMatcha from "@/components/About/JejuMatcha";
import BrandHistory from "@/components/About/BrandHistory";

/**
 * 브랜드 소개 페이지 컴포넌트
 *
 * 브랜드 소개, 철학, 제주 유기농 말차, 연혁 섹션으로 구성된 어바웃 페이지를 렌더링합니다.
 * 스크롤 네비게이션을 통해 각 섹션으로 이동할 수 있습니다.
 *
 * @returns 브랜드 소개 페이지 컴포넌트
 */
export default function About() {
    /** 스크롤 네비게이션에 표시될 메뉴 항목들 */
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
