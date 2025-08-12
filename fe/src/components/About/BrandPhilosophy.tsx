"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import FadeInUp from "@/components/FadeInUp/FadeInUp";
import styles from "./BrandPhilosophy.module.scss";

/**
 * 브랜드 철학 섹션 컴포넌트
 *
 * 글로시말차의 핵심 가치인 LIGHT, NATURAL, TRAVEL을 소개하는 섹션
 *
 * @returns 브랜드 철학 섹션 컴포넌트
 */
export default function BrandPhilosophy() {
  const t = useTranslations("about.philosophy");

  return (
    <section id="philosophy" className={styles["brand-philosophy"]}>
      <h3 className="sr-only">브랜드 철학</h3>
      <div className={styles["brand-philosophy__content"]}>
        <FadeInUp delay={200}>
          <h4 className={styles["brand-philosophy__title"]}>{t("title")}</h4>
        </FadeInUp>

        <FadeInUp delay={400}>
          <div className={styles["brand-philosophy__list"]}>
            <article className={styles["brand-philosophy__item"]}>
              <div className={styles["brand-philosophy__circle"]}>
                <h5 className={styles["brand-philosophy__item-title"]}>
                  {t("list.item-1.title")}
                </h5>
              </div>
              <p className={styles["brand-philosophy__item-desc"]}>
                {t("list.item-1.desc")}
              </p>
            </article>

            <article className={styles["brand-philosophy__item"]}>
              <div className={styles["brand-philosophy__circle"]}>
                <h5 className={styles["brand-philosophy__item-title"]}>
                  {t("list.item-2.title")}
                </h5>
              </div>
              <p className={styles["brand-philosophy__item-desc"]}>
                {t("list.item-2.desc")}
              </p>
            </article>

            <article className={styles["brand-philosophy__item"]}>
              <div className={styles["brand-philosophy__circle"]}>
                <h5 className={styles["brand-philosophy__item-title"]}>
                  {t("list.item-3.title")}
                </h5>
              </div>
              <p className={styles["brand-philosophy__item-desc"]}>
                {t("list.item-3.desc")}
              </p>
            </article>
          </div>
        </FadeInUp>
      </div>
      <FadeInUp delay={0}>
        <Image
          className={styles["brand-philosophy__image"]}
          src="/images/about/straight.webp"
          alt="글로시말차 스트레이트 이미지"
          width={960}
          height={800}
        />
      </FadeInUp>
    </section>
  );
}
