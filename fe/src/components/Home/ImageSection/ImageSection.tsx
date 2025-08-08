"use client";

import React, { useRef } from "react";
import styles from "./ImageSection.module.scss";
import ImageSubInfo from "../ImageSubInfo/ImageSubInfo";
import Image from "next/image";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";
import { HomeContent } from "@/app/[locale]/page";
import SoundButton from "../SoundButton/SoundButton";

export default function ImageSection({
  sectionRefs,
  contents,
}: {
  sectionRefs: React.RefObject<HTMLDivElement[]>;
  contents: HomeContent[];
}): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div>
      {contents.map((content, index) => {
        return (
          <section key={index}>
            {index !== 0 && index !== contents.length - 1 && (
              <ImageSubInfo index={index} />
            )}
            <div
              ref={(el) => {
                sectionRefs.current[index] = el as HTMLDivElement;
              }}
              className={styles["section-item"]}
            >
              <h2 className="sr-only">{content.title}</h2>
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
                    <source src={content.source} type="video/webm" />
                    <source src="/videos/intro-pc.mp4" type="video/mp4" />
                    브라우저가 비디오를 지원하지 않습니다.
                  </video>
                  <SoundButton videoRef={videoRef} />
                  <ScrollIndicator extraMoveHeight={240} />
                </>
              ) : (
                <Image
                  src={content.source}
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
