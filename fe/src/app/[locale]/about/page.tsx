import Image from "next/image";
import ScrollNav from "@/components/Nav/ScrollNav";
import BrandIntro from "@/components/About/BrandIntro";
import BrandPhilosophy from "@/components/About/BrandPhilosophy";
import JejuMatcha from "@/components/About/JejuMatcha";
import BrandHistory from "@/components/About/BrandHistory";
import styles from "./page.module.scss";

export const metadata = {
  title: "About | Glossy Matcha",
  description:
    "글로시 말차 브랜드 소개 페이지 - 철학, 제주 유기농 말차, 연혁 등을 확인하세요.",
  keywords: [
    "말차",
    "프리미엄 말차",
    "글로시 말차",
    "녹차",
    "건강음료",
    "브랜드 소개",
    "브랜드 철학",
    "제주 유기농 말차",
    "연혁",
  ],
  openGraph: {
    title: "브랜드 소개 | Glossy Matcha",
    description:
      "글로시 말차 브랜드 소개 페이지 - 철학, 제주 유기농 말차, 연혁 등을 확인하세요.",
    url: "https://www.glossymatcha.com/ko/about",
  },
};

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
  const menuKeys = ["intro", "philosophy", "jeju-matcha", "history"];

  return (
    <main>
      <section className="main-banner">
        <h2 className="sr-only">브랜드 소개 페이지</h2>
        <Image
          className={styles["main-banner__image"]}
          src="/images/about/main-banner.webp"
          alt="브랜드 소개 매인 배너"
          width={1920}
          height={1280}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1920px"
          quality={60}
          priority
        />
      </section>
      <ScrollNav menuKeys={menuKeys} />
      <BrandIntro />
      <BrandPhilosophy />
      <JejuMatcha />
      <BrandHistory />
    </main>
  );
}
