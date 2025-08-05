import Image from "next/image";
import styles from "./BrandPhilosophy.module.scss";

/**
 * 브랜드 철학 섹션 컴포넌트
 *
 * 글로시말차의 핵심 가치인 LIGHT, NATURAL, TRAVEL을 소개하는 섹션
 *
 * @returns 브랜드 철학 섹션 컴포넌트
 */
export default function BrandPhilosophy() {
    return (
        <section id="philosophy" className={styles["brand-philosophy"]}>
            <div className={styles["brand-philosophy__content"]}>
                <h3 className={styles["brand-philosophy__title"]}>
                    GLOSSY LIFE, GLOSSY MATCHA
                </h3>

                <div className={styles["brand-philosophy__list"]}>
                    <article className={styles["brand-philosophy__item"]}>
                        <div className={styles["brand-philosophy__circle"]}>
                            <h4
                                className={
                                    styles["brand-philosophy__item-title"]
                                }
                            >
                                LIGHT
                            </h4>
                        </div>
                        <p className={styles["brand-philosophy__item-desc"]}>
                            제주, 그리고 일상의
                            <br />
                            빛나는 순간을 지향합니다.
                        </p>
                    </article>

                    <article className={styles["brand-philosophy__item"]}>
                        <div className={styles["brand-philosophy__circle"]}>
                            <h4
                                className={
                                    styles["brand-philosophy__item-title"]
                                }
                            >
                                NATURAL
                            </h4>
                        </div>
                        <p className={styles["brand-philosophy__item-desc"]}>
                            자연과 함께할 수 있는 방향을
                            <br />
                            항상 고민하고 연구합니다.
                        </p>
                    </article>

                    <article className={styles["brand-philosophy__item"]}>
                        <div className={styles["brand-philosophy__circle"]}>
                            <h4
                                className={
                                    styles["brand-philosophy__item-title"]
                                }
                            >
                                TRAVEL
                            </h4>
                        </div>
                        <p className={styles["brand-philosophy__item-desc"]}>
                            여행과 함께 할 수 있는
                            <br />
                            라이프스타일을 제공합니다.
                        </p>
                    </article>
                </div>
            </div>
            <Image
                className={styles["brand-philosophy__image"]}
                src="/images/about/straight.svg"
                alt="글로시말차 스트레이트 이미지"
                width={960}
                height={800}
            />
        </section>
    );
}
