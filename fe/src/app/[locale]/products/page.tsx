/**
 * 제품 페이지 메인 컴포넌트
 * 
 * 주요 기능:
 * - 제품 목록 조회 및 선택된 제품 상세 정보 표시
 * - 다국어 지원 (한국어/영어)
 * - 제품 네비게이션을 통한 제품 전환
 * - API 연동 및 로딩/에러 상태 관리
 * - 제품 설명 텍스트 파싱 및 섹션별 표시
 * 
 * 컴포넌트 구조:
 * - ProductMainBanner: 메인 배너 (슬라이드 이미지)
 * - ProductNav: 제품 선택 네비게이션
 * - ProductMidBanner: 선택된 제품의 기본 정보
 * - ProductDescription: 제품 상세 설명 섹션들
 * - ProductDetails: 제품 상세 이미지 (토글)
 * - ProductStore: 스토어 이동 버튼
 */

"use client";

import React, { useState, useEffect } from 'react';
import ProductNav from '@/components/Nav/ProductNav';
import ProductMainBanner from '@/components/Product/ProductMainBanner';
import ProductMidBanner from '@/components/Product/ProductMidBanner';
import ProductDescription from '@/components/Product/ProductDescription';
import ProductDetails from '@/components/Product/ProductDetails';
import ProductStore from '@/components/Product/ProductStore';
import ProductApi, { type Product, type ProductBodySection } from '@/services/productApi';
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
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
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

    /**
     * 제품 선택 시 실행되는 핸들러
     * - 선택된 제품 ID 업데이트
     * - 페이지를 메인 배너 다음 위치로 스크롤
     */
    const handleProductSelect = (productId: number) => {
        setActiveProductId(productId);
        
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    };

    /**
     * 제품의 sub_description 텍스트를 파싱하여 섹션별로 나누는 함수
     * 
     * 파싱 규칙:
     * - '---'로 섹션 구분
     * - '||'로 제목과 내용 구분
     * - 각 섹션에 대응하는 이미지 자동 매핑
     */
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