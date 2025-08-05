import Link from "next/link";
import React from "react";
import { TypeImageSubInfo } from "../Home.type";
import styles from "./ImageSubInfo.module.scss";

export default function ImageSubInfo({
  title,
  subTitle,
  contents,
  link,
  btnText,
}: TypeImageSubInfo): React.JSX.Element {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subTitle}</p>
        <p className={styles.contents}>
          {contents.map((content, index) => (
            <>
              <span key={index}>{content}</span>
              <br />
            </>
          ))}
        </p>
      </div>
      <Link href={link} className="btn-g">
        {btnText}
      </Link>
    </div>
  );
}
