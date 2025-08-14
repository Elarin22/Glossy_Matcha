import Link from "next/link";
import styles from "./ArrowLink.module.scss";

/**
 * 화살표 아이콘이 포함된 링크 컴포넌트.
 * - 내부 페이지 링크 또는 외부 링크를 처리합니다.
 *
 * @component
 * @param {Object} props
 * @param {string} props.locale - 현재 언어 로케일
 * @param {string} props.link - 링크 경로 또는 URL
 * @param {string} props.linkText - 링크에 표시할 텍스트
 * @param {boolean} [props.isExternalSite=false] - 외부 링크 여부 (true면 새 탭에서 열림)
 */
export const ArrowLink = ({
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
