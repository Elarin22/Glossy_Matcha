"use client";

import React, { useEffect, useRef } from "react";
import { HomeContent } from "@/app/[locale]/page";
import styles from "./MobileHome.module.scss";
import SoundButton from "../SoundButton/SoundButton";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("home.inquire");

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

      {/* inquire & footer */}
      <section className={styles.section} style={{ padding: 0 }}>
        <h2 className="sr-only">{t("h2Title")}</h2>
        <section
          ref={(el: HTMLElement | null): void => {
            sectionRefs.current.push(el);
          }}
          className={styles.inquire}
        >
          <div
            className={styles["content-box"]}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <h3 className="sr-only">{t("h3Title")}</h3>
            <p className={styles.description}>
              {t("description")
                .split("\n")
                .map((text, index) => (
                  <span key={index}>
                    {text}
                    <br />
                  </span>
                ))}
            </p>
            <Link
              href={`/${locale}/inquire`}
              className={`btn-g ${styles["btn-w"]}`}
            >
              {t("buttonText")}
            </Link>
          </div>
        </section>
        <Footer />
      </section>
    </main>
  );
}
