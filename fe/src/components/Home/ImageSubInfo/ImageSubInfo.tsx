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
    title: "Ease to use, Glossy",
    subTitle: '"글로시 말차 시그니처부터 다구 세트까지"',
    contents: [
      "100% 제주 새봄의 첫 순을 담은 글로시말차 시그니처 한 포로 만들 수 있는 영역은 무궁무진합니다.",
      "말차 스트레이트부터 말차 라떼,레모네이드까지 집에서 즐겨보세요.",
    ],
    link: "/products",
    btnText: "제품 소개 바로가기",
  },
];

export default function ImageSubInfo({
  index,
}: {
  index: number;
}): React.JSX.Element {
  const locale = useLocale();
  const i = index - 1;

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>{imageSubInfos[i].title}</p>
        <p className={styles.subtitle}>{imageSubInfos[i].subTitle}</p>
        <p className={styles.contents}>
          {imageSubInfos[i].contents.map((content, index) => (
            <Fragment key={index}>
              <span>{content}</span>
              <br />
            </Fragment>
          ))}
        </p>
      </div>
      <Link href={`/${locale}${imageSubInfos[i].link}`} className="btn-g">
        {imageSubInfos[i].btnText}
      </Link>
    </div>
  );
}
