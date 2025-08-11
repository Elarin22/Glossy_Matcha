"use client";

import React, { useCallback, useState } from "react";
import styles from "./SoundButton.module.scss";

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
