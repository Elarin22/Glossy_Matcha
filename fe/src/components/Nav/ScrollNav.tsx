"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./Nav.module.scss";

interface MenuItem {
  label: string;
  href: string;
}

interface ScrollNavProps {
  menuKeys: string[];
}

const NAV_HEIGHT = 130;

/**
 * 스크롤 위치에 따라 현재 섹션을 하이라이트하는 네비게이션 컴포넌트
 *
 * 사용자가 스크롤할 때 현재 화면에 보이는 섹션을 자동으로 감지하여 해당 메뉴를 활성화합니다.
 * 메뉴 클릭 시 부드러운 스크롤 애니메이션으로 해당 섹션으로 이동합니다.
 *
 * @param {ScrollNavProps} props - 컴포넌트 props
 * @param {string[]} props.menuKeys - 네비게이션 메뉴를 생성할 키 배열. 'intro' 키는 'brand-intro' ID로 매핑됩니다.
 * @returns {JSX.Element} 스크롤 네비게이션 컴포넌트
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <ScrollNav menuKeys={['intro', 'about', 'services', 'contact']} />
 *
 * // 'intro' 키는 자동으로 'brand-intro' ID와 매핑됩니다
 * <ScrollNav menuKeys={['intro', 'company', 'team']} />
 * ```
 *
 * @requires next-intl - 다국어 번역 (about.sub-nav.{key} 경로 사용)
 * @requires ./Nav.module.scss - 스타일링 (nav, menuList, menuItem, active 클래스 필요)
 */
export default function ScrollNav({ menuKeys }: ScrollNavProps) {
  const [activeId, setActiveId] = useState<string>("");
  const t = useTranslations("about");

  const menuItems: MenuItem[] = menuKeys.map((key) => ({
    label: t(`sub-nav.${key}`),
    href: `#${key === "intro" ? "brand-intro" : key}`,
  }));

  /**
   * 네비게이션 메뉴 클릭 시 해당 섹션으로 부드럽게 스크롤하는 이벤트 핸들러
   *
   * 기본 링크 동작을 방지하고, NAV_HEIGHT만큼 오프셋을 적용하여
   * 네비게이션 바에 가려지지 않도록 정확한 위치로 스크롤합니다.
   * 클릭과 동시에 해당 메뉴를 활성 상태로 즉시 변경합니다.
   *
   * @param {React.MouseEvent} e - 마우스 클릭 이벤트 객체
   * @param {string} href - 이동할 앵커 링크 (예: "#about", "#contact")
   */
  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      const top = element.offsetTop - NAV_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY + NAV_HEIGHT + 100;

      for (let i = menuItems.length - 1; i >= 0; i--) {
        const id = menuItems[i].href.replace("#", "");
        const element = document.getElementById(id);

        if (element && element.offsetTop <= scrollTop) {
          if (activeId !== id) {
            setActiveId(id);
          }
          break;
        }
      }
    };

    if (menuItems.length > 0) {
      const firstId = menuItems[0].href.replace("#", "");
      setActiveId(firstId);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
