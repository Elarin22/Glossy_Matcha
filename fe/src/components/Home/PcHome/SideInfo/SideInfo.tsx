import React from "react";
import styles from "./SideInfo.module.scss";
import Image from "next/image";
import { HomeContent } from "@/app/[locale]/page";

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
