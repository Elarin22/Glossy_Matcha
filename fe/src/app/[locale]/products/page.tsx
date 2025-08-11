'use client';

import React, { useState, useEffect } from 'react';
import ProductNav from '@/components/Nav/ProductNav';
import ProductMainBanner from '@/components/Product/ProductMainBanner';
import ProductMidBanner from '@/components/Product/ProductMidBanner';
import ProductDescription, { fetchProductById } from '@/components/Product/ProductDescription';
import styles from './page.module.scss';

interface Product {
    id: number;
    name: string;
    subtitle: string;
    sub_descriptions: any[];
}

const ProductsPage: React.FC = () => {
    const [activeProductId, setActiveProductId] = useState<number>(1);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [isEnglish, setIsEnglish] = useState(false);
    const [loading, setLoading] = useState(false);

    const productMenuItems = [
        { label: '시그니처', productId: 1 },
        { label: '말차다구세트', productId: 2 },
        { label: '틴케이스', productId: 3 }
    ];

    const handleProductSelect = (productId: number) => {
        setActiveProductId(productId);
    };

    // activeProductId가 변경될 때마다 제품 데이터 가져오기
    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const productData = await fetchProductById(activeProductId);
                setCurrentProduct(productData);
            } catch (error) {
                console.error('제품 로드 실패:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [activeProductId]);

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
                
                {/* MidBanner */}
                <ProductMidBanner productId={activeProductId} lang="ko" />
                
                {/* ProductDescription*/}
                <section>
                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center' }}>
                            로딩 중...
                        </div>
                    ) : currentProduct ? (
                        <ProductDescription 
                            subDescriptions={currentProduct.sub_descriptions}
                            isEnglish={isEnglish}
                        />
                    ) : null}
                </section>
            </main>
        </>
    );
};

export default ProductsPage;