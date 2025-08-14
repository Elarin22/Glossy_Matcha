import React from "react";
import styles from "./ScrollIndicator.module.scss";

/**
 * 다음 섹션으로 스크롤을 안내하는 버튼.
 * - 클릭 시 현재 화면 높이 + extraMoveHeight 만큼 스크롤.
 *
 * @component
 * @param {Object} props
 * @param {number} [props.extraMoveHeight=0] - 추가로 이동할 높이(px)
 * @param {number} [props.bottom=80] - 버튼의 하단 위치(px)
 * @param {boolean} [props.isDisabled=false] - 버튼 비활성화 여부
 */
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
