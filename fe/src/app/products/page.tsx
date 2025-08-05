'use client';

import React from 'react';
import Nav from '@/components/Nav/Nav';
import ProductMainBanner from '@/components/ProductMainBanner/ProductMainBanner';
import styles from './page.module.scss';

const ProductsPage: React.FC = () => {
    const productMenuItems = [
        { label: '시그니처', href: '/products/signature' },
        { label: '말차다구세트', href: '/products/tea-set' },
        { label: '틴케이스', href: '/products/tin-case' }
    ];

    return (
        <>
            <main className={styles.main}>
                {/* MainBanner */}
                <ProductMainBanner />
                {/* Nav */}
                <Nav menuItems={productMenuItems} />
                
                {/* Products */}
                <section className={styles.contentSection}>
                    <h2>시그니처, 말차도구, 틴케이스</h2>
                </section>
            </main>
        </>
    );
};

export default ProductsPage;