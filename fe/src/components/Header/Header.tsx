"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { useMobileDetect } from "@/hooks/useMobileDetect";

interface NavigationItem {
  href: string;
  label: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: "/about", label: "브랜드 소개" },
  { href: "/products", label: "제품 소개" },
  { href: "/test", label: "말차 테스트" },
];

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const isMobile = useMobileDetect();

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  // esc로 사이드바 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // 스크롤 방지
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles["header-box"]}>
          {/* logo */}
          <Link href="/" onClick={closeSidebar}>
            <Image
              src="/images/logo/logo-1.png"
              alt=""
              className={styles["logo-pc"]}
              width={300}
              height={28}
              priority
            />
            <Image
              src="/images/logo/logo-c-b.png"
              alt=""
              className={styles["logo-mb"]}
              width={40}
              height={40}
              priority
            />
            <h1 className="sr-only">Glossy Matcha</h1>
          </Link>

          {/* pc version */}
          <div className={styles["header-pc"]}>
            {/* left */}
            <nav>
              <ul className={styles["header__list"]}>
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.href} className={styles["header__item"]}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* right */}
            <div className={styles["header__list"]}>
              <Link href="/inquire" aria-label="문의하기">
                <img
                  src="/images/icon/inquire.svg"
                  alt=""
                  width={30}
                  height={30}
                />
              </Link>
              <button className={styles["lang-btn"]} aria-label="언어 변경">
                <img src="/images/icon/world.svg" alt="" />
                <span>en</span>
              </button>
            </div>
          </div>

          {/* mobile version */}
          <div className={styles["header-mb"]}>
            <div className={styles["header__list"]}>
              <button
                onClick={toggleSidebar}
                aria-label={isSidebarOpen ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={isSidebarOpen}
              >
                <img
                  src={
                    isSidebarOpen
                      ? "/images/icon/close.svg"
                      : "/images/icon/menu.svg"
                  }
                  alt=""
                />
              </button>
              <button className={styles["lang-btn"]} aria-label="언어 변경">
                <img src="/images/icon/world.svg" alt="" />
                <span>en</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* sidebar */}
      {isMobile && (
        <>
          {isSidebarOpen && (
            <div
              className={styles.backdrop}
              onClick={closeSidebar}
              tabIndex={0}
            />
          )}
          <aside
            className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
            role="navigation"
            aria-hidden={!isSidebarOpen}
          >
            <nav>
              <ul>
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={closeSidebar}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/inquire" onClick={closeSidebar}>
                    문의하기
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
