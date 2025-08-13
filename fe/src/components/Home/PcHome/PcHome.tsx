"use client";

import styles from "./PcHome.module.scss";
import { useEffect, useRef, useState } from "react";
import SideInfo from "@/components/Home/SideInfo/SideInfo";
import ImageSection from "@/components/Home/ImageSection/ImageSection";
import { HomeContent } from "@/app/[locale]/page";

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
