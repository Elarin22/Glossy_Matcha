import React from "react";
import styles from "./SideInfo.module.scss";
import Image from "next/image";
import Link from "next/link";
import { HomeContent } from "@/app/[locale]/page";

export default function SideInfo({
  currentIndex,
  contents,
}: {
  currentIndex: number;
  contents: HomeContent[];
}): React.JSX.Element {
  return (
    <aside className={styles["info-box"]}>
      <h2 className="sr-only">소개 글</h2>
      <div
        key={currentIndex}
        className={`${styles["info-item"]} ${styles["fade-up"]}`}
      >
        <h3 className={styles["info-title"]}>
          {contents[currentIndex].slogan}
        </h3>
        <p className={styles["info-subtitle"]}>
          {contents[currentIndex].subSlogan}
        </p>
        {contents[currentIndex].sideBarImage && (
          <Image
            src={
              contents[currentIndex].sideBarImage || "/images/logo/logo-1.png"
            }
            alt="Glossy Matcha Location(위치)"
            width={300}
            height={220}
          />
        )}
        <p className={styles["info-content"]}>
          {contents[currentIndex].description}
        </p>
        {currentIndex === contents.length - 1 && (
          <Link
            href={contents[currentIndex].link!}
            className="btn-g"
            style={{ marginTop: 36 }}
          >
            {contents[currentIndex].linkText}
          </Link>
        )}
      </div>
    </aside>
  );
}
