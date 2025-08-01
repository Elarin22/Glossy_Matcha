"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Header.module.scss";

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

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // 사이드바 열렸을때 esc 눌러도 나갈 수 있게
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
          <Link href="/">
            <Image
              src="/images/logo/logo-1.png"
              alt="Glossy Matcha"
              className={styles["logo-pc"]}
              width={276}
              height={50}
              priority
            />
            <Image
              src="/images/logo/logo-c-b.png"
              alt="Glossy Matcha"
              className={styles["logo-mb"]}
              width={40}
              height={40}
              priority
            />
          </Link>

          {/* pc version */}
          <div className={styles["header-pc"]}>
            {/* left */}
            <nav>
              {/* 여기 링크들은 각자 폴더 이름에 따라 바꿀 예정 */}
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
                <img src="/images/icon/inquire.svg" alt="" />
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
      {isSidebarOpen && (
        <div
          className={styles.backdrop}
          onClick={toggleSidebar}
          tabIndex={0}
          aria-label="사이드바 닫기"
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
                <Link href={item.href} onClick={toggleSidebar}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/inquire" onClick={toggleSidebar}>
                문의하기
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
