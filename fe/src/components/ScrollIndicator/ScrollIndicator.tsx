import React from "react";
import styles from "./ScrollIndicator.module.scss";

export default function ScrollIndicator({
  extraMoveHeight = 0,
}: {
  extraMoveHeight?: number;
}): React.JSX.Element {
  const scrollToNext = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: window.innerHeight + extraMoveHeight,
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
