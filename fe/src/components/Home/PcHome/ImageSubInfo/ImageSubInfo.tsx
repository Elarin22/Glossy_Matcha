import Link from "next/link";
import React, { Fragment } from "react";
import styles from "./ImageSubInfo.module.scss";
import { useParams } from "next/navigation";

type SubContent = {
  title: string;
  subTitle: string;
  contents: string[];
};

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
