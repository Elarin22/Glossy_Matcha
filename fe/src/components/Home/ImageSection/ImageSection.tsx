import React from "react";
import styles from "./ImageSection.module.scss";
import ImageSubInfo from "../ImageSubInfo/ImageSubInfo";
import Image from "next/image";

export const images: { title: string; image: string }[] = [
  { title: "브랜드 소개", image: "/images/home/glossy-matcha.png" },
  { title: "카페 소개", image: "/images/home/glossy-matcha.png" },
  { title: "제품 소개", image: "/images/home/glossy-signature.png" },
  { title: "말차 테스트", image: "/images/home/matcha-test.png" },
];

export default function ImageSection({
  sectionRefs,
}: {
  sectionRefs: React.RefObject<HTMLDivElement[]>;
}): React.JSX.Element {
  return (
    <div>
      {images.map((section, index) => {
        return (
          <section key={index}>
            {index !== 0 && index !== images.length - 1 && (
              <ImageSubInfo index={index} />
            )}
            <div
              ref={(el) => {
                sectionRefs.current[index] = el as HTMLDivElement;
              }}
              className={styles["section-item"]}
            >
              <h2 className="sr-only">{section.title}</h2>
              <Image src={section.image} alt="" fill />
            </div>
          </section>
        );
      })}
    </div>
  );
}
