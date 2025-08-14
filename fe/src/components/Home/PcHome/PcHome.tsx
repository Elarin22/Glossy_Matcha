"use client";

import styles from "./PcHome.module.scss";
import { useEffect, useRef, useState } from "react";
import { HomeContent } from "@/app/[locale]/page";
import SideInfo from "./SideInfo/SideInfo";
import ImageSection from "./ImageSection/ImageSection";

/**
 * PC 버전 메인 홈 컴포넌트.
 * - IntersectionObserver를 이용해 현재 보여지는 섹션의 index를 추적합니다.
 * - 좌측 정보 영역(SideInfo)과 우측 이미지 영역(ImageSection)을 표시합니다.
 *
 * @component
 * @param {Object} props
 * @param {HomeContent[]} props.contents - 홈 화면에 표시할 콘텐츠 데이터 배열
 */
export default function PcHome({ contents }: { contents: HomeContent[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (el) => el === entry.target
            );
            if (index !== -1) setCurrentIndex(index || 0);
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main
      className={styles["pc-container"]}
      aria-label="PC 버전 메인 콘텐츠"
      role="main"
    >
      <SideInfo currentIndex={currentIndex} contents={contents} />
      <ImageSection sectionRefs={sectionRefs} contents={contents} />
    </main>
  );
}
