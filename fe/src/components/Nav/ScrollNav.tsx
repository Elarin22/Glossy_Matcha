"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.scss";

/**
 * 메뉴 항목을 나타내는 인터페이스
 */
interface MenuItem {
    label: string;
    href: string; // 예: "#brand-intro"
}

/**
 * ScrollNav 컴포넌트의 props 인터페이스
 */
interface ScrollNavProps {
    menuItems: MenuItem[];
}

/**
 * 스크롤 위치에 따라 활성 메뉴를 자동으로 하이라이트하는 네비게이션 컴포넌트
 *
 * Intersection Observer API를 사용하여 뷰포트에 들어온 섹션을 감지하고,
 * 해당하는 메뉴 항목을 활성 상태로 표시합니다.
 *
 * @param props - ScrollNav 컴포넌트의 props
 * @param props.menuItems - 네비게이션에 표시할 메뉴 항목들의 배열
 * @returns 스크롤 네비게이션 컴포넌트
 *
 * @example
 * ```tsx
 * const menuItems = [
 *   { label: "브랜드 소개", href: "#brand-intro" },
 *   { label: "서비스", href: "#services" },
 *   { label: "연락처", href: "#contact" }
 * ];
 *
 * <ScrollNav menuItems={menuItems} />
 * ```
 */
export default function ScrollNav({ menuItems }: ScrollNavProps) {
    /**
     * 현재 활성화된 섹션의 ID를 저장하는 상태
     * null인 경우 활성화된 섹션이 없음을 의미
     */
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        /**
         * Intersection Observer 인스턴스 생성
         * 뷰포트에 들어온 요소들을 감지하여 활성 ID를 업데이트
         * threshold: 0.3 = 요소의 30%가 뷰포트에 들어왔을 때 트리거
         */
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        /**
         * 메뉴 항목들의 href에 해당하는 DOM 요소들을 찾아서 배열로 반환
         * null인 요소들은 필터링하여 제거
         */
        const targets = menuItems
            .map((item) => document.querySelector(item.href))
            .filter((el): el is Element => el !== null);

        targets.forEach((section) => observer.observe(section));

        /**
         * 컴포넌트 언마운트 시 observer 정리
         * 메모리 누수 방지를 위해 필수
         */
        return () => observer.disconnect();
    }, [menuItems]);

    return (
        <nav className={styles.nav}>
            <ul className={styles.menuList}>
                {menuItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={`${styles.menuItem} ${
                                activeId === item.href.slice(1)
                                    ? styles.active
                                    : ""
                            }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
