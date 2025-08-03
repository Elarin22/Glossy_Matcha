import Image from "next/image";

/**
 * 브랜드 철학 섹션 컴포넌트
 *
 * 글로시말차의 핵심 가치인 LIGHT, NATURAL, TRAVEL을 소개하는 섹션
 *
 * @returns 브랜드 철학 섹션 컴포넌트
 */
export default function BrandPhilosophy() {
    return (
        <section id="philosophy" className="brand-philosophy">
            <div className="brand-philosophy__content">
                <h3 className="brand-philosophy__title">
                    GLOSSY LIFE, GLOSSY MATCHA
                </h3>

                <div className="brand-philosophy__list">
                    <article className="brand-philosophy__item">
                        <h4 className="brand-philosophy__item-title">LIGHT</h4>
                        <p className="brand-philosophy__item-desc">
                            제주, 그리고 일상의
                            <br />
                            빛나는 순간을 지향합니다.
                        </p>
                    </article>

                    <article className="brand-philosophy__item">
                        <h4 className="brand-philosophy__item-title">
                            NATURAL
                        </h4>
                        <p className="brand-philosophy__item-desc">
                            자연과 함께할 수 있는 방향을
                            <br />
                            항상 고민하고 연구합니다.
                        </p>
                    </article>

                    <article className="brand-philosophy__item">
                        <h4 className="brand-philosophy__item-title">
                            TRAVEL
                        </h4>
                        <p className="brand-philosophy__item-desc">
                            여행과 함께 할 수 있는
                            <br />
                            라이프스타일을 제공합니다.
                        </p>
                    </article>
                </div>
            </div>
            <Image
                className="brand-philosophy__image"
                src="/images/about/straight.svg"
                alt="글로시말차 스트레이트 이미지"
                width={960}
                height={800}
            />
        </section>
    );
}
