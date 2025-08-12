"use client";

import Image from "next/image";
import { HistoryItem } from "@/types/history";
import { useTranslations } from "next-intl";
import FadeInUp from "@/components/FadeInUp/FadeInUp";
import styles from "./BrandHistory.module.scss";

/**
 * 브랜드 연혁 섹션 컴포넌트
 *
 * 글로시 말차의 카페 전경 이미지와 함께 브랜드의 주요 연혁을
 * 시간순으로 표시하는 섹션을 렌더링합니다.
 *
 * @returns 브랜드 연혁 섹션 컴포넌트
 */
export default function BrandHistory() {
  const t = useTranslations("about.history");

  const historyItems = t.raw("items") as HistoryItem[];

  return (
    <section id="history" className={styles["brand-history"]}>
      <h3 className="sr-only">연혁</h3>
      <Image
        className={styles["brand-history__image"]}
        src="/images/about/glossy-matcha.webp"
        alt="글로시 말차 카페 전경 이미지"
        width={960}
        height={800}
        loading="lazy"
      />

      <div className={styles["brand-history__content"]}>
        <FadeInUp delay={200}>
          <h4 className={styles["brand-history__title"]}>{t("title")}</h4>
        </FadeInUp>

        <FadeInUp delay={400}>
          <p className={styles["brand-history__location"]}>{t("location")}</p>
        </FadeInUp>

        <FadeInUp delay={600}>
          <ul className={styles["brand-history__list"]}>
            {historyItems.map((item) => (
              <li key={item.date} className={styles["history-item"]}>
                <time
                  className={styles["history-item__date"]}
                  dateTime={item.date.replace(".", "-")}
                >
                  {item.date}
                </time>
                <div className={styles["history-item__desc-wrapper"]}>
                  {item.desc.map((text, idx) => (
                    <p key={idx} className={styles["history-item__desc"]}>
                      {text}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </FadeInUp>
      </div>
    </section>
  );
}
