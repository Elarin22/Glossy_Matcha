import Link from "next/link";
import React, { Fragment } from "react";
import styles from "./ImageSubInfo.module.scss";
import { useLocale } from "next-intl";

type TypeImageSubInfo = {
  title: string;
  subTitle: string;
  contents: string[];
  link: string;
  btnText: string;
};

export const imageSubInfos: TypeImageSubInfo[] = [
  {
    title: "Relax with Glossy",
    subTitle: '"글로시 말차는 진정한 휴식을 선물합니다"',
    contents: [
      "글로시말차는 제주에서 나는 최고 품질의 100% 유기농 말차만을 사용하고 있습니다.",
      "제주의 청정 자연이 빚어낸 푸른 생명력을 그대로 담은 글로시 말차로 진정한 휴식을 느껴보세요.",
    ],
    link: "/about",
    btnText: "브랜드 소개 바로가기",
  },
  {
    title: "Cafe Glossy",
    subTitle: '"글로시 말차는 진정한 휴식을 선물합니다"',
    contents: [
      "글로시말차는 제주에서 나는 최고 품질의 100% 유기농 말차만을 사용하고 있습니다.",
      "제주의 청정 자연이 빚어낸 푸른 생명력을 그대로 담은 글로시 말차로 진정한 휴식을 느껴보세요.",
    ],
    link: "https://www.google.com/maps/place/%EA%B8%80%EB%A1%9C%EC%8B%9C%EB%A7%90%EC%B0%A8(Glossy+matcha)/data=!3m1!4b1!4m6!3m5!1s0x350d1dc1714db5c1:0x999e71da31e8bd0b!8m2!3d33.5456823!4d126.6395823!16s%2Fg%2F11spxjp6gy?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
    btnText: "카페 보러가기",
  },
  {
    title: "Ease to use, Glossy",
    subTitle: '"글로시 말차 시그니처부터 다구 세트까지"',
    contents: [
      "100% 제주 새봄의 첫 순을 담은 글로시말차 시그니처 한 포로 만들 수 있는 영역은 무궁무진합니다.",
      "말차 스트레이트부터 말차 라떼,레모네이드까지 집에서 즐겨보세요.",
    ],
    link: "/products",
    btnText: "제품 소개 바로가기",
  },
  {
    title: "Ease to use, Glossy",
    subTitle: '"글로시 말차 시그니처부터 다구 세트까지"',
    contents: [
      "100% 제주 새봄의 첫 순을 담은 글로시말차 시그니처 한 포로 만들 수 있는 영역은 무궁무진합니다.",
      "말차 스트레이트부터 말차 라떼,레모네이드까지 집에서 즐겨보세요.",
    ],
    link: "/test",
    btnText: "테스트 바로가기",
  },
];

export default function ImageSubInfo({
  index,
}: {
  index: number;
}): React.JSX.Element {
  const locale = useLocale();

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>{imageSubInfos[index].title}</p>
        <p className={styles.subtitle}>{imageSubInfos[index].subTitle}</p>
        <p className={styles.contents}>
          {imageSubInfos[index].contents.map((content, index) => (
            <Fragment key={index}>
              <span>{content}</span>
              <br />
            </Fragment>
          ))}
        </p>
      </div>
      {index !== 1 ? (
        <Link href={`/${locale}${imageSubInfos[index].link}`} className="btn-g">
          {imageSubInfos[index].btnText}
        </Link>
      ) : (
        <Link
          href={imageSubInfos[index].link}
          className="btn-g"
          target="_blank"
        >
          {imageSubInfos[index].btnText}
        </Link>
      )}
    </div>
  );
}
