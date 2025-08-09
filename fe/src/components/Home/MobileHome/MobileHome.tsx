"use client";

import React, { useRef } from "react";
import { HomeContent } from "@/app/[locale]/page";
import styles from "./MobileHome.module.scss";
import SoundButton from "../SoundButton/SoundButton";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { useLocale } from "next-intl";

export default function MobileHome({
  contents,
}: {
  contents: HomeContent[];
}): React.JSX.Element {
  const locale = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <main className={`${styles["mobile-container"]} mobile-home-page`}>
      {/* first section */}
      <section className={styles["video-section"]}>
        <h2 className="sr-only">{contents[0].title}</h2>
        <div className={styles["video-background"]}>
          <video ref={videoRef} autoPlay muted loop playsInline>
            <source src={contents[0].sourceMb} type="video/webm" />
            <source src="/videos/intro-mb.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.overlay} />
        <div className={styles["content-box"]}>
          <h3 className={styles.title}>{contents[0].slogan}</h3>
          <p className={styles.subTitle}>{contents[0].subSlogan}</p>
          <p className={styles.description}>{contents[0].description}</p>
        </div>
        <SoundButton videoRef={videoRef} />
      </section>

      {/* second section - end */}
      {contents.map((content, index) => {
        return (
          index > 0 && (
            <section
              key={index}
              className={styles["product-section"]}
              style={{ backgroundImage: `url(${content.source})` }}
            >
              <h2 className="sr-only">{content.title}</h2>
              <div className={styles.overlay} />
              <div className={styles["content-box"]}>
                <Link
                  href={`/${locale}${content.link!}`}
                  className={styles["top-right-link"]}
                >
                  {content.linkText}
                  <img src={"../images/icon/icon-Right-arrow.svg"} />
                </Link>

                <div>
                  <h3 className={styles.title}>{content.slogan}</h3>
                  <p className={styles.subTitle}>{content.subSlogan}</p>
                  <p className={styles.description}>{content.description}</p>
                </div>
              </div>
            </section>
          )
        );
      })}

      {/* Footer - mobile home only (for scroll snap behavior) */}
      <section className={styles["footer-section"]}>
        <Footer />
      </section>
    </main>
  );
}
