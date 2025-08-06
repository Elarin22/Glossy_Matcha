"use client";

import React, { useRef, useState, useCallback } from "react";
import styles from "./ImageSection.module.scss";
import ImageSubInfo from "../ImageSubInfo/ImageSubInfo";
import Image from "next/image";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";

export const sections: { title: string; source: string }[] = [
  { title: "브랜드 소개", source: "/videos/intro-pc.webm" },
  { title: "카페 소개", source: "/images/home/glossy-matcha.png" },
  { title: "제품 소개", source: "/images/home/glossy-signature.png" },
  { title: "말차 테스트", source: "/images/home/matcha-test.png" },
];

export default function ImageSection({
  sectionRefs,
}: {
  sectionRefs: React.RefObject<HTMLDivElement[]>;
}): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  }, []);

  return (
    <div>
      {sections.map((section, index) => {
        return (
          <section key={index}>
            {index !== 0 && index !== sections.length - 1 && (
              <ImageSubInfo index={index} />
            )}
            <div
              ref={(el) => {
                sectionRefs.current[index] = el as HTMLDivElement;
              }}
              className={styles["section-item"]}
            >
              <h2 className="sr-only">{section.title}</h2>
              {index === 0 ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: -1,
                    }}
                  >
                    <source src="/videos/intro-pc.webm" type="video/webm" />
                    <source src="/videos/intro-pc.mp4" type="video/mp4" />
                    브라우저가 비디오를 지원하지 않습니다.
                  </video>

                  <button
                    onClick={toggleMute}
                    className={styles["sound-toggle-button"]}
                    aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
                  >
                    {isMuted ? (
                      <img src={"/images/icon/sound-off.svg"} alt="" />
                    ) : (
                      <img src={"/images/icon/sound-on.svg"} alt="" />
                    )}
                  </button>

                  <ScrollIndicator extraMoveHeight={240} />
                </>
              ) : (
                <Image
                  src={section.source}
                  alt=""
                  fill
                  sizes="70vw"
                  className={styles["section-image"]}
                />
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
