"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.scss";

interface MenuItem {
    label: string;
    href: string; // 예: "#brand-intro"
}

interface ScrollNavProps {
    menuItems: MenuItem[];
}

export default function ScrollNav({ menuItems }: ScrollNavProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
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

        const targets = menuItems
            .map((item) => document.querySelector(item.href))
            .filter((el): el is Element => el !== null);

        targets.forEach((section) => observer.observe(section));

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
