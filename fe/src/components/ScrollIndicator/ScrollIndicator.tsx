import React from "react";
import styles from "./ScrollIndicator.module.scss";

export default function ScrollIndicator({
  moveHeight = window.innerHeight,
}: {
  moveHeight?: number;
}): React.JSX.Element {
  const scrollToNext = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: moveHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.scrollIndicator} onClick={scrollToNext}>
      <span>Scroll</span>
      <span className={styles.scrollArrow}>↓</span>
    </div>
  );
}
