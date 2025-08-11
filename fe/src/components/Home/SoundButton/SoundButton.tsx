"use client";

import React, { useCallback, useState } from "react";
import styles from "./SoundButton.module.scss";

export default function SoundButton({
  videoRef,
  bottom = 16,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  bottom?: number;
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
      style={{ bottom: bottom }}
    >
      {isMuted ? (
        <img src={"/images/icon/sound-off.svg"} alt="" />
      ) : (
        <img src={"/images/icon/sound-on.svg"} alt="" />
      )}
    </button>
  );
}
