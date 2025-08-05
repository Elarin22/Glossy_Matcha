import React from "react";
import styles from "./ScrollIndicator.module.scss";

export default function ScrollIndicator(): React.JSX.Element {
  const scrollToNext = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.scrollIndicator} onClick={scrollToNext}>
      <span>Scroll</span>
      <img src="/images/icon/icon-Down-arrow.svg" alt="" />
    </div>
  );
}
