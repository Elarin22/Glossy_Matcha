"use client";

// === 제품 페이지 ===

import React, { useState, useEffect } from 'react';
import ProductNav from '@/components/Nav/ProductNav';
import ProductMainBanner from '@/components/Product/ProductMainBanner';
import ProductMidBanner from '@/components/Product/ProductMidBanner';
import ProductDescription, { type ProductBodySection } from '@/components/Product/ProductDescription';
import ProductDetails from '@/components/Product/ProductDetails';
import ProductStore from '@/components/Product/ProductStore';
import ProductApi, { type Product } from '@/services/productApi';
import styles from './page.module.scss';

interface ProductsPageProps {
    params: Promise<{
        locale: string;
    }>;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ params }) => {
    const resolvedParams = React.use(params);
    
    // === 상태 관리 ===
    const [activeProductId, setActiveProductId] = useState<number>(1); // 현재 선택된 제품 ID
    const [products, setProducts] = useState<Product[]>([]);             // 제품 목록
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null); // 선택된 제품 상세 정보
    const [loading, setLoading] = useState(true);                       // 로딩 상태
    const [error, setError] = useState<string | null>(null);            // 에러 메시지
    
    const lang = resolvedParams?.locale || 'ko';

    // === 제품 목록 로드 ===
    // 언어 변경 시 제품 목록을 다시 가져오고 첫 번째 제품을 기본 선택
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

    // === 선택된 제품 상세 정보 로드 ===
    // activeProductId나 언어가 변경될 때마다 해당 제품의 상세 정보 가져오기
    useEffect(() => {
        const fetchCurrentProduct = async () => {
            if (!activeProductId) return;
            
            try {
                const productData = await ProductApi.getProductById(activeProductId, lang);
                setCurrentProduct(productData);
            } catch (err) {
                console.error('Failed to fetch current product:', err);
            }
        };

        fetchCurrentProduct();
    }, [activeProductId, lang]);

    const productMenuItems = products.map(product => ({
        label: product.name,
        productId: product.id
    }));

    const handleProductSelect = (productId: number) => {
        setActiveProductId(productId);
        
        // scroll 버튼과 동일한 위치로 스크롤 (nav 위치)
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    };

    const parseSubDescription = (subDescriptionText: string): ProductBodySection[] => {
        if (!subDescriptionText?.trim()) return [];

        const sections = subDescriptionText
            .trim()
            .split('---')
            .filter(section => section.trim());

        return sections
            .map((section, index) => {
                const [title = '', content = ''] = section.split('||').map(part => part.trim());
                if (!title) return null;
                
                // 이미지 할당 로직 수정: index + 1을 사용하여 첫 번째 이미지는 MidBanner에서 사용하도록 함
                const imageIndex = index + 1;
                const assignedImage = currentProduct?.images?.[imageIndex]?.image;
                
                return {
                    id: index,
                    image: assignedImage,
                    title,
                    title_en: title,
                    content,
                    content_en: content,
                    sort_order: index + 1
                };
            })
            .filter(Boolean) as ProductBodySection[];
    };


    // === 로딩 상태 처리 ===
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

    // === 에러 상태 처리 ===
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

    // === 제품 섹션 데이터 준비 ===
    const bodySections: ProductBodySection[] = currentProduct?.body_sections?.length 
        ? currentProduct.body_sections
        : currentProduct 
            ? parseSubDescription(ProductApi.getLocalizedField(currentProduct, 'sub_description', lang))
            : [];

    return (
        <main className={styles.main}>
            <ProductMainBanner />
            <ProductNav 
                menuItems={productMenuItems}
                onProductSelect={handleProductSelect}
                activeProductId={activeProductId}
            />
            <ProductMidBanner productId={activeProductId} lang={lang} />
            {bodySections.length > 0 && (
                <ProductDescription 
                    key={activeProductId}
                    bodySections={bodySections}
                    isEnglish={lang === 'en'}
                    midBannerImg={currentProduct?.mid_banner_img}
                />
            )}
            {currentProduct && (
                <ProductDetails 
                    product={currentProduct}
                    lang={lang}
                />
            )}
            <ProductStore />
        </main>
    );
};

export default ProductsPage;