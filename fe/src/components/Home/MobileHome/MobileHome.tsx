"use client";

import React, { useEffect, useRef } from "react";
import { HomeContent } from "@/app/[locale]/page";
import styles from "./MobileHome.module.scss";
import SoundButton from "../SoundButton/SoundButton";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";
import { useParams } from "next/navigation";

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
  const content = (
    <>
      {linkText}
      <img src="/images/icon/icon-Right-arrow.svg" alt="화살표 아이콘" />
    </>
  );

  return (
    <>
      {isExternalSite ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles["top-right-link"]}
        >
          {content}
        </a>
      ) : (
        <Link href={`/${locale}${link}`} className={styles["top-right-link"]}>
          {content}
        </Link>
      )}
    </>
  );
};

export default function MobileHome({
  contents,
}: {
  contents: HomeContent[];
}): React.JSX.Element {
  const params = useParams();
  const locale = params.locale as string;

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelector(`.${styles["content-box"]}`)
              ?.classList.add(styles.visible);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className={`${styles["mobile-container"]} mobile-home-page`}>
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
                    <source src={content.sourceMb} type="video/mp4" />
                  </video>
                </div>
                <ScrollIndicator bottom={100} isDisabled={true} />
                <SoundButton videoRef={videoRef} isBottom={false} />
              </>
            )}
            {index !== 0 && content.link && content.linkText && (
              <ArrowLink
                locale={locale}
                link={content.link}
                linkText={content.linkText}
                isExternalSite={content.isExternal ?? false}
              />
            )}
            <div
              className={styles["content-box"]}
              style={index === 0 ? { justifyContent: "flex-start" } : undefined}
            >
              <h3 className={styles.title}>{content.slogan}</h3>
              <p className={styles.subTitle}>{content.subSlogan}</p>
              <p className={styles.description}>{content.description}</p>
            </div>
          </section>
        );
      })}

      <section className={styles["inquire-section"]}>
        <h3 className="sr-only">문의 안내</h3>
        <p className={styles.subTitle}>
          문의사항이 있으신 경우,
          <br />
          아래 ‘문의하기’ 버튼을 클릭하여 내용을 작성해 주세요.
          <br />
          검토 후 빠르게 연락드리겠습니다.
        </p>
        <button className="btn-g">✉ 문의하기</button>
      </section>

      {/* Footer - mobile home only (for scroll snap behavior) */}
      <section className={styles["footer-section"]}>
        <Footer />
      </section>
    </main>
  );
}
