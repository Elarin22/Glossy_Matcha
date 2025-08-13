"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./Nav.module.scss";

/**
 * 메뉴 항목을 나타내는 인터페이스
 */
interface MenuItem {
  /** 메뉴에 표시될 텍스트 */
  label: string;
  /** 이동할 섹션의 id를 포함한 앵커 href (예: "#intro") */
  href: string;
}

/**
 * ScrollNav 컴포넌트의 props 인터페이스
 */
interface ScrollNavProps {
  menuKeys: string[];
}

/** 고정된 네비게이션 바의 높이 (스크롤 오프셋 보정용) */
const NAV_HEIGHT = 130;

/**
 * 섹션에 스크롤 이동 및 현재 위치에 따른 메뉴 활성화 기능을 제공하는 ScrollNav 컴포넌트
 *
 * @param {ScrollNavProps} props - 메뉴 항목을 전달하는 props
 * @returns {JSX.Element} - ScrollNav 네비게이션 컴포넌트
 */
export default function ScrollNav({ menuKeys }: ScrollNavProps) {
  /** 현재 활성화된 섹션의 id */
  const [activeId, setActiveId] = useState<string | null>(null);
  const t = useTranslations("about");

  const menuItems: MenuItem[] = menuKeys.map((key) => ({
    label: t(`sub-nav.${key}`),
    href: `#${key === "intro" ? "brand-intro" : key}`,
  }));

  /**
   * 메뉴 항목 클릭 시 부드럽게 해당 섹션으로 스크롤 이동
   *
   * @param {React.MouseEvent<HTMLAnchorElement>} e - 클릭 이벤트 객체
   * @param {string} href - 이동할 대상의 href (예: "#section1")
   */
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;

    const offsetTop =
      target.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    setActiveId(id);
  };

  /**
   * IntersectionObserver를 사용해 현재 보이는 섹션을 감지하고
   * 해당 섹션의 id를 active 상태로 설정
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const targets = menuItems
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);

    targets.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [menuItems]);

  return (
    <nav className={styles.nav}>
      <ul className={styles.menuList}>
        {menuItems.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = activeId === id;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                scroll={false}
                className={`${styles.menuItem} ${
                  isActive ? styles.active : ""
                }`}
                onClick={(e) => handleClick(e, item.href)}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
