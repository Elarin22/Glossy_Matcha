import Link from "next/link";
import React, { Fragment } from "react";
import styles from "./ImageSubInfo.module.scss";
import { useParams } from "next/navigation";

type SubContent = {
  title: string;
  subTitle: string;
  contents: string[];
};

/**
 * 각 섹션 하단에 표시되는 서브 정보 컴포넌트.
 * - 제목, 부제목, 내용 리스트를 표시합니다.
 * - 링크가 있으면 버튼을 렌더링하며, 외부/내부 링크 여부에 따라 처리합니다.
 *
 * @component
 * @param {Object} props
 * @param {number} props.index - 현재 섹션의 인덱스
 * @param {SubContent | null} [props.subContent] - 서브 정보 데이터
 * @param {string} [props.link] - 버튼 클릭 시 이동할 경로 또는 URL
 * @param {string} [props.btnText] - 버튼에 표시할 텍스트
 * @param {boolean} [props.isExternal=false] - 외부 링크 여부 (true면 새 탭에서 열림)
 */
export default function ImageSubInfo({
  index,
  subContent,
  link,
  btnText,
  isExternal = false,
}: {
  index: number;
  subContent?: SubContent | null;
  link?: string;
  btnText?: string;
  isExternal?: boolean;
}): React.JSX.Element {
  const params = useParams();
  const locale = params.locale as string;

  if (!subContent) {
    return <div className={styles.container} />;
  }

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>{subContent.title}</p>
        <p
          className={styles.subtitle}
          style={locale === "en" ? { fontStyle: "italic" } : undefined}
        >
          {subContent.subTitle}
        </p>
        <p className={styles.contents}>
          {subContent.contents.map((line, id) => (
            <Fragment key={id}>
              <span>{line}</span>
              <br />
            </Fragment>
          ))}
        </p>
      </div>
      {link ? (
        isExternal ? (
          <a href={link} className="btn-g" target="_blank" rel="noreferrer">
            {btnText}
          </a>
        ) : (
          <Link href={`/${locale}${link}`} className="btn-g">
            {btnText}
          </Link>
        )
      ) : null}
    </div>
  );
}
