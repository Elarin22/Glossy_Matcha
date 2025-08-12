import React from "react";
import styles from "./ScrollIndicator.module.scss";

export default function ScrollIndicator({
  extraMoveHeight = 0,
  bottom = 80,
  isDisabled = false,
}: {
  extraMoveHeight?: number;
  bottom?: number;
  isDisabled?: boolean;
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
    <button
      className={styles.scrollIndicator}
      style={{ bottom: bottom }}
      onClick={scrollToNext}
      disabled={isDisabled}
    >
      <span>Scroll</span>
      <img src="/images/icon/icon-Down-arrow.svg" alt="" />
    </button>
  );
}
