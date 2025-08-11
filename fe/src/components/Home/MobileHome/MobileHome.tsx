"use client";

import React, { useEffect, useRef, useState } from "react";
import { HomeContent } from "@/app/[locale]/page";
import styles from "./MobileHome.module.scss";
import SoundButton from "../SoundButton/SoundButton";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { useLocale } from "next-intl";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";

const ArrowLink = ({
  locale,
  link,
  linkText,
  isExternalSite = false,
}: {
  locale: string;
  link: string;
  linkText: string;
  isExternalSite?: boolean;
}) => {
  return (
    <Link
      href={!isExternalSite ? `/${locale}${link}` : link}
      className={styles["top-right-link"]}
    >
      {linkText}
      <img src={"../images/icon/icon-Right-arrow.svg"} />
    </Link>
  );
};

export default function MobileHome({
  contents,
}: {
  contents: HomeContent[];
}): React.JSX.Element {
  const locale = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.findIndex(
            (el) => el === entry.target
          );
          if (index === -1) return;

          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => {
              if (!prev.includes(index)) return [...prev, index];
              return prev;
            });
          } else {
            setVisibleIndexes((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className={`${styles["mobile-container"]} mobile-home-page`}>
      {/* second section - end */}
      {contents.map((content, index) => {
        return (
          <section
            key={index}
            ref={(el: HTMLElement | null): void => {
              sectionRefs.current[index] = el;
            }}
            className={styles.section}
            style={
              index > 0
                ? { backgroundImage: `url(${content.source})` }
                : undefined
            }
          >
            <h2 className="sr-only">{content.title}</h2>
            <div className={styles.overlay} />
            {index === 0 && (
              <>
                <div className={styles["video-background"]}>
                  <video
                    ref={videoRef}
                    preload="auto"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={contents[0].sourceMb} type="video/mp4" />
                  </video>
                </div>
                <ScrollIndicator bottom={40} isDisabled={true} />
                <SoundButton videoRef={videoRef} isBottom={false} />
              </>
            )}
            <ArrowLink
              locale={locale}
              link={content.link!}
              linkText={content.linkText!}
              isExternalSite={index === 1 ? true : false}
            />
            <div
              className={`${styles["content-box"]} ${
                visibleIndexes.includes(index) ? styles.visible : ""
              }`}
            >
              <h3 className={styles.title}>{content.slogan}</h3>
              <p className={styles.subTitle}>{content.subSlogan}</p>
              <p className={styles.description}>{content.description}</p>
            </div>
          </section>
        );
      })}

      {/* Footer - mobile home only (for scroll snap behavior) */}
      <section className={styles["footer-section"]}>
        <Footer />
      </section>
    </main>
  );
}
