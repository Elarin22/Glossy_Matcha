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
 * 스크롤 기반 네비게이션 컴포넌트
 *
 * IntersectionObserver를 활용해 현재 보이는 섹션을 감지하고,
 * 스크롤 방향에 따라 다른 로직을 적용하여 자연스러운 활성 상태 전환을 제공
 *
 * @param {ScrollNavProps} props - 컴포넌트 props
 * @param {string[]} props.menuKeys - 네비게이션 메뉴 키 배열 (i18n 번역 키로 사용됨)
 * @returns {JSX.Element} 스크롤 네비게이션 컴포넌트
 *
 * @example
 * ```tsx
 * <ScrollNav menuKeys={['intro', 'features', 'contact']} />
 * ```
 */
export default function ScrollNav({ menuKeys }: ScrollNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const t = useTranslations("about");

  const menuItems: MenuItem[] = menuKeys.map((key) => ({
    label: t(`sub-nav.${key}`),
    href: `#${key === "intro" ? "brand-intro" : key}`,
  }));

  /**
   * 섹션으로 부드럽게 스크롤 이동 처리
   *
   * 클릭된 메뉴 항목에 해당하는 섹션으로 부드럽게 스크롤하며,
   * 고정 네비게이션 바 높이(NAV_HEIGHT)를 고려하여 정확한 위치로 이동
   * 스크롤 완료 즉시 해당 섹션을 활성 상태로 설정하여 사용자 피드백 제공
   *
   * @param {React.MouseEvent<HTMLAnchorElement>} e - 메뉴 클릭 이벤트 객체
   * @param {string} href - 이동할 섹션의 앵커 href (예: "#section-id")
   * @returns {void}
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
   * 스크롤 방향을 고려한 섹션 감지 및 활성화 로직
   *
   * IntersectionObserver를 사용하여 뷰포트에 보이는 섹션들을 실시간으로 감지하고,
   * 스크롤 방향에 따라 서로 다른 활성화 전략을 적용하여 자연스러운 UX 제공
   *
   * **스크롤 방향별 로직:**
   * - 하향 스크롤 (의도적 탐색):
   *   - 모바일: 섹션이 30% 이상 보이면 즉시 활성화
   *   - 데스크톱: 뷰포트 상단 기준점을 넘으면 활성화
   * - 상향 스크롤 (되돌아가기):
   *   - 현재 보이는 섹션들 중 가장 높은 intersectionRatio를 가진 섹션 활성화
   *
   * **디바이스별 최적화:**
   * - 모바일: threshold [0, 0.2, 0.4, 0.6, 0.8, 1] - 뷰포트가 작아 큰 단위로 감지
   * - 데스크톱: threshold [0, 0.1, 0.25, 0.5, 0.75, 1] - 세밀한 감지로 정확도 향상
   *
   * @returns {void}
   */
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const isMobile = window.innerWidth < 768;

    const observer = new IntersectionObserver(
      (entries) => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY;

        if (scrollingDown) {
          const enteringEntry = entries.find(
            (entry) =>
              entry.isIntersecting &&
              (isMobile
                ? entry.intersectionRatio >= 0.3
                : entry.boundingClientRect.top <= NAV_HEIGHT + 50)
          );
          if (enteringEntry) {
            setActiveId(enteringEntry.target.id);
          }
        } else {
          const visibleEntries = entries.filter(
            (entry) => entry.isIntersecting
          );
          if (visibleEntries.length > 0) {
            const mostVisible = visibleEntries.reduce((prev, current) =>
              current.intersectionRatio > prev.intersectionRatio
                ? current
                : prev
            );
            setActiveId(mostVisible.target.id);
          }
        }

        lastScrollY = currentScrollY;
      },
      {
        threshold: isMobile
          ? [0, 0.2, 0.4, 0.6, 0.8, 1]
          : [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
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
