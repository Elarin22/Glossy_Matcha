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
        <FadeInUp delay={200}>
          <h4 className={styles["brand-intro__title"]}>{t("title")}</h4>
        </FadeInUp>

        <FadeInUp delay={400}>
          <p className={styles["brand-intro__slogan"]}>
            &ldquo;{t("slogan")}&rdquo;
          </p>
        </FadeInUp>

        <FadeInUp delay={600}>
          <div className={styles["brand-intro__description"]}>
            <p className={styles["brand-intro__paragraph"]}>
              {t("description.paragraph-1")}
            </p>

            <p className={styles["brand-intro__paragraph"]}>
              {t("description.paragraph-2")}
            </p>

            <p className={styles["brand-intro__paragraph"]}>
              {t("description.paragraph-3")}
            </p>

            <p className={styles["brand-intro__paragraph"]}>
              {t("description.paragraph-4")}
            </p>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
