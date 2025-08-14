"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./Footer.module.scss";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footer}>
      <section className={styles["footer__section"]}>
        <h2 className={styles["footer__logo-title"]}>
          <Link href="/" className={styles["footer__logo-link"]}>
            <Image
              src="/images/logo/logo-w.png"
              alt="Glossy Matcha"
              width={207}
              height={19}
              className={styles["footer__logo-image"]}
            />
          </Link>
        </h2>

        <dl className={styles["footer__company-info"]}>
          <div className={styles["footer__info-item"]}>
            <dt className="sr-only">{t("companyName")}</dt>
            <dd className={styles["footer__info-value"]}>
              {t("companyNameValue")}
            </dd>
          </div>
          <div className={styles["footer__info-item"]}>
            <dt className={styles["footer__info-label"]}>{t("ceo")}</dt>
            <dd className={styles["footer__info-value"]}>{t("ceoValue")}</dd>
          </div>
          <div className={styles["footer__info-item"]}>
            <dt className={styles["footer__info-label"]}>{t("contact")}</dt>
            <dd className={styles["footer__info-value"]}>
              {t("contactValue")}
            </dd>
          </div>
          <div className={styles["footer__info-item"]}>
            <dt className={styles["footer__info-label"]}>
              {t("businessNumber")}
            </dt>
            <dd className={styles["footer__info-value"]}>
              {t("businessNumberValue")}
            </dd>
          </div>
          <div className={styles["footer__info-item"]}>
            <dt className={styles["footer__info-label"]}>{t("address")}</dt>
            <dd className={styles["footer__info-value"]}>
              {t("addressValue")}
            </dd>
          </div>
        </dl>

        <ul className={styles["footer__social-list"]}>
          <li className={styles["footer__social-item"]}>
            <a
              href="https://www.instagram.com/glossy_matcha/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["footer__social-link"]}
            >
              <Image
                src="/images/icon/icon-insta.png"
                alt="instagram"
                width={16}
                height={16}
              />
            </a>
          </li>
          <li className={styles["footer__social-item"]}>
            <a
              href="https://smartstore.naver.com/glossymatcha"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["footer__social-link"]}
            >
              <Image
                src="/images/icon/icon-store.png"
                alt="naverStore"
                width={50}
                height={50}
              />
            </a>
          </li>
          <li className={styles["footer__social-item"]}>
            <a
              href="https://naver.me/502MfWpo"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["footer__social-link"]}
            >
              <Image
                src="/images/icon/icon-naver.png"
                alt="naverMap"
                width={16}
                height={16}
              />
            </a>
          </li>
          <li className={styles["footer__social-item"]}>
            <a
              href="https://maps.app.goo.gl/udwTSdq47GJJxMNG8"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["footer__social-link"]}
            >
              <Image
                src="/images/icon/icon-google.png"
                alt="googleMap"
                width={16}
                height={16}
              />
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
}
