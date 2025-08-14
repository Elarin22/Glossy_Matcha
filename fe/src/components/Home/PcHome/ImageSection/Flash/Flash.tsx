"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Flash.module.scss";

export default function Flash({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const flasfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.addEventListener("mousemove", createSmokeEffect);
    return () =>
      containerRef.current?.removeEventListener("mousemove", createSmokeEffect);
  }, []);

  function createSmokeEffect(e: MouseEvent) {
    const circle = document.createElement("div");
    circle.classList.add(styles.circle);
    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;
    flasfRef.current?.appendChild(circle);
    removeCircleElementVer2(circle);
  }

  function removeCircleElementVer2(circle: HTMLDivElement) {
    circle.addEventListener("animationend", () => {
      circle.remove();
    });
  }

  return <div ref={flasfRef} className={styles.flash}></div>;
}
