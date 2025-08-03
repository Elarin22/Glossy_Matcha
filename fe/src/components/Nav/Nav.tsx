'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.scss';

interface MenuItem {
    label: string;
    href: string;
}

interface NavProps {
    menuItems: MenuItem[];
}

export function Nav({ menuItems }: NavProps) {
    const pathname = usePathname();

    return (
    <nav className={styles.nav}>
        <ul className={styles.menuList}>
        {menuItems.map((item) => (
            <li key={item.href}>
            <Link
                href={item.href}
                className={`${styles.menuItem} ${
                pathname === item.href ? styles.active : ''
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

export default Nav

// ********* 사용예시(브랜드 소개) *********
// const mainMenuItems = [
//     { label: '브랜드 소개', href: '/brand' },
//     { label: '브랜드 철학', href: '/philosophy' },
//     { label: '제주 유기농 말차', href: '/matcha' },
//     { label: '연혁', href: '/history' }
// ];

// <Nav menuItems={mainMenuItems} />

// ********* 사용예시(제품) *********
// const productMenuItems = [
//   { label: '시그니처', href: '/signature' },
//   { label: '말차다구세트', href: '/tea-set' },
//   { label: '틴케이스', href: '/tin-case' }
// ];

// <Nav menuItems={productMenuItems} />