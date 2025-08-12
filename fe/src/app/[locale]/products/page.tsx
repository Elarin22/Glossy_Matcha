'use client';

import React, { useState, useEffect } from 'react';
import ProductNav from '@/components/Nav/ProductNav';
import ProductMainBanner from '@/components/Product/ProductMainBanner';
import ProductMidBanner from '@/components/Product/ProductMidBanner';
import ProductApi from '@/services/productApi';
import { Product } from '@/components/Product/ProductDescription';
import styles from './page.module.scss';

interface ProductsPageProps {
    params: Promise<{
        locale: string;
    }>;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ params }) => {
    const resolvedParams = React.use(params);
    const [activeProductId, setActiveProductId] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const lang = resolvedParams?.locale || 'ko';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await ProductApi.getProducts(lang);
                if (response.success && response.results.length > 0) {
                    setProducts(response.results);
                    setActiveProductId(response.results[0].id);
                } else {
                    setError('제품 정보를 불러올 수 없습니다.');
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('제품 정보를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [lang]);

    const productMenuItems = products.map(product => ({
        label: product.name,
        productId: product.id
    }));

    const handleProductSelect = (productId: number) => {
        setActiveProductId(productId);
    };

    if (loading) {
        return (
            <main className={styles.main}>
                <ProductMainBanner />
                <div className={styles.loading}>
                    <p>{lang === 'en' ? 'Loading products...' : '제품 정보를 불러오는 중...'}</p>
                </div>
            </main>
        );
    }

    if (error || products.length === 0) {
        return (
            <main className={styles.main}>
                <ProductMainBanner />
                <div className={styles.error}>
                    <p>{error || (lang === 'en' ? 'No products available.' : '제품 정보가 없습니다.')}</p>
                </div>
            </main>
        );
    }

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
                <ProductMidBanner productId={activeProductId} lang={lang} />
            </main>
        </>
    );
};

export default ProductsPage;