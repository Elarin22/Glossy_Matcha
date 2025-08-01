"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./Header.module.scss";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles["header-box"]}>
          {/* logo */}
          <img
            src="/images/logo/logo-1.png"
            alt="Glossy Matcha"
            className={styles["logo-pc"]}
          />
          <img
            src="/images/logo/logo-c-b.png"
            alt="Glossy Matcha"
            className={styles["logo-mb"]}
          />
          {/* pc version */}
          <div className={styles["header-pc"]}>
            {/* left */}
            <nav>
              {/* 여기 링크들은 각자 폴더 이름에 따라 바꿀 예정 */}
              <ul className={styles["nav-list"]}>
                <li>
                  <Link href="/about" className={styles["nav-item"]}>
                    브랜드 소개
                  </Link>
                </li>
                <li>
                  <Link href="/products" className={styles["nav-item"]}>
                    제품 소개
                  </Link>
                </li>
                <li>
                  <Link href="/test" className={styles["nav-item"]}>
                    말차 테스트
                  </Link>
                </li>
              </ul>
            </nav>

            {/* right */}
            <div className={styles["nav-list"]}>
              <Link href="/inquire">
                <img src="/images/icon/inquire.svg" alt="문의하기" />
              </Link>
              <button className={styles["lang-btn"]}>
                <img src="/images/icon/world.svg" alt="언어변환" />
                <span>en</span>
              </button>
            </div>
          </div>

          {/* mobile version */}
          <div className={styles["header-mb"]}>
            <div className={styles["nav-list"]}>
              <button onClick={toggleSidebar}>
                <img src="/images/icon/menu.svg" alt="메뉴" />
              </button>
              <button className={styles["lang-btn"]}>
                <img src="/images/icon/world.svg" alt="언어변환" />
                <span>en</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {isSidebarOpen && (
        <div className={styles.backdrop} onClick={toggleSidebar} />
      )}

      <aside
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
      >
        {/* <button onClick={toggleSidebar}>닫기</button> */}
        <nav>
          <ul>
            <li>
              <Link href="/about">브랜드 소개</Link>
            </li>
            <li>
              <Link href="/products">제품 소개</Link>
            </li>
            <li>
              <Link href="/test">말차 테스트</Link>
            </li>
            <li>
              <Link href="/test">문의하기</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
