"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { useMobileDetect } from "@/hooks/useMobileDetect";
import LanguageButton from "./LanguageButton/LanguageButton";

const NAVIGATION_ITEMS: {
  href: string;
  label: string;
}[] = [
  { href: "/about", label: "about" },
  { href: "/products", label: "products" },
  { href: "/glossypick", label: "glossypick" },
  { href: "/inquire", label: "inquire" },
];

/**
 * 메인 헤더 컴포넌트.
 * - 로고, 내비게이션 메뉴, 언어 전환 버튼을 포함합니다.
 * - PC/모바일 레이아웃에 따라 다른 UI를 표시합니다.
 * - 모바일에서는 햄버거 버튼을 통해 사이드바 메뉴를 토글할 수 있습니다.
 * - ESC 키나 백드롭 클릭 시 사이드바가 닫히며, 열려 있는 동안 body 스크롤이 비활성화됩니다.
 *
 * @param {Object} props
 * @param {string} props.locale - 현재 선택된 언어(locale) 코드
 */
export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("navigation");

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
          <Link href={`/${locale}`} onClick={closeSidebar}>
            <Image
              src="/images/logo/logo-1.png"
              alt=""
              className={styles["logo-pc"]}
              width={270}
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
            <nav>
              <ul className={styles["header__list"]}>
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.href} className={styles["header__item"]}>
                    <Link href={`/${locale}${item.href}`}>{t(item.label)}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <LanguageButton locale={locale} />
          </div>

          {/* mobile version */}
          <div className={styles["header-mb"]}>
            <div className={styles["header__list"]}>
              <button
                onClick={toggleSidebar}
                aria-label={isSidebarOpen ? t("menuOpen") : t("menuClose")}
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
              <LanguageButton locale={locale} />
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
                    <Link
                      href={`/${locale}${item.href}`}
                      onClick={closeSidebar}
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
