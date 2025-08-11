"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./JejuMatcha.module.scss";

/**
 * 제주 유기농 말차 소개 컴포넌트
 *
 * 제주 유기농 말차의 특징과 품질을 소개하는 두 개의 섹션으로 구성:
 * 1. 말차 소개 및 브랜드 메시지 섹션
 * 2. 말차의 주요 특징 (유기농 첫순 1번 잎, 지속 가능한 미래, 품질에 대한 약속) 섹션
 *
 * @returns 제주 유기농 말차 소개 컴포넌트
 */
export default function JejuMatcha() {
    const t = useTranslations("about.jeju-matcha");

    return (
        <>
            <h3 className="sr-only">제주 유기농 말차</h3>
            <section id="jeju-matcha" className={styles["jeju-matcha__intro"]}>
                <h4 className="sr-only">말차 소개 및 브랜드 메시지</h4>
                <Image
                    className={styles["jeju-matcha__image"]}
                    src="/images/about/leaf.webp"
                    alt="제주 유기농 말차 잎 이미지"
                    width={960}
                    height={800}
                />

                <div className={styles["jeju-matcha__content"]}>
                    <h5 className={styles["jeju-matcha__title"]}>
                        {t("intro.title")}
                    </h5>
                    <p className={styles["jeju-matcha__slogan"]}>
                        &ldquo;{t("intro.slogan")}&rdquo;
                    </p>

                    <div className={styles["jeju-matcha__description"]}>
                        <p className={styles["jeju-matcha__paragraph"]}>
                            {t("intro.description.paragraph-1")}
                        </p>
                        <p className={styles["jeju-matcha__paragraph"]}>
                            {t("intro.description.paragraph-2")}
                        </p>
                        <p className={styles["jeju-matcha__paragraph"]}>
                            {t("intro.description.paragraph-3")}
                        </p>
                        <p className={styles["jeju-matcha__paragraph"]}>
                            {t("intro.description.paragraph-4")}
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles["jeju-matcha__feature"]}>
                <h4 className="sr-only">제주 유기농 말차 주요 특징</h4>
                <div className={styles["jeju-matcha__feature-list"]}>
                    <article className={styles["jeju-matcha__feature-item"]}>
                        <h5 className={styles["jeju-matcha__feature-title"]}>
                            {t("feature.item-1.title")}
                        </h5>
                        <p
                            className={
                                styles["jeju-matcha__feature-description"]
                            }
                        >
                            {t("feature.item-1.description")}
                        </p>
                    </article>

                    <article className={styles["jeju-matcha__feature-item"]}>
                        <h5 className={styles["jeju-matcha__feature-title"]}>
                            {t("feature.item-2.title")}
                        </h5>
                        <p
                            className={
                                styles["jeju-matcha__feature-description"]
                            }
                        >
                            {t("feature.item-2.description")}
                        </p>
                    </article>

                    <article className={styles["jeju-matcha__feature-item"]}>
                        <h5 className={styles["jeju-matcha__feature-title"]}>
                            {t("feature.item-3.title")}
                        </h5>
                        <p
                            className={
                                styles["jeju-matcha__feature-description"]
                            }
                        >
                            {t("feature.item-3.description")}
                        </p>
                    </article>
                </div>
                <Image
                    className={styles["jeju-matcha__feature-image"]}
                    src="/images/about/leaf-2.webp"
                    alt="제주 유기농 말차 잎 이미지 모음"
                    width={960}
                    height={960}
                />
            </section>
        </>
    );
}
