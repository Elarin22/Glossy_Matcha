'use client';

import styles from './Nav.module.scss'; // 기존 Nav 스타일 재사용

interface ProductMenuItem {
    label: string;
    productId: number;
}

interface ProductNavProps {
    menuItems: ProductMenuItem[];
    onProductSelect: (productId: number) => void;
    activeProductId: number;
}

export default function ProductNav({ 
    menuItems, 
    onProductSelect, 
    activeProductId 
}: ProductNavProps) {
    const handleClick = (e: React.MouseEvent, productId: number) => {
        e.preventDefault();
        onProductSelect(productId);
    };

    return (
        <nav className={styles.nav}>
            <ul className={styles.menuList}>
                {menuItems.map((item) => (
                    <li key={item.productId}>
                        <button
                            type="button"
                            className={`${styles.menuItem} ${
                                activeProductId === item.productId ? styles.active : ''
                            }`}
                            onClick={(e) => handleClick(e, item.productId)}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}