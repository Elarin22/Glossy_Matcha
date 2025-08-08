'use client';

import React, { useState } from 'react';
import ProductNav from '@/components/Nav/ProductNav';
import ProductMainBanner from '@/components/Product/ProductMainBanner';
import ProductMidBanner from '@/components/Product/ProductMidBanner';
import styles from './page.module.scss';

const ProductsPage: React.FC = () => {
    const [activeProductId, setActiveProductId] = useState<number>(1);

    const productMenuItems = [
        { label: '시그니처', productId: 1 },
        { label: '말차다구세트', productId: 2 },
        { label: '틴케이스', productId: 3 }
    ];

    const handleProductSelect = (productId: number) => {
        setActiveProductId(productId);
    };

    return (
        <>
            <main className={styles.main}>
                {/* MainBanner */}
                <ProductMainBanner />
                
                {/* ProductNav - 제품 전용 네비게이션 */}
                <ProductNav 
                    menuItems={productMenuItems}
                    onProductSelect={handleProductSelect}
                    activeProductId={activeProductId}
                />
                
                {/* MidBanner - 선택된 제품만 표시 */}
                <ProductMidBanner productId={activeProductId} lang="ko" />
            </main>
        </>
    );
};

export default ProductsPage;