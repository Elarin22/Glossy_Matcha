import Image from "next/image";

/**
 * 브랜드 소개 섹션 컴포넌트
 *
 * 글로시말차의 브랜드 철학과 비전을 소개하는 정적 콘텐츠 섹션
 *
 * @returns 브랜드 소개 섹션 컴포넌트
 */
export default function BrandIntro() {
    return (
        <section id="brand-intro" className="brand-intro">
            <h3 className="sr-only">브랜드 소개</h3>
            <Image
                className="brand-intro__image"
                src="/images/about/brand-intro.svg"
                alt="물에 글로시말차 가루를 섞어 젓는 장면"
                width={960}
                height={800}
            />

            <div className="brand-intro__content">
                <h4 className="brand-intro__title">LIFE WITH GLOSSY</h4>
                <blockquote className="brand-intro__slogan">
                    "모든 일상을 빛나는 순간으로 만듭니다."
                </blockquote>

                <div className="brand-intro__description">
                    <p className="brand-intro__paragraph">
                        글로시말차는 모든 사람들을 위해 반짝이는 에너지를
                        제공하여 개인만의 즐거움과 기쁨을 찾고 그들의 모든
                        순간을 빛나게 도와줍니다.
                    </p>
                    <p className="brand-intro__paragraph">
                        일상을 빛나게 만들어 줄 글로시말차는 단순히 말차를
                        판매하는 브랜드가 아닌 다양한 감성과 컨텐츠가 담긴
                        관계적 브랜드로 성장할 것을 약속합니다.
                    </p>
                    <p className="brand-intro__paragraph">
                        당신의 삶, 사소한 일상과 순간에서 반짝거림을 찾을 수
                        있도록 글로시말차는 작은 것들부터 함께 시작하려고
                        합니다.
                    </p>
                    <p className="brand-intro__paragraph">
                        우리는 제품, 컨텐츠, 캠페인 그리고 당신의 일상이 될 수
                        있도록 지속가능한 공생을 위한 진전성있는 것들을
                        제공하는 브랜드입니다.
                    </p>
                </div>
            </div>
        </section>
    );
}
