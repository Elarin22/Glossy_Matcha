"use client";

import React, { useCallback, useState } from "react";
import styles from "./SoundButton.module.scss";

/**
 * 비디오 음소거/음소거 해제 토글 버튼.
 * - 클릭 시 videoRef의 muted 속성을 토글합니다.
 *
 * @component
 * @param {Object} props
 * @param {React.RefObject<HTMLVideoElement>} props.videoRef - 제어할 비디오 요소 참조
 * @param {boolean} [props.isBottom=true] - 버튼이 하단에 배치되는지 여부
 */
export default function SoundButton({
  videoRef,
  isBottom = true,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isBottom?: boolean;
}): React.JSX.Element {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  }, []);

  return (
    <button
      onClick={toggleMute}
      className={styles["sound-toggle-button"]}
      aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
      style={
        isBottom
          ? { bottom: 20 }
          : { width: "auto", backgroundColor: "transparent", top: 70 }
      }
    >
      {isMuted ? (
        <img src={"/images/icon/sound-off.svg"} alt="" />
      ) : (
        <img src={"/images/icon/sound-on.svg"} alt="" />
      )}
    </button>
  );
}
