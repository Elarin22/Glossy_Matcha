import React from "react";
import styles from "./SideInfo.module.scss";
import Image from "next/image";
import { HomeContent } from "@/app/[locale]/page";

/**
 * 현재 선택된 콘텐츠 인덱스에 따라 사이드 정보 영역을 표시하는 컴포넌트.
 * - 슬로건, 서브 슬로건, 이미지(있을 경우), 설명을 렌더링합니다.
 *
 * @component
 * @param {Object} props
 * @param {number} props.currentIndex - 현재 표시할 콘텐츠의 인덱스
 * @param {HomeContent[]} props.contents - 전체 홈 콘텐츠 데이터 배열
 */
export default function SideInfo({
  currentIndex,
  contents,
}: {
  currentIndex: number;
  contents: HomeContent[];
}): React.JSX.Element {
  const content = contents[currentIndex];

  return (
    <aside className={styles["info-box"]}>
      <h2 className="sr-only">소개 글</h2>
      <div
        key={currentIndex}
        className={`${styles["info-item"]} ${styles["fade-up"]}`}
      >
        <h3 className={styles["info-title"]}>{content.slogan}</h3>
        <p className={styles["info-subtitle"]}>{content.subSlogan}</p>
        {content.sideBarImage && (
          <Image
            src={content.sideBarImage}
            alt="Glossy Matcha Location(위치)"
            width={300}
            height={220}
          />
        )}
        <p className={styles["info-content"]}>{content.description}</p>
      </div>
    </aside>
  );
}
