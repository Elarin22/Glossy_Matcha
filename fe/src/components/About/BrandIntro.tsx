"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import FadeInUp from "@/components/FadeInUp/FadeInUp";
import styles from "./BrandIntro.module.scss";

/**
 * 브랜드 소개 섹션 컴포넌트
 *
 * 글로시말차의 브랜드 철학과 비전을 소개하는 정적 콘텐츠 섹션
 * FadeInUp 애니메이션이 적용되어 스크롤 시 부드럽게 나타남
 *
 * @returns 브랜드 소개 섹션 컴포넌트
 */
export default function BrandIntro() {
  const t = useTranslations("about.intro");

  return (
    <section id="brand-intro" className={styles["brand-intro"]}>
      <h3 className="sr-only">브랜드 소개</h3>

      {/* 이미지 애니메이션 */}
      <FadeInUp delay={0}>
        <Image
          className={styles["brand-intro__image"]}
          src="/images/about/brand-intro.webp"
          alt="물에 글로시말차 가루를 섞어 젓는 장면"
          width={960}
          height={800}
        />
      </FadeInUp>

      <div className={styles["brand-intro__content"]}>
        {/* 타이틀 애니메이션 */}
        <FadeInUp delay={200}>
          <h4 className={styles["brand-intro__title"]}>{t("title")}</h4>
        </FadeInUp>

        {/* 슬로건 애니메이션 */}
        <FadeInUp delay={400}>
          <p className={styles["brand-intro__slogan"]}>
            &ldquo;{t("slogan")}&rdquo;
          </p>
        </FadeInUp>

        <div className={styles["brand-intro__description"]}>
          {/* 각 문단별로 순차적 애니메이션 */}
          <FadeInUp delay={600}>
            <p className={styles["brand-intro__paragraph"]}>
              {t("description.paragraph-1")}
            </p>
          </FadeInUp>

          <FadeInUp delay={600}>
            <p className={styles["brand-intro__paragraph"]}>
              {t("description.paragraph-2")}
            </p>
          </FadeInUp>

          <FadeInUp delay={600}>
            <p className={styles["brand-intro__paragraph"]}>
              {t("description.paragraph-3")}
            </p>
          </FadeInUp>

          <FadeInUp delay={600}>
            <p className={styles["brand-intro__paragraph"]}>
              {t("description.paragraph-4")}
            </p>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
