"use client";

import Image from "next/image";
import styles from "./Home.module.scss";
import { useEffect, useRef, useState } from "react";
import SideInfo from "@/components/Home/SideInfo/SideInfo";
import ImageSection from "@/components/Home/ImageSection/ImageSection";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current?.findIndex(
              (el) => el === entry.target
            );

            if (index !== -1) setCurrentIndex(index || 0);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionRefs.current?.forEach((el) => {
      el && observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <main className={styles["home-container"]}>
        <SideInfo currentIndex={currentIndex} />
        <ImageSection sectionRefs={sectionRefs} />
      </main>
    </>
  );
}
