import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
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
            <dt className="sr-only">회사명</dt>
            <dd className={styles["footer__info-value"]}>
              (주) 컬쳐히어로제주
            </dd>
          </div>
          <div className={styles["footer__info-item"]}>
            <dt className={styles["footer__info-label"]}>대표:</dt>
            <dd className={styles["footer__info-value"]}>윤종석</dd>
          </div>
          <div className={styles["footer__info-item"]}>
            <dt className={styles["footer__info-label"]}>연락처:</dt>
            <dd className={styles["footer__info-value"]}>
              0507-1449-7847 jay@culturehero.net
            </dd>
          </div>
          <div className={styles["footer__info-item"]}>
            <dt className={styles["footer__info-label"]}>사업자번호:</dt>
            <dd className={styles["footer__info-value"]}>779-81-02082</dd>
          </div>
          <div className={styles["footer__info-item"]}>
            <dt className={styles["footer__info-label"]}>주소:</dt>
            <dd className={styles["footer__info-value"]}>
              제주시 조천읍 조함해안로 112
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
                alt="인스타그램"
                width={16}
                height={16}
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
                alt="네이버 지도"
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
                alt="구글 지도"
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
