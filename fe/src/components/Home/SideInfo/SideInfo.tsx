import React from "react";
import styles from "./SideInfo.module.scss";
import Image from "next/image";
import Link from "next/link";

export const slogans: {
  title: string;
  subtitle: string;
  image?: string;
  content: string;
  link?: string;
  linkText?: string;
}[] = [
  {
    title: "Life With Glossy",
    subtitle: "모든 일상을 빛나는 순간으로 만듭니다",
    content:
      "사람들의 모든 순간들을 반짝이는 순간들로 만들어 줄 글로시 말차는 단순히 말차를 판매하는 브랜드가 아닌 다양한 감성과 컨텐츠가 담긴 관계적 브랜드로 성장할 것을 약속합니다.",
  },
  {
    title: "Cafe Glossy Matcha",
    subtitle: "제주의 동쪽, 가장 뜨는 핫플",
    image: "/images/home/cafe-location.png",
    content:
      "제주특별자치도 조천읍 조함해안로 112 에서 제주산 최상급 말차를 사용한 음료와 디저트를 맛보며 멋진 바다 전경과 편안함 '쉼'을 경험해보세요.",
  },
  {
    title: "Glossy Signature",
    subtitle: "자연의 원당과 대체당으로 블랜딩한 최적의 달콤함",
    content:
      "선조들로부터 이어진 전통 가공방식을 고수해 떫은 맛은 줄고 섬세하고 부드러운 깔끔한 끝맛으로 초심자들도 맛있게 드실 수 있어요.",
  },
  {
    title: "Glossy Pick",
    subtitle: "단 하나, 당신만을 위한 글로시 말차",
    content:
      "말차 스트레이트? 말차 모히또? 말차 슈페너? 나와 어울리는 말차 메뉴를 찾고 글로시 말차에서 즐겨보세요!",
    link: "/test",
    linkText: "테스트 바로가기",
  },
];

export default function SideInfo({
  currentIndex,
}: {
  currentIndex: number;
}): React.JSX.Element {
  return (
    <aside className={styles["info-box"]}>
      <h2 className="sr-only">글로시 말차 슬로건</h2>
      <div
        key={currentIndex}
        className={`${styles["info-item"]} ${styles["fade-up"]}`}
      >
        <h3 className={styles["info-title"]}>{slogans[currentIndex].title}</h3>
        <p className={styles["info-subtitle"]}>
          {slogans[currentIndex].subtitle}
        </p>
        {slogans[currentIndex].image && (
          <Image
            src={slogans[currentIndex].image || "/images/logo/logo-1.png"}
            alt="Glossy Matcha Location(위치)"
            width={300}
            height={220}
          />
        )}
        <p className={styles["info-content"]}>
          {slogans[currentIndex].content}
        </p>
        {slogans[currentIndex].link && (
          <Link href={slogans[currentIndex].link} className="btn-g pc">
            {slogans[currentIndex].linkText}
          </Link>
        )}
      </div>
    </aside>
  );
}
