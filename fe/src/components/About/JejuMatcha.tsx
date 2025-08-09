import Image from "next/image";
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
    return (
        <>
            {/* 말차 소개 및 브랜드 메시지 섹션 */}
            <section id="jeju-matcha" className={styles["jeju-matcha__intro"]}>
                <h3 className="sr-only">제주 유기농 말차 첫번째 섹션</h3>
                <Image
                    className={styles["jeju-matcha__image"]}
                    src="/images/about/leaf.webp"
                    alt="제주 유기농 말차 잎 이미지"
                    width={960}
                    height={800}
                />

                <div className={styles["jeju-matcha__content"]}>
                    <h4 className={styles["jeju-matcha__title"]}>
                        RELAX WITH GLOSSY
                    </h4>
                    <p className={styles["jeju-matcha__slogan"]}>
                        &ldquo;글로시말차는 진정한 휴식을 선물합니다.&rdquo;
                    </p>

                    <div className={styles["jeju-matcha__description"]}>
                        <p className={styles["jeju-matcha__paragraph"]}>
                            말차는 제주에서 가장 우수한 차입니다. 글로시말차는
                            최고 품질의 100% 유기농 말차만을 사용하고 있습니다.
                        </p>
                        <p className={styles["jeju-matcha__paragraph"]}>
                            제주의 청정 자연이 빚어낸 푸른 생명력을 그대로
                            담았습니다. 편안함을 선사하는 초록색의 향기는
                            모두에게 편안한 휴식을 선사합니다.
                        </p>
                        <p className={styles["jeju-matcha__paragraph"]}>
                            말차 특유의 감미롭고 진한 향은 신선하면서도 쓴맛의
                            조화로 느껴집니다.
                        </p>
                        <p className={styles["jeju-matcha__paragraph"]}>
                            우리 몸과 마음을 건강하고 초록 기운으로 가득
                            채워보세요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 말차 주요 특징 소개 섹션 */}
            <section className={styles["jeju-matcha__feature"]}>
                <h3 className="sr-only">제주 유기농 말차 두번째 섹션</h3>
                <div className={styles["jeju-matcha__feature-list"]}>
                    <article className={styles["jeju-matcha__feature-item"]}>
                        <h4 className={styles["jeju-matcha__feature-title"]}>
                            유기농 첫순 1번 잎
                        </h4>
                        <p
                            className={
                                styles["jeju-matcha__feature-description"]
                            }
                        >
                            서귀포 생태농원에서 재배한 100% 유기농 첫순 1번
                            잎으로 생산해 더 부드럽고 진한 맛을 담아냅니다.
                        </p>
                    </article>

                    <article className={styles["jeju-matcha__feature-item"]}>
                        <h4 className={styles["jeju-matcha__feature-title"]}>
                            지속 가능한 미래
                        </h4>
                        <p
                            className={
                                styles["jeju-matcha__feature-description"]
                            }
                        >
                            환경을 생각하는 현지 농부 및 장인과 협력해 더
                            건강하고 지속 가능한 미래를 향해 함께 나아갑니다.
                        </p>
                    </article>

                    <article className={styles["jeju-matcha__feature-item"]}>
                        <h4 className={styles["jeju-matcha__feature-title"]}>
                            품질에 대한 약속
                        </h4>
                        <p
                            className={
                                styles["jeju-matcha__feature-description"]
                            }
                        >
                            오랜 노하우를 이용한 가공 기법과 유통 관리를 통해
                            최고 품질의 말차를 만들어 냅니다.
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
